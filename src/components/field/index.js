import { useState } from 'react';
import { noop } from '@utils';
import validator from './validator';

const DATA_FIELD = 'data-field';
const emptyState = {};
const emptyValues = ['', null, undefined];

const DEFAULT_OPTS = {
	trigger: 'onChange',
	valueName: 'value',
	checkable: true,
	rules: [],
	onChange: () => {}
};

export default class Field {
	constructor(component, opts = {}) {
		this.fieldsMeta = {};
		this.component = component;
		this.onChange = opts.onChange || noop;
	}

	__fieldsMeta__ = {};

	init = (name, opts = {}) => {
		const {
			initValue,
			rules = DEFAULT_OPTS.rules,
			trigger = DEFAULT_OPTS.trigger,
			onChange = DEFAULT_OPTS.onChange,
			valueName = DEFAULT_OPTS.valueName,
			checkable = DEFAULT_OPTS.checkable
		} = opts;

		let fieldMeta = this.fieldsMeta[name];

		if (!fieldMeta) {
			this.fieldsMeta[name] = {
				...(this.__fieldsMeta__[name] || {}),
				state: '',
				rules,
				valueName,
				trigger,
				initValue,
				checkable,
				change: onChange
			};

			fieldMeta = this.fieldsMeta[name];
		}
		// 更新checkable、重置校验状态和清除错误信息
		else if (fieldMeta.checkable !== checkable && checkable === false) {
			delete fieldMeta.errors;

			fieldMeta.state = '';
			window.requestAnimationFrame(this.__render__);
		}

		Object.assign(fieldMeta, {
			rules,
			checkable,
			value: 'value' in fieldMeta ? fieldMeta.value : initValue
		});

		if (typeof fieldMeta[fieldMeta.trigger] === 'undefined') {
			fieldMeta[fieldMeta.trigger] = (evt, ...others) => {
				this.__onChange__(name, evt, ...others);
				this.__render__();

				this.onChange(name, this.fieldsMeta[name].value, this.getValues());
			};
		}

		return {
			[DATA_FIELD]: name,
			[valueName]: fieldMeta.value,
			[fieldMeta.trigger]: (...arg) => fieldMeta[fieldMeta.trigger](...arg)
		};
	};

	getState(name) {
		if (name in this.fieldsMeta) {
			return this.fieldsMeta[name].state;
		}

		return '';
	}

	getValues = (names = Object.keys(this.fieldsMeta)) => {
		const result = {};

		names.forEach(name => {
			result[name] = this.getValue(name);
		});

		return result;
	};

	getValue = name => {
		const { fieldsMeta, __fieldsMeta__ } = this;

		if (!(name in fieldsMeta) && !(name in __fieldsMeta__)) {
			return undefined;
		}

		const fieldMeta = fieldsMeta[name];
		const __fieldMeta__ = __fieldsMeta__[name];

		if (fieldMeta) {
			return fieldMeta[fieldMeta.valueName];
		}
		if (__fieldMeta__) {
			return __fieldMeta__.value;
		}
		return undefined;
	};

	setValue = (name, value) => {
		const fieldMeta = this.fieldsMeta[name];

		if (fieldMeta && typeof fieldMeta === 'object') {
			fieldMeta[fieldMeta.valueName] = value;
			this.validate([name]);
			return;
		}

		if (name in this.__fieldsMeta__) {
			this.__fieldsMeta__[name].value = value;
		} else {
			this.__fieldsMeta__[name] = { value };
		}
	};

	setValues = (obj = {}) => {
		Object.keys(obj).forEach(name => {
			this.setValue(name, obj[name]);
		});
	};

	getError = name => {
		const fieldMeta = this.fieldsMeta[name];

		if (fieldMeta && fieldMeta.errors && fieldMeta.errors.length) {
			return fieldMeta.errors;
		}

		return null;
	};

	getErrors = (names = Object.keys(this.fieldsMeta)) => {
		if (!names) {
			return {};
		}

		return names.reduce((acc, name) => {
			const err = this.getError(name);

			if (err) {
				acc[name] = err;
			}
			return acc;
		}, {});
	};

	setError = (name, errors) => {
		if (!name || !errors) {
			return;
		}

		const _errors = typeof errors === 'string' ? [errors] : errors;
		const fieldMeta = this.fieldsMeta[name];

		fieldMeta.state = 'error';
		fieldMeta.errors = [...new Set([...(fieldMeta.errors || []), ..._errors])];

		this.__render__();
	};

