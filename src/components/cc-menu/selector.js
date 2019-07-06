import React, { Component } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

import IconRaw from '../icon';

const Icon = React.memo(IconRaw);

const noop = () =>  {};
export default class CcMenu extends Component {

    static propTypes = {
        source: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
            children: PropTypes.array
        })),
        checkedShop: PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
            icon: PropTypes.string,
        }),
        checkedPlat: PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
        }),
        isExpand: PropTypes.bool,
        searchPlaceholder: PropTypes.string,
        onShopSearch: PropTypes.func,
        onShopChange: PropTypes.func
    }

    static defaultProps = {
        source: [],
        checkedPlat: {},
        checkedShop: {},
        searchPlaceholder: '输入关键字',
        isExpand: false,
        onShopSearch: noop,
        onShopChange: noop
    }
    
    constructor(props) {
        super(props);
        const { checkedShop, checkedPlat, isExpand } = props;
        this.state = {
            isExpand,
            checkedPlat,
            checkedShop,
            prevProps: props
        };
        this.inputRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, state) {
        const { prevProps } = state;
        if (nextProps.checkedPlat !== prevProps.checkedPlat ||
            nextProps.checkedShop !== prevProps.checkedShop ||
            nextProps.isExpand !== prevProps.isExpand) {
            return {
                isExpand: nextProps.isExpand,
                checkedPlat: nextProps.checkedPlat,
                checkedShop: nextProps.checkedShop,
                prevProps: nextProps
            }
        }
        return null;
    }

    componentDidMount() {
        // 点击其他区域，关闭侧边栏selector
        document.addEventListener('click', this.collapseSelector);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.collapseSelector)
    }

    toggleSelector = e => {
        this.preventClick(e);
        const { isExpand } = this.state;
        this.setState({
            isExpand: !isExpand
        });
    }

    collapseSelector = () => {
        this.setState({
            isExpand: false
        });
    }

    changeShop = (shop, plat) => () => {
        this.setState({
            checkedShop: shop,
            checkedPlat: plat,
            isExpand: false
        });

        if (shop.key === this.state.checkedShop.key) return; // no change

        this.props.onShopChange(shop, plat);
    }

    searchShop = e => {
        if (e.keyCode !== 13) return; // 只响应enter键 

        const keyword = this.inputRef.current.value;
        this.props.onShopSearch(keyword);
    }

    preventClick = e => {
        // document上绑定了原生事件监听器，这里阻止原生事件冒泡到document上
        e.nativeEvent.stopImmediatePropagation();
    }

    renderMenuSelector() {
        const { isExpand } = this.state;
        const selectorCls = cls('shop-selector-pane', { expand: isExpand, collapse: !isExpand });

        const searchSection = (
            <div className="shop-search">
                <input type="text" placeholder={this.props.searchPlaceholder} ref={this.inputRef} onKeyDown={this.searchShop}/>
                <Icon type="search" className="search-icon"/>
            </div>
        );

        return (
            <div className={selectorCls} onClick={this.preventClick}>
                { searchSection }
                { this.renderSelectorPane() }
            </div>
        );
    }

    renderSelectorPane() {
        return this.props.source.map(plat => (

            // render plat
            <ul key={plat.key}>
                <li className="shop-plat">
                    { plat.title }
                </li>   

                {
                    // render shops in plat
                    plat.children.map(shop => {
                        const checked = this.state.checkedShop.key === shop.key;
                        const className = cls('shop-item', { checked });
                        return (
                            <li className={className} onClick={this.changeShop(shop, plat)} key={shop.key} role="presentation">
                                <span className="shop-title">{shop.title}</span>
                                {checked && <Icon className="checked-flag" type="check-circle-solid"/>}
                            </li>
                        );
                    })
                }
            </ul>
        ));
    }

    renderMenuShop() {
        const { checkedPlat, checkedShop } = this.state;

        const logo = checkedShop.icon ? 
            <img src={checkedShop.icon} alt={checkedShop.title} className="shop-img-logo"/> : 
            <Icon type="shop" className="shop-logo"/>;

        return (
            <div className="shop-selector" onClick={this.toggleSelector}>
                <section className="shop-logo-wrapper">
                    { logo  }
                </section>
                <p className="shop-title-wrapper">
                    <span className="shop-plat">{checkedPlat.title}</span>
                    {"  |  "}
                    <span className="shop-name">{checkedShop.title}</span>
                </p>
            </div>
        );
    }


    render() {
        return (
            <>
                {this.renderMenuShop()}
                {this.renderMenuSelector()}
            </> 
        );
    }
}