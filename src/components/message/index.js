/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { prefixCls, getRootWindow, noop } from '@utils';
import Icon from '../icon';

import './index.less';

const DEFAULT_OPTS = {
  duration: 3000,
  contextContainer: document.body,
  showIcon: true,
  showClose: false,
  isDeepen: false,
  onClose: noop,
};

const MESSAGE_TYPE = {
  success: {
    icon: 'success-fill',
  },
  error: {
    icon: 'close-fill',
  },
  info: {
    icon: 'info_1',
  },
  warn: {
    icon: 'info_2',
  },
};

const wraperMap = new Map();
let wraper;

function removeWraper(contextContainer) {
  if (!wraperMap.get(contextContainer).children.length) {
    ReactDOM.unmountComponentAtNode(wraper);
    contextContainer.removeChild(wraper);
    wraper = null;
  }
}

function entity(config) {
  const { type, msg, options } = config;

  const rootDocument = getRootWindow().document;
  const opts = Object.assign(
    {},
    DEFAULT_OPTS,
    {
      contextContainer: rootDocument.body,
    },
    options,
  );

  const {
    duration, contextContainer, isDeepen, showClose, showIcon, onClose,
  } = opts;

  const props = {
    type,
    msg,
    duration,
    contextContainer,
    isDeepen,
    showClose,
    showIcon,
    onClose,
  };

  wraper = wraperMap.get(contextContainer);

  if (!wraper) {
    wraper = rootDocument.createElement('div');
    wraperMap.set(contextContainer, wraper);
  }

  let wraperClassName = `${prefixCls}-message`;

  if (contextContainer.tagName !== 'BODY') {
    const { top } = contextContainer.getBoundingClientRect();
    wraper.style.top = `${top}px`;
  }

  // 验证是否指定了className
  if (opts.className) {
    wraperClassName = `${wraperClassName} ${opts.className}`;
  }
  wraper.className = wraperClassName;

  const container = rootDocument.createElement('div');
  container.style.marginTop = '24px';

  wraper.appendChild(container);

  contextContainer.appendChild(wraper);

  ReactDOM.render(
    <MessageEntity
      {...props}
      container={container}
      contextContainer={contextContainer}
    />,
    container,
  );
}

class MessageEntity extends Component {
  constructor(props) {
    super(props);
    this.noticeRef = React.createRef();
    this.closed = false;
  }

  componentDidMount() {
    this.startTimer();
    this.loadTimer = setTimeout(() => {
      this.noticeRef.current.classList.add('fade-in');
    }, 100);
  }

  componentWillUnmount() {
    this.onHandleClose();
    clearTimeout(this.loadTimer);
    clearTimeout(this.closeTimer);
  }

  /**
   * 关闭提示信息
   */
  onHandleClose = () => {
    if (this.closed) {
      return;
    }
    this.closed = true;

    clearTimeout(this.closeTimer);

    const { container, contextContainer } = this.props;
    const { current: currentNotice } = this.noticeRef;
    wraper = wraperMap.get(contextContainer);

    currentNotice.classList.add('fade-out');
    ReactDOM.unmountComponentAtNode(container);
    wraper.removeChild(container);
    removeWraper(contextContainer);

    this.props.onClose();
  };

  /**
   * 自动关闭提示信息
   */
  startTimer() {
    const { duration } = this.props;
    if (duration > 0) {
      this.closeTimer = setTimeout(() => {
        this.onHandleClose();
      }, duration);
    }
  }

  render() {
    const {
      type, msg, showClose, showIcon, isDeepen,
    } = this.props;
    const cls = classNames(
      `${prefixCls}-message-${type}`,
      `${prefixCls}-message-content`,
      { [`${prefixCls}-message-deepen`]: isDeepen },
    );
    return (
      <div className={cls} ref={this.noticeRef}>
        {showIcon && (
          <Icon type={`${MESSAGE_TYPE[type].icon}`} className="tag-icon" />
        )}
        <div className="msg-text">{msg}</div>
        {showClose ? (
          <Icon
            type="close"
            onClick={this.onHandleClose}
            className="close-icon"
          />
        ) : null}
      </div>
    );
  }
}

MessageEntity.propTypes = {
  msg: PropTypes.node.isRequired,
  duration: PropTypes.number.isRequired,
  showIcon: PropTypes.bool,
  showClose: PropTypes.bool,
  isDeepen: PropTypes.bool,
  className: PropTypes.string,
  onClose: PropTypes.func,
};

const Message = {
  error(msg, options) {
    entity({
      type: 'error',
      msg,
      options,
    });
  },
  success(msg, options) {
    entity({
      type: 'success',
      msg,
      options,
    });
  },
  info(msg, options) {
    entity({
      type: 'info',
      msg,
      options,
    });
  },
  warning(msg, options) {
    entity({
      type: 'warn',
      msg,
      options,
    });
  },
};

export default Message;
