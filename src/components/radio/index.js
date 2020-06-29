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
		checked: PropTypes.bool
	};

	static defaultProps = {
		checked: false
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
		const { checked, children, className = '', style, disabled, ...otherProps } = this.props;

		return (
			<label className={classnames(classSelector, className)} style={style}>
				<span className={`${classSelector}-wrapper`}>
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
				<span className={classnames(`${classSelector}-text`, { disabled })}>{children}</span>
			</label>
		);
	}
}

export default Radio;
