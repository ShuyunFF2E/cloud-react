/* eslint-disable */
import React, { useContext } from 'react';
import { SubMenu as RcSubMenu } from 'rc-menu';
import classNames from 'classnames';
import 'rc-menu/assets/index.css';
import { omit } from '@utils';
import { isValidElement, cloneElement } from './reactNode';
import MenuContext from './MenuContext';

function SubMenu(props) {
  const { icon, title } = props;
  const context = useContext(MenuContext);
  const { inlineCollapsed } = context;

  console.log(icon, '[icon]');

  let titleNode;
  if (!icon) {
    titleNode =
      inlineCollapsed &&
      // !parentPath.length &&
      title &&
      typeof title === 'string' ? (
        <span>{title.charAt(0)}</span>
      ) : (
        <span>{title}</span>
      );
  } else {
    const titleIsSpan = isValidElement(title) && title.type === 'span';
    titleNode = (
      <>
        {cloneElement(icon, {
          className: classNames(
            isValidElement(icon) ? icon.props?.className : '',
          ),
        })}
        {titleIsSpan ? title : <span>{title}</span>}
      </>
    );
  }

  console.log(titleNode, '[titleNode]');

  return <RcSubMenu {...omit(props, ['icon'])} title={titleNode} />;
}

export default SubMenu;
