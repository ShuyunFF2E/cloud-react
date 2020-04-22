export default function getRootDocument(ignoreFrame) {
	let _document = window.document;

	if (!ignoreFrame) return _document;

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
