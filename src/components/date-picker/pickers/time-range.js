import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from '../generator';
import { timeFormat } from '../formats';
import { transformString2Moment } from '../utils';

const { TimeRangePicker: Picker } = generatePicker(momentGenerateConfig);

const TimeRangePicker = ({
  className,
  inputClassName, // New
  disabled,
  defaultValue: _defaultValue,
  value: _value,
  open: _open,
  onOpenChange, // New
  placeholder: _placeholder,
  width,
  onChange,
  // containerEleClass,
  getPopupContainer: _getPopupContainer, // New
  isAppendToBody,
  // position,
  dropdownAlign, // New
  canEdit,
  style,
  showToday,
  showNow,
  // disabledTime,
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
  const [value, setValue] = useState();
  const [open, setOpen] = useState();
  const format = timeFormat;
  const placeholder = _placeholder || [format, format];

  useEffect(() => {
    setValue(transformString2Moment(_value, format));
    setOpen(_open);
  }, [_value, _open]);

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

  const handleOpenChange = useCallback(
    (b) => {
      if (onOpenChange) {
        onOpenChange(b);
      } else {
        setOpen(b);
      }
    },
    [onOpenChange],
  );

  const getPopupContainer = useMemo(() => {
    if (_getPopupContainer) {
      return _getPopupContainer;
    }
    if (!isAppendToBody) {
      return (trigger) => {
        console.log(trigger);
        return document.body;
      };
    }
    return undefined;
  }, [_getPopupContainer, isAppendToBody]);

  return (
    <Picker
      dropdownClassName={className}
      style={{ ...style, width }}
      className={inputClassName}
      defaultValue={
        _defaultValue && _defaultValue.map((v) => v && moment(v, format))
      }
      onChange={handleChange}
      onOpenChange={handleOpenChange}
      inputReadOnly={canEdit}
      getPopupContainer={getPopupContainer}
      {...{
        format,
        value,
        disabled,
        open,
        placeholder,
        dropdownAlign,
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
        onSelect,
        onPanelChange,
        onOk,
      }}
    />
  );
};

export default TimeRangePicker;
