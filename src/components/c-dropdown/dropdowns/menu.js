import React, { cloneElement, Children } from 'react';
import classNames from 'classnames';
import { prefixCls } from '@utils';
import 'rc-dropdown/assets/index.css';

function DropdownMenu(props) {
  const { children, className, restProps } = props;

  return (
    <div
      className={classNames(`${prefixCls}-dropdowns-menu`, className)}
      {...restProps}
    >
      {Children.map(children, (child) => cloneElement(child, {
        onClick(key) {
          props.onClick(key);
        },
      }))}
    </div>
  );
}

export default DropdownMenu;
