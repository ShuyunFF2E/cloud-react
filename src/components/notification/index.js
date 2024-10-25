import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import NotificationBody from './notification-body';
import './index.less';
import { getRootWindow, prefixCls } from '../../utils';

const CONTAINER_CLS = `${prefixCls}-notification-container`;
const WRAPPER_CLS = `${prefixCls}-notification-wrapper`;

const PLACEMENT_LIST = [ 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top', 'bottom' ];

const DEFAULT_BODY_PROPS = {
  placement: 'top-right',
  container: null,
  duration: 4500,
  showCloseIcon: false,
  btn: null,
  className: '',
  borderRadiusSize: 'default',
  showIcon: false,
  iconType: 'info',
  icon: null,
  showCancelBtn: false,
  showConfirmBtn: false,
  showDetailBtn: false,
  onConfirm: () => {},
  style: {},
  isLightTheme: false,
};

/**
 * 更新各条信息提示的样式
 */
function updateNotifyStyle(placement, excludeId = null) {
  const rootDocument = getRootWindow().document;
  const wrapperContainer = rootDocument.querySelector(`.${CONTAINER_CLS}.${placement}`);
  const wrapperNodes = Array.from(wrapperContainer.childNodes);

  if (placement.includes('top')) {
    wrapperNodes
      .filter(node => node.dataset.id !== excludeId)
      .forEach((node, index) => {
        const yHeight = wrapperNodes.slice(0, index).reduce((sum, n) => {
          sum += n.clientHeight;
          return sum;
        }, 0) + 20 * index;
        node.style.transform = `translate3d(0px, ${yHeight}px, 0px) scaleX(1)`;
      });
  } else {
    wrapperNodes
      .filter(node => node.dataset.id !== excludeId)
      .reverse()
      .forEach((node, index) => {
        const yHeight = wrapperNodes.slice(0, index).reduce((sum, n) => {
          sum += n.clientHeight;
          return sum;
        }, 0) + 20 * index;
        node.style.transform = `translate3d(0px, -${yHeight}px, 0px) scaleX(1)`;
      });
  }
}

/**
 * 关闭信息提示
 * @param dataSetId
 * @param placement
 */
function closeNotification(dataSetId, placement) {
  const rootDocument = getRootWindow().document;
  const wrapperContainer = rootDocument.querySelector(`.${CONTAINER_CLS}.${placement}`);
  const wrapperNodes = Array.from(wrapperContainer.childNodes);
  const wrapper = wrapperNodes.find(node => node.dataset.id === dataSetId);
  if (wrapper) {
    wrapper.classList.add('fade-out');

    updateNotifyStyle(placement, dataSetId);

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
  const _props = { ...DEFAULT_BODY_PROPS, ...props };
  const rootDocument = getRootWindow().document;
  const rootContainer = _props.container || rootDocument.body;

  // wrapperContainer：所有提示信息外层的 div
  let wrapperContainer = rootDocument.querySelector(`.${CONTAINER_CLS}.${_props.placement}`);
  if (!wrapperContainer) {
    wrapperContainer = rootDocument.createElement('div');
    wrapperContainer.classList.add(CONTAINER_CLS);
    wrapperContainer.classList.add(_props.placement);
    rootContainer.appendChild(wrapperContainer);
  }

  // wrapper：每个提示信息外层的 div
  const wrapper = rootDocument.createElement('div');
  wrapper.classList.add(WRAPPER_CLS);
  wrapper.dataset.id = `${new Date().getTime()}`;
  if (_props.placement.includes('top')) {
    // 将新的消息放在最上方
    wrapperContainer.insertBefore(wrapper, wrapperContainer.firstChild);
  } else {
    wrapperContainer.appendChild(wrapper);
  }

  setTimeout(() => {
    wrapper.classList.add('fade-in');
    updateNotifyStyle(_props.placement);
  });

  ReactDOM.render(
    <NotificationBody {..._props} dataSetId={wrapper.dataset.id} close={closeNotification} />,
    wrapper,
  );
  return new Promise(resolve => {
    resolve(wrapper.dataset.id);
  });
}

const Notification = {
  open: openNotification,
  close: (dataSetId, placement) => closeNotification(dataSetId, placement),
};

export default Notification;

Notification.propTypes = {
  title: PropTypes.any.isRequired,
  content: PropTypes.any.isRequired,
  duration: PropTypes.number,
  showCloseIcon: PropTypes.bool,
  btn: PropTypes.any,
  className: PropTypes.string,
  borderRadiusSize: PropTypes.oneOf([ 'small', 'default', 'large' ]),
  showIcon: PropTypes.bool,
  iconType: PropTypes.oneOf(['info', 'success', 'warn', 'fail']),
  icon: PropTypes.any,
  showCancelBtn: PropTypes.bool,
  showConfirmBtn: PropTypes.bool,
  showDetailBtn: PropTypes.bool,
  onConfirm: PropTypes.func,
  placement: PropTypes.oneOf(PLACEMENT_LIST),
  container: PropTypes.any,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  isLightTheme: PropTypes.bool,
};
Notification.defaultProps = DEFAULT_BODY_PROPS;
