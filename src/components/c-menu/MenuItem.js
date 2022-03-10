import React from 'react';
import { Item } from 'rc-menu';
import classNames from 'classnames';
import { prefixCls } from '@utils';

import { isValidElement, cloneElement } from './reactNode';
import Tooltip from '../tooltip';
import MenuContext from './MenuContext';
import './index.less';

export default class MenuItem extends React.Component {
  static contextType = MenuContext;

  renderItemChildren() {
    const { icon, children } = this.props;
    const { firstLevel, inlineCollapsed } = this.context;
    const wrapNode = <span>{children}</span>;
    if (icon && inlineCollapsed) {
      return <span className={`${prefixCls}-inc-link`}>{children}</span>;
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

  // eslint-disable-next-line class-methods-use-this
  transformLink(children) {
    if ((children.type === 'a' || children.type?.displayName === 'Link') && this.context.firstLevel) {
      return children.props.children
    }
      return children;
  }

  render() {
    const { children, ...rest } = this.props;
    const { inlineCollapsed, firstLevel } = this.context;
    this.transformLink(children);
    return (
      <Item {...rest}>
        {inlineCollapsed && firstLevel ? (
          <Tooltip placement="right" content={this.transformLink(children)}>
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
