import React, { cloneElement, useState, useEffect } from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import 'rc-dropdown/assets/index.css';
import { prefixCls, getPlacements } from '@utils';
// eslint-disable-next-line
import DropdownButton from './dropdown-button';
import DropdownMenu from './menu';
import DropdownItem from './item';

function Dropdown(props) {
  const {
    children,
    disabled,
    className,
    open,
    onOpenChange,
    trigger,
    arrow,
    getPopupContainer,
    overlayClassName,
  } = props;
  const [ mergedOpen, setMergedOpen ] = useState(open || false);

  useEffect(() => {
    setMergedOpen(open);
  }, [ open ]);

  const triggerActions = disabled ? [] : trigger;
  let alignPoint;
  if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
    alignPoint = true;
  }

  const onInnerVisibleChange = (visible) => {
    if (disabled) {
      return;
    }
    setMergedOpen(visible);
    onOpenChange?.(visible);
  };

  const onMenuClick = React.useCallback(() => {
    setMergedOpen(false);
  }, []);

  const renderOverlay = () => {
    const { overlay } = props;
    let overlayNode;
    const classNameOverlay = classNames(`${prefixCls}-dropdowns-menu-area`);
    if (typeof overlay === 'function') {
      overlayNode = overlay();
    } else {
      overlayNode = overlay;
    }
    return (
      <div className={classNameOverlay} onClick={onMenuClick}>
        {overlayNode}
      </div>
    );
  };

  const dropdownTrigger = cloneElement(children, {
    className: classNames(`${prefixCls}-dropdowns`, className),
    disabled,
  });

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: typeof arrow === 'object' && arrow.pointAtCenter,
    autoAdjustOverflow: true,
  });

  const getPlacement = () => {
    const { placement } = props;
    if (
      ![
        'bottom',
        'bottomLeft',
        'bottomRight',
        'top',
        'topLeft',
        'topRight',
      ].includes(placement)
    ) {
      return 'bottomLeft';
    }
    return placement;
  };

  return (
    <RcDropdown
      {...props}
      prefixCls={`${prefixCls}-dropdowns`}
      alignPoint={alignPoint}
      trigger={triggerActions}
      overlay={renderOverlay}
      visible={mergedOpen}
      onVisibleChange={onInnerVisibleChange}
      builtinPlacements={builtinPlacements}
      arrow={!!arrow}
      placement={getPlacement()}
      getPopupContainer={getPopupContainer}
      overlayClassName={overlayClassName}
    >
      {dropdownTrigger}
    </RcDropdown>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export default Dropdown;
