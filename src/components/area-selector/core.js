import React, { useMemo, useState, useEffect, useRef, useImperativeHandle, useCallback } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import './index.less';

import IconRaw from '../icon';
import Checkbox from '../checkbox';
import Input from '../input';

import { genNewSource, genPathMap, genSelctedCount, path2PathStr } from './utils';

const Icon = React.memo(IconRaw);
const noop = () => {};
const labelMap = {
    province: '省',
    city: '市',
    county: '区县'
}


// 是否是事件类型
const isEventType = e => {
    return (e && e instanceof window.Event) || (e && e.nativeEvent && e.nativeEvent instanceof window.Event);
}

function PureAreaSelector(props) {

    const { data, selectedData, onCheckItem, onSelectItem, onRemoveItem, forwardRef } = props;

    /**
     * hooks
     */
    // 地区项目与其传播路径的关联关系 {[node.id]: path}, path是Array类型
    const pathMap = useMemo(() => {
        return genPathMap(data);
    }, [data]);

    const [source, setSource] = useState(data); // 整体数据源

    const [activedItem, setActivedItem] = useState({ province: {}, city: {}, county: {} }); // 激活的项目
    const [result, setResult] = useState(() => {
        // 通过selectedData，生成result [{ path, pathStr }]
        return selectedData.map(selectedItem => {
            const { id, name: pathStr } = selectedItem;
            const targetId = id.split(',').pop();
            const path = pathMap[targetId];
            return { path, pathStr }
        });
    }); // 选中的结果

    const cityList = useRef([]);

    useImperativeHandle(forwardRef, () => {
        const rs = result.map(item => {
            const { path, pathStr: name } = item;
            // path.reverse(); 这样会出bug
            const id = path.reduceRight((prev, cur) => {
                return `${prev},${cur.id}`;
            }, '').slice(1);
            return { id, name };
        })
        return rs;
    }, [result]);

    useEffect(() => {
        const finalSource = selectedData.reduce((rs, selectedItem) => {
            const targetId = selectedItem.id.split(',').pop();
            const path = pathMap[targetId];
            const node = path[0];
            const { newSource } = genNewSource(rs, node, true, pathMap);
            return newSource;
        }, data);

        setSource(finalSource);
    }, [data, selectedData, pathMap]);


    /**
     *  common helper
     */
    const getDisplaySource = useCallback(name => {
        let province;
        let city;

        switch (name) {
            case 'province':
                return source;
            case 'city':
                province = source.find(node => node.id === activedItem.province.id) || {};
                cityList.current = province.children || [];
                return cityList.current;
            case 'county':
                city = cityList.current.find(node => node.id === activedItem.city.id) || {};
                return city.children || [];
            default:
                return [];
        }
    }, [activedItem, source]);



    /**
     * handler
     */
    const addResult = item => e => {
        const { path, pathStr } = item;
        setResult(rs => {

            // 0. item已存在时, 禁止重复添加
            // 1. item作为子级，当在result中找到item的父级时，不需要添加该项。
            if (rs.some(r => pathStr.startsWith(r.pathStr))) {
                return rs;
            }

            // 2. item作为父级，需要移除该父级下所有子级，然后再添加
            const tmp = rs.filter(r => !(r.pathStr.startsWith(pathStr)))
            return [item, ...tmp];
        });

        // 用户操作界面时，关联选中; 代码触发结果，不关联选中。防止循环调用
        if (isEventType(e)) {
            // 这里checkItem与addResult/removeResult是互相引用， 必定会出现  xxx was used before it was defined， 因此使用行内disable
            checkItem(path[0])(true); // eslint-disable-line
        }
    };


    const removeResult = item => e => {

        const { path, pathStr } = item;
        setResult(rs => rs.filter(r => r.pathStr !== pathStr));

        // 用户操作界面时，关联选中; 代码触发结果，不关联选中。防止循环调用
        if (isEventType(e)) {
            // 这里checkItem与addResult/removeResult是互相引用， 必定会出现  xxx was used before it was defined， 因此使用行内disable
            checkItem(path[0])(false); // eslint-disable-line
        }

        // callback
        onRemoveItem(item);
    };

    const checkItem = item => checked => {
        const targetPath = pathMap[item.id];

        // 一. 遍历数据结构，设置相应的状态, 生成关联数据
        const { newSource, extraList, splitList } = genNewSource(source, item, checked, pathMap);
        setSource(newSource);

        // 二. 针对当前点击的项目，关联result
        const tmp = { path: targetPath, pathStr: path2PathStr(targetPath) };
        if (checked) {
            addResult(tmp)()
        } else {
            removeResult(tmp)();
        }


        // 三. 处理result中，节点的拆分/合并
        // 如果是拆分，则首先需要移除result中的父级，子级才能插进去
        if (splitList.length > 0) {
            splitList.forEach(node => {
                const path = pathMap[node.id];
                const pathStr = path2PathStr(path);
                if (result.find(rs => rs.pathStr === pathStr)) {
                    removeResult({ path, pathStr })();
                }
            });
        }

        extraList.forEach(node => {
            const path = pathMap[node.id];
            addResult({ path, pathStr: path2PathStr(path) })();
        });

        // callback
        onCheckItem(item, targetPath, checked);
    };


    const selectItem = useCallback((name, item) => () => {
        const target = {
            ...activedItem,
            [name]: item,
        };

        // 处理特殊性
        if (name === 'county') { // 不处理county的选中事件
            return;
        }
        if (name === 'province') {
            target.city = item.children || []; // 选中province，重置city值
        }
        if (name === 'city') {
            target.county = item.children || []; // 选中city值，重置county值
        }

        setActivedItem(target);

        // callback
        onSelectItem(item, name);
    }, [activedItem]);



    /** render partial  */
    const renderSelector = name => {

        const partialSource = getDisplaySource(name);
        const selectedCount = genSelctedCount(source);
        const currentSelected = selectedCount[name];

        return (
            <div className="area-container" key={name}>
                <div className="area-title">{labelMap[name]}选择（ {currentSelected} ）</div>

                <ul className="area-content">
                    {partialSource.map(item => {
                        const className = cls('area-item', { 'selected': item.id === activedItem[name].id })
                        return (
                            <li className={className} 
                                key={item.id} 
                                onClick={selectItem(name, item)} 
                                role="presentation">
                                    
                                <Checkbox 
                                    checked={item.checked === true} 
                                    indeterminate={item.indeterminate} 
                                    onChange={checkItem(item)}></Checkbox>
                                <span className="area-item-title">{item.name}</span>
                                {item.children && item.children.length > 0 && <Icon type="right" className="area-next-icon" />}
                            </li>
                        )
                    }
                    )}
                </ul>

            </div>
        );
    };


    const renderResult = () => {
        return (
            <div className="result-wrapper">
                <span className="result-title">已选：</span>
                <div className="result-content">
                    {result.map(rs =>
                        <span className="result-item" key={rs.pathStr}>
                            {rs.pathStr}
                            <Icon type='close' className="result-item-close" onClick={removeResult(rs)} />
                        </span>)
                    }
                </div>
            </div>
        );
    };


    /**
     * render
     */
    return (
        <section className="area-selector-container">

            <AreaSearch pathMap={pathMap} onSelectItem={addResult} />

            {renderResult()}

            <div>常用区域：</div>
            <div className="area-selector">
                {['province', 'city', 'county'].map(item => renderSelector(item))}
            </div>

        </section>
    );
}

