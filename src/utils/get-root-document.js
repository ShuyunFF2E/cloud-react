export default function getRootDocument() {
	let _document = window.document;

	const getDocument = contextWindow => {
		try {
			if (_document === contextWindow.parent.document) {
				return _document;
			}

			_document = contextWindow.parent.document;

			return getDocument(contextWindow.parent);
		} catch (_) {
			return _document;
		}
	};

	return getDocument(window);
}
