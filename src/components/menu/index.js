import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import jeasy from 'jeasy';

import MenuContext, { types } from './context';

import MenuItem from './menu-item';
import SubMenu from './sub-menu';
import './index.less';

const noop = () => {};

export default class Menu extends PureComponent {

    static propTypes = {
        header: PropTypes.node,
        source: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.node.isRequired,
            key: PropTypes.string.isRequired,
            children: PropTypes.array
        })),
        openKeys: PropTypes.arrayOf(PropTypes.string),
        selectedKeys: PropTypes.arrayOf(PropTypes.string),
        type: PropTypes.oneOf([types.LINK, types.COMMON]),
        indent: PropTypes.number,
        style: PropTypes.object,
        onSubMenuToggle: PropTypes.func,
        onItemClick: PropTypes.func
    };

    static defaultProps = {
        header: null,
        source: [],
        openKeys: [],
        selectedKeys: [],
        type: types.COMMON,
        indent: 10,
        style: {},
        onSubMenuToggle: noop,
        onItemClick: noop
    };

    constructor(props) {
        super(props);
        const { openKeys, selectedKeys }  = props;
        this.state = {
            openKeys,
            selectedKeys,
            prevProps: props
        };
    }

    static getDerivedStateFromProps(nextProps, state) {
        const { prevProps } = state;
        if (!jeasy.equal(prevProps.openKeys, nextProps.openKeys) || !jeasy.equal(prevProps.selectedKeys, nextProps.selectedKeys)){
            return {
                openKeys: nextProps.openKeys,
                selectedKeys: nextProps.selectedKeys,
                prevProps: nextProps
            };
        }
        return null;
    }

    changeSelectedKeys = key => {
        this.setState({
            selectedKeys: [key]
        });
    };

    renderNodeBySource(source, path=[]) {
        const { onSubMenuToggle, onItemClick, type, indent } = this.props;
        const { openKeys, selectedKeys } = this.state;
        return source.map(item => {
            const { title, key, children } = item;

            const hasSubMenu = Array.isArray(children) && children.length;
            const newPath = [key, ...path]; // 传播路径

	        if (hasSubMenu) {
	        	return (
			        <SubMenu
				        title={title}
				        key={key}
				        internalKey={key}
				        path={newPath}
				        indent={indent}
				        opened={openKeys.includes(key)}
				        onMenuToggle={onSubMenuToggle}>
				        {this.renderNodeBySource(children, newPath)}
			        </SubMenu>
		        );
	        }

            return (
	            <MenuItem
		            key={key}
		            internalKey={key}
		            type={type}
		            path={newPath}
		            indent={indent}
		            selected={selectedKeys.includes(key)}
		            onClick={onItemClick}>
		            {title}
	            </MenuItem>
            );
        });
    }

    renderNodeByChildren(children, path=[]) {
        const { onSubMenuToggle, onItemClick, indent, type } = this.props;
        const { openKeys, selectedKeys } = this.state;
        return React.Children.map(children, child => {
            const { key, type: { name } } = child;
            const opened = openKeys.includes(key);
            const selected = selectedKeys.includes(key);

            const newPath = [key, ...path];
            const hasSubMenu = name === SubMenu.name;

            // 额外的属性
            const extraProps = hasSubMenu ? { opened, onMenuToggle: onSubMenuToggle } : { type, selected, onClick: onItemClick };

            return React.cloneElement(child, {
                ...child.props,
                ...extraProps,
                indent,
                internalKey: key,
                path: newPath,
                children: hasSubMenu ? this.renderNodeByChildren(child.props.children, newPath) : child.props.children
            });
        });
    }


    render() {
        const { source, header, children, style } = this.props;

        let content;

        // 优先使用自定义children组合进行渲染; 未传入自定义组合时，使用source进行渲染
        if (children) {
            content = this.renderNodeByChildren(children);
        } else if (source.length) {
            content = this.renderNodeBySource(source);
        }

        const value = { ...this.state, changeSelectedKeys: this.changeSelectedKeys };
        return (
            <MenuContext.Provider value={value}>
                <section className="menu-container" style={style}>
                    {header}
                    <ul className="menu">
                        {content}
                    </ul>
                </section>
            </MenuContext.Provider>
        );
    }
}

Menu.MenuItem = MenuItem;
Menu.SubMenu = SubMenu;
