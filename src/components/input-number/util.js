export function isInvalid(value) {
	return Number.isNaN(Number(value)) || value === null || value.toString().trim() === '';
}

export function getCurrentValue(value, min, max, precision) {
	if (isInvalid(value)) {
		return '';
	}
	const val = Number(value).toFixed(Math.abs(parseInt(precision, 10)));
	if (val > max) {
		return max;
	}
	if (val < min) {
		return min;
	}
	return val;
};

export function getMax(value, max) {
	const _isInvalid = isInvalid(value);
	return {
		lessEqualMax: _isInvalid ? false : Number(value) <= max,
		lessMax: _isInvalid ? false : Number(value) < max
	};
}

export function getMin(value, min) {
	const _isInvalid = isInvalid(value);
	return {
		greaterMin: _isInvalid ? false : Number(value) > min,
		greaterEqualMin: _isInvalid ? false : Number(value) >= min
	};
}

export function getValueByBlank(min, max, step) {
	if (min === -Infinity && max === Infinity || min === Infinity && max === -Infinity || min <= 0 && max >= 0) {
		return 0;
	}
	if (min === -Infinity && max === -Infinity) {
		return 0 - step;
	}
	if (min === Infinity && max === Infinity) {
		return 0 + step
	}
	if (min < 0 && max < 0) {
		return max;
	}
	if (min > 0 && max > 0) {
		return min;
	}
	return 0;
}
