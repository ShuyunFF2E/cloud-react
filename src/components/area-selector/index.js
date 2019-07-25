import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import Loading from '../loading';
import Modal from '../modal';

import PureAreaSelector from './core'
import { getStorageData, setStorageData } from './utils';
import { platforms } from './const';

import './index.less';

const noop = () => {};

export default function AreaSelector(props) {

    /**
     * props
     */
    const { platform, server, selectedData, visible, dataHandler, onOk, onCancel, onClose, onCheckItem, onSelectItem, onRemoveItem } = props;


    /**
     * hooks
     */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const selectorRef = useRef();

    useEffect(() => {

        // fetcher
        async function fetchData(url) {
            const res = await window.fetch(url, {
                credentials: 'include',
                method: 'GET',
                mode: 'cors'
            });

            if (!res.ok) { return null; }
            const resData = await res.json();
            if (!Array.isArray(resData)) { return null; }

            return resData;
        }

        setLoading(true);

        const url = `${server}?platform=${platform}`;
        const dataSource = getStorageData(platform);
        if (dataSource) {
            setData(() => dataHandler(dataSource) || dataSource);
            setLoading(false);
        } else {
            fetchData(url).then(res => {
                if (!res) return;
                setData(() => dataHandler(res) || res);
                setLoading(false);
                setStorageData(platform, res);
            });
        }
    }, [platform, server]);

     

    /**
     * handler
     */
    const ok = useCallback(() => {
        onOk(selectorRef.current);
    }, []);


    return (
            <Modal
                title="地区选择"
                visible={visible}
                onOk={ok}
                onClose={onClose}
                onCancel={onCancel}>
                {
                    loading ? <Loading /> : 
                    <PureAreaSelector 
                        data={data} 
                        ref={selectorRef} 
                        selectedData={selectedData}
                        onCheckItem={onCheckItem}
                        onSelectItem={onSelectItem}
                        onRemoveItem={onRemoveItem}/>
                }
            </Modal>
    );
}

AreaSelector.platforms = platforms;

AreaSelector.propTypes = {
    platform: PropTypes.oneOf([platforms.TAOBAO, platforms.UNI, platforms.JD]),
    server: PropTypes.string,
    selectedData: PropTypes.array,
    visible: PropTypes.bool,
    dataHandler: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    onCheckItem: PropTypes.func, 
    onSelectItem: PropTypes.func, 
    onRemoveItem: PropTypes.func
};

AreaSelector.defaultProps = {
    platform: AreaSelector.platforms.UNI,
    server: 'https://qa-ual.shuyun.com/shuyun-searchapi/1.0/area',
    selectedData: [],
    visible: false,
    dataHandler: data => data,
    onOk: result => console.log('地址选择器的输出：', result),
    onCancel: noop,
    onClose: noop,
    onCheckItem: noop, 
    onSelectItem: noop,
    onRemoveItem: noop
};