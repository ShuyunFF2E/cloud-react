import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { prefixCls } from '@utils/config';

import Icon from '../icon';
import Menu from '../menu';
import ShopSelector from './selector';
import './index.less';

const noop = () => {};

function hashName2OpenKeys(hashName) {
    let seg = '';
    const segList = hashName.split('/').reduce((rs, item) => {
        if (!item) {
            return rs;
        }
        seg = `${seg}/${item}`;
        return [...rs, seg];
    }, []);

    // 只取父级路径
    return segList.slice(0, -1);
}

function getHashName() {
    return window.location.hash.replace(/^#|(\?.*)/g, '');
}

export default class CcMenu extends PureComponent {

    static propTypes = {
	    // 店铺选择器资源
        shopSource: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
            children: PropTypes.array
        })),

	    // 菜单资源
        menuSource: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
            children: PropTypes.array
        })),

	    // 选中的平台
        checkedPlat: PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
        }),

	    // 选中的店铺
        checkedShop: PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
            icon: PropTypes.string
        }),

	    topPlaceholder: PropTypes.node,
        searchPlaceholder: PropTypes.string,
        onMenuItemClick: PropTypes.func,
        onSubMenuToggle: PropTypes.func,
        onShopChange: PropTypes.func,
        onShopSearch: PropTypes.func
    };

    static defaultProps = {
        shopSource: null,
        menuSource: [],
	    topPlaceholder: null,
        searchPlaceholder: '请输入关键字',
        checkedPlat: null,
        checkedShop: null,
        onMenuItemClick: noop,
        onSubMenuToggle: noop,
        onShopSearch: noop,
        onShopChange: noop
    };

    constructor(props) {
        super(props);
        const { shopSource, checkedPlat, checkedShop } = this.props;

        const hashName = getHashName();
        const selectedKeys = [hashName];
        const openKeys = hashName2OpenKeys(hashName);

        const defaultPlat = shopSource && shopSource.length ? shopSource[0] : {};
        const defaultShop = defaultPlat.children && defaultPlat.children[0] ? defaultPlat.children[0] : {};

        this.state = {
            shopSource,
            openKeys,
            selectedKeys,
            menuCollapsed: false,
            selectorExpanded: false,
            checkedPlat: checkedPlat || defaultPlat,
            checkedShop: checkedShop || defaultShop
        }
    }

    componentDidMount() {
    	window.addEventListener('hashchange', this.hashchangeFN);
    }

    componentWillUnmount() {
	    window.removeEventListener('hashchange', this.hashchangeFN);
    }

    hashchangeFN = () => {
        const hashName = getHashName();
        this.setState({
            selectedKeys: [hashName],
            openKeys: hashName2OpenKeys(hashName)
        });
    };

    handleShopSearch = keyword => {
        const newShopSource = this.props.shopSource.map(plat => {
            return {
            	...plat,
	            children: plat.children.filter(shop => shop.title.includes(keyword))
            };
        })
        .filter(plat => plat.children && plat.children.length);

        this.setState({
            shopSource: newShopSource
        }, () => {
            this.props.onShopSearch(keyword, newShopSource);
        });
    };

    toggleSidebar = () => {
        const { menuCollapsed } = this.state;
        this.setState({
            menuCollapsed: !menuCollapsed
        });
    };

    toggleSelector = e => {
	    // 阻止像document上冒泡，触发侧边栏关闭事件
        e.nativeEvent.stopImmediatePropagation();

        const { selectorExpanded } = this.state;
        this.setState({
            selectorExpanded: !selectorExpanded
        });
    };

    renderHeader() {

		const { checkedPlat, checkedShop, shopSource, selectorExpanded } = this.state;
		const { onShopChange, searchPlaceholder, topPlaceholder } = this.props;
		const classes = classnames(`${prefixCls}-menu-toggle`);

        return (
            <>
                <div className={classes} onClick={this.toggleSidebar}>
                    <Icon type="left-solid" className="toggle-icon"></Icon>
                </div>
                {
                    shopSource &&
                    <ShopSelector
                        isExpand={selectorExpanded}
                        checkedPlat={checkedPlat}
                        checkedShop={checkedShop}
                        source={shopSource}
                        searchPlaceholder={searchPlaceholder}
                        onShopSearch={this.handleShopSearch}
                        onShopChange={onShopChange}/>
                }
                {topPlaceholder}
            </>
        );
    }

	/**
	 * 菜单: 收缩状态
	 * @returns {*}
	 */
	renderCollpasedBar() {
        const { shopSource } = this.props;
        return (
            <div className="menu-collapsed-bar">
                <div className="collapsed-icon-wrapper" onClick={this.toggleSidebar}>
                    <Icon type="right-solid" className="collapsed-icon"></Icon>
                </div>

                {
                    shopSource &&
                    <div className="collapsed-logo-wrapper" onClick={this.toggleSelector}>
                        <Icon type="edit" className="collapsed-logo"></Icon>
                    </div>
                }
            </div>
        );
    }

    render() {
        const { openKeys, selectedKeys, menuCollapsed } = this.state;
        const { onMenuItemClick, onSubMenuToggle } = this.props;

        const className = classnames(`${prefixCls}-menu`, { 'collapsed': menuCollapsed });

        return (
            <div className={className}>
                <Menu
                    type="link"
                    header={this.renderHeader()}
                    source={this.props.menuSource}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    onSubMenuToggle= {onSubMenuToggle}
                    onItemClick={onMenuItemClick}>
                </Menu>
                { menuCollapsed && this.renderCollpasedBar() }
            </div>
        );
    }
}
