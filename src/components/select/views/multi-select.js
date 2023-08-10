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

import Checkbox from '../../checkbox';
import Button from '../../button';
import { OptionsEmpty, OptionsSearch, selector } from './common';
import { filterOptions } from '../utils';

import '../index.less';

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
      <Button type="primary" size="small" className="btn" onClick={onOk}>
        {okBtnText}
      </Button>
      <Button size="small" className="btn" onClick={onCancel}>
        {cancelBtnText}
      </Button>
    </div>
  );
};

export default function MultiSelect(props) {
  const {
    dataSource,
    searchable,
    hasSelectAll,
    hasConfirmButton,
    okBtnText,
    cancelBtnText,
    searchPlaceholder,
    value,
    emptyRender,
    onChange,
    onSearch,
    onOk,
    onCancel,
    confirmTemplate,
    className,
    onSearchValueChange,
  } = props;
  const [ options, setOptions ] = useState(dataSource);
  const [ searchValue, setSearchValue ] = useState('');
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
      ...(dataSource?.[index]?.props || {}),
      multiple: true,
      isSelected: values.includes(child.props.value),
      onChange: onOptionChange,
    })),
    [ options, values ],
  );

  const onOptionsSearch = (e) => {
    const { value: search } = e.target;
    setSearchValue(search);
    onSearch(search);
    onSearchValueChange(search);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearchValueChange('');
  };

  useEffect(() => {
    const result = filterOptions(dataSource, searchValue);
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
    <div className={classNames}>
      <div>
        {searchable && (
          <OptionsSearch
            searchValue={searchValue}
            placeholder={searchPlaceholder}
            onOptionsSearch={onOptionsSearch}
            clearSearch={clearSearch}
          />
        )}
        {!views.length && <OptionsEmpty emptyRender={emptyRender} />}
        <div className={`${selector}-multiple-options`}>
          <div className={`${selector}-option-list`}>
            {hasSelectAll && !!views.length && (
              <Checkbox
                checked={checkAll}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
                className={`${selector}-option`}
              >
                全选
              </Checkbox>
            )}
            {views}
          </div>
        </div>
      </div>
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
  );
}

MultiSelect.propTypes = {
  dataSource: PropTypes.array,
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  value: PropTypes.array,
  hasConfirmButton: PropTypes.bool,
  okBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

MultiSelect.defaultProps = {
  dataSource: [],
  searchable: false,
  searchPlaceholder: '',
  value: [],
  hasConfirmButton: false,
  okBtnText: '',
  cancelBtnText: '',
  className: '',
  onChange: noop,
  onSearch: noop,
  onOk: noop,
  onCancel: noop,
};
