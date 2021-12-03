import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop, omit, prefixCls } from '@utils';

import Icon from '../icon';
import './index.less';

const prefix = `${prefixCls}-tag`;
const typeEnum = {
	NONE: '',
	SUCCESS: 'success',
	WARNING: 'warning',
	DEFAULT: 'default',
	DANGER: 'danger'
};

const sizeEnum = {
	SMALL: 'small',
	NORMAL: 'normal',
};

export default class Tag extends Component {
	static propTypes = {
		type: PropTypes.oneOf([typeEnum.NONE, typeEnum.SUCCESS, typeEnum.WARNING, typeEnum.DEFAULT, typeEnum.DANGER]),
		size: PropTypes.oneOf([sizeEnum.SMALL, sizeEnum.NORMAL]),
		color: PropTypes.string,
		rounded: PropTypes.bool,
		closable: PropTypes.bool,
		checkable: PropTypes.bool,
		checked: PropTypes.bool,
		disabled: PropTypes.bool,
		onClick: PropTypes.func,
		onClose: PropTypes.func
	};

	static defaultProps = {
		type: '',
		size: 'normal',
		color: '',
		rounded: false,
		closable: false,
		checkable: true,
		checked: false,
		disabled: false,
		onClick: noop,
		onClose: noop
	};

	get classes() {
		const { checked, closable, type, size, icon, checkable, color, rounded, disabled } = this.props;

		return classnames(`${prefix}`, {
			closable,
			checked,
			disabled,
			rounded,
			icon: !!icon,
			[size]: size,
			checkable: checkable && !color,
			[color]: !!color,
			[type]: !!type,
		});
	}

	handleRemove = event => {
		this.props.onClose();
		event.stopPropagation();
	};

	handleClick = event => {
		const { disabled, onClick } = this.props;

		if (disabled) return;
		onClick(event);
	};

	render() {
		const { closable, disabled, icon, ...others } = this.props;

		const props = omit(others, ['type', 'size', 'rounded', 'checkable', 'checked', 'color', 'onClick', 'onClose']);

		return (
			<span className={this.classes} onClick={this.handleClick} {...props}>
				{icon && <Icon type={icon} className="tag-icon" />}
				{this.props.children}
				{closable && !disabled ? <Icon type="close" onClick={this.handleRemove} className="tag-close-icon" /> : null}
			</span>
		);
	}
}
