/* eslint-disable no-unused-vars */
import React from 'react';
// import PropTypes from 'prop-types';
import { Item } from 'rc-menu';
import classNames from 'classnames';
import { isValidElement, cloneElement } from './reactNode';


export default class MenuItem extends React.Component {

  renderItemChildren(inlineCollapsed) {
    const { icon, children } = this.props;

    const wrapNode = <span>{children}</span>;
    // if (!icon || (isValidElement(children) && children.type === 'span')) {
    //   if (children && inlineCollapsed && typeof children === 'string') {
    //     return <div>{children.charAt(0)}</div>;
    //   }
    // }
    return wrapNode;
  }

  render() {
    const { title, icon, danger, ...rest } = this.props;
    return (
      <Item
          {...rest}
          title={typeof title === 'string' ? title : undefined}
        >
          {cloneElement(icon, {
            className: classNames(
              isValidElement(icon) ? icon.props?.className : '',
            ),
          })}
          {this.renderItemChildren(true)}
        </Item>
    );
  }
}