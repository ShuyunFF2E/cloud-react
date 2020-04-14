import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from '@utils/omit';
import { prefixCls } from '@utils/config';

import Icon from '../icon';
import Textarea from './textarea';

import './index.less';

const noop = () => {};
const nothing = undefined;
const ENTER_KEY_CODE = 13;

class Input extends React.PureComponent {
	static propTypes = {
		size: PropTypes.oneOf(['large', 'default', 'small']),
		style: PropTypes.object,
		value: PropTypes.any,
		defaultValue: PropTypes.any,
		className: PropTypes.string,
		prefix: PropTypes.any,
		suffix: PropTypes.any,
		addonAfter: PropTypes.any,
		addonBefore: PropTypes.any,
		hasCounter: PropTypes.bool,
		hasClear: PropTypes.bool,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		onKeyDown: PropTypes.func,
		onEnter: PropTypes.func
	};

	static defaultProps = {
		size: 'default',
		style: {},
		value: nothing,
		defaultValue: nothing,
		className: '',
		prefix: nothing,
		suffix: nothing,
		addonAfter: nothing,
		addonBefore: nothing,
		hasCounter: false,
		hasClear: false,
		onFocus: noop,
		onBlur: noop,
		onChange: noop,
		onKeyDown: noop,
		onEnter: noop
	};

	static getDerivedStateFromProps({ value }) {
		if (value !== undefined) {
			return { value };
		}
		return null;
	}

	static Textarea = Textarea;

	constructor(props) {
		super(props);
		const { value, defaultValue } = props;
		this.state = {
			focused: false,
			value: (value === nothing ? defaultValue : value) || ''
		};
		this.inputRef = React.createRef();
	}

	get isPure() {
		const { hasCounter, hasClear, hasLimtHint, prefix, suffix, addonBefore, addonAfter } = this.props;

		return !hasCounter && !hasClear && !hasLimtHint && !prefix && !suffix && !addonBefore && !addonAfter;
	}

	get inputNode() {
		return this.inputRef.current || document.createElement('input');
	}

	onKeyDown = evt => {
		const { onEnter, onKeyDown } = this.props;

		if (evt.keyCode === ENTER_KEY_CODE) {
			onEnter(evt);
		}
		onKeyDown(evt);
	};

	onChange = evt => {
		this.setValue(evt.target.value, evt);
	};

	onFocus = evt => {
		this.setState({ focused: true }, () => this.props.onFocus(evt));
	};

	onBlur = evt => {
		this.setState({ focused: false }, () => this.props.onBlur(evt));
	};

	onClearValue = evt => {
		this.setValue('', evt, () => this.inputNode.focus());
	};

	setValue(value, evt, callback = noop) {
		// not using value on props
		if (this.props.value === nothing) {
			this.setState({ value }, callback);
		}

		let keyboardEvent = evt;

		// click the clear button
		// handle consistent events
		if (evt.type === 'click') {
			keyboardEvent = Object.assign({}, evt, {
				target: this.inputNode,
				currentTarget: this.inputNode
			});
			this.inputNode.value = '';
		}

		this.props.onChange(keyboardEvent);

		callback();
	}

	renderClearIcon() {
		if (this.props.disabled) return null;

		const { value } = this.state;

		const type = 'close-circle-solid';
		const classNames = classnames(`${prefixCls}-input-clear`, {
			show: value
		});

		return <Icon type={type} className={classNames} onClick={this.onClearValue} />;
	}

	renderCounter() {
		const { hasCounter, maxLength } = this.props;
		const { value } = this.state;

		return hasCounter && maxLength ? (
			<span className={classnames(`${prefixCls}-input-counter`)}>
				<span>{value.length}</span>/{maxLength}
			</span>
		) : null;
	}

	renderSuffix() {
		const { hasClear, suffix } = this.props;

		return hasClear ? (
			<>
				{this.renderClearIcon()}
				{this.renderCounter()}
				{suffix}
			</>
		) : (
			<>
				{this.renderCounter()}
				{suffix}
			</>
		);
	}

	render() {
		const { isPure } = this;
		const { value, focused } = this.state;
		const { size, className, style, hasClear, hasCounter, addonAfter, addonBefore, prefix, suffix, ...others } = this.props;

		const _className = `${prefixCls}-input`;

		const props = omit(others, ['defaultValue', 'hasCounter', 'hasClear', 'prefix', 'suffix', 'addonAfter', 'addonBefore', 'onEnter']);
		const commonProps = {
			ref: this.inputRef,
			value,
			onBlur: this.onBlur,
			onFocus: this.onFocus,
			onChange: this.onChange,
			onKeyDown: this.onKeyDown
		};

		// basic input
		if (isPure) {
			return <input {...props} {...commonProps} style={isPure ? style : {}} className={classnames(_className, className, size)} />;
		}

		// merge clearIcon & suffix
		const _suffix = this.renderSuffix();

		// has addon content
		return (
			<InputWrapper
				prefix={prefix}
				suffix={_suffix}
				addonAfter={addonAfter}
				addonBefore={addonBefore}
				style={style}
				className={classnames(className, {
					[`${_className}-focus`]: focused,
					[`${_className}-disabled`]: props.disabled
				})}>
				<input {...props} {...commonProps} className={classnames(_className, size)} />
			</InputWrapper>
		);
	}
}

// InputWrapper
function InputWrapper({ prefix, suffix, addonBefore, addonAfter, className, style, children }) {
	const both = prefix || suffix;
	const addon = addonBefore || addonAfter;

	// complex types
	if (both && addon) {
		return (
			<InputWrapper addonBefore={addonBefore} addonAfter={addonAfter} className={className} style={style}>
				<InputWrapper prefix={prefix} suffix={suffix}>
					{children}
				</InputWrapper>
			</InputWrapper>
		);
	}

	if (both && !addon) {
		return (
			<InputWrapper className={classnames(`${prefixCls}-input-affix`, className)} style={style}>
				<Addon className={classnames(`${prefixCls}-input-prefix`)}>{prefix}</Addon>
				{children}
				<Addon className={classnames(`${prefixCls}-input-suffix`)}>{suffix}</Addon>
			</InputWrapper>
		);
	}

	if (!both && addon) {
		return (
			<div className={classnames(`${prefixCls}-input-wrapper`, className)} style={style}>
				<InputWrapper>
					<Addon className={classnames(`${prefixCls}-input-addon`)}>{addonBefore}</Addon>
					{children}
					<Addon className={classnames(`${prefixCls}-input-addon`)}>{addonAfter}</Addon>
				</InputWrapper>
			</div>
		);
	}

	return (
		<div className={classnames(`${prefixCls}-input-group`, className)} style={style}>
			{children}
		</div>
	);
}

InputWrapper.propTypes = {
	prefix: PropTypes.any,
	suffix: PropTypes.any,
	addonAfter: PropTypes.any,
	addonBefore: PropTypes.any,
	children: PropTypes.any,
	className: PropTypes.string
};

InputWrapper.defaultProps = {
	prefix: null,
	suffix: null,
	addonAfter: null,
	addonBefore: null,
	children: null,
	className: ''
};

// Addon
function Addon({ className, children }) {
	return !children ? null : <div className={className}>{children}</div>;
}

Addon.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any
};

Addon.defaultProps = {
	className: '',
	children: null
};

export default Input;
