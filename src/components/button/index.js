import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import FormContext from '../form/context';
import Icon from '../icon';
import './index.less';

function ButtonGroup({ children, ...props }) {
  const classes = classnames(`${prefixCls}-button-group`);

  return (
    <div className={classes}>
      {Children.map(children, (child) => cloneElement(child, {
        ...child.props,
        ...props,
        block: false,
      }))}
    </div>
  );
}

class Button extends React.PureComponent {
  static contextType = FormContext;

  static propTypes = {
    type: PropTypes.string,
    size: PropTypes.string,
    href: PropTypes.string,
    block: PropTypes.bool,
    colorType: PropTypes.string,
    icon: PropTypes.string,
    loading: PropTypes.bool,
    target: PropTypes.string,
    htmlType: PropTypes.string,
    className: PropTypes.string,
    borderRadiusSize: PropTypes.oneOf(['default', 'medium', 'large', 'circle']),
    shape: PropTypes.oneOf(['default', 'square']),
  };

  static defaultProps = {
    size: undefined,
    type: 'normal',
    href: '',
    colorType: '',
    icon: '',
    block: false,
    loading: false,
    target: '',
    className: '',
    htmlType: 'button',
    borderRadiusSize: 'default',
    shape: 'default',
  };

  static Group = ButtonGroup;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleClick = (e) => {
    const { onClick } = this.props;
    if (onClick) {
      const res = onClick(e);
      if (res instanceof Promise) {
        this.setState({ loading: true });
        res.finally(() => {
          this.setState({ loading: false });
        });
      }
    }
  };

  render() {
    const { size: formSize } = this.context;
    const {
      // a link
      href,
      target,
      // custom attr
      size,
      disabled,
      loading: _loading,
      type,
      colorType,
      block,
      icon,
      // html element
      children,
      className,
      htmlType,
      borderRadiusSize,
      shape,
      ...others
    } = this.props;
    const { loading } = this.state;

    const ElementName = href ? 'a' : 'button';
    const classNames = classnames(
      `${prefixCls}-button`,
      {
        [type]: true,
        [size || formSize || 'default']: true,
        [colorType]: true,
        [`shape-${shape}`]: true,
        block,
        loading: loading || _loading,
        [`border-radius-${borderRadiusSize}`]: true,
      },
      className,
    );
    // 针对单按钮情况
    let content = type !== 'link'
      && type !== 'text'
      && !icon
      && typeof children === 'string'
      && children.length === 2
      ? children.split('').join('')
      : children;

    // 针对按钮组情况
    if (
      children instanceof Array
      && children.length === 1
      && typeof children[0] === 'string'
      && children[0].length === 2
      && type !== 'link'
      && type !== 'text'
      && !icon
    ) {
      content = children[0].split('').join(' ');
    }

    return (
      <ElementName
        type="button"
        className={classNames}
        disabled={disabled || loading || _loading}
        {...{
          ...others,
          href: href || undefined,
          type: href ? undefined : htmlType,
          target: href ? target : undefined,
          onClick: this.handleClick,
        }}
      >
        {(loading || _loading) && (
          <span className={`${prefixCls}-button-loading-spin`} />
        )}
        {icon && (
          <Icon type={icon} className={`${prefixCls}-button-suffix-icon`} />
        )}
        {content}
      </ElementName>
    );
  }
}

export default Button;
