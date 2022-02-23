import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from '../generator';
import { monthFormat } from '../formats';

const { MonthPicker: Picker } = generatePicker(momentGenerateConfig);

const MonthPicker = ({
  className,
  dropdownClassName, // New
  disabled,
  defaultValue: _defaultValue,
  value: _value,
  open,
  onOpenChange, // New
  placeholder,
  width,
  minYear,
  maxYear,
  minMonth: _minMonth,
  maxMonth: _maxMonth,
  format: _format,
  onChange,
  getPopupContainer: _getPopupContainer, // New
  isAppendToBody,
  canEdit = true,
  style,
  showToday,
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
  onSelect,
  onPanelChange,
}) => {
  const [value, setValue] = useState();
  const format = _format || monthFormat;
  const minMonth = _minMonth - 1;
  const maxMonth = _maxMonth - 1;

  useEffect(() => {
    setValue(_value && moment(_value, format).startOf('month'));
  }, [_value, format]);

  const handleChange = useCallback(
    (m) => {
      if (onChange) {
        onChange(m && m.clone().format(format));
      } else {
        setValue(m);
      }
    },
    [onChange, format],
  );

  const handleSelect = useCallback(
    (m) => {
      if (onSelect) {
        onSelect(m && m.clone().format(format));
      }
    },
    [onSelect, format],
  );

  const handlePanelChange = useCallback(
    (val, mode) => {
      if (onPanelChange) {
        onPanelChange(val && val.clone().format(format), mode);
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
      return (
        (minYear && current.year() < minYear) ||
        (maxYear && current.year() > maxYear) ||
        (minMonth && current.month() < minMonth) ||
        (maxMonth && current.month() > maxMonth)
      );
    },
    [format, minYear, maxYear, minMonth, maxMonth],
  );

  const handleGetDisabledDate = useCallback(
    (m) => {
      if (_disabledDate) {
        return _disabledDate(m && m.clone().format(format));
      }
      return getDisabledDate(m);
    },
    [_disabledDate, getDisabledDate, format],
  );

  return (
    <Picker
      style={{ width, ...style }}
      defaultValue={_defaultValue && moment().year(Number(_defaultValue))}
      onChange={handleChange}
      onSelect={handleSelect}
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
        showToday,
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

export default MonthPicker;
