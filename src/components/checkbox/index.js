import React, { Children, cloneElement } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.less';

const noop = () => {};
const classSelector = 'checkbox';

function Group(props) {

	const { children, checkedValue, onChange, disabled, horizontal, vertical } = props;

	const group = Children.map(children, child => cloneElement(child, {

		disabled: disabled === undefined ? child.props.disabled : disabled,

		checked: checkedValue === undefined ? undefined : checkedValue.indexOf(child.props.value) > -1,

		onChange(checked, val) {
			if (checkedValue !== undefined) {

				const index = checkedValue.indexOf(val);

				if (index > -1 && !checked) {
					checkedValue.splice(index, 1);
				}

				if (index === -1 && checked) {
					checkedValue.push(val);
				}
			}

			onChange(checkedValue);
		}
	}));

	return (
		<span className={classNames(`${classSelector}-group`, { horizontal, vertical })}>
			{ group }
		</span>
	)
}

Group.propTypes = {
	checkedValue: PropTypes.array,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};

Group.defaultProps = {
	checkedValue: undefined,
	disabled: undefined,
	onChange: noop
};

class Checkbox extends React.Component {

	static propTypes = {
		value: PropTypes.any,
		defaultChecked: PropTypes.bool,
		checked: PropTypes.bool,
		indeterminate: PropTypes.bool,
		disabled: PropTypes.bool,
		children: PropTypes.node,
		onChange: PropTypes.func
	};

	static defaultProps = {
		value: undefined,
		defaultChecked: undefined,
		checked: undefined,
		indeterminate: false,
		disabled: false,
		children: '',
		onChange: noop
	};

	static Group = Group;

	constructor(props) {
		super(props);

		this.state = {
			checked: props.defaultChecked
		};
	}

	onChangeAction() {
		const { onChange, disabled, value } = this.props;
		const checked = !this.isChecked();

		if (disabled) {
			return;
		}

		this.setState({ checked });

		onChange(checked, value);
	}

	isChecked() {
		const { checked } = this.props;
		return checked === undefined ? this.state.checked : checked;
	}

	isIndeterminate() {
		const checked = this.isChecked();
		return checked ? false : this.props.indeterminate;
	}

	render() {
		const { disabled, className = '', value = '', style, children } = this.props;

		const classes = classNames(classSelector, className, {
			[`${classSelector}-disabled`]: disabled,
			[`${classSelector}-indeterminate`]: this.isIndeterminate(),
			[`${classSelector}-checked`]: this.isChecked()
		});

		return (
			<label className={classes} style={style}>
				<span className={ `${classSelector}-wrapper` }>
					<input type="checkbox"
						   value={value}
						   className={`${classSelector}-input`}
						   onChange={() => { this.onChangeAction() }}
					/>
					<span className={`${classSelector}-inner`}/>
				</span>
				<span>{children}</span>
			</label>
		)
	}
}

export default Checkbox;
