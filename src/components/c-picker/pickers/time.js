import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from '../generator';
import { timeFormat } from '../formats';
import { transformString2Moment } from '../utils';

const { TimePicker: Picker } = generatePicker(momentGenerateConfig);

const TimePicker = ({
  className,
  dropdownClassName, // New
  disabled,
  defaultValue: _defaultValue,
  value: _value,
  open,
  onOpenChange, // New
  placeholder: _placeholder,
  width,
  onChange,
  getPopupContainer: _getPopupContainer, // New
  isAppendToBody,
  canEdit = true,
  style,
  showToday,
  showNow,
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
  onOk,
}) => {
  const [value, setValue] = useState();
  const format = timeFormat;
  const placeholder = _placeholder || format;

  useEffect(() => {
    setValue(transformString2Moment(_value, format));
  }, [_value]);

  const handleChange = useCallback(
    (m, v) => {
      if (onChange) {
        onChange(v);
      } else {
        setValue(m);
      }
    },
    [onChange],
  );

  const handleOk = useCallback(
    (m) => {
      if (onOk) {
        onOk(m && m.format(format));
      }
    },
    [onOk, format],
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

  return (
    <Picker
      style={{ width, ...style }}
      defaultValue={_defaultValue && moment(_defaultValue)}
      onChange={handleChange}
      onOk={handleOk}
      inputReadOnly={!canEdit}
      getPopupContainer={getPopupContainer}
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

export default TimePicker;
