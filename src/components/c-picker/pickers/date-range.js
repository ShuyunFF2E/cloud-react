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
  showToday,
  showNow,
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
}) => {
  const { current: _this } = useRef({
    formatType: STR,
  });
  const [value, setValue] = useState();
  const format = _format || (showTimePicker ? dateTimeFormat : dateFormat);
  let placeholder = _placeholder || [format, format];
  if (typeof placeholder === 'string') {
    placeholder = [placeholder, placeholder];
  }

  useEffect(() => {
    if (_defaultValue && _defaultValue.start instanceof Date) {
      _this.formatType = OBJ;
    }
    setValue(transformString2Moment(_value, format, _this));
  }, [_value, _defaultValue, format]);

  const handleChange = useCallback(
    (m, v) => {
      if (onChange) {
        if (_this.formatType === OBJ) {
          onChange(
            m &&
              m.reduce((pre, cur, index) => {
                if (index === 0) {
                  return { start: cur && cur.clone().toDate() };
                }
                return { ...pre, end: cur && cur.clone().toDate() };
              }, {}),
          );
          return;
        }
        onChange(
          v &&
            v.reduce((pre, cur, index) => {
              if (index === 0) {
                return { start: cur };
              }
              return { ...pre, end: cur };
            }, {}),
        );
      } else {
        setValue(m);
      }
    },
    [onChange],
  );

  const handleOk = useCallback(
    (m) => {
      if (onOk) {
        if (_this.formatType === OBJ) {
          onOk(
            m &&
              m.reduce((pre, cur, index) => {
                if (index === 0) {
                  return { start: cur && cur.clone().toDate() };
                }
                return { ...pre, end: cur && cur.clone().toDate() };
              }, {}),
          );
          return;
        }
        onOk(
          m &&
            m.reduce((pre, cur, index) => {
              if (index === 0) {
                return { start: cur && cur.format(format) };
              }
              return { ...pre, end: cur && cur.format(format) };
            }, {}),
        );
      }
    },
    [onOk, format],
  );

  const handlePanelChange = useCallback(
    (val, mode) => {
      if (onPanelChange) {
        if (_this.formatType === OBJ) {
          onPanelChange(
            val &&
              val.reduce((pre, cur, index) => {
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
          val &&
            val.reduce((pre, cur, index) => {
              if (index === 0) {
                return { start: cur && cur.format(format) };
              }
              return { ...pre, end: cur && cur.format(format) };
            }, {}),
          mode,
        );
      }
    },
    [onPanelChange, format],
  );

  const getPopupContainer = useMemo(() => {
    if (_getPopupContainer) {
      return _getPopupContainer;
    }
    if (!isAppendToBody) {
      return () => document.body;
    }
    return undefined;
  }, [_getPopupContainer, isAppendToBody]);

  const getDisabledDate = useCallback(
    (d) => {
      const current = d.clone();
      const min =
        minDate &&
        (minDate instanceof Date ? moment(minDate) : moment(minDate, format));
      const max =
        maxDate &&
        (maxDate instanceof Date ? moment(maxDate) : moment(maxDate, format));
      return (
        (min && current.isBefore(min)) ||
        (max && current.isAfter(max)) ||
        (minYear && current.year() < minYear) ||
        (maxYear && current.year() > maxYear)
      );
    },
    [format, minDate, maxDate, minYear, maxYear],
  );

  const handleGetDisabledDate = useCallback(
    (m) => {
      if (_disabledDate) {
        if (_this.formatType === OBJ) {
          return _disabledDate(m && m.clone().toDate());
        }
        return _disabledDate(m && m.format(format));
      }
      return getDisabledDate(m);
    },
    [_disabledDate, getDisabledDate, format],
  );

  return (
    <Picker
      style={{ width, ...style }}
      defaultValue={
        _defaultValue && [
          _defaultValue.start && moment(_defaultValue.start, format),
          _defaultValue.end && moment(_defaultValue.end, format),
        ]
      }
      showTime={
        showTimePicker instanceof Object
          ? {
              defaultValue:
                defaultTime &&
                defaultTime.map((v) => v && moment(v, timeFormat)),
            }
          : showTimePicker
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
      }}
    />
  );
};

export default DateRangePicker;
