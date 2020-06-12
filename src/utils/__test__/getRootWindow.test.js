import getRootWindow from '../get-root-window';

describe('get root window', () => {
	test('normal', () => {
		expect(getRootWindow(false)).toEqual(window);
	});
});
