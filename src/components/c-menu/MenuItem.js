/* eslint-disable no-unused-vars */
import React from 'react';
// import PropTypes from 'prop-types';
import { Item } from 'rc-menu';
import classNames from 'classnames';
import { isValidElement, cloneElement } from './reactNode';
import MenuContext from './MenuContext';

export default class MenuItem extends React.Component {
  static contextType = MenuContext;

  renderItemChildren(inlineCollapsed) {
    const { icon, children } = this.props;
    const { firstLevel } = this.context;

    const wrapNode = <span>{children}</span>;
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

  render() {
    const { title, icon, ...rest } = this.props;
    const { inlineCollapsed } = this.context;
    return (
      <Item {...rest} title={typeof title === 'string' ? title : undefined}>
        {cloneElement(icon, {
          className: classNames(
            isValidElement(icon) ? icon.props?.className : '',
          ),
        })}
        {this.renderItemChildren(inlineCollapsed)}
      </Item>
    );
  }
}
