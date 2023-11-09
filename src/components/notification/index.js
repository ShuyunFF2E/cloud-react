import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import NotificationBody from './notification-body';
import './index.less';
import { DEFAULT_BODY_PROPS, NOTIFICATION_BODY_PROPS } from './constant';
import { getRootWindow, prefixCls } from '../../utils';

const CONTAINER_CLS = `${prefixCls}-notification-container`;
const WRAPPER_CLS = `${prefixCls}-notification-wrapper`;

const PLACEMENT_LIST = [ 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top', 'bottom' ];

/**
 * 更新各条信息提示的样式
 */
function updateNotifyStyle(excludeId = null) {
  const rootDocument = getRootWindow().document;
  const wrapperContainer = rootDocument.querySelector(`.${CONTAINER_CLS}`);
  const wrapperNodes = Array.from(wrapperContainer.childNodes);

  wrapperNodes
    .filter(node => node.dataset.id !== excludeId)
    .forEach((node, index) => {
      const yHeight = wrapperNodes.slice(0, index).reduce((sum, n) => {
        sum += n.clientHeight;
        return sum;
      }, 0) + 20 * index;
      node.style.transform = `translate3d(0px, ${yHeight}px, 0px) scaleX(1)`;
    });
}

/**
 * 关闭信息提示
 * @param dataSetId
 */
function closeNotification(dataSetId) {
  const rootDocument = getRootWindow().document;
  const wrapperContainer = rootDocument.querySelector(`.${CONTAINER_CLS}`);
  const wrapperNodes = Array.from(wrapperContainer.childNodes);
  const wrapper = wrapperNodes.find(node => node.dataset.id === dataSetId);
  if (wrapper) {
    wrapper.classList.add('fade-out');

    updateNotifyStyle(dataSetId);

    setTimeout(() => {
      wrapperContainer.removeChild(wrapper);
    }, 200);
  }
}

/**
 * 打开信息提示
 * @param props
 */
function openNotification(props) {
  const rootDocument = getRootWindow().document;
  const rootContainer = props.container || rootDocument.body;

  // wrapperContainer：所有提示信息外层的 div
  let wrapperContainer = rootDocument.querySelector(`.${CONTAINER_CLS}`);
  if (!wrapperContainer) {
    wrapperContainer = rootDocument.createElement('div');
    wrapperContainer.className = CONTAINER_CLS;
    rootContainer.appendChild(wrapperContainer);
  }

  // wrapper：每个提示信息外层的 div
  const wrapper = rootDocument.createElement('div');
  wrapper.classList.add(WRAPPER_CLS);
  wrapper.dataset.id = `${new Date().getTime()}`;
  wrapperContainer.insertBefore(wrapper, wrapperContainer.firstChild); // 将新的消息放在最上方
  setTimeout(() => {
    wrapper.classList.add('fade-in');
    updateNotifyStyle();
  })

  ReactDOM.render(
    <NotificationBody {...props} dataSetId={wrapper.dataset.id} close={closeNotification} />,
    wrapper,
  );
  return new Promise(resolve => {
    resolve(wrapper.dataset.id);
  });
}

const Notification = {
  open: openNotification,
  close: dataSetId => closeNotification(dataSetId)
};

export default Notification;

Notification.propTypes = {
  ...NOTIFICATION_BODY_PROPS,
  placement: PropTypes.oneOf(PLACEMENT_LIST),
  container: PropTypes.any,
};
Notification.defaultProps = {
  ...DEFAULT_BODY_PROPS,
  placement: 'top-left',
  container: null,
};
