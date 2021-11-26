import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
/* eslint-disable-next-line */
import Group from './group';

import './index.less';

const classSelector = `${prefixCls}-radio`;

class Radio extends React.Component {
	static propTypes = {
		value: PropTypes.node.isRequired,
		checked: PropTypes.bool,
		radioStyle: PropTypes.object,
		textStyle: PropTypes.object,
	};

	static defaultProps = {
		checked: false,
		radioStyle: {},
		textStyle: {},
	};

	static Group = Group;

	/**
	 * hotfix:
	 * Radio存在children组件时
	 * Radio的父级组件更新后导致Radio.children更新不了
	 */
	// shouldComponentUpdate(nextProps) {

	// 	const { checked, disabled } = nextProps;
	// 	const { checked: prevChecked, disabled: prevDisabled } = this.props;

	// 	return checked !== prevChecked || disabled !== prevDisabled;
	// }

	onChangeAction(evt) {
		const { value, onChange, disabled } = this.props;
		if (disabled) return;
		onChange(value, evt);
	}

	render() {
		const { checked, children, className = '', style, disabled, radioStyle, textStyle, ...otherProps } = this.props;

		return (
			<label className={classnames(classSelector, className)} style={style}>
				<span className={`${classSelector}-wrapper`} style={radioStyle }>
					<input
						{...otherProps}
						type="radio"
						checked={checked}
						disabled={disabled}
						className={`${classSelector}-input`}
						onChange={this.onChangeAction.bind(this)}
					/>
					<span className={`${classSelector}-inner`} />
				</span>
				<span className={classnames(`${classSelector}-text`, { disabled })} style={textStyle}>{children}</span>
			</label>
		);
	}
}

export default Radio;