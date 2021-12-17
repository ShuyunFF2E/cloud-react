import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from '../generator';
import { yearFormat } from '../formats';

const { YearPicker: Picker } = generatePicker(momentGenerateConfig);

const YearPicker = ({
  className,
  dropdownClassName, // New
  disabled,
  defaultValue: _defaultValue,
  value: _value,
  open,
  onOpenChange, // New
  placeholder: _placeholder,
  width,
  min: minYear,
  max: maxYear,
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
  const format = _format || yearFormat;
  const placeholder = _placeholder || format;

  useEffect(() => {
    setValue(_value && moment().year(Number(_value)));
  }, [_value]);

  const handleChange = useCallback(
    (m) => {
      if (onChange) {
        onChange(m && m.clone().year());
      } else {
        setValue(m);
      }
    },
    [onChange],
  );

  const handleSelect = useCallback(
    (m) => {
      if (onSelect) {
        onSelect(m && m.clone().year());
      }
    },
    [onSelect],
  );

  const handlePanelChange = useCallback(
    (val, mode) => {
      if (onPanelChange) {
        onPanelChange(val && val.clone().year(), mode);
      }
    },
    [onPanelChange],
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
        (maxYear && current.year() > maxYear)
      );
    },
    [format, minYear, maxYear],
  );

  const handleGetDisabledDate = useCallback(
    (m) => {
      if (_disabledDate) {
        return _disabledDate(m && m.clone().year());
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

export default YearPicker;
