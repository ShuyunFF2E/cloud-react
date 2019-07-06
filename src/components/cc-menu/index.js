import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import IconRaw from '../icon';
import Menu from '../menu';
import ShopSelector from './selector';
import './index.less';

const Icon = React.memo(IconRaw);
const noop = () => {};

function hashName2OpenKeys(hashName) {
    const segList = hashName.split('/');
    function * g() {
        for (let i = 0; i < segList.length; i += 1) {
            yield segList.slice(0, i).join('/');
        }
    }
    const rs = [];
    for (const openKey of g()) { // eslint-disable-line
        rs.push(openKey);
    }
    return rs;
}

function getHashName() {
    return window.location.hash.replace(/^#/, '');
}

export default class CcMenu extends PureComponent {

    static propTypes = {
        shopSource: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
            children: PropTypes.array
        })), // 店铺选择器资源
        menuSource: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
            children: PropTypes.array
        })), // 菜单资源
        checkedPlat: PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
        }), // 选中的平台
        checkedShop: PropTypes.shape({
            title: PropTypes.string,
            key: PropTypes.string,
            icon: PropTypes.string
        }), // 选中的店铺
        header: PropTypes.node, // 额外头部
        searchPlaceholder: PropTypes.string,
        onMenuItemClick: PropTypes.func,
        onSubMenuToggle: PropTypes.func,
        onShopChange: PropTypes.func,
        onShopSearch: PropTypes.func
    }

    static defaultProps = {
        shopSource: null,
        menuSource: [],
        header: null,
        searchPlaceholder: '请输入关键字',
        checkedPlat: null,
        checkedShop: null,
        onMenuItemClick: noop,
        onSubMenuToggle: noop,
        onShopSearch: noop,
        onShopChange: noop
    }

    constructor(props) {
        super(props);
        const { shopSource, checkedPlat, checkedShop } = this.props;

        const hashName = getHashName();
        const selectedKeys = [hashName];
        const openKeys = hashName2OpenKeys(hashName);

        const defaultPlat = shopSource && shopSource.length > 0 ? shopSource[0] : {};
        const defaultShop = defaultPlat.children && defaultPlat.children[0] ? defaultPlat.children[0] : {};

        this.state =  {
            shopSource,
            openKeys,
            selectedKeys,
            menuCollapsed: false,
            selectorExpanded: false,
            checkedPlat:  checkedPlat || defaultPlat,
            checkedShop: checkedShop || defaultShop
        }
    }

    componentDidMount() {
        window.onhashchange = () => {
            const hashName = getHashName();
            this.setState({
                selectedKeys: [hashName],
                openKeys: hashName2OpenKeys(hashName)
            });
        }
    }
    
    componentWillUnmount() {
        window.onhashchange = null;
    }


    handleShopSearch = keyword => {
        const newShopSource = this.props.shopSource.map(plat => {
            const newChildren = plat.children.filter(shop => shop.title.includes(keyword));
            return { ...plat, children: newChildren }
        }).filter(plat => plat.children && plat.children.length > 0);
       
        this.setState({
            shopSource: newShopSource
        }, () => {
            this.props.onShopSearch(keyword, newShopSource);
        });
    }

    toggleSidebar = () => {
        const { menuCollapsed } = this.state;
        this.setState({
            menuCollapsed: !menuCollapsed
        });
    }

    toggleSelector = e => {
        e.nativeEvent.stopImmediatePropagation(); // 阻止像document上冒泡，触发侧边栏关闭事件
        const { selectorExpanded } = this.state;
        this.setState({
            selectorExpanded: !selectorExpanded
        });
    }

    renderHeader() {

        const { checkedPlat, checkedShop, shopSource, selectorExpanded } = this.state;
        const { onShopChange, searchPlaceholder, header } = this.props;
        return (
            <>
                <div className="cc-menu-toggle" onClick={this.toggleSidebar}>
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
                { header }
            </>
        );
    }

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

        const className = cls('cc-menu', { 'collapsed': menuCollapsed });

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