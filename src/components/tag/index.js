import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { omit, prefixCls } from '@utils';

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

export default class Tag extends Component {
	static propTypes = {
		type: PropTypes.oneOf([typeEnum.NONE, typeEnum.SUCCESS, typeEnum.WARNING, typeEnum.DEFAULT, typeEnum.DANGER]),
		closable: PropTypes.bool,
		checked: PropTypes.bool,
		disabled: PropTypes.bool,
		onClick: PropTypes.func,
		onClose: PropTypes.func
	};

	static defaultProps = {
		type: '',
		closable: false,
		checked: false,
		disabled: false,
		onClick: () => {},
		onClose: () => {}
	};

	get classes() {
		const { checked, closable, type, disabled } = this.props;

		return classnames(`${prefix}`, {
			closable,
			checked,
			disabled,
			[`${type}`]: !!type
		});
	}

	handleRemove = event => {
		const { onClose } = this.props;

		if (onClose) {
			onClose();
			event.stopPropagation();
		}
	};

	handleClick = evt => {
		const { disabled, onClick } = this.props;

		if (disabled) return;

		if (onClick) {
			onClick(evt);
		}
	};

	render() {
		const { closable, ...others } = this.props;

		const props = omit(others, ['type', 'checked', 'disabled', 'onClick', 'onClose']);

		return (
			<span className={this.classes} onClick={this.handleClick} {...props}>
				{this.props.children}
				{closable ? <Icon type="close" onClick={this.handleRemove} className="tag-close-icon" /> : null}
			</span>
		);
	}
}
