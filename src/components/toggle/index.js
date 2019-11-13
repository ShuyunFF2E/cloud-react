import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils/config';
import './index.less';

class Toggle extends Component {

	handleClick = (event) => {

		const { checked, disabled, onChange } = this.props;

		if (disabled) {
			return;
		}

		if (onChange) {
			onChange(!checked, event);
		}
	}

	render() {

		const { checked, checkedText, unCheckedText, size, disabled } = this.props;

		const wrapper = classNames(`${prefixCls}-toggle`, {
			[`${prefixCls}-toggle-small`]: size === 'small',
			[`${prefixCls}-toggle-checked`]: checked,
			[`${prefixCls}-toggle-disabled`]: disabled
		});

		return (
			<button type="button" className={wrapper} onClick={this.handleClick}>
				<span className={`${checked}-toggle-inner`}>{ checked ? checkedText : unCheckedText }</span>
			</button>
		);
	}
}

Toggle.propTypes = {
	size: PropTypes.oneOf(['default', 'small']),
	checked: PropTypes.bool,
	checkedText: PropTypes.string,
	unCheckedText: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};

Toggle.defaultProps = {
	size: 'default',
	checked: false,
	checkedText: '',
	unCheckedText: '',
	disabled: false,
	onChange: () => {}
};

export default Toggle;
