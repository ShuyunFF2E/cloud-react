import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop, omit, prefixCls } from '@utils';
import FormContext from '../form/context';

import Icon from '../icon';

import {
  isInvalid,
  isInvalidNumber,
  isNotCompleteNumber,
  fixDoubleOperation,
  getCurrentValue,
  getCurrentPrecision,
} from './util';

import './index.less';

const selector = `${prefixCls}-input-number`;
const ENTER_KEY_CODE = 13;

class InputNumber extends Component {
  constructor() {
    super();

    this.state = {
      currentValue: '',
      upButtonEnabled: true,
      downButtonEnabled: true,
      focused: false,
    };
  }

  static contextType = FormContext;

  componentDidMount() {
    const {
      min, max, value, defaultValue, precision, step,
    } = this.props;
    let _value = value;
    // 获取默认value
    const number = parseFloat(defaultValue);

    const defaultNumber = Number.isNaN(number)
      ? ''
      : getCurrentValue(
        number,
        min,
        max,
        getCurrentPrecision(number, precision, step),
      );

    _value = value !== undefined
      ? getCurrentValue(
        value,
        min,
        max,
        getCurrentPrecision(value, precision, step),
      )
      : defaultNumber;

    this.setState({
      currentValue: _value,
    });

    this.isControlled = value !== undefined;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      value, min, max, precision,
    } = this.props;

    if (
      prevProps.value !== value
      || prevProps.min !== min
      || prevProps.max !== max
      || prevProps.precision !== precision
    ) {
      this.setIsControlled(value !== undefined);
      this.updateCurrentValue();
    }

