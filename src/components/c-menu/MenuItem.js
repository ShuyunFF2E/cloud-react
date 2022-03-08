import React from 'react';
import { Item } from 'rc-menu';
import classNames from 'classnames';

import { isValidElement, cloneElement } from './reactNode';
import Tooltip from '../tooltip';
import MenuContext from './MenuContext';

export default class MenuItem extends React.Component {
  static contextType = MenuContext;

  renderItemChildren() {
    const { icon, children } = this.props;
    const { firstLevel, inlineCollapsed } = this.context;
    const wrapNode = <span>{children}</span>;
    if (icon && inlineCollapsed) {
      return '';
    }
    if (!icon || (isValidElement(children) && children.type === 'span')) {
      if (
        inlineCollapsed &&
        firstLevel &&
        children &&
        typeof children === 'string'
      ) {
        return <span>{children.charAt(0)}</span>;
      }
    }
    return wrapNode;
  }

  renderIcon() {
    const { icon } = this.props;
    return cloneElement(icon, {
      className: classNames(isValidElement(icon) ? icon.props?.className : ''),
    });
  }

  render() {
    const { children, ...rest } = this.props;
    const { inlineCollapsed, firstLevel } = this.context;
    return (
      <Item {...rest}>
        {inlineCollapsed && firstLevel ? (
          <Tooltip placement="right" content={children}>
            {this.renderIcon()}
            {this.renderItemChildren()}
          </Tooltip>
        ) : (
          <span>
            {this.renderIcon()}
            {this.renderItemChildren()}
          </span>
        )}
      </Item>
    );
  }
}
