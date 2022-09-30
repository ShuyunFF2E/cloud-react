import React from 'react';
import 'rc-dropdown/assets/index.css';
import classNames from 'classnames';
import { prefixCls } from '@utils';
// eslint-disable-next-line
import Dropdown from './index';
import Button from '../../button';
import Icon from '../../icon';

const ButtonGroup = Button.Group;

function DropdownButton(props) {
  const {
    // 按钮样式
    children,
    type = 'normal',
    danger = '',
    disabled,
    icon = <Icon type="down" />,
    size = 'default',
    onClick = () => {},
    buttonsRender = undefined,
    className,
    // 下拉菜单
    overlay,
    trigger,
    placement,
    onOpenChange,
    onVisibleChange,
    getPopupContainer,
  } = props;

  const dropdownProps = {
    overlay,
    disabled,
    trigger: disabled ? [] : trigger,
    onOpenChange: onOpenChange || onVisibleChange,
    getPopupContainer,
    placement,
  };
  const getDanger = danger ? 'danger' : '';
  const leftButton = (
    <Button
      type={type}
      colorType={getDanger}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  const rightButton = (
    <Button
      type={type}
      colorType={getDanger}
      size={size}
      style={{ marginRight: 0 }}
    >
      {icon}
    </Button>
  );

  let [ leftButtonToRender, rightButtonToRender ] = [ leftButton, rightButton ];

  if (buttonsRender && typeof buttonsRender === 'function') {
    [ leftButtonToRender, rightButtonToRender ] = buttonsRender(
      leftButton,
      rightButton,
    );
  }

  return (
    <div className={classNames(`${prefixCls}-dropdowns-menu-btn`, className)}>
      <ButtonGroup>
        {leftButtonToRender}
        <Dropdown {...dropdownProps}>{rightButtonToRender}</Dropdown>
      </ButtonGroup>
    </div>
  );
}

export default DropdownButton;
