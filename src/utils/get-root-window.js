export default function getRootWindow(ignoreFrame = true) {
	let _win = window;

	if (!ignoreFrame) return _win;

	const getDocument = contextWindow => {
		try {
			if (_win === contextWindow.parent) {
				return _win;
			}

			_win = contextWindow.parent;

			return getDocument(_win);
		} catch (_) {
			return _win;
		}
	};

	return getDocument(window);
}
