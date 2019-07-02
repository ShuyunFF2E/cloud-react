import React, { Children, cloneElement, useMemo, useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../../icon';

import '../index.less';

const selector = 'select';

const OptionsEmpty = () => {
  return <div className={`${selector}-empty-options`}>暂时没有数据</div>
}

const filterOptions = (options, filter) => {
  const result = [];
  Children.map(options, child => {
    const { value, children } = child.props;
    if (value.indexOf(filter) > -1 || children.indexOf(filter) > -1) result.push(child);
  })
  return result;
}

export default function SingleSelect(props) {
  const { dataSource, searchable, value, onChange, onSearch, className, ...otherProps } = props;
  const [ options, setOptions ] = useState(dataSource);
  const [ searchValue, setSearchValue ] = useState('');
  const classNames = classnames(`${selector}-select-options`, className);

  const views = useMemo(() => Children.map(options, child => cloneElement(child, {
    ...child.props,
    isSelected: value === child.props.value,
    onChange
  })), [options, value]);

  const onOptionsSearch = e => {
    const { value: search } = e.target;
    setSearchValue(search);
    onSearch(search)
  };

  const clearSearch = () => setSearchValue('');

  useEffect(() => {
    const result = filterOptions(dataSource, searchValue);
    setOptions(result);
  }, [searchValue]);

  return (
    <div className={classNames} {...otherProps}>
      {
        searchable &&
        <div className={`${selector}-search`}>
          <input
            value={searchValue}
            onChange={onOptionsSearch}
            className={`${selector}-search-input`} />
          <Icon
            type="close-circle-solid"
            className={`${selector}-search-icon`}
            onClick={clearSearch} />
        </div>
      }
      { views }
      {
        !views.length && <OptionsEmpty />
      }
    </div>
  )
}

SingleSelect.propTypes = {
  dataSource: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  searchable: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func
}

SingleSelect.defaultProps = {
  dataSource: [],
  searchable: false,
  value: '',
  className: '',
  onChange: () => {},
  onSearch: () => {}
}