	setErrors = obj => {
		if (typeof obj !== 'object') {
			return;
		}

		Object.keys(obj).forEach(key => {
			this.setError(key, obj[key]);
		});

		this.__render__();
	};

	reset = (names = Object.keys(this.fieldsMeta)) => {
		const _names = typeof names === 'string' ? [names] : names;

		_names.forEach(name => {
			const fieldMeta = this.fieldsMeta[name];

			if (fieldMeta) {
				let value;

				if (typeof fieldMeta.initValue !== 'undefined') {
					/* 使用时有设置了initValue */
					value = fieldMeta.initValue;
				} else if (typeof fieldMeta.value === 'boolean') {
					value = false;
				} else if (typeof fieldMeta.value === 'string') {
					value = '';
				} else if (typeof fieldMeta.value === 'object' && Array.isArray(fieldMeta.value)) {
					value = [];
				}

				Object.assign(fieldMeta, {
					value,
					state: '',
					errors: undefined
				});

				delete this.__fieldsMeta__[name];
			}
		});

		this.__render__();
	};

	clear = (names = Object.keys(this.fieldsMeta)) => {
		const _names = typeof names === 'string' ? [names] : names;

		_names.forEach(name => {
			const fieldMeta = this.fieldsMeta[name];

			if (fieldMeta) {
				let value;

				if (typeof fieldMeta.value === 'boolean') {
					value = false;
				} else if (typeof fieldMeta.value === 'string' || typeof fieldMeta.value === 'number') {
					value = '';
				} else if (typeof fieldMeta.value === 'object' && Array.isArray(fieldMeta.value)) {
					value = [];
				}

				Object.assign(fieldMeta, {
					value,
					state: '',
					errors: undefined
				});

				delete this.__fieldsMeta__[name];
			}
		});

		this.__render__();
	};

	remove = names => {
		const _names = typeof names === 'string' ? [names] : names;

		_names.forEach(name => {
			delete this.fieldsMeta[name];
			delete this.__fieldsMeta__[name];
		});

		this.__render__();
	};

	validate = (names, callback) => {
		const notFields = typeof names === 'function';
		const _names = notFields || names.length === 0 ? Object.keys(this.fieldsMeta) : [...names];
		const _callback = notFields ? names : callback;

		const errorPromises = [];
		const values = {};

		while (_names.length) {
			const name = _names.shift();
			const fieldMeta = this.fieldsMeta[name];
			const { rules, value, checkable } = fieldMeta;

			if (checkable === true) {
				fieldMeta.state = 'validating';

				const error = validator(name, value, rules);

				if (error instanceof Promise) {
					errorPromises.push(error);
				} else {
					errorPromises.push(Promise.resolve({ name, message: error }));
				}
			}

			values[name] = value;
		}

		return Promise.all(errorPromises).then(res => {
			let errors = null;

			res.forEach(({ name, message }) => {
				const errorMsg = Array.isArray(message) ? message : [message];
				const fieldMeta = this.fieldsMeta[name];

				if (emptyValues.includes(errorMsg.toString())) {
					fieldMeta.state = 'success';
					delete fieldMeta.errors;
				} else {
					errors = errors || {};
					errors[name] = errorMsg;

					fieldMeta.state = 'error';
					fieldMeta.errors = errorMsg;
				}
			});

			this.__render__();

			if (_callback && typeof _callback === 'function') {
				_callback(errors, values);
			}

			return errors;
		});
	};

	__onChange__ = (name, evt, ...others) => {
		const fieldMeta = this.fieldsMeta[name];
		fieldMeta.value = typeof evt === 'object' && 'target' in evt ? evt.target[fieldMeta.valueName] : evt;

		fieldMeta.change(evt, ...others);
		this.validate([name]);
	};

	__render__ = () => {
		const { component } = this;

		if (component && component.setState) {
			/* class API : new Filed(this, opts) */
			component.setState(emptyState);
		} else if (typeof component === 'function') {
			/* hooks API: useField(opts) */
			const dispatch = component;

			// next value
			dispatch(Date.now());
		}
	};
}

export const useField = opts => {
	const [, dispatch] = useState();
	const [field] = useState(() => new Field(dispatch, opts));

	return field;
};

Field.useField = useField;
