/* eslint-disable */
import React, { useContext } from 'react';
import { SubMenu as RcSubMenu, useFullPath } from 'rc-menu';
import classNames from 'classnames';
import 'rc-menu/assets/index.css';
import { omit } from '@utils';
import { isValidElement, cloneElement } from './reactNode';
import MenuContext from './MenuContext';

function SubMenu(props) {
  const { icon, title } = props;
  const context = useContext(MenuContext);
  const { inlineCollapsed } = context;
  const parentPath = useFullPath();


  let titleNode;
  if (!icon) {
    if (
      inlineCollapsed &&
      !parentPath.length &&
      title &&
      typeof title === 'string'
    ) {
      titleNode = <span>{title[0]}</span>;
    } else {
      titleNode = <span>{title}</span>;
    }
  } else {
    const titleIsSpan = isValidElement(title) && title.type === 'span';
    titleNode = (
      <>
        {cloneElement(icon, {
          className: classNames(
            isValidElement(icon) ? icon.props?.className : '',
          ),
        })}
        {!inlineCollapsed ? titleIsSpan ? title : <span>{title}</span> : ''}
      </>
    );
  }

  return (
    <MenuContext.Provider
      value={{
        ...context,
        firstLevel: false,
      }}
    >
      <RcSubMenu {...omit(props, ['icon'])} title={titleNode} />
    </MenuContext.Provider>
  );
}

export default SubMenu;
