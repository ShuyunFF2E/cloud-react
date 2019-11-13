import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { prefixCls } from '@utils/config';

import Icon from '../icon';
import './index.less';

const prefix = `${prefixCls}-tag`;
const typeEnum = {
	NONE: '',
	SUCCESS: 'success',
	WARNING: 'warning',
	DEFAULT: 'default',
	DANGER: 'danger',
}

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
	}

	get classes() {

		const { checked, closable, type, disabled } = this.props;

		return cls(`${prefix}`, {
			'closable': closable,
			'checked': checked,
			'disabled': disabled,
			[`${type}`]: !!type
		});
	}

	hondleRemove = () => {

		const { onClose } = this.props;

		if (onClose) {
			onClose();
		}
	}

	handleClick = () => {

		const { disabled, onClick } = this.props;

		if(disabled) return;

		if (onClick) {
			onClick();
		}
	}

	render() {

		const { closable } = this.props;

		return (
			<span className={this.classes} onClick={this.handleClick}>
				{ this.props.children }
				{closable ? <Icon type="close" onClick={this.hondleRemove} className="tag-close-icon"/> : null}
			</span>
		);
	}
}
