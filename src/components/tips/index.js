import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils';
import cls from 'classnames';
import Icon from '../icon';
import './index.less';

const IconTypes = {
  normal: 'info_1',
  warning: 'close-fill-1',
  major: 'info_2',
  success: 'success-fill',
};

class Tips extends Component {
  wrapperRef = React.createRef();

  msgRef = React.createRef();

  descriptionRef = React.createRef();

  state = {
    visible: true, // 控制提示关闭
    showArrow: false, // 是否显示展开/收起箭头
    isArrowUp: false, // 箭头是否为向上展开状态
  };

  componentDidMount() {
    const { mode, collapsible } = this.props;
    if (mode === 'banner') {
      this.expandBannerSection();
      window.addEventListener('resize', this.onWindowResize);
    }
    if (mode === 'default' && collapsible) {
      this.handleShowArrow();
      window.addEventListener('resize', this.onWindowResize);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    const { mode, collapsible } = this.props;
    const element = this.wrapperRef.current;
    if (!element) return;
    if (mode === 'banner') {
      element.style.height = 'auto';
    }
    if (mode === 'default' && collapsible) {
      this.handleShowArrow();
    }
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
    this.props.onClose();
  };

  // 高度展开效果
  expandBannerSection = () => {
    const element = this.wrapperRef.current;
    window.requestAnimationFrame(() => {
      element.style.height = '0px';
      window.requestAnimationFrame(() => {
        element.style.height = `${element.scrollHeight}px`;
      });
    });
  };

  handleShowArrow = () => {
    const msgHeight = this.msgRef.current?.clientHeight;
    const descriptionHeight = this.descriptionRef.current?.clientHeight;
    this.setState({
      showArrow: false,
    });
    if (this.props.description) {
      this.setState({
        showArrow: descriptionHeight > 80 || msgHeight > 20,
      });
    } else {
      this.setState({
        showArrow: msgHeight > 80,
      });
    }
  };

  onArrowClick = () => {
    const { isArrowUp } = this.state;
    this.setState({
      isArrowUp: !isArrowUp,
    });
  };

  handleContent = (content) => {
    if (Array.isArray(content)) {
      return content.length > 0 && <ul>{content.map(tip => <li key={tip}>{tip}</li>)}</ul>;
    }
    if (typeof content !== 'object') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content;
  };

  renderBannerTips = () => {
    const { msg, closable, closeText, closeIcon } = this.props;
    const isClosable = closeText || closeIcon ? true : closable;
    return (
      <>
        <div className="content">{this.handleContent(msg)}</div>
        {isClosable && (
          <div className="close-icon" onClick={this.onClose}>
            {closeText || <Icon type={closeIcon || 'close'} />}
          </div>
        )}
      </>
    );
  };

  renderInlineTips = () => {
    const { msg, type, icon } = this.props;
    return (
      <>
        <Icon type={icon || IconTypes[type]} className="tip-icon" />
        <div className="content">{this.handleContent(msg)}</div>
      </>
    );
  };

  renderDefaultTips = () => {
    const { msg, description, type, icon, isShowIcon, closable, closeText, closeIcon, action, collapsible } = this.props;
    const { showArrow, isArrowUp } = this.state;
    const isClosable = closeText || closeIcon ? true : closable;
    const showIcon = icon ? true : isShowIcon;
    const isShowOperation = action || isClosable || showArrow;
    return (
      <>
        {showIcon && <Icon type={icon || IconTypes[type]} className="tip-icon" />}

        <div className={cls('content', { collapsible: collapsible && showArrow && !isArrowUp })}>
          <div className={cls('msg', { hasDesc: description })} ref={this.msgRef}>{this.handleContent(msg)}</div>
          {description && <div className="description" ref={this.descriptionRef}>{this.handleContent(description)}</div>}
        </div>

        {isShowOperation && (
          <div className="operation">
            <div className="operation-top">
              {action && <div className="action-icon">{action}</div>}
              {isClosable && (
                <div className="close-icon" onClick={this.onClose}>
                  {closeText || <Icon type={closeIcon || 'close'} />}
                </div>
              )}
            </div>
            {showArrow && <Icon type={isArrowUp ? 'up' : 'down'} onClick={this.onArrowClick} className="action-icon" />}
          </div>
        )}
      </>
    );
  };

  render() {
    const { type, mode, style, className, borderRadiusSize } = this.props;
    const { visible } = this.state;
    return (
      visible && (
        <div
          className={cls(`${prefixCls}-tips`, mode, type, `${borderRadiusSize}-radius`, className)}
          style={style}
          ref={this.wrapperRef}
        >
          <div className={cls(`${prefixCls}-tips-container`, `${mode}-container`)}>
            {mode === 'default' && this.renderDefaultTips()}
            {mode === 'banner' && this.renderBannerTips()}
            {mode === 'inline' && this.renderInlineTips()}
          </div>
        </div>
      )
    );
  }
}

Tips.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.oneOf(['normal', 'warning', 'major', 'success']),
  mode: PropTypes.oneOf(['default', 'banner', 'inline']),
  isShowIcon: PropTypes.bool,
  icon: PropTypes.string,
  msg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]),
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  closable: PropTypes.bool,
  closeText: PropTypes.string,
  closeIcon: PropTypes.string,
  onClose: PropTypes.func,
  collapsible: PropTypes.bool,
  borderRadiusSize: PropTypes.oneOf(['default', 'medium', 'large', 'circle']),
};

Tips.defaultProps = {
  style: {},
  className: '',
  type: 'normal',
  mode: 'default',
  isShowIcon: false,
  icon: '',
  description: '',
  action: '',
  closable: false,
  closeText: '',
  closeIcon: '',
  onClose: () => {},
  collapsible: false,
  borderRadiusSize: 'default',
};

export default Tips;
