/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import Icon from 'cloud-react/icon';
import './index.less';

const prefix = 'tag';

export default class Tag extends Component {

	static propTypes = {
		type: PropTypes.string,
		closable: PropTypes.bool,
		checkable: PropTypes.bool,
		checked: PropTypes.bool,
		disabled: PropTypes.bool,
		onClick: PropTypes.func,
		onClose: PropTypes.func
	};

	static defaultProps = {
		closable: false
	}

	state = {
		visible: true
	};
	
	setVisible = (visible, e) => {
		const { onClose } = this.props;
		if (onClose) {
			onClose(e);
		}
		// eslint-disable-next-line react/no-unused-state
		this.setState({ visible });

	}

	getClasses() {
		const { visible } = this.state;
		const { closable, type, checkable, checked , disabled } = this.props;
		return cls(`${prefix}`, {
			[`${prefix}-hidden`]: !visible,
			[`${prefix}-closable`]: closable,
			[`${prefix}-checkable`]: checkable,
			[`${prefix}-checked`]: checked,
			[`${prefix}-disabled`]: disabled,
			[`${prefix}-${type}`]: !!type
		});
	}

	closeTag = e => {
		this.setVisible(false, e);
	}

	handleClick = () => {
		const { checked, disabled, onClick } = this.props;
		if(disabled) return;
    if (onClick) {
      onClick(checked);
    }
	}

	renderCloseIcon() {
		const { closable } = this.props;
		return closable ? <Icon type="close" onClick={this.closeTag}/> : null;
	}

	renderTag() {
		return (<span className={this.getClasses()} onClick={this.handleClick}>
			{this.props.children}
			{this.renderCloseIcon()}
		</span>);
	}

	render() {
		return (this.renderTag())
	}
}

