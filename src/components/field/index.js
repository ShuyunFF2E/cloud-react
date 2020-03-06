import { useState } from 'react';
import validator from './validator';

const noop = () => {};
const DATA_FIELD = 'data-field';
const emptyState = {};
const emptyValues = ['', null, undefined];

export default class Field {
	constructor(component, opts = {}) {
		this.fieldsMeta = {};
		this.component = component;
		this.onChange = opts.onChange || noop;
	}

	__fieldsMeta__ = {};

	init = (name, opts = {}) => {
		const { trigger = 'onChange', valueName = 'value', initValue, rules = [], onChange = () => {} } = opts;

		if (!this.fieldsMeta[name]) {
			this.fieldsMeta[name] = {
				...this.__fieldsMeta__[name] || {},
				state: '',
				rules,
				valueName,
				trigger,
				initValue,
				change: onChange
			};
		}

		const fieldMeta = this.fieldsMeta[name];

		Object.assign(fieldMeta, { value: 'value' in fieldMeta ? fieldMeta.value : initValue });

		if (typeof fieldMeta[fieldMeta.trigger] === 'undefined') {
			fieldMeta[fieldMeta.trigger] = (evt, ...others) => {
				this.__onChange__(name, evt, ...others);
				this.__render__();

				this.onChange(name, this.fieldsMeta[name].value, this.getValues());
			}
		}

		return {
			[DATA_FIELD]: name,
			[valueName]: fieldMeta.value,
			[fieldMeta.trigger]: (...arg) => fieldMeta[fieldMeta.trigger](...arg)
		};
	}

	getState(name) {
		if (name in this.fieldsMeta) {
			return this.fieldsMeta[name].state
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
		if (!(name in this.fieldsMeta)) {
			return undefined;
		}

		const fieldMeta = this.fieldsMeta[name];

		return fieldMeta[fieldMeta.valueName];
	}

	setValue = (name, value) => {
		const fieldMeta = this.fieldsMeta[name];

		if (typeof fieldMeta === 'object') {
			fieldMeta[fieldMeta.valueName] = value;
			this.validate([name]);
			return;
		}

		if (name in this.__fieldsMeta__) {
			this.__fieldsMeta__[name].value = value;
		} else {
			this.__fieldsMeta__[name] = { value };
		}
	}

	setValues = (obj = {}) => {
		Object.keys(obj).forEach(name => {
			this.setValue(name, obj[name]);
		});
	}

	getError = name => {
		const fieldMeta = this.fieldsMeta[name];

		if (fieldMeta && fieldMeta.errors && fieldMeta.errors.length) {
			return fieldMeta.errors;
		}

		return null;
	}

	getErrors = names => {
		if (!names || Array.isArray(names)) {
			return [];
		}

		const errors = {};

		names.forEach(name => {
			errors[name] = this.getError(name);
		});

		return errors;
	}

	setError = (name, errors) => {
		if (!name || !errors) {
			return;
		}

		const _errors = typeof errors === 'string' ? [errors] : errors;
		const fieldMeta = this.fieldsMeta[name];

		fieldMeta.errors = [...new Set([
			...fieldMeta.errors || [],
			..._errors
		])];

		this.__render__();
	}

	setErrors = (obj) => {
		if (typeof obj !== 'object') {
			return;
		}

		Object.keys(obj).forEach(key => {
			this.setError(key, obj[key]);
		});

		this.__render__();
	}

	reset = (names = Object.keys(this.fieldsMeta)) => {
		const _names = typeof names === 'string' ? [names] : names;

		_names.forEach(name => {
			const fieldMeta = this.fieldsMeta[name];

			if (fieldMeta) {
				let value;

				if (typeof fieldMeta.initValue !== 'undefined') { /* 使用时有设置了initValue */
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
			}
		});

		this.__render__();
	}

	remove = (names) => {
		const _names = typeof names === 'string' ? [names] : names;

		_names.forEach(name => {
			if (name in this.fieldsMeta) {
				delete this.fieldsMeta[name];
			}
		});
	}

	validate = (names, callback) => {
		const notFields = typeof names === 'function';
		const _names = notFields || names.length === 0 ? Object.keys(this.fieldsMeta) : [...names];
		const _callback = notFields ? names : callback;

		const errorPromises = [];
		const values = {};

		while (_names.length) {
			const name = _names.shift();
			const fieldMeta = this.fieldsMeta[name];
			const { rules, value } = fieldMeta;

			fieldMeta.state = 'validating';

			const error = validator(name, value, rules);

			if (error instanceof Promise) {
				errorPromises.push(error);
			} else {
				errorPromises.push(Promise.resolve({ name, message: error }));
			}

			values[name] = value;
		}

		Promise.all(errorPromises).then(res => {
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

		});
	}

	__onChange__ = (name, evt, ...others) => {
		const fieldMeta = this.fieldsMeta[name];
		fieldMeta.value = (
			typeof evt === 'object' && 'target' in evt
				? evt.target[fieldMeta.valueName]
				: evt
		);

		fieldMeta.change(evt, ...others);
		this.validate([name]);
	}

	__render__ = () => {
		const { component } = this;

		if (component && component.setState) {/* class API : new Filed(this, opts) */
			component.setState(emptyState);
		} else if (typeof component === 'function') { /* hooks API: useField(opts) */
			const dispatch = component;

			// next value
			dispatch(Date.now());
		}
	}
}

export const useField = (opts) => {
	const [, dispatch] = useState();
	const [field] = useState(() => new Field(dispatch, opts));

	return field;
}

Field.useField = useField;
