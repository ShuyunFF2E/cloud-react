import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop, omit, prefixCls } from '@utils';

import Icon from '../icon';
import './index.less';
import Tooltip from '../tooltip';

const prefix = `${prefixCls}-tag`;
const typeEnum = {
  NONE: '',
  SUCCESS: 'success',
  WARNING: 'warning',
  DEFAULT: 'default',
  DANGER: 'danger',
  PRIMARY: 'primary',
  LINK: 'link',
};

const sizeEnum = {
  SMALL: 'small',
  NORMAL: 'normal',
};

export default class Tag extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      typeEnum.NONE,
      typeEnum.SUCCESS,
      typeEnum.WARNING,
      typeEnum.DEFAULT,
      typeEnum.DANGER,
      typeEnum.PRIMARY,
      typeEnum.LINK,
    ]),
    size: PropTypes.oneOf([sizeEnum.SMALL, sizeEnum.NORMAL]),
    color: PropTypes.string,
    rounded: PropTypes.bool,
    closable: PropTypes.bool,
    checkable: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    type: '',
    size: 'normal',
    color: '',
    rounded: false,
    closable: false,
    checkable: false,
    checked: false,
    disabled: false,
    onClick: noop,
    onClose: noop,
  };

  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      hasTooltip: false,
    };
  }

  componentDidMount() {
    if (this.ref.current) {
      const { width } = this.ref.current.getBoundingClientRect();
      this.setState({
        hasTooltip: width >= (this.props.maxWidth || 200),
      });
    }
  }

  get classes() {
    const {
      checked,
      closable,
      type,
      size,
      icon,
      checkable,
      color,
      rounded,
      disabled,
      className,
    } = this.props;

    return classnames(`${prefix}`, className, {
      closable,
      checkable: checkable && !color,
      checked,
      disabled,
      rounded,
      icon: !!icon,
      [size]: size,
      [color]: !!color,
      [type]: !!type,
      defaultTag: !type && !color,
    });
  }

  handleRemove = (event) => {
    this.props.onClose();
    event.stopPropagation();
  };

  handleClick = (event) => {
    const { disabled, onClick } = this.props;

    if (disabled) return;
    onClick(event);
  };

  renderContent() {
    const { closable, disabled, icon, maxWidth, style, ...others } = this.props;

    const props = omit(others, [
      'type',
      'size',
      'className',
      'rounded',
      'checkable',
      'checked',
      'color',
      'onClick',
      'onClose',
    ]);

    return (
      <span
        className={this.classes}
        style={{ maxWidth: maxWidth || 200, ...style }}
        onClick={this.handleClick}
        ref={this.ref}
        {...props}
      >
        {icon && <Icon type={icon} className="tag-icon" />}
        {this.props.children}
        {closable && !disabled ? (
          <div className="tag-close-wrapper">
            <Icon
              type="close"
              onClick={this.handleRemove}
              className="tag-close-icon"
            />
          </div>
        ) : null}
      </span>
    );
  }

  render() {
    if (this.state.hasTooltip) {
      return (
        <Tooltip content={this.props.children}>{this.renderContent()}</Tooltip>
      );
    }

    return this.renderContent();
  }
}
