export function isInvalid(value) {
	return Number.isNaN(Number(value)) || value === null || value.toString().trim() === '';
}

/**
 *
 *
 * @export
 * @param {*} value 传入的值
 * @param {*} min 最大
 * @param {*} max 最小
 * @param {boolean} [precision=false] 精度，false为无限
 * @returns
 */
export function getCurrentValue(value, min, max, precision = -1) {
	if (isInvalid(value)) {
		return '';
	}
	const val = precision >= 0 ? Number(value).toFixed(Math.abs(parseInt(precision, 10))) : Number(value);
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

/**
 *
 * 解决js精度丢失
 * @export
 * @param {*} n1
 * @param {*} n2
 * @param {string} [type='add'] 运算类型，默认加法(可扩展)
 * @returns
 */
export function fixDoubleOperation(n1, n2, type = 'add') {
	const l1 = String(n1).indexOf('.') >= 0 ? String(n1).split('.')[1].length : 0
	const l2 = String(n2).indexOf('.') >= 0 ? String(n2).split('.')[1].length : 0
	const displacement = 10 ** Math.max(l1,l2)
	const _n1 = n1 * displacement
	const _n2 = n2 * displacement
	switch (type) {
		case 'add': {
			return (_n1 + _n2) / displacement
		}
		default: {
			return (_n1 + _n2) / displacement
		}
	}
	
}
