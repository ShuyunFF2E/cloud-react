import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { prefixCls } from '../../utils';
import './index.less';
import Icon from '../icon';
import { getCoordinate, isInsideRect } from './util';

const drawerPrefix = `${prefixCls}-drawer`;

function Drawer(
  {
    children,
    title,
    placement = 'right',
    size = '30%',
    style,
    className,
    showHeader = true,
    wrapperClosable = false,
    showMask = false,
    onCloseAfter = () => {},
  },
  ref,
) {
  const sizeStyle = {
    width: [ 'top', 'bottom' ].includes(placement) ? '100%' : size,
    height: [ 'left', 'right' ].includes(placement) ? '100%' : size,
  };

  const [ visible, setVisible ] = useState(false);
  const drawerRef = useRef();

  const onClose = () => {
    setVisible(false);
    onCloseAfter();
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
    },
    close: () => {
      onClose();
    },
  }));

  const toggleShowDrawer = (evt) => {
    if (evt.target.id === `${drawerPrefix}-close`) {
      evt.preventDefault();
      return;
    }
    if (visible) {
      const drawerCoordinate = getCoordinate(`.${drawerPrefix}`, drawerRef);
      const _visible = isInsideRect(evt, drawerCoordinate);
      setVisible(_visible);

      if (!_visible) {
        onCloseAfter();
      }
    }
  };

  useEffect(() => {
    if (wrapperClosable && !showMask) {
      window.addEventListener('click', toggleShowDrawer);
    }

    return () => {
      if (wrapperClosable && !showMask) {
        window.removeEventListener('click', toggleShowDrawer);
      }
    };
  });

  const onClickMask = () => {
    if (wrapperClosable) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <section>
      <div
        ref={drawerRef}
        className={`${drawerPrefix} ${placement} ${visible ? 'show' : ''}`}
        style={{ ...sizeStyle, [placement]: visible ? 0 : `-${size}` }}
      >
        {/* 标题区域*/}
        {showHeader && (
          <header className={`${drawerPrefix}-header`}>
            <p
              className={`${drawerPrefix}-title`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <Icon id={`${drawerPrefix}-close`} type="close" onClick={onClose} />
          </header>
        )}

        {/* 内容区域*/}
        {visible && (
          <div
            className={`${drawerPrefix}-content ${className}`}
            style={{ ...style }}
          >
            <div className={`${drawerPrefix}-container`}>{children}</div>
          </div>
        )}
      </div>

      {/* 遮罩层*/}
      {showMask && visible && (
        <div className={`${drawerPrefix}-mask`} onClick={onClickMask} />
      )}
    </section>,
    document.body,
  );
}

export default forwardRef(Drawer);

Drawer.propTypes = {
  title: PropTypes.string.isRequired,
  placement: PropTypes.oneOf([ 'top', 'right', 'bottom', 'left' ]),
  size: PropTypes.string,
  showHeader: PropTypes.bool,
  showMask: PropTypes.bool,
  wrapperClosable: PropTypes.bool,
  onCloseAfter: PropTypes.func,
};
Drawer.defaultProps = {
  placement: 'right',
  size: '30%',
  showHeader: true,
  showMask: false,
  wrapperClosable: false,
  onCloseAfter: () => {},
};
