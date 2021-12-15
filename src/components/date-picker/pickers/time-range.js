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
  open,
  onOpenChange, // New
  placeholder: _placeholder,
  width,
  onChange,
  // containerEleClass,
  getPopupContainer: _getPopupContainer, // New
  isAppendToBody,
  // position,
  dropdownAlign, // New
  canEdit = true,
  selectable,
  allowEmpty,
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
  const format = timeFormat;
  const placeholder = _placeholder || [format, format];

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
      inputReadOnly={!canEdit}
      getPopupContainer={getPopupContainer}
      {...{
        format,
        value,
        disabled,
        open,
        placeholder,
        dropdownAlign,
        showToday: showToday || showNow,
        renderExtraFooter,
        autoFocus,
        allowClear,
        selectable,
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
        onSelect,
        onPanelChange,
        onOk,
      }}
    />
  );
};

export default TimeRangePicker;
