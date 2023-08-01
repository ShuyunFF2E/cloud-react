import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from '../generator';
import { quarterFormat } from '../formats';

const { QuarterPicker: Picker } = generatePicker(momentGenerateConfig);

const QuarterPicker = ({
  size,
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
  presets,
}) => {
  const [value, setValue] = useState();
  const format = _format || quarterFormat;

  useEffect(() => {
    setValue(_value && moment(_value, format));
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
      return (minYear && current.year() < minYear) || (maxYear && current.year() > maxYear);
    },
    [format, minYear, maxYear],
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
      size={size}
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
        presets,
      }}
    />
  );
};

export default QuarterPicker;
