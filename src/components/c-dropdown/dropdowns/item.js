import React from 'react';
import classNames from 'classnames';
import { prefixCls } from '@utils';
import 'rc-dropdown/assets/index.css';
import Icon from '../../icon';

function DropdownItem(props) {
  const {
    children,
    icon,
    disabled,
    onClick,
    className,
    type,
    id,
    checkedId,
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
        'menu-item-checked': checkedId && props.id === checkedId,
      })}
      onClick={() => handleClickItem(id)}
      {...restProps}
    >
      {icon && icon}
      {children}
      {checkedId && props.id === checkedId && (
        <Icon
          type="finish"
          className="menu-item-checked-icon"
        />
      )}
    </div>
  );

  return type && type === 'divider' ? renderDivider() : renderItem();
}

export default DropdownItem;
