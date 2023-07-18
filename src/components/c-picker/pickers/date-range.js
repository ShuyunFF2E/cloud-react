import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from '../generator';
import { dateFormat, dateTimeFormat, timeFormat } from '../formats';
import { STR, OBJ, transformString2Moment } from '../utils';

const { DateRangePicker: Picker } = generatePicker(momentGenerateConfig);

const DateRangePicker = ({
  size,
  className,
  dropdownClassName, // New
  disabled,
  defaultValue: _defaultValue,
  value: _value,
  open,
  onOpenChange, // New
  format: _format,
  placeholder: _placeholder,
  width,
  minDate,
  maxDate,
  minYear,
  maxYear,
  showTimePicker,
  defaultTime,
  onChange,
  getPopupContainer: _getPopupContainer, // New
  isAppendToBody,
  canEdit = true,
  allowEmpty,
  style,
  showToday = true,
  showNow = true,
  disabledDate: _disabledDate,
  renderExtraFooter,
  autoFocus,
  allowClear,
  onFocus,
  onBlur,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onContextMenu,
  onKeyDown,
  onPanelChange,
  onOk,
  presets
}) => {
  const { current: _this } = useRef({
    formatType: STR,
  });
  const [ value, setValue ] = useState();
  const format = _format || (showTimePicker ? dateTimeFormat : dateFormat);
  let placeholder = _placeholder;
  if (typeof placeholder === 'string') {
    placeholder = [ placeholder, placeholder ];
  }

  useEffect(() => {
    if (_defaultValue && _defaultValue.start instanceof Date) {
      _this.formatType = OBJ;
    }
    setValue(transformString2Moment(_value, format, _this));
  }, [ _value, _defaultValue, format ]);

  const getDisabledDate = useCallback(
    (d) => {
      const target = d.clone();
      const min = minDate
        && (minDate instanceof Date
          ? moment(moment(minDate).format(format), format)
          : moment(minDate, format));
      const max = maxDate
        && (maxDate instanceof Date
          ? moment(moment(maxDate).format(format), format)
          : moment(maxDate, format));
      return (
        (min && target.isBefore(min))
        || (max && target.isAfter(max))
        || (minYear && target.year() < minYear)
        || (maxYear && target.year() > maxYear)
      );
    },
    [ format, minDate, maxDate, minYear, maxYear ],
  );

  const handleGetDisabledDate = useCallback(
    (target) => {
      const m = target && moment(target.format(format));
      if (_disabledDate) {
        if (_this.formatType === OBJ) {
          return _disabledDate(m && m.clone().toDate());
        }
        return _disabledDate(m && m.format(format));
      }
      return m && getDisabledDate(m);
    },
    [ _disabledDate, getDisabledDate, format ],
  );

  const handleOk = useCallback(
    (m) => {
      if (onOk) {
        if (_this.formatType === OBJ) {
          onOk(
            m
              && m.reduce((pre, cur, index) => {
                if (index === 0) {
                  return { start: cur && cur.clone().toDate() };
                }
                return { ...pre, end: cur && cur.clone().toDate() };
              }, {}),
          );
          return;
        }
        onOk(
          m
            && m.reduce((pre, cur, index) => {
              if (index === 0) {
                return { start: cur && cur.format(format) };
              }
              return { ...pre, end: cur && cur.format(format) };
            }, {}),
        );
      }
    },
    [ onOk, format, handleGetDisabledDate ],
  );

  const handlePanelChange = useCallback(
    (val, mode) => {
      if (onPanelChange) {
        if (_this.formatType === OBJ) {
          onPanelChange(
            val
              && val.reduce((pre, cur, index) => {
                if (index === 0) {
                  return { start: cur && cur.clone().toDate() };
                }
                return { ...pre, end: cur && cur.clone().toDate() };
              }, {}),
            mode,
          );
          return;
        }
        onPanelChange(
          val
            && val.reduce((pre, cur, index) => {
              if (index === 0) {
                return { start: cur && cur.format(format) };
              }
              return { ...pre, end: cur && cur.format(format) };
            }, {}),
          mode,
        );
      }
    },
    [ onPanelChange, format ],
  );

  const handleChange = useCallback(
    (m, str) => {
      const val = m && m.map((x) => (handleGetDisabledDate(x) ? undefined : x));
      const vVal = val && val.map((y, i) => (y ? str[i] : undefined));
      if (onChange) {
        if (_this.formatType === OBJ) {
          onChange(
            val
              ? val.reduce((pre, cur, index) => {
                if (index === 0) {
                  return { start: cur && cur.clone().toDate() };
                }
                return { ...pre, end: cur && cur.clone().toDate() };
              }, {})
              : { start: undefined, end: undefined },
          );
          return;
        }
        onChange(
          vVal
            ? vVal.reduce((pre, cur, index) => {
              if (index === 0) {
                return { start: cur };
              }
              return { ...pre, end: cur };
            }, {})
            : { start: undefined, end: undefined },
        );
      } else {
        setValue(val || { start: undefined, end: undefined });
      }
    },
    [ onChange ],
  );

  const getPopupContainer = useMemo(() => {
    if (_getPopupContainer) {
      return _getPopupContainer;
    }
    if (!isAppendToBody) {
      return () => document.body;
    }
    return undefined;
  }, [ _getPopupContainer, isAppendToBody ]);

  const defaultShowTimeObj = {
    defaultValue:
      defaultTime && defaultTime.map((v) => v && moment(v, timeFormat)),
    format: timeFormat,
  };

  return (
    <Picker
      size={size}
      style={{ width, ...style }}
      defaultValue={
        _defaultValue && [
          _defaultValue.start && moment(_defaultValue.start, format),
          _defaultValue.end && moment(_defaultValue.end, format),
        ]
      }
      showTime={
        // eslint-disable-next-line no-nested-ternary
        showTimePicker instanceof Object
          ? { ...defaultShowTimeObj, ...showTimePicker }
          : showTimePicker
            ? defaultShowTimeObj
            : false
      }
      onChange={handleChange}
      onOk={handleOk}
      onPanelChange={handlePanelChange}
      inputReadOnly={!canEdit}
      getPopupContainer={getPopupContainer}
      disabledDate={handleGetDisabledDate}
      {...{
        className,
        dropdownClassName,
        format,
        value,
        disabled,
        open,
        placeholder,
        showToday: showToday || showNow,
        showNow,
        renderExtraFooter,
        autoFocus,
        allowClear,
        allowEmpty,
        onFocus,
        onBlur,
        onOpenChange,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave,
        onClick,
        onContextMenu,
        onKeyDown,
        presets,
      }}
    />
  );
};

export default DateRangePicker;
