import React, { Children, cloneElement, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils/config';

import './index.less';

const noop = () => {};
const classSelector = `${prefixCls}-radio`;

function Group(props) {

	const { children, defaultValue, value, onChange, disabled, horizontal, vertical } = props;
	const [currentValue, setCurrentValue] = useState(defaultValue);

	useEffect(() => {
		setCurrentValue(value === undefined ? defaultValue : value);
	}, [value]);

	const radios = useMemo(() => Children.map(children, child => cloneElement(child, {
		disabled,
		checked: child.props.value === currentValue,
		onChange(val, evt) {
			setCurrentValue(val);
			onChange(val, evt);
		}
	})), [currentValue, disabled]);

	return (
		<span className={classnames(`${classSelector}-group`, { horizontal, vertical })}>
			{ radios }
		</span>
	)
}

Group.propTypes = {
	defaultValue: PropTypes.node,
	value: PropTypes.node,
	onChange: PropTypes.func,
	disabled: PropTypes.bool
};

Group.defaultProps = {
	defaultValue: undefined,
	value: undefined,
	onChange: noop,
	disabled: false
};

class Radio extends React.Component {

	static propTypes = {
		value: PropTypes.node.isRequired,
		checked: PropTypes.bool,
	};

	static defaultProps = {
		checked: false,
	};

	static Group = Group;

	shouldComponentUpdate(nextProps) {

		const { checked, disabled } = nextProps;
		const { checked: prevChecked, disabled: prevDisabled } = this.props;

		return checked !== prevChecked || disabled !== prevDisabled;
	}

	onChangeAction(evt) {
		const { value, onChange } = this.props;
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
					<span className={`${classSelector}-inner`}/>
				</span>
				<span className={classnames(`${classSelector}-text`, { disabled })}>{ children }</span>
			</label>
		)
	}

}

export default Radio;
