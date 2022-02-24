import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop, prefixCls } from '@utils';
import Tooltip from '../tooltip';
import Icon from '../icon';
import Button from '../button';

import './index.less';

const classSelector = `${prefixCls}-popover`;
const confirmBtnClass = `${classSelector}-confirm`;
const cancelBtnClass = `${classSelector}-cancel`;
const closeIconClass = `${classSelector}-remind-close`;

function Popover(props) {
  const {
    title,
    content,
    showIcon,
    iconTpl,
    showCancelBtn,
    showConfirmBtn,
    cancelBtnText,
    confirmText,
    width,
    children,
    size,
    className,
    type,
    cancelBtnOpts,
    confirmBtnOpts,
    ...otherProps
  } = props;

  const ref = createRef();

  const closeTooltipExec = (evtPath) => {
    return evtPath.find((ele) => {
      return (
        ele.classList &&
        ele.classList.contains &&
        (ele.classList.contains(cancelBtnClass) ||
          ele.classList.contains(confirmBtnClass) ||
          ele.classList.contains(closeIconClass))
      );
    });
  };

  const handleCancelClick = () => {
    props.onCancelClick();
  };

  const handleConfirmClick = async () => {
    const removeClass = () => {
      const ele = ref.current.querySelector(`.${classSelector}-confirm`);
      if (ele) {
        ele.classList.remove(confirmBtnClass);
      }
    };

    try {
      const isInvalidate = await props.onConfirmClick();
      if (isInvalidate) {
        removeClass();
      }
    } catch {
      removeClass();
    }
  };

  let popoverContent;
  let tooltipTheme;

  if (type === 'default') {
    popoverContent = (
      <div className={classSelector}>
        <section className={`${classSelector}-content`}>
          {showIcon && (iconTpl || <Icon type="warning-circle-solid" />)}

          <div className={`${classSelector}-main-content`}>
            {title && <p className={`${classSelector}-title`}>{title}</p>}
            {content && (
              <p
                className={`${classSelector}-desc ${
                  title ? `${classSelector}-has-title` : ''
                }`}
              >
                {content}
              </p>
            )}
          </div>
        </section>

        <section className={`${classSelector}-btn`} ref={ref}>
          {showCancelBtn && (
            <Button onClick={handleCancelClick} className={cancelBtnClass} {...cancelBtnOpts}>
              {cancelBtnText}
            </Button>
          )}
          {showConfirmBtn && (
            <Button
              type="primary"
              onClick={handleConfirmClick}
              className={confirmBtnClass}
              {...confirmBtnOpts}
            >
              {confirmText}
            </Button>
          )}
        </section>
      </div>
    );
    tooltipTheme = 'light';
  }

  if (type === 'remind') {
    popoverContent = (
      <div className={`${classSelector}-remind`}>
        {content}
        <Icon className={closeIconClass} type="close" />
      </div>
    );
    tooltipTheme = 'remind';
  }

  return (
    <Tooltip
      closeTooltipExec={closeTooltipExec}
      content={popoverContent}
      theme={tooltipTheme}
      className={classnames(className, {
        [`${classSelector}-tooltip-${size}`]:
        title || showCancelBtn || showConfirmBtn,
      })}
      overlayStyle={{ width, maxWidth: width }}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
}

Popover.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  content: PropTypes.any,
  showIcon: PropTypes.bool,
  iconTpl: PropTypes.any,
  showCancelBtn: PropTypes.bool,
  showConfirmBtn: PropTypes.bool,
  cancelBtnText: PropTypes.string,
  confirmText: PropTypes.string,
  size: PropTypes.oneOf(['mini', 'small', 'default', 'large']),
  type: PropTypes.oneOf(['default', 'remind']),
  onCancelClick: PropTypes.func,
  onConfirmClick: PropTypes.func,
  cancelBtnOpts: PropTypes.object,
  confirmBtnOpts: PropTypes.object
};

Popover.defaultProps = {
  width: 'auto',
  title: '',
  content: '',
  showIcon: false,
  iconTpl: '',
  showCancelBtn: false,
  showConfirmBtn: false,
  cancelBtnText: '取消',
  confirmText: '确认',
  size: 'default',
  type: 'default',
  onCancelClick: noop,
  onConfirmClick: noop,
  cancelBtnOpts: {},
  confirmBtnOpts: {}
};

export default Popover;
