import React from 'react';
import classNames from 'classnames';
import { prefixCls } from '@utils';
import 'rc-dropdown/assets/index.css';

function DropdownItem(props) {
  const {
    children,
    icon,
    disabled,
    onClick,
    className,
    type,
    id,
    ...restProps
  } = props;

  const handleClickItem = () => {
    if (disabled) {
      return;
    }
    onClick(props.id);
  };

  const renderDivider = () => <div className="divider" />;

  const renderItem = () => (
    <div
      className={classNames({
        [`${prefixCls}-dropdowns-menu-item`]: true,
        [className]: className || '',
        disabled: !!disabled,
      })}
      onClick={() => handleClickItem(id)}
      {...restProps}
    >
      {icon && icon}
      {children}
    </div>
  );

  return type && type === 'divider' ? renderDivider() : renderItem();
}

export default DropdownItem;
