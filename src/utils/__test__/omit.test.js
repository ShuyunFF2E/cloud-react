import omit from '../omit';

describe('omit', () => {
	test('filter props', () => {
		const props = {
			a: 1,
			b: 2,
			c: 3,
			d: 4,
			e: 5,
			f: 6
		};

		const result = {
			a: 1,
			c: 3,
			e: 5,
			f: 6
		};

		const omitFields = ['b', 'd'];

		expect(omit(props, omitFields)).toEqual(result);
	});
});
