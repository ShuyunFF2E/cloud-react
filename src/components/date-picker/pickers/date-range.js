// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from '../generator';
import { dateFormat, dateTimeFormat, timeFormat } from '../formats';
import { transformString2Moment } from '../utils';

const { DateRangePicker: Picker } = generatePicker(momentGenerateConfig);

const DateRangePicker = ({
  className,
  inputClassName, // New
  disabled,
  defaultValue: _defaultValue,
  value: _value,
  open: _open,
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
  // containerEleClass,
  getPopupContainer: _getPopupContainer, // New
  isAppendToBody,
  // position,
  dropdownAlign, // New
  canEdit,
  style,
  showToday,
  showNow,
  disabledDate: _disabledDate,
  disabledTime,
  dateRender,
  monthCellRender,
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
  // const { current: _this } = useRef({
  //   popupTimeout: 0
  // });
  const [value, setValue] = useState();
  const [open, setOpen] = useState();
  const format = _format || (showTimePicker ? dateTimeFormat : dateFormat);
  const placeholder = _placeholder || [format, format];

  useEffect(() => {
    setValue(transformString2Moment(_value, format));
    setOpen(_open);
    // return () => {
    //   clearTimeout(_this.popupTimeout);
    // }
  }, [_value, _open]);

  // useEffect(() => {
  //   if (containerEleClass && open) {
  //     _this.popupTimeout = setTimeout(() => {
  //       const containerElement = document.querySelectorAll(
  //         `.${containerEleClass}`,
  //       )[0];
  //       const wrapperElement = document.querySelector(`.${wrapperClass}`);
  //       const containerHeight = containerElement.getClientRects()[0].bottom;

  //       if (
  //         containerRef.current.getClientRects()[0].bottom + height >
  //         containerHeight
  //       ) {
  //         wrapperElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
  //       }
  //     }, 0);
  //   }
  // }, [containerEleClass, open]);

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

  const getDisabledDate = useCallback(
    (d) => {
      const current = d.clone();
      const min =
        minDate instanceof Date ? moment(minDate) : moment(minDate, format);
      const max =
        maxDate instanceof Date ? moment(maxDate) : moment(maxDate, format);
      return (
        current.isBefore(min) ||
        current.isAfter(max) ||
        current.year() < minYear ||
        current.year() > maxYear
      );
    },
    [format, minDate, maxDate, minYear, maxYear],
  );

  return (
    <Picker
      dropdownClassName={className}
      style={{ ...style, width }}
      className={inputClassName}
      defaultValue={
        _defaultValue && _defaultValue.map((v) => v && moment(v, format))
      }
      showTime={
        showTimePicker && {
          defaultValue:
            defaultTime && defaultTime.map((v) => v && moment(v, timeFormat)),
        }
      }
      onChange={handleChange}
      onOpenChange={handleOpenChange}
      inputReadOnly={canEdit}
      getPopupContainer={getPopupContainer}
      disabledDate={_disabledDate || getDisabledDate}
      {...{
        format,
        value,
        disabled,
        open,
        placeholder,
        dropdownAlign,
        showToday,
        showNow,
        disabledTime,
        dateRender,
        monthCellRender,
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

export default DateRangePicker;
