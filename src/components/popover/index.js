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
    ...otherProps
  } = props;

  const ref = createRef();

  const closeTooltipExec = (evtPath) => {
    return evtPath.find((ele) => {
      return (
        ele.classList &&
        ele.classList.contains &&
        (ele.classList.contains(cancelBtnClass) ||
          ele.classList.contains(confirmBtnClass))
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

  const popoverContent = (
    <div className={classSelector}>
      <section className={`${classSelector}-content`}>
        {showIcon &&
          (iconTpl || <Icon className="popover-warn-icon" type="info_1" />)}

        <div className={`${classSelector}-main-content`}>
          {title && <p className={`${classSelector}-title`}>{title}</p>}
          {content && <p className={`${classSelector}-desc`}>{content}</p>}
        </div>
      </section>

      <section className={`${classSelector}-btn`} ref={ref}>
        {showCancelBtn && (
          <Button onClick={handleCancelClick} className={cancelBtnClass}>
            {cancelBtnText}
          </Button>
        )}
        {showConfirmBtn && (
          <Button
            type="primary"
            onClick={handleConfirmClick}
            className={confirmBtnClass}
          >
            {confirmText}
          </Button>
        )}
      </section>
    </div>
  );

  return (
    <Tooltip
      closeTooltipExec={closeTooltipExec}
      content={popoverContent}
      theme="light"
      className={classnames(className, `${classSelector}-tooltip-${size}`)}
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
  onCancelClick: PropTypes.func,
  onConfirmClick: PropTypes.func,
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
  onCancelClick: noop,
  onConfirmClick: noop,
};

export default Popover;
