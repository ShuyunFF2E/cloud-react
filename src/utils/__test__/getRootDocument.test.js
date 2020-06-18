import getRootDocument from '../get-root-document';

describe('get root document', () => {
	test('normal', () => {
		expect(getRootDocument(false)).toEqual(window.document);
	});
});
