import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop, omit, prefixCls } from '@utils';

import FormContext from '../form/context';
import Icon from '../icon';
import Textarea from './textarea';

import './index.less';

const nothing = undefined;
const ENTER_KEY_CODE = 13;

class Input extends React.Component {
  static contextType = FormContext;

  static propTypes = {
    size: PropTypes.oneOf([ 'large', 'default', 'small' ]),
    style: PropTypes.object,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    prefix: PropTypes.any,
    suffix: PropTypes.any,
    addonAfter: PropTypes.any,
    addonBefore: PropTypes.any,
    hasCounter: PropTypes.bool,
    hasClear: PropTypes.bool,
    useComposition: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onEnter: PropTypes.func,
  };

  static defaultProps = {
    size: nothing,
    style: {},
    value: nothing,
    defaultValue: nothing,
    className: '',
    prefix: nothing,
    suffix: nothing,
    addonAfter: nothing,
    addonBefore: nothing,
    hasCounter: false,
    hasClear: false,
    useComposition: false,
    onFocus: noop,
    onBlur: noop,
    onChange: noop,
    onKeyDown: noop,
    onEnter: noop,
  };

  static Textarea = Textarea;

  isOnComposition = false;

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      counter: 0,
    };
    this.inputRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const observableProps = [
      'size',
      'value',
      'defaultValue',
      'className',
      'hasCounter',
      'hasClear',
      'disabled',
      'placeholder',
      'maxLength',
    ];
    return (
      observableProps
        .map((attr) => nextProps[attr] !== this.props[attr])
        .find((item) => item)
      || JSON.stringify(nextProps.style) !== JSON.stringify(this.props.style)
      || Object.keys(this.state)
        .map((attr) => nextState[attr] !== this.state[attr])
        .find((item) => item)
      || (this.inputNode.value && String(nextProps.value) !== this.inputNode.value)
    );
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    if (defaultValue !== nothing) {
      this.inputNode.value = defaultValue;
      this.setCounter();
    }
    this.setInputValue();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value || (this.inputNode.value && String(this.props.value) !== this.inputNode.value)) {
      this.setInputValue();
    }
  }

  setInputValue() {
    const { value } = this.props;
    if (value !== undefined) {
      this.inputNode.value = value || '';
      this.setCounter();
    }
  }

  setCounter() {
    this.setState({
      counter: this.inputNode.value.length,
    });
  }

  get isPure() {
    const {
      hasCounter,
      hasClear,
      hasLimtHint,
      prefix,
      suffix,
      addonBefore,
      addonAfter,
    } = this.props;

    return (
      !hasCounter
      && !hasClear
      && !hasLimtHint
      && !prefix
      && !suffix
      && !addonBefore
      && !addonAfter
    );
  }

  get inputNode() {
    return this.inputRef.current || document.createElement('input');
  }

  onKeyDown = (evt) => {
    const { onEnter, onKeyDown } = this.props;

    if (evt.keyCode === ENTER_KEY_CODE) {
      onEnter(evt);
      evt.preventDefault();
    }
    onKeyDown(evt);
  };

  onChange = (evt) => {
    if (!this.isOnComposition && !this.props.disabled) {
      this.props.onChange(evt);
      this.setCounter();
    }
  };

  onFocus = (evt) => {
    this.setState({ focused: true }, () => this.props.onFocus(evt));
  };

  onBlur = (evt) => {
    evt.persist();
    this.setState({ focused: false }, () => this.props.onBlur(evt));
  };

  onClearValue = (evt) => {
    this.setValue('', evt, () => this.inputNode.focus());
    evt.stopPropagation();
  };

  setValue(value, evt, callback = noop) {
    let keyboardEvent = evt;

    // click the clear button
    // handle consistent events
    if (evt.type === 'click') {
      keyboardEvent = Object.assign({}, evt, {
        target: this.inputNode,
        currentTarget: this.inputNode,
      });
      this.inputNode.value = '';
      this.setCounter();
    }

    this.props.onChange(keyboardEvent);

    callback();
  }

  handleComposition = (evt) => {
    if (!this.props.useComposition) return;

    if (evt.type === 'compositionend') {
      this.isOnComposition = false;

      // 谷歌浏览器：compositionstart onChange compositionend
      // 火狐浏览器：compositionstart compositionend onChange
      if (navigator.userAgent.indexOf('Chrome') > -1) {
        this.onChange(evt);
      }

      return;
    }

    this.isOnComposition = true;
  };

  renderClearIcon() {
    if (this.props.disabled) return null;

    const { counter } = this.state;
    const { size } = this.props;
    const { size: formSize } = this.context;
    const mergedSize = size || formSize || 'default';

    const type = 'close-fill';
    const classNames = classnames(`${prefixCls}-input-clear`, {
      show: counter,
      hidden: !counter,
      'small-size': mergedSize === 'small',
    });

    return (
      <Icon type={type} className={classNames} onClick={this.onClearValue} />
    );
  }

  renderCounter() {
    const { hasCounter, maxLength } = this.props;
    const { counter } = this.state;

    return hasCounter && maxLength ? (
      <span className={classnames(`${prefixCls}-input-counter`)}>
        <span>{counter}</span>
        /
        {maxLength}
      </span>
    ) : null;
  }

  renderSuffix() {
    const { hasClear, suffix } = this.props;

    return hasClear ? (
      <>
        {this.renderClearIcon()}
        {this.renderCounter()}
        {suffix}
      </>
    ) : (
      <>
        {this.renderCounter()}
        {suffix}
      </>
    );
  }

  render() {
    const { isPure } = this;
    const { focused } = this.state;
    const {
      size,
      className,
      style,
      addonAfter,
      addonBefore,
      prefix,
      ...others
    } = this.props;
    const { size: formSize } = this.context;
    const mergedSize = size || formSize || 'default';

    const _className = `${prefixCls}-input`;

    const props = omit(others, [
      'defaultValue',
      'hasCounter',
      'hasClear',
      'prefix',
      'suffix',
      'value',
      'addonAfter',
      'addonBefore',
      'onEnter',
      'useComposition',
    ]);
    const commonProps = {
      ref: this.inputRef,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onCompositionStart: this.handleComposition,
      onCompositionUpdate: this.handleComposition,
      onCompositionEnd: this.handleComposition,
    };

    // basic input
    if (isPure) {
      return (
        <input
          {...props}
          {...commonProps}
          style={isPure ? style : {}}
          className={classnames(_className, className, mergedSize, { [`${_className}-disabled`]: props.disabled })}
        />
      );
    }

    // merge clearIcon & suffix
    const _suffix = this.renderSuffix();

    // has addon content
    return (
      <InputWrapper
        prefix={prefix}
        suffix={_suffix}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        style={style}
        className={classnames(className, mergedSize, {
          [`${_className}-focus`]: focused,
          [`${_className}-disabled`]: props.disabled,
        })}
      >
        <input
          {...props}
          {...commonProps}
          style={{ padding: 0, height: 'auto' }}
          className={classnames(_className, size)}
        />
      </InputWrapper>
    );
  }
}

