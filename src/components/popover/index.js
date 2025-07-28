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
    iconType,
    iconStyle,
    isReverseBtn,
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
    onVisibleChange,
    ignoreClassList,
    contentStyle,
    ...otherProps
  } = props;

  const ref = createRef();

  const closeTooltipExec = (evtPath) => evtPath.find(
    (ele) => ele.classList
        && ele.classList.contains
        && (ele.classList.contains(cancelBtnClass)
          || ele.classList.contains(confirmBtnClass)
          || ele.classList.contains(closeIconClass)
          || ignoreClassList?.find(c => ele.classList.contains(c))),
  );

  const handleCancelClick = () => {
    props.onCancelClick();
  };
  const removeClass = (isValid = false) => {
    const ele = ref.current.querySelector(`#${confirmBtnClass}`);
    if (ele) {
      if (isValid) {
        ele.classList.remove(confirmBtnClass);
      } else {
        ele.classList.add(confirmBtnClass);
      }
    }
  };

  const handleConfirmClick = async () => {
    const isInvalidate = props.onConfirmClick();
    if (isInvalidate && isInvalidate.then) {
      isInvalidate
        .then((res) => {
          removeClass(res);
        })
        .catch(() => {
          removeClass(true);
        });
      return;
    }
    removeClass(isInvalidate);
  };

  let popoverContent;
  let tooltipTheme;

  if (type === 'default') {
    popoverContent = (
      <div className={classSelector}>
        <section className={`${classSelector}-content`}>
          {showIcon
            && (iconTpl || (
              <Icon className={`${classSelector}-icon`} style={iconStyle} type={iconType || 'info_1'} />
            ))}

          <div className={`${classSelector}-main-content`}>
            {title && <p className={`${classSelector}-title`}>{title}</p>}
            {content && (
              <p
                style={contentStyle || {}}
                className={`${classSelector}-desc ${
                  title ? `${classSelector}-has-title` : ''
                }`}
              >
                {content}
              </p>
            )}
          </div>
        </section>

        <section className={classnames(`${classSelector}-btn`, { [`${classSelector}-reverse-btn`]: isReverseBtn })} ref={ref}>
          {showCancelBtn && (
            <Button
              onClick={handleCancelClick}
              size="small"
              type="secondary"
              className={cancelBtnClass}
              {...cancelBtnOpts}
            >
              {cancelBtnText}
            </Button>
          )}
          {showConfirmBtn && (
            <Button
              size="small"
              type="primary"
              id={`${confirmBtnClass}`}
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
      onVisibleChange={onVisibleChange}
      className={classnames(className, {
        [`${classSelector}-tooltip`]: true,
        [`${classSelector}-tooltip-${size}`]:
          title || showCancelBtn || showConfirmBtn,
      })}
      overlayStyle={{
        width, maxWidth: width, ...(otherProps.overlayStyle || {}),
      }}
      {...otherProps}
    >
      {children}
    </Tooltip>
  );
}

Popover.propTypes = {
  width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  title: PropTypes.string,
  content: PropTypes.any,
  showIcon: PropTypes.bool,
  iconTpl: PropTypes.any,
  iconType: PropTypes.string,
  iconStyle: PropTypes.object,
  showCancelBtn: PropTypes.bool,
  showConfirmBtn: PropTypes.bool,
  isReverseBtn: PropTypes.bool,
  cancelBtnText: PropTypes.string,
  confirmText: PropTypes.string,
  size: PropTypes.oneOf([ 'mini', 'small', 'default', 'large' ]),
  type: PropTypes.oneOf([ 'default', 'remind' ]),
  onCancelClick: PropTypes.func,
  onConfirmClick: PropTypes.func,
  cancelBtnOpts: PropTypes.object,
  confirmBtnOpts: PropTypes.object,
  onVisibleChange: PropTypes.func,
  ignoreClassList: PropTypes.array,
  contentStyle: PropTypes.object,
};

Popover.defaultProps = {
  width: 'auto',
  title: '',
  content: '',
  showIcon: false,
  iconTpl: '',
  iconType: '',
  iconStyle: {},
  isReverseBtn: false,
  showCancelBtn: false,
  showConfirmBtn: false,
  cancelBtnText: '取消',
  confirmText: '确定',
  size: 'default',
  type: 'default',
  onCancelClick: noop,
  onConfirmClick: noop,
  cancelBtnOpts: {},
  confirmBtnOpts: {},
  onVisibleChange: () => {},
  ignoreClassList: [],
  contentStyle: {},
};

export default Popover;