PureAreaSelector.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        children: PropTypes.array
    })).isRequired,
    selectedData: PropTypes.array,
    onCheckItem: PropTypes.func,
    onSelectItem: PropTypes.func,
    onRemoveItem: PropTypes.func
};

PureAreaSelector.defaultProps = {
    selectedData: [],
    onCheckItem: noop,
    onSelectItem: noop,
    onRemoveItem: noop
};


// React.forwardRef生成的组件不支持propsType和defaultProps，因此通过属性的方式传入ref
export default React.forwardRef((props, ref) => (
    <PureAreaSelector {...props} forwardRef={ref}/>
));



// 地区搜索器
function AreaSearch(props) {

    /**
     * props
     */
    const { pathMap, onSelectItem } = props;


    /**
     * hooks
     */
    const [searchResult, setSearchResult] = useState([]); // 搜索的结果
    const searchTimer = useRef(null);


    /**
     * common helper
     */

    const clearSearchTimer = useCallback(() => {
        clearTimeout(searchTimer.current);
        searchTimer.current = null;
    }, []);


    /**
     * handler
     */
    const closeSearch = useCallback(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 250);
    }, []);


    const search = useCallback(e => {
        if (searchTimer.current) { return; }
        e.persist(); // 异步函数中使用合成事件，需要调用该方法
        searchTimer.current = setTimeout(() => {
            const keyword = e.target.value;
            if (!keyword) {
                clearSearchTimer();
                return closeSearch();
            }

            const newSearchResult = []; // [{ path, pathStr }]
            Object.values(pathMap).forEach(path => {
                if (path.some(p => p.name.includes(keyword)) && newSearchResult.length <= 10) {
                    // 根据匹配的path生成 'a > b > c' 这样的字符串，用于显示候选搜索结果
                    const pathStr = path2PathStr(path)
                    newSearchResult.push({ path, pathStr });
                }
            })

            setSearchResult(newSearchResult);

            return clearSearchTimer();
        }, 500);
    }, [clearSearchTimer, closeSearch, pathMap]);



    /**
     * render
     */
    return (
        <div className="search-wrapper">
            <div className="search-input">
                <Input type="text" onChange={search} onFocus={search} onBlur={closeSearch} placeholder="请输入区域名称"/>
                <Icon type="search" className="search-icon" />
            </div>
            {
                searchResult.length > 0 &&
                <ul className="search-result">
                    {searchResult.map(item => <li className="search-result-item" key={item.pathStr} onClick={onSelectItem(item)} role="presentation">{item.pathStr}</li>)}
                </ul>
            }
        </div>
    );
}

AreaSearch.propTypes = {
    pathMap: PropTypes.object,
    onSelectItem: PropTypes.func
};
AreaSearch.defaultProps = {
    pathMap: {},
    onSelectItem: noop
}