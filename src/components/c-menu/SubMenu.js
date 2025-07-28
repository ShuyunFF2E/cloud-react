/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { SubMenu as RcSubMenu, useFullPath } from 'rc-menu';
import { omit, prefixCls } from '@utils';
import classNames from 'classnames';

import { isValidElement, cloneElement } from './reactNode';
import MenuContext from './MenuContext';

function SubMenu(props) {
  const { icon, title, disabled, className } = props;
  const context = useContext(MenuContext);
  const { inlineCollapsed, mode } = context;
  const parentPath = useFullPath();

  let titleNode;
  if (!icon) {
    if (
      inlineCollapsed
      && !parentPath.length
      && title
      && typeof title === 'string'
    ) {
      titleNode = <span>{title[0]}</span>;
    } else {
      titleNode = <span>{title}</span>;
    }
  } else {
    const titleIsSpan = isValidElement(title) && title.type === 'span';
    titleNode = (
      <>
        {isValidElement(icon) ? (
          <span className={`${prefixCls}-menu-title-icon`}>
            {cloneElement(icon, {
              className: classNames(icon.props?.className),
            })}
          </span>
        ) : (
          ''
        )}
        {!inlineCollapsed && (titleIsSpan ? title : <span>{title}</span>)}
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
      <RcSubMenu
        {...omit(props, ['icon'])}
        title={titleNode}
        popupOffset={
          mode === 'horizontal' && !parentPath.length ? [0, 2] : [12, 0]
        }
        className={classNames(
          { [`${prefixCls}-menu-title`]: context.firstLevel && !disabled },
          className,
        )}
      />
    </MenuContext.Provider>
  );
}

export default SubMenu;
