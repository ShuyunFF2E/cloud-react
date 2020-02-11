import React, { Children, cloneElement, useMemo, useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '../../checkbox';
import Button from '../../button';
import { OptionsEmpty, OptionsSearch, selector } from './common';
import { filterOptions } from '../utils';

import '../index.less';

const ConfirmBtn = ({ onOk, onCancel, okBtnText, cancelBtnText }) => {
    return (
        <div className={`${selector}-operate-btn`}>
            <Button type="primary" size="small" className="btn" onClick={onOk}>{ okBtnText }</Button>
            <Button size="small" className="btn" onClick={onCancel}>{ cancelBtnText }</Button>
        </div>
    )
}

export default function MultiSelect(props) {
    const { dataSource, searchable, hasSelectAll, hasConfirmButton, okBtnText, cancelBtnText, searchPlaceholder,
            value, emptyRender, onChange, onSearch, onOk, onCancel, className } = props;
	const [ options, setOptions ] = useState(dataSource);
    const [ searchValue, setSearchValue ] = useState('');
    const [ values, setValues ] = useState(value);
    const [groupValue] = useState(() => {
        const result = Children.map(dataSource, child => {
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
            const result = [...values, val];
            if (!values.includes(val)) onChange(result);
        } else {
            const index = values.findIndex(v => v === val);
            if (index > -1) {
                const result = [...values];
                result.splice(index, 1);
                onChange(result);
            }
        }
    }

    const handleCheckAll = checked => {
        const result = Children.map(dataSource, child => {
            const { value: childValue, disabled } = child.props;
            if (checked) {
                return disabled && !values.includes(childValue) ? null : childValue;
            }
            return disabled && values.includes(childValue) ? childValue : null;
        });
        onChange(result);
    }

	const views = useMemo(() => Children.map(options, child => cloneElement(child, {
        ...child.props,
        multiple: true,
		isSelected: values.includes(child.props.value),
		onChange: onOptionChange
	})), [options, values]);

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

    useEffect(() => {
        setValues(value);
    }, [value]);

    useEffect(() => {
        const valueLength = values.length;
        const groupLength = groupValue.length;
        const result = !!valueLength && valueLength < groupLength;
        setIndeterminate(result);
        setCheckAll(valueLength === groupLength);
    }, [values]);

    return (
        <div className={classNames}>
            {
                searchable &&
                <OptionsSearch
                    searchValue={searchValue}
                    placeholder={searchPlaceholder}
                    onOptionsSearch={onOptionsSearch}
                    clearSearch={clearSearch} />
            }
            {
                !views.length && <OptionsEmpty emptyRender={emptyRender} />
            }
            {
                <div className={`${selector}-multiple-options`}>
                    <div className={`${selector}-option-list`}>
                        {
                            hasSelectAll && !!views.length &&
                            <Checkbox
                                checked={checkAll}
                                indeterminate={indeterminate}
                                onChange={handleCheckAll}
                                className={`${selector}-option`}>
                                全选
                            </Checkbox>
                        }
                        { views }
                    </div>
                    {
                        hasConfirmButton &&
                        <ConfirmBtn
                            onOk={onOk}
                            onCancel={onCancel}
                            okBtnText={okBtnText}
                            cancelBtnText={cancelBtnText} />
                    }
                </div>
            }
        </div>
    )
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
}

MultiSelect.defaultProps = {
	dataSource: [],
    searchable: false,
    searchPlaceholder: '',
    value: [],
    hasConfirmButton: false,
	okBtnText: '',
	cancelBtnText: '',
	className: '',
	onChange: () => {},
    onSearch: () => {},
    onOk: () => {},
    onCancel: () => {},
}
