import React, {
  Children,
  cloneElement,
  useMemo,
  useState,
  useEffect,
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@utils';

import Checkbox from '../../../checkbox';
import Button from '../../../button';
import { OptionsEmpty, selector } from '../common';
import { filterOptions } from '../../utils';

import '../../index.less';

const ConfirmBtn = ({
  onOk,
  onCancel,
  okBtnText,
  cancelBtnText,
  confirmTemplate,
}) => {
  if (confirmTemplate) return confirmTemplate({ onOk, onCancel });
  return (
    <div className={`${selector}-operate-btn`}>
      <Button size="small" className="btn" onClick={onCancel}>
        {cancelBtnText}
      </Button>
      <Button type="primary" size="small" className="btn" onClick={onOk}>
        {okBtnText}
      </Button>
    </div>
  );
};

export default function MultiSelect(props) {
  const {
    dataSource,
    hasSelectAll,
    hasConfirmButton,
    okBtnText,
    cancelBtnText,
    value,
    emptyRender,
    onChange,
    onOk,
    onCancel,
    confirmTemplate,
    className,
    searchValue,
    supportUnlimited,
    handleSelect,
    selectAllText,
    labelKey,
    onHoverChange = noop,
    dropdownConfig,
    selectInfoKey,
    open,
  } = props;
  const [ options, setOptions ] = useState(dataSource);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [ values, setValues ] = useState(value);
  const [ groupValue ] = useState(() => {
    const result = Children.map(dataSource, (child) => {
      const { disabled, value: childValue } = child.props;
      return disabled && !values.includes(childValue) ? null : childValue;
    });
    return result;
  });
  const [ indeterminate, setIndeterminate ] = useState(false);
  const [ checkAll, setCheckAll ] = useState(false);
  const classNames = classnames(`${selector}-select-options`, className);

  const onOptionChange = (checked, val) => {
    if (checked) {
      onChange([ ...values, val ]);
    } else {
      const index = values.findIndex((v) => v === val);
      const result = [ ...values ];
      result.splice(index, 1);
      onChange(result);
    }
  };

  const onUnlimitedChange = ({ disabled }) => {
    if (disabled) {
      return;
    }
    onChange([]);
    handleSelect();
  };

  useEffect(() => {
    setHoveredOption(null);
    onHoverChange(null);
  }, [open]);

  const handleOptionHover = (item) => {
    setHoveredOption(item);
    onHoverChange(item);
  };

  const handleCheckAll = (checked) => {
    const result = Children.map(dataSource, (child) => {
      const { value: childValue, disabled } = child.props;
      if (checked) {
        return disabled && !values.includes(childValue) ? null : childValue;
      }
      return disabled && values.includes(childValue) ? childValue : null;
    });
    onChange(result);
  };
  const views = useMemo(
    () => Children.map(options, (child, index) => cloneElement(child, {
      ...child.props,
      disabled: (dataSource?.[index]?.props || child.props)?.disabled,
      hideCheckbox:
            supportUnlimited && !child.props.value && child.props.value !== 0,
      multiple: true,
      isSelected: values.includes(child.props.value),
      onChange: onOptionChange,
      onHover: (item) => item && handleOptionHover(item, index),
      onUnlimitedChange: () => onUnlimitedChange({
        ...child.props,
        ...(dataSource?.[index]?.props || {}),
      }),
    })),
    [ options, values ],
  );

  useEffect(() => {
    const result = filterOptions(dataSource, searchValue, labelKey);
    setOptions(result);
  }, [ searchValue ]);

  useEffect(() => {
    setValues(value);
  }, [ value ]);

  useEffect(() => {
    const valueLength = values.length;
    const groupLength = groupValue.length;
    const result = !!valueLength && valueLength < groupLength;
    setIndeterminate(result);
    setCheckAll(valueLength === groupLength);
  }, [ values ]);

  return (
    <div
      className={`${selector}-select-panel-container`}
    >
      <div
        className={classNames}
        style={
          hoveredOption?.[selectInfoKey]
            ? { display: 'flex', flex: 1, position: 'relative' }
            : {}
        }
      >
        <div
          style={
            dropdownConfig?.width
              ? { width: dropdownConfig?.leftWidth, minWidth: dropdownConfig?.leftWidth }
              : {}
          }
        >
          {!views.length && <OptionsEmpty emptyRender={emptyRender} />}
          <div
            className={`${selector}-multiple-options`}
            style={
              dropdownConfig?.width
                ? { width: dropdownConfig?.leftWidth, minWidth: dropdownConfig?.leftWidth }
                : {}
            }
          >
            <div className={`${selector}-option-list`}>
              {hasSelectAll && !!views.length && (
                <Checkbox
                  checked={checkAll}
                  indeterminate={indeterminate}
                  onChange={handleCheckAll}
                  className={`${selector}-option ${selector}-option-select-all`}
                >
                  {selectAllText}
                </Checkbox>
              )}
              {views}
            </div>
          </div>
        </div>
        {hoveredOption?.[selectInfoKey] && (
          <div className={`${selector}-info-panel`}>
            <div className={`${selector}-info-panel-title`}>{hoveredOption.label || hoveredOption.value}</div>
            <div className={`${selector}-info-panel-content`}>{hoveredOption?.[selectInfoKey]}</div>
          </div>
        )}
        {hasConfirmButton && (
          <ConfirmBtn
            onOk={onOk}
            onCancel={onCancel}
            okBtnText={okBtnText}
            cancelBtnText={cancelBtnText}
            confirmTemplate={confirmTemplate}
          />
        )}
      </div>
    </div>
  );
}

MultiSelect.propTypes = {
  dataSource: PropTypes.array,
  value: PropTypes.array,
  hasConfirmButton: PropTypes.bool,
  okBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  supportUnlimited: PropTypes.bool,
};

MultiSelect.defaultProps = {
  dataSource: [],
  value: [],
  hasConfirmButton: false,
  okBtnText: '',
  cancelBtnText: '',
  className: '',
  onChange: noop,
  onOk: noop,
  onCancel: noop,
  supportUnlimited: false,
};
