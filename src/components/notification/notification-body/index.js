import React, { useEffect } from 'react';
import Icon from '../../icon';
import Button from '../../button';
import { prefixCls } from '../../../utils';
import './index.less';

const notificationPrefix = `${prefixCls}-notification`;

const ICON_TYPE_MAP = {
  info: 'info_1',
  success: 'success-fill',
  warn: 'info_2',
  fail: 'close-fill-1',
};

export default function NotificationBody({
  title,
  content,
  img,
  duration,
  showIcon,
  iconType,
  icon,
  showCancelBtn,
  showConfirmBtn,
  showDetailBtn,
  cancelBtnText,
  confirmBtnText,
  detailBtnText,
  close,
  dataSetId,
  placement,
  borderRadiusSize,
  showCloseIcon,
  onConfirm = () => {},
  onClose = () => {},
  onDetailClick = () => {},
  style = {},
  titleStyle = {},
  contentStyle = {},
  className,
  isLightTheme,
}) {
  let timer = null;
  useEffect(() => {
    if (dataSetId && duration) {
      timer = setTimeout(() => {
        close(dataSetId, placement);
        clearTimeout(timer);
      }, duration);
    }
  }, [dataSetId, duration]);

  return (
    <section
      className={`${notificationPrefix} ${borderRadiusSize} ${className} ${
        isLightTheme && 'light-theme'
      }`}
      style={style}
    >
      {icon
        || (showIcon && (
          <Icon
            className={`info-icon ${iconType}`}
            type={ICON_TYPE_MAP[iconType]}
          />
        ))}
      <div className={`${notificationPrefix}-content`}>
        <header>
          <p style={titleStyle}>{title}</p>
          {showCloseIcon && (
            <Icon
              className="close-icon"
              type="close"
              onClick={() => close(dataSetId, placement)}
            />
          )}
        </header>
        <main style={contentStyle}>{content}</main>
        {!!img && <div className={`${notificationPrefix}-img-area`}>{img}</div>}
        {(showDetailBtn || showConfirmBtn || showCancelBtn) && (
          <footer>
            {showDetailBtn && (
              <Button
                type="primary"
                onClick={() => {
                  onDetailClick(dataSetId);
                }}
              >
                {detailBtnText || '查看详情'}
              </Button>
            )}
            {showConfirmBtn && (
              <Button
                type="primary"
                onClick={() => {
                  onConfirm(dataSetId);
                }}
              >
                {confirmBtnText || '确定'}
              </Button>
            )}
            {showCancelBtn && (
              <Button
                type="secondary"
                onClick={() => {
                  close(dataSetId, placement);
                  onClose();
                  if (timer) {
                    clearTimeout(timer);
                  }
                }}
              >
                {cancelBtnText || '取消'}
              </Button>
            )}
          </footer>
        )}
      </div>
    </section>
  );
}
