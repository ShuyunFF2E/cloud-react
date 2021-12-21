import * as React from 'react';
import RcMenu, { Divider, ItemGroup } from 'rc-menu';
import 'rc-menu/assets/index.css';
// import classNames from 'classnames';
import {  omit } from '@utils';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import { cloneElement } from './reactNode';
import './index.less';
// import MenuContext, { MenuTheme } from './MenuContext';

export { MenuItemGroupProps } from 'rc-menu';

class InternalMenu extends React.Component{
  static defaultProps = {
    theme: 'light', // or dark
  };


  getInlineCollapsed() {
    const { inlineCollapsed, siderCollapsed } = this.props;
    if (siderCollapsed !== undefined) {
      return siderCollapsed;
    }
    return inlineCollapsed;
  }

  renderMenu = () => {
    // const rootPrefixCls = getPrefixCls();

    const {
      prefixCls: customizePrefixCls,
      className,
      theme,
      expandIcon,
      ...restProps
    } = this.props;

    const passedProps = omit(restProps, ['siderCollapsed', 'collapsedWidth']);
    const inlineCollapsed = this.getInlineCollapsed();

    // const defaultMotions = {
    //   horizontal: { motionName: `${rootPrefixCls}-slide-up` },
    //   inline: collapseMotion,
    //   other: { motionName: `${rootPrefixCls}-zoom-big` },
    // };

    // const prefixCls = getPrefixCls('menu', customizePrefixCls);
    // const menuClassName = classNames(`${prefixCls}-${theme}`, className);

    return (
        <RcMenu
          // getPopupContainer={getPopupContainer}
          // overflowedIndicator={<EllipsisOutlined />}
          // overflowedIndicatorPopupClassName={`${prefixCls}-${theme}`}
          {...passedProps}
          inlineCollapsed={inlineCollapsed}
          // className={menuClassName}
          // prefixCls={prefixCls}
          // direction={direction}
          // defaultMotions={defaultMotions}
          expandIcon={cloneElement(expandIcon)}
        />
      // </MenuContext.Provider>
    );
  };

  render() {
    return this.renderMenu()};
  }


// We should keep this as ref-able
class CMenu extends React.Component{
  componentDidMount() {
    console.log(<InternalMenu />, 'ppp');
  }

  static Divider = Divider;

  static Item = Item;

  static SubMenu = SubMenu;

  static ItemGroup = ItemGroup;

  render() {
    return (
      <InternalMenu {...this.props} />
    );
  }
}

// export { SubMenuProps, MenuItemProps };

export default CMenu;
