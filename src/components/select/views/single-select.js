import React, { Children, cloneElement, useMemo, useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { OptionsEmpty, OptionsSearch } from './common';
import { filterOptions } from '../utils';

import '../index.less';

const selector = 'select';

export default function SingleSelect(props) {
	const { dataSource, searchable, value, emptyRender, onChange, onSearch, className, ...otherProps } = props;
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
			<OptionsSearch
				searchValue={searchValue}
				onOptionsSearch={onOptionsSearch}
				clearSearch={clearSearch} />
		}
		{ views }
		{
			!views.length && <OptionsEmpty emptyRender={emptyRender} />
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
