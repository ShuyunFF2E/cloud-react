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

const { DatePicker: Picker } = generatePicker(momentGenerateConfig);

const DatePicker = ({
  size,
  className,
  dropdownClassName, // New
  disabled,
  defaultValue: _defaultValue,
  value: _value,
  open,
  onOpenChange, // New
  format: _format,
  placeholder,
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
  style,
  showToday,
  showNow,
  disabledDate: _disabledDate,
  disabledTime,
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
  onSelect,
  onPanelChange,
  onOk,
}) => {
  const { current: _this } = useRef({
    formatType: STR,
  });
  const [ value, setValue ] = useState();
  const format = _format || (showTimePicker ? dateTimeFormat : dateFormat);

  useEffect(() => {
    if (_defaultValue instanceof Date) {
      _this.formatType = OBJ;
    }
    setValue(transformString2Moment(_value, format, _this));
  }, [ _value, _defaultValue, format ]);

  const handleChange = useCallback(
    (m, v) => {
      if (onChange) {
        if (_this.formatType === OBJ) {
          onChange(m && m.clone().toDate());
        } else {
          onChange(v);
        }
      } else {
        setValue(m);
      }
    },
    [ onChange ],
  );

  const handleSelect = useCallback(
    (m) => {
      if (onSelect) {
        if (_this.formatType === OBJ) {
          onSelect(m && m.clone().toDate());
        } else {
          onSelect(m && m.format(format));
        }
      }
    },
    [ onSelect, format ],
  );

  const handleOk = useCallback(
    (m) => {
      if (onOk) {
        if (_this.formatType === OBJ) {
          onOk(m && m.clone().toDate());
        } else {
          onOk(m && m.format(format));
        }
      }
    },
    [ onOk, format ],
  );

  const handlePanelChange = useCallback(
    (val, mode) => {
      if (onPanelChange) {
        if (_this.formatType === OBJ) {
          onPanelChange(val && val.clone().toDate(), mode);
        } else {
          onPanelChange(val.format(format), mode);
        }
      }
    },
    [ onPanelChange, format ],
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

  const getDisabledDate = useCallback(
    (d) => {
      const current = d.clone();
      const min = minDate
        && (minDate instanceof Date ? moment(minDate) : moment(minDate, format));
      const max = maxDate
        && (maxDate instanceof Date ? moment(maxDate) : moment(maxDate, format));
      return (
        (min && current.isBefore(min))
        || (max && current.isAfter(max))
        || (minYear && current.year() < minYear)
        || (maxYear && current.year() > maxYear)
      );
    },
    [ format, minDate, maxDate, minYear, maxYear ],
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
    [ _disabledDate, getDisabledDate, format ],
  );

  const defaultShowTimeObj = {
    defaultValue: defaultTime && moment(defaultTime, timeFormat),
    format: timeFormat,
  };

  return (
    <Picker
      size={size}
      style={{ width, ...style }}
      defaultValue={_defaultValue && moment(_defaultValue, format)}
      showTime={
        // eslint-disable-next-line no-nested-ternary
        showTimePicker instanceof Object
          ? { ...defaultShowTimeObj, ...showTimePicker }
          : showTimePicker
            ? defaultShowTimeObj
            : false
      }
      onChange={handleChange}
      onSelect={handleSelect}
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
        disabledTime,
        renderExtraFooter,
        autoFocus,
        allowClear,
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

export default DatePicker;
