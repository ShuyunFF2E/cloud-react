import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls } from '@utils/config';

import './index.less';

const noop = () => {};
const classSelector = `${prefixCls}-checkbox`;

function Group(props) {

	const { children, value, onChange, disabled, layout } = props;

	let checkedValue = value ? [...value] : value;

	const group = Children.map(children, child => cloneElement(child, {

		disabled: disabled === undefined ? child.props.disabled : disabled,

		checked: checkedValue === undefined ? undefined : checkedValue.indexOf(child.props.value) > -1,

		onChange(checked, val) {
			if (checkedValue === undefined) {
				checkedValue = [];
			}

			const index = checkedValue.indexOf(val);

			if (index > -1 && !checked) {
				checkedValue.splice(index, 1);
			}

			if (index === -1 && checked) {
				checkedValue.push(val);
			}

			onChange(checkedValue);
		}
	}));

	const classes = classNames(`${classSelector}-group`, {
		vertical: layout === 'v',
		horizontal: layout === 'h'
	});

	return (
		<span className={classes}>
			{ group }
		</span>
	)
}

Group.propTypes = {
	value: PropTypes.array,
	disabled: PropTypes.bool,
	layout: PropTypes.string,
	onChange: PropTypes.func
};

Group.defaultProps = {
	value: undefined,
	disabled: undefined,
	layout: 'h',
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
		const { onChange, value } = this.props;
		const checked = !this.isChecked();

		this.setState({ checked });

		onChange(checked, value);
	}

	isChecked() {
		const { checked } = this.props;
		return checked === undefined ? this.state.checked : checked;
	}

	render() {
		const { disabled, indeterminate, className = '', value = '', style, children } = this.props;
		const checked = this.isChecked();

		const classes = classNames(classSelector, className, {
			[`${classSelector}-disabled`]: disabled,
			[`${classSelector}-indeterminate`]: checked ? false : indeterminate,
			[`${classSelector}-checked`]: checked
		});

		return (
			<label className={classes} style={style}>
				<span className={ `${classSelector}-wrapper` }>
					<input type="checkbox"
						   value={value}
						   disabled={disabled}
						   className={`${classSelector}-input`}
						   onChange={() => { this.onChangeAction() }}
					/>
					<span className={`${classSelector}-inner`}/>
				</span>
				<span className={`${classSelector}-text`}>{children}</span>
			</label>
		)
	}
}

export default Checkbox;
