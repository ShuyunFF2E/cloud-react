import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Checkbox from '../../checkbox';
import { selector } from './common';

import '../index.less';

export default function Option(props) {
	const { disabled, isSelected, multiple, className, onChange, isSupportTitle, ...otherProps } = props;

	const getTitle = arr => {
		let title = '';
		if (isSupportTitle) {
			title = Array.isArray(arr) ? arr.filter(item => typeof item === 'string').join('') : arr;
		}
		return title;
	};

	const onOptionClick = () => {
		if (disabled) return;

		onChange(props);
	};
	const classNames = classnames(`${selector}-option`, { disabled, selected: isSelected }, className);

	const { showText } = otherProps;

  if (multiple) {
		const { value, children } = otherProps;
    const childrenType = typeof children === 'string';
    return (
			<label className={classnames(classNames, `${selector}-multi-option`)}>
				<Checkbox checked={isSelected} disabled={disabled} value={value} onChange={onChange} />
        {
          childrenType ? <span title={getTitle(children)} dangerouslySetInnerHTML={{ __html: showText }} /> :
            <span title={getTitle(children)}>{children}</span>
        }
			</label>
		);
	}

	const { children, ...others } = otherProps;
  const childrenType = typeof children === 'string';
  return useMemo(
		() => (
			<div {...others} onClick={onOptionClick} className={classNames}>
        {
          childrenType ? <span title={getTitle(children)} dangerouslySetInnerHTML={{ __html: showText }}/> :
            <span title={getTitle(children)}>{children}</span>
        }
			</div>
		),
		[isSelected, showText]
	);
}

Option.propTypes = {
	disabled: PropTypes.bool,
	isSupportTitle: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
	onChange: PropTypes.func
};

Option.defaultProps = {
	disabled: false,
	isSupportTitle: false,
	value: '',
	className: '',
	onChange: noop
};
