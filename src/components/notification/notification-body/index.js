import React, { useEffect } from 'react';
import { Icon, Button } from 'cloud-react';
import { prefixCls } from '../../../utils';
import { DEFAULT_BODY_PROPS, NOTIFICATION_BODY_PROPS } from '../constant';
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
  duration,
  showIcon,
  IconType,
  icon,
  showCancelBtn,
  showConfirmBtn,
  showDetailBtn,
  cancelBtnText,
  confirmBtnText,
  detailBtnText,
  close,
  dataSetId,
  onConfirm = () => {},
  onClose = () => {},
  onDetailClick = () => {},
}) {
  let timer = null;
  useEffect(() => {
    if (dataSetId && duration) {
      timer = setTimeout(() => {
        close(dataSetId);
        clearTimeout(timer);
      }, duration);
    }
  }, [dataSetId, duration]);

  return (
    <section className={notificationPrefix}>
      {icon || (
        showIcon && <Icon className={`info-icon ${IconType}`} type={ICON_TYPE_MAP[IconType]} />
      )}
      <div className={`${notificationPrefix}-content`}>
        <header>
          <p>{title}</p>
          <Icon className="close-icon" type="close" onClick={() => close(dataSetId)} />
        </header>
        <main>{content}</main>
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
              type="normal"
              onClick={() => {
                close(dataSetId);
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
      </div>
    </section>
  );
}

NotificationBody.propTypes = NOTIFICATION_BODY_PROPS;
NotificationBody.defaultProps = DEFAULT_BODY_PROPS;
