import React, { createRef, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { noop, omit } from '@utils';
import ContextProvider from '@contexts/context-provider';
import Input from '../../input';
import Icon from '../../icon';
import Year from '../year/main';
import YearMonth from '../year-month/main';
import MonthDay from '../month-day/main';
import DatePicker from '../date-picker/main';
import { renderDOM, createWrapper, destroyDOM } from './utils';
import {
  enumObj,
  enumCheck,
  containerClass,
  selectorClass,
  wrapperClass,
  FORMAT,
  POPUP_WIDTH,
} from '../constant';
import { transformObj, displayNow, checkFormat } from '../utils';

class Picker extends Component {
  static contextType = ContextProvider;

  constructor(props) {
    super(props);

    const { value, defaultValue, open, formatValue } = props;
    const defaultTime = defaultValue
      ? formatValue(displayNow(defaultValue), this.format)
      : undefined;

    this.state = {
      currentValue: value
        ? formatValue(displayNow(new Date(value)), this.format)
        : defaultTime,
      id: Math.random().toString().replace('.', ''),
      visible: open,
      style: {},
      prevProps: props,
      checkFlag: true, // 校验输入的日期格式是否正确
    };

    this.inpRef = createRef();
    this.popupRef = createRef();

    this.containerRef = createRef();

    this.setYearChild = (ref) => {
      this.yearChild = ref;
    };
    this.setYearMonthChild = (ref) => {
      this.yearMonthChild = ref;
    };
    this.setMonthDayChild = (ref) => {
      this.monthDayChild = ref;
    };
    this.setDateChild = (ref) => {
      this.dateChild = ref;
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { prevProps } = prevState;
    const { open } = props;
    const { open: prevOpen } = prevProps;

    if (open !== prevOpen) {
      return {
        visible: open,
        prevProps: props,
      };
    }
    return null;
  }

  componentDidMount() {
    this.document.addEventListener('click', this.handleClick, false);
    if (this.props.open) {
      this.changeVisible(this.state.visible);
    }
  }

  componentDidUpdate(prevProps) {
    const { value: prevValue, open: prevOpen } = prevProps;
    const { value, open } = this.props;
    const { checkFlag } = this.state;
    if (prevValue !== value) {
      const date = checkFlag && value ? displayNow(new Date(value)) : value;
      this.handleValueChange(date, false);
    }
    if (prevOpen !== open) {
      this.changeVisible(open);
    }
  }

  componentWillUnmount() {
    this.document.removeEventListener('click', this.handleClick, false);
    clearTimeout(this.popupTimeout);
  }

  get format() {
    return FORMAT[this.props.tempMode];
  }

  get document() {
    return this.context.rootDocument;
  }

  get portal() {
    const { getContext } = this.context;
    return getContext() || this.document.body;
  }

  /**
   *
   * @param output
   * @param isPop
   * @param isClickBtn 是否是点击确定
   */
  handleValueChange = (output = '', isPop = false, isClickBtn = false) => {
    const { checkFlag } = this.state;
    const value = (output && checkFlag) || isClickBtn
      ? this.props.formatValue(output)
      : output || '';
    this.setState({
      currentValue: value ? value.toString().replace(/-/g, '/') : '',
    });
    if (isPop) {
      this.props.onChange(value);
    }
  };

  /**
   * 值跑出去
   * @param output 抛出去的值
   * @param isClickBtn 是否是点击确定按钮 -- 确定：true   回车/失去焦点：false
   */
  onPopChange = (output, isClickBtn = true) => {
    this.handleValueChange(output, true, isClickBtn);
    this.changeVisible(false); // 关闭日历选择
  };

  renderMainPop = () => {
    const { tempMode, formatValue, showTimePicker } = this.props;
    const { currentValue } = this.state;

    const checkFlag = checkFormat(currentValue, tempMode, showTimePicker);

    const checkValue = checkFlag && currentValue
      ? formatValue(displayNow(new Date(currentValue)), this.format)
      : '';

    if (tempMode === enumObj.YEAR_MODEL) {
      return (
        <Year
          ref={this.setYearChild}
          {...this.props}
          checkValue={currentValue}
          onChange={this.onPopChange}
        />
      );
    }

    if (tempMode === enumObj.YEAR_MONTH_MODEL) {
      return (
        <YearMonth
          ref={this.setYearMonthChild}
          {...this.props}
          checkValue={checkValue}
          onChange={this.onPopChange}
        />
      );
    }

    if (tempMode === enumObj.MONTH_DAY_MODEL) {
      return (
        <MonthDay
          ref={this.setMonthDayChild}
          {...this.props}
          checkValue={checkValue}
          onChange={this.onPopChange}
        />
      );
    }

    return (
      <DatePicker
        ref={this.setDateChild}
        {...this.props}
        checkValue={transformObj(checkValue)}
        onChange={this.onPopChange}
      />
    );
  };

  popClick = (evt) => {
    evt.stopPropagation();
    if (evt.nativeEvent.stopImmediatePropagation) {
      evt.nativeEvent.stopImmediatePropagation();
    }
  };

  // 关闭时 校验输入的是否正确
  handleClick = (e) => {
    const isClickPicker = this.containerRef.current.contains(e.target)
      || (this.popupRef.current && this.popupRef.current.contains(e.target));
    const { checkFlag, visible, currentValue } = this.state;
    const { tempMode, formatValue } = this.props;

    // 校验不通过，且有值，直接抛出去，日历选择器关闭
    if (!isClickPicker && !checkFlag && visible) {
      this.props.onChange(currentValue);
      this.changeVisible(false);
      return;
    }

    // 校验通过，值为空
    if (!isClickPicker && visible && !currentValue) {
      this.onPopChange('', false);
      return;
    }

    // 校验通过，正常值
    if (!isClickPicker && currentValue && visible) {
      const currentValueTemp = tempMode === enumObj.YEAR_MODEL
        ? { year: currentValue }
        : transformObj(
          formatValue(
            displayNow(new Date(this.checkTimePicker())),
            this.format,
          ),
        );
      this.onPopChange(currentValueTemp, false);
    }
  };

  changeVisible = (isVisible) => {
    const { containerRef } = this;
    const { id } = this.state;
    const { containerEleClass, height, isAppendToBody, className } = this.props;

    if (isVisible && id) {
      this.setState({
        visible: true,
      });

      const style = this.positionPop();

      if (isAppendToBody) {
        this.setState({ style });
      } else {
        createWrapper(id, height, style);
        renderDOM(
          id,
          containerRef.current,
          <div
            className={`${selectorClass}-popup ${className}`}
            ref={this.popupRef}
            onClick={this.popClick}
          >
            {this.renderMainPop()}
          </div>,
        );
      }

      if (containerEleClass) {
        // 在弹框里面，日历处于最下面，那么需要自动滚动，让日历选择面板显示出来
        this.popupTimeout = setTimeout(() => {
          const containerElement = document.querySelectorAll(
            `.${containerEleClass}`,
          )[0];
          const wrapperElement = document.querySelector(`.${wrapperClass}`);
          const containerHeight = containerElement.getClientRects()[0].bottom;

          if (
            containerRef.current.getClientRects()[0].bottom + height
            > containerHeight
          ) {
            wrapperElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
        }, 0);
      }
      return;
    }

    this.setState({
      visible: false,
    });
    this.props.onClose();
    destroyDOM(id, containerRef.current);
  };

  positionPop = () => {
    const { left, top, bottom, width, height } = this.containerRef.current.getBoundingClientRect();
    const { isAppendToBody, position, height: popupHeight } = this.props;
    const isBottomDistanceEnough = bottom + popupHeight < this.document.documentElement.clientHeight;
    const isRightDistanceEnough = left + POPUP_WIDTH < this.document.documentElement.clientWidth;
    const isLocationTop = popupHeight < top && !isBottomDistanceEnough && position === 'auto';
    const isLocationAlignRight = left > POPUP_WIDTH
      && width < POPUP_WIDTH
      && !isRightDistanceEnough
      && position === 'auto';
    const marginTop = isLocationTop ? '1px' : '-1px';
    if (isAppendToBody) {
      return {
        position: 'fixed',
        left: isLocationAlignRight
          ? `${left - (POPUP_WIDTH - width)}px`
          : `${left}px`,
        top: isLocationTop ? `${top - popupHeight}px` : `${bottom}px`,
        marginTop,
      };
    }
    return {
      top: isLocationTop ? `${-popupHeight}px` : `${height}px`,
      left: isLocationAlignRight ? '' : '0px',
      right: isLocationAlignRight ? '0px' : '',
      marginTop,
    };
  };

  onClickInput = (e) => {
    e.stopPropagation();
    const { disabled } = this.props;
    const { visible } = this.state;

    if (disabled) return;

    // 如果不可见则显示面板
    if (!visible) {
      this.changeVisible(true);
    }
  };

  handleChange = (evt = '') => {
    const { tempMode, showTimePicker } = this.props;
    if (evt.target) {
      // 点击了清空操作，空值抛出去
      if (!evt.target.value && evt.type === 'click') {
        this.onPopChange('', false);
        return;
      }

      const { currentValue } = this.state;

      // 可输入长度 可输入斜杠数
      const { replaceRule, lenRule, backslashRule } = enumCheck[showTimePicker ? 'DATE_TIME_MODEL' : tempMode];

      const currentValueTemp = evt.target.value?.replace(replaceRule, ''); // 根据正则过滤掉符合的输入内容
      const currentValueFinal = currentValueTemp.length > lenRule
        || currentValueTemp.split('/').length > backslashRule + 1
        ? currentValue.toString()
        : currentValueTemp;

      this.setState({
        currentValue: currentValueFinal,
      });

      // 值改变的时候，日历要显示出来
      if (!this.state.visible && currentValueFinal) {
        this.changeVisible(true);
      }

      // 校验输入的值是否正确
      const checkFlag = currentValueFinal
        ? checkFormat(currentValueFinal.trim(), tempMode, showTimePicker)
        : true;

      this.setState({
        checkFlag,
      });

      // 校验通过 并且有值 日历选择联动
      if (checkFlag && currentValueFinal) {
        if (tempMode === enumObj.YEAR_MODEL) {
          this.yearChild.changeCheckValue(currentValueFinal);
        } else if (tempMode === enumObj.YEAR_MONTH_MODEL) {
          this.yearMonthChild.changeCheckValue(currentValueFinal);
        } else if (tempMode === enumObj.MONTH_DAY_MODEL) {
          this.monthDayChild.changeCheckValue(currentValueFinal);
        } else if (this.dateChild) {
          const afterV = currentValueFinal.trim().split(' ')[1]; // 拿到年月日时分秒的数值
          const dealData = transformObj(currentValueFinal);
          // hour: 'other', minute: 'other', second: 'other'  方式時分秒重置，具體看date-picker/grid.js配合使用
          this.dateChild.changeCheckValue(
            afterV
              ? dealData
              : {
                ...dealData,
                hour: 'other',
                minute: 'other',
                second: 'other',
              },
          );
          // this.dateChild.changeCheckValue( afterV ? dealData : { ...dealData, hour: null, minute: null, second: null } );
        }
      }
    }
  };

  handleEnterDown = () => {
    const { formatValue, tempMode } = this.props;
    const { checkFlag, currentValue } = this.state;

    // 校验不通过或者为空，直接抛出去
    if (!checkFlag || !currentValue) {
      this.props.onChange(currentValue);
      this.changeVisible(false);
      return;
    }

    // 校验通过 数值抛出去
    const currentValueTemp = tempMode === enumObj.YEAR_MODEL
      ? { year: currentValue }
      : transformObj(
        formatValue(
          displayNow(new Date(this.checkTimePicker())),
          this.format,
        ),
      );
    this.onPopChange(currentValueTemp, false);
  };

  /**
   * 显示时分秒的时候，增加自动补全功能
   */
  checkTimePicker = () => {
    const { currentValue } = this.state;
    const { defaultTime, showTimePicker, formatValue } = this.props;
    let returnValue = currentValue.trim();
    const afterV = returnValue.split(' ')[1];
    if (showTimePicker && returnValue && !afterV) {
      // 校验年月日格式是否正确，正确 补全 校验设置为true；不正确 不补全
      returnValue = this.props.formatValue(
        transformObj(
          formatValue(
            displayNow(new Date(`${currentValue.trim()} ${defaultTime}`)),
            this.format,
          ),
        ),
      );
      this.setState({
        currentValue: returnValue,
      });
    }

    return returnValue;
  };

  render() {
    const {
      inpRef,
      containerRef,
      onClickInput,
      handleChange,
      handleEnterDown,
    } = this;
    const { currentValue, visible, style } = this.state;
    const {
      canEdit,
      placeholder,
      disabled,
      isAppendToBody,
      width,
      className,
      ...others
    } = this.props;
    const otherProps = omit(others, [
      'value',
      'containerEleClass',
      'defaultValue',
      'open',
      'format',
      'defaultTime',
      'showTimePicker',
      'min',
      'max',
      'maxYear',
      'minYear',
      'maxDate',
      'minDate',
      'tempMode',
      'formatValue',
      'integer',
    ]);

    return (
      <div ref={containerRef} className={containerClass}>
        <div className={`${selectorClass}-inp-block`} onClick={onClickInput}>
          <Input
            {...otherProps}
            style={{ width: `${parseFloat(width)}px` }}
            readOnly={!canEdit}
            hasClear
            ref={inpRef}
            value={currentValue}
            placeholder={placeholder}
            onChange={handleChange}
            disabled={disabled}
            className={`${selectorClass}-inp`}
            onEnter={handleEnterDown}
            suffix={
              <Icon
                type="calendar"
                className={`${selectorClass}-inp-icon`}
                onClick={onClickInput}
              />
            }
          />
        </div>

        {visible
          && isAppendToBody
          && ReactDOM.createPortal(
            <div
              className={`${selectorClass}-popup ${className}`}
              ref={this.popupRef}
              style={{ ...style }}
              onClick={this.popClick}
            >
              {this.renderMainPop()}
            </div>,
            this.portal,
          )}
      </div>
    );
  }
}

Picker.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  open: PropTypes.bool,
  isAppendToBody: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  formatValue: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  canEdit: PropTypes.bool,
};

Picker.defaultProps = {
  className: '',
  disabled: false,
  placeholder: '',
  open: false,
  isAppendToBody: false,
  defaultValue: '',
  value: undefined,
  formatValue: noop,
  onChange: noop,
  onClose: noop,
  canEdit: false,
};

export default Picker;
