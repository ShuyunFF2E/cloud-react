import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import ContextProvider from '@contexts/context-provider';
import { getRootWindow, sandboxSelector } from '@utils';
import Notification from './modal';
import Prompt from './prompt';
import './index.less';

class Modal extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  static defaultProps = {
    children: null,
  };

  static ConfigProvider = ContextProvider;

  render() {
    const { children, ...props } = this.props;
    const rootWindow = getRootWindow();
    const rootDocument = rootWindow.document;

    return ReactDOM.createPortal(
      <ContextProvider.Provider
        value={{
          rootWindow,
          rootDocument,
          getContext: () => rootDocument.querySelector(`.${sandboxSelector}`)
            || rootDocument.body,
        }}
      >
        <Notification type="modal" {...props}>
          {children}
        </Notification>
      </ContextProvider.Provider>,
      rootDocument.body,
    );
  }
}

const randomId = (len) => {
  const genUnit = () => Math.random().toString(36).substr(2);

  return genUnit().substr(0, len);
};

Modal.createModal = (ModalEntity) => {
  let container = null;

  const close = () => {
    if (container) {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
      });
    }
  };

  const open = (params) => {
    const containerId = randomId(10);
    container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
    }
    /* eslint-disable */
    const { onClose, onOk, onCancel, ...options } = params || {};
    /* eslint-disable */
    return new Promise((resolve) => {
      function handleClose() {
        close();
      }
      function handleCancel() {
        close();
      }
      function handleOk(result) {
        close();
        resolve(result);
      }

      ReactDOM.render(
        <ModalEntity
          visible
          onCancel={handleCancel}
          onClose={handleClose}
          onOk={handleOk}
          {...options}
        />,
        container,
      );
    });
  };
  // eslint-disable-next-line react/jsx-no-bind
  return { open, close };
};

// confirm方法
Modal.confirm = (props) => {
  const config = {
    ...props,
    type: 'confirm',
    icon: props.icon || 'info_1',
    iconStyle: {
      color: props.iconStyle?.color || '#fd830a',
    },
  };
  return Prompt(config);
};

// info方法
Modal.info = (props) => {
  const config = {
    ...props,
    type: 'info',
    icon: props.icon || 'info_1',
    iconStyle: {
      color: props.iconStyle?.color || '#5280FF',
    },
  };
  return Prompt(config);
};

// success方法
Modal.success = (props) => {
  const config = {
    ...props,
    type: 'success',
    icon: props.icon || 'success-fill',
    iconStyle: {
      color: props.iconStyle?.color || '#00B33C',
    },
  };
  return Prompt(config);
};

// error方法
Modal.error = (props) => {
  const config = {
    ...props,
    type: 'error',
    icon: props.icon || 'close-fill-1',
    iconStyle: {
      color: props.iconStyle?.color || '#E74949',
    },
  };
  return Prompt(config);
};

// warning方法
Modal.warning = (props) => {
  const config = {
    ...props,
    type: 'warning',
    icon: props.icon || 'info_2',
    iconStyle: {
      color: props.iconStyle?.color || '#FD830A',
    },
  };
  return Prompt(config);
};

export default Modal;
