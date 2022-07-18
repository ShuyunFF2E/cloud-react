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
    icon: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
    loading: PropTypes.bool,
    target: PropTypes.string,
    htmlType: PropTypes.string,
    className: PropTypes.string,
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
  };

  static Group = ButtonGroup;

  render() {
    const { size: formSize } = this.context;
    const {
      // a link
      href,
      target,
      // custom attr
      size,
      disabled,
      loading,
      type,
      colorType,
      block,
      icon,
      // html element
      children,
      className,
      htmlType,
      ...others
    } = this.props;

    const ElementName = href ? 'a' : 'button';
    const classNames = classnames(
      `${prefixCls}-button`,
      {
        [type]: true,
        [size || formSize || 'default']: true,
        [colorType]: true,
        block,
        loading,
      },
      className,
    );

    // 针对单按钮情况
    let content = type !== 'link'
      && type !== 'text'
      && !icon
      && typeof children === 'string'
      && children.length === 2
      ? children.split('').join(' ')
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

    let iconDom = null;
    if (icon && typeof icon === 'string') {
      iconDom = <Icon type={icon} className={`${prefixCls}-button-suffix-icon`} />;
    } else if (icon && typeof icon === 'object') {
      iconDom = icon;
    }

    return (
      <ElementName
        type="button"
        className={classNames}
        disabled={disabled || loading}
        {...{
          ...others,
          href: href || undefined,
          type: href ? undefined : htmlType,
          target: href ? target : undefined,
        }}
      >
        {loading && <span className={`${prefixCls}-button-loading-spin`} />}
        {iconDom}
        {content}
      </ElementName>
    );
  }
}

export default Button;
