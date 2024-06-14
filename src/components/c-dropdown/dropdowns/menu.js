import React, { cloneElement, Children } from 'react';
import classNames from 'classnames';
import { prefixCls } from '@utils';
import 'rc-dropdown/assets/index.css';

function DropdownMenu(props) {
  const { children, className, checkedId, style, restProps } = props;

  return (
    <div
      className={classNames(`${prefixCls}-dropdowns-menu`, className)}
      style={style || {}}
      {...restProps}
    >
      {Children.map(children, (child) => cloneElement(child, {
        checkedId,
        onClick(key) {
          if (typeof props.onClick === 'function') {
            props.onClick(key);
          }
        },
      }))}
    </div>
  );
}

export default DropdownMenu;
