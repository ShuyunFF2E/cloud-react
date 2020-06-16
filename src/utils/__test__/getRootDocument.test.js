import getRootDocument from '../get-root-document';
import jsdom from 'jsdom';

describe('get root document', () => {
	test('normal', () => {
		expect(getRootDocument(false)).toEqual(window.document);
	});
});
