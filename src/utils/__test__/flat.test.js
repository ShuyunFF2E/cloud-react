import flat from '../flat';

describe('flat array data', () => {
	const result = [1, 2, 3, 4, 5, 6];
	test('empty array', () => {
		expect(flat([], 1)).toEqual([]);
	});

	test('flat 1 layer equals origin', () => {
		expect(flat(result, 1)).toEqual(result);
	});

	test('flat 2 layer arrry to 1 layer', () => {
		const arr = [1, 2, [3, 4, 5], 6];
		expect(flat(arr, 1)).toEqual(result);
	});

	test('flat 3 layer arrry to 2 layer', () => {
		const arr = [1, 2, [3, [4, 5]], 6];
		expect(flat(arr, 1)).toEqual([1, 2, 3, [4, 5], 6]);
	});

	test('flat 3 layer arrry to 1 layer', () => {
		const arr = [1, 2, [3, [4, 5]], 6];
		expect(flat(arr, 3)).toEqual(result);
	});

	test('flat 4 layer arrry to 1 layer', () => {
		const arr = [1, 2, [3, [4, [5]]], 6];
		expect(flat(arr, Infinity)).toEqual(result);
	});
});
