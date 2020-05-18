const MIN = 'min';
const MAX = 'max';
const LEN = 'len';
const PATTERN = 'pattern';
const REQUIRED = 'required';
const VALIDATOR = 'validator';

const requiredValidator = (rule, value) => {
	if (
		rule[REQUIRED] &&
		(['', undefined, null].includes(value) ||
			String(value).trim().length === 0 ||
			(Array.isArray(value) && value.length === 0) ||
			(value instanceof Object &&
				Object.keys(value)
					.map(key => value[key])
					.filter(v => !v).length !== 0))
	) {
		return rule.message || '必填项';
	}
	return null;
};

const patternValidator = (rule, value) => {
	if (rule[PATTERN] instanceof RegExp && !rule[PATTERN].test(value)) {
		return rule.message || '内容格式不正确';
	}
	return null;
};

const minValidator = (rule, value) => {
	const _value = Number(value);

	if (!Number.isNaN(_value) && _value < rule[MIN]) {
		return rule.message || `内容最小为${rule[MIN]}`;
	}
	return null;
};

const maxValidator = (rule, value) => {
	const _value = Number(value);

	if (!Number.isNaN(_value) && _value > rule[MAX]) {
		return rule.message || `内容最大为${rule[MAX]}`;
	}
	return null;
};

const lenValidator = (rule, value) => {
	if (!Number.isNaN(Number(rule[LEN])) && typeof value === 'string' && value.length > rule[LEN]) {
		return rule.message || `字符最大长度为${rule[LEN]}`;
	}
	return null;
};

const isError = errors => errors.some(error => !(error instanceof Promise) && Boolean(error));

export default function validator(name, value, rules) {
	let error;

	const _rules = [...rules];

	while (_rules.length && !isError([error])) {
		const rule = _rules.shift();

		if (REQUIRED in rule) {
			error = requiredValidator(rule, value);
		} else if (PATTERN in rule) {
			error = patternValidator(rule, value);
		} else if (MIN in rule) {
			error = minValidator(rule, value);
		} else if (MAX in rule) {
			error = maxValidator(rule, value);
		} else if (LEN in rule) {
			error = lenValidator(rule, value);
		} else if (VALIDATOR in rule && typeof rule[VALIDATOR] === 'function') {
			error = new Promise(resolve => {
				rule[VALIDATOR](name, value, err => {
					resolve({ name, message: err });
				});
			});
		}
	}

	return error;
}