    if (this.state.currentValue !== prevState.currentValue) {
      this.updateBtnStatus();
    }
  }

  updateCurrentValue() {
    this.setState({
      currentValue: this.props.value,
    });
  }

  updateBtnStatus() {
    const { currentValue } = this.state;
    const { min, max } = this.props;
    const isInvalided = isInvalid(currentValue);
    const isUpEnabled = isInvalided || Number(currentValue) < max;
    const isDownEnabled = isInvalided || Number(currentValue) > min;

    this.setState({
      upButtonEnabled: isUpEnabled,
      downButtonEnabled: isDownEnabled,
    });
  }

  setIsControlled(value) {
    this.isControlled = value;
  }

  handlePlus = () => {
    if (this.state.upButtonEnabled) {
      this.handlePlusMinus(true);
    }
  };

  handleMinus = () => {
    if (this.state.downButtonEnabled) {
      this.handlePlusMinus(false);
    }
  };

  handleFocus = () => {
    this.setState({
      focused: true,
    });
    this.props.onFocus();
  };

  handleBlur = (event) => {
    const {
      min, max, precision, onBlur, onChange,
    } = this.props;
    const targetValue = event.target.value.trim();
    const val = getCurrentValue(targetValue, min, max, precision);
    const _val = isInvalidNumber(String(val)) ? val : Number(val);

    this.setState({
      focused: false,
      currentValue: _val,
    });

    onChange(_val);
    onBlur(_val);
  };

  handleChange = (event) => {
    const targetValue = event.target.value
      .trim()
      .replace('。', '.')
      .replace(/[^\-?\d.]/g, '');
    const _targetValue = isNotCompleteNumber(targetValue)
      ? targetValue
      : String(targetValue);

    this.setState({
      currentValue: _targetValue,
    });
    this.props.onChange(_targetValue);
  };

  onKeyDown = (event) => {
    const { onEnter, onKeyDown } = this.props;

    if (event.keyCode === ENTER_KEY_CODE) {
      onEnter(event);
    }
    onKeyDown(event);
  };

  handlePlusMinus(isPlus) {
    const {
      min, max, precision, step, onChange,
    } = this.props;
    const { currentValue } = this.state;
    let val = currentValue;

    if (isInvalid(currentValue)) {
      val = min === -Infinity ? 0 : min;
    } else {
      const _val = fixDoubleOperation(
        Number(currentValue),
        Number(isPlus ? step : -1 * step),
      );
      val = getCurrentValue(
        _val,
        min,
        max,
        getCurrentPrecision(_val, precision, step),
      );
    }

    this.setState({
      currentValue: val,
    });

    val = Number(val);
    onChange(val);
  }

  renderStep() {
    const { noStep } = this.props;
    const { upButtonEnabled, downButtonEnabled } = this.state;

    const upBtnClass = classnames(
      `${selector}-handler ${selector}-handler-up`,
      {
        [`${selector}-handler-disabled`]: !upButtonEnabled,
      },
    );
    const downBtnClass = classnames(
      `${selector}-handler ${selector}-handler-down`,
      {
        [`${selector}-handler-disabled`]: !downButtonEnabled,
      },
    );

    return (
      !noStep && (
        <div className={`${selector}-handler-wrap`}>
          <span className={upBtnClass} onClick={this.handlePlus}>
            <Icon type="up" className={`${selector}-handler-up-icon`} />
          </span>
          <span className={downBtnClass} onClick={this.handleMinus}>
            <Icon type="down" className={`${selector}-handler-down-icon`} />
          </span>
        </div>
      )
    );
  }

  renderInput() {
    const {
      min, max, step, disabled, placeholder, stepType, ...others
    } = this.props;

    const { currentValue } = this.state;

    const props = omit(others, [
      'className',
      'defaultValue',
      'noStep',
      'onBlur',
      'onChange',
      'onFocus',
      'onKeyDown',
      'onEnter',
      'precision',
      'size',
      'style',
      'value',
    ]);

    const compClass = classnames(`${selector}-handler-input`, {
      [`${selector}-handler-input-top-bottom`]: stepType === 'topBottom',
      [`${selector}-handler-input-left-right`]: stepType === 'leftRight',
    });

    return (
      <div className={compClass}>
        <input
          {...props}
          className={`${selector}-input`}
          min={min}
          max={max}
          step={step}
          onKeyDown={this.onKeyDown}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          disabled={disabled}
          value={currentValue}
          placeholder={placeholder}
        />
      </div>
    );
  }

  renderLeft() {
    const { upButtonEnabled } = this.state;
    const subBtnClass = classnames(
      `${selector}-handle ${selector}-handler-sub`,
      {
        [`${selector}-handler-disabled`]: !upButtonEnabled,
      },
    );
    return (
      <span className={subBtnClass} onClick={this.handleMinus}>
        <Icon type="subtract" className={`${selector}-handler-sub-icon`} />
      </span>
    );
  }

  renderRight() {
    const { downButtonEnabled } = this.state;
    const plusBtnClass = classnames(
      `${selector}-handle ${selector}-handler-plus`,
      {
        [`${selector}-handler-disabled`]: !downButtonEnabled,
      },
    );
    return (
      <span className={plusBtnClass} onClick={this.handlePlus}>
        <Icon type="plus" className={`${selector}-handler-plus-icon`} />
      </span>
    );
  }

  render() {
    const {
      size, disabled, className, style, stepType,
    } = this.props;
    const { focused } = this.state;
    const { size: formSize } = this.context;
    const mergedSize = size || formSize || 'default';

    const compClass = classnames(`${selector} ${mergedSize} ${className}`, {
      [`${selector}-disabled`]: disabled,
      [`${selector}-focused`]: focused,
    });

    return (
      <div className={compClass} style={style}>
        {stepType === 'topBottom' && this.renderStep()}
        {stepType === 'leftRight' && this.renderLeft()}
        {this.renderInput()}
        {stepType === 'leftRight' && this.renderRight()}
      </div>
    );
  }
}

InputNumber.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf([ 'small', 'default', 'large' ]),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  noStep: PropTypes.bool,
  stepType: PropTypes.string,
  precision: PropTypes.number,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  defaultValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onEnter: PropTypes.func,
  onKeyDown: PropTypes.func,
};

InputNumber.defaultProps = {
  style: undefined,
  defaultValue: undefined,
  precision: undefined,
  value: undefined,
  className: '',
  min: -Infinity,
  max: Infinity,
  size: undefined,
  placeholder: '请输入...',
  step: 1,
  noStep: false,
  stepType: 'topBottom',
  disabled: false,
  onChange: noop,
  onBlur: noop,
  onFocus: noop,
  onEnter: noop,
  onKeyDown: noop,
};

export default InputNumber;