// InputWrapper
function InputWrapper(props) {
  const {
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    className,
    style,
    children,
  } = props;
  const both = prefix || suffix;
  const addon = addonBefore || addonAfter;

  // complex types
  if (both && addon) {
    return (
      <InputWrapper
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        className={className}
        style={style}
      >
        <InputWrapper prefix={prefix} suffix={suffix}>
          {children}
        </InputWrapper>
      </InputWrapper>
    );
  }

  if (both && !addon) {
    return (
      <InputWrapper
        className={classnames(`${prefixCls}-input-affix`, className)}
        style={style}
      >
        <Addon className={classnames(`${prefixCls}-input-prefix`)}>
          {prefix}
        </Addon>
        {children}
        <Addon className={classnames(`${prefixCls}-input-suffix`)}>
          {suffix}
        </Addon>
      </InputWrapper>
    );
  }

  if (!both && addon) {
    return (
      <div
        className={classnames(`${prefixCls}-input-wrapper`, className)}
        style={style}
      >
        <InputWrapper>
          <Addon className={classnames(`${prefixCls}-input-addon`)}>
            {addonBefore}
          </Addon>
          {children}
          <Addon className={classnames(`${prefixCls}-input-addon`)}>
            {addonAfter}
          </Addon>
        </InputWrapper>
      </div>
    );
  }
  return (
    <div
      className={classnames(`${prefixCls}-input-group`, className)}
      style={style}
    >
      {children}
    </div>
  );
}

InputWrapper.propTypes = {
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  addonAfter: PropTypes.any,
  addonBefore: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.string,
};

InputWrapper.defaultProps = {
  prefix: null,
  suffix: null,
  addonAfter: null,
  addonBefore: null,
  children: null,
  className: '',
};

// Addon
function Addon({ className, children }) {
  return !children ? null : <div className={className}>{children}</div>;
}

Addon.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

Addon.defaultProps = {
  className: '',
  children: null,
};

export default Input;
