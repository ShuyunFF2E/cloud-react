import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { prefixCls } from '../../utils';
import './index.less';
import Icon from '../icon';
import Tooltip from '../tooltip';
import { getCoordinate, isInsideRect } from './util';
import fullScreenImg from '../../assets/images/fullScreen.svg';
import foldScreenImg from '../../assets/images/foldScreen.svg';

const drawerPrefix = `${prefixCls}-drawer1`;

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
    excludeClassList = [],
    supportFullScreen = false,
  },
  ref,
) {
  const defaultSizeStyle = {
    width: [ 'top', 'bottom' ].includes(placement) ? '100%' : size,
    height: [ 'left', 'right' ].includes(placement) ? '100%' : size,
  };
  const [sizeStyle, setSizeStyle] = useState(defaultSizeStyle);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [ visible, setVisible ] = useState(false);
  const [ visibleTrans, setVisibleTrans ] = useState(false);
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
    const { clientX, clientY } = evt;

    if (visible) {
      setVisibleTrans(true);
      setTimeout(() => {
        document.elementFromPoint(clientX, clientY).click();
        const targetClassList = Array.from(
          document.elementFromPoint(clientX, clientY).classList,
        );
        if (excludeClassList?.length && targetClassList.length) {
          // 点击包含 excludeClassList 中存在类名的元素，不关闭抽屉
          if (
            targetClassList.find((item) => excludeClassList.find((item1) => item1 === item))
          ) {
            setVisibleTrans(false);
            return;
          }
        }
        setVisibleTrans(false);
        const drawerCoordinate = getCoordinate(`.${drawerPrefix}`, drawerRef);
        const _visible = isInsideRect(
          {
            x: clientX,
            y: clientY,
          },
          drawerCoordinate,
        );
        setVisible(_visible);

        if (!_visible) {
          onCloseAfter();
        }
      }, 0);
    }
  };

  const onClickMask = () => {
    if (wrapperClosable) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <section>
      {/* 遮罩层*/}
      {showMask && visible && (
        <div className={`${drawerPrefix}-mask`} onClick={onClickMask} />
      )}

      <div
        ref={drawerRef}
        className={`${drawerPrefix} ${placement} ${visible ? 'show' : ''}`}
        style={{ ...sizeStyle, [placement]: visible ? 0 : `-${(supportFullScreen && isFullScreen ? '100%' : size)}` }}
      >
        {/* 标题区域*/}
        {showHeader && (
          <header className={`${drawerPrefix}-header`}>
            <p
              className={`${drawerPrefix}-title`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div className={`${drawerPrefix}-header-btn`}>
              {supportFullScreen && (
                <>
                  {isFullScreen ? (
                    <Tooltip content="收起" theme="light" overlayStyle={{ minWidth: 40 }}>
                      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                      <img
                        src={foldScreenImg}
                        alt="收起"
                        onClick={() => {
                          setSizeStyle(defaultSizeStyle);
                          setIsFullScreen(false);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip content="全屏" theme="light" overlayStyle={{ minWidth: 40 }}>
                      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                      <img
                        src={fullScreenImg}
                        alt="全屏"
                        onClick={() => {
                          setSizeStyle({
                            width: '100%',
                            height: '100%',
                            transition: 'top 500ms, right 500ms, bottom 500ms, left 500ms',
                          });
                          setIsFullScreen(true);
                        }}
                      />
                    </Tooltip>
                  )}
                </>
              )}
              <Icon
                id={`${drawerPrefix}-close`}
                className={`${drawerPrefix}-close-icon`}
                type="close"
                onClick={(evt) => {
                  evt.stopPropagation();
                  onClose();
                }}
              />
            </div>
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

      {wrapperClosable && !showMask && visible && !visibleTrans && (
        <div
          className={`${drawerPrefix}-transparent`}
          onClick={toggleShowDrawer}
        />
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
  excludeClassList: PropTypes.array,
};
Drawer.defaultProps = {
  placement: 'right',
  size: '30%',
  showHeader: true,
  showMask: false,
  wrapperClosable: false,
  onCloseAfter: () => {},
  excludeClassList: [],
};
