import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls } from '@utils';
import Checkbox from '../checkbox';
import Tooltip from '../tooltip';
import './index.less';

const classSelector = `${prefixCls}-complex`;

export default function ComplexCheckbox(props) {
	const { imgSrc, title, content, textOverflowEllipsis, checkboxType, contentStyle, ...otherProps } = props;

	const titleContentMode = !!(title && content && !imgSrc);
	const titleContentImgMode = !!(title && content && imgSrc);

	return (
		<Checkbox
			className={classNames(classSelector, {
				[`${classSelector}-title-content`]: titleContentMode,
				[`${classSelector}-img`]: titleContentImgMode,
				[`${classSelector}-disabled`]: props.disabled,
				[`${classSelector}-overflow-ellipsis`]: textOverflowEllipsis,
				[`${classSelector}-checkbox-card`]: checkboxType === 'card',
			})}
			{...otherProps}>
			{imgSrc && <img alt="header" src={imgSrc} />}
			<div>
				{title && <p className={`${classSelector}-title`}>{title}</p>}
				{content &&
					(textOverflowEllipsis ? (
						<Tooltip content={content}>
							<p className={`${classSelector}-content`} style={contentStyle}>
								{content}
							</p>
						</Tooltip>
					) : (
						<p className={`${classSelector}-content`} style={contentStyle}>
							{content}
						</p>
					))}
			</div>
		</Checkbox>
	);
}

ComplexCheckbox.propTypes = {
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	imgSrc: PropTypes.string,
	title: PropTypes.string,
	textOverflowEllipsis: PropTypes.bool,
	contentStyle: PropTypes.object,
	checkboxType: PropTypes.string,
};

ComplexCheckbox.defaultProps = {
	imgSrc: '',
	title: '',
	textOverflowEllipsis: false,
	contentStyle: {},
	checkboxType:'',
};
