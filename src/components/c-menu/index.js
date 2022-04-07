import * as React from 'react';
import RcMenu from 'rc-menu';
import { omit, prefixCls } from '@utils';
import collapseMotion from '@utils/motion';
import classNames from 'classnames';
// import 'rc-menu/assets/index.css';

import { cloneElement } from './reactNode';
import Icon from '../icon';
import Tooltip from '../tooltip';
import MenuContext from './MenuContext';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import './index.less';

const defaultMotions = {
  inline: collapseMotion,
};

class InternalMenu extends React.Component {
  static defaultProps = {
    theme: 'light',
  };

  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      collapsed: !this.state.collapsed,
    });
  };

  renderMenu = () => {
    const {
      prefixCls: customizePrefixCls,
      className,
      theme,
      expandIcon,
      header,
      ...restProps
    } = this.props;
    const passedProps = omit(restProps, ['siderCollapsed', 'collapsedWidth']);
    return (
      <MenuContext.Provider
        value={{
          inlineCollapsed: this.state.collapsed || false,
          firstLevel: true,
          mode: this.props.mode || '',
        }}
      >
        <div
          className={classNames(`${prefixCls}-menu`, className, {
          [`${prefixCls}-menu-collapsed`]: this.props.inlineCollapsed,
          [`${prefixCls}-menu-horizontal-header`]:this.props.mode === 'horizontal',
          [`${prefixCls}-menu-vertical-header`]: (this.props.mode === 'vertical' || this.props.mode === 'inline') && header && !this.state.collapsed,
        }, `${prefixCls}-menu-${theme}`)}
        >
          {header && !this.state.collapsed && (
            <span className={`${prefixCls}-menu-header`}>{header}</span>
          )}
          <RcMenu
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            {...passedProps}
            prefixCls={`${prefixCls}-cmenu`}
            inlineCollapsed={this.state.collapsed}
            expandIcon={cloneElement(expandIcon)}
            defaultMotions={defaultMotions}
          />
          {this.props.inlineCollapsed && (
            <div className={`${prefixCls}-menu-inlineCollapsed`}>
              {this.state.collapsed ? (
                <Tooltip placement="right" content="展开导航栏">
                  <Icon type="group-fill1" onClick={this.toggleCollapsed} />
                </Tooltip>
              ) : (
                <div onClick={this.toggleCollapsed}>
                  <Icon type="group-fill1" />
                  <span className="text">收起导航栏</span>
                </div>
              )}
            </div>
          )}
        </div>
      </MenuContext.Provider>
    );
  };

  render() {
    return this.renderMenu();
  }
}

class CMenu extends React.Component {
  static Item = Item;

  static SubMenu = SubMenu;

  render() {
    return <InternalMenu {...this.props} />;
  }
}

export default CMenu;
