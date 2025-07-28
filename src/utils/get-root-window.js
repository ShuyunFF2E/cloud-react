export default function getRootWindow(ignoreFrame = true) {
  let _win = window;

  if (!ignoreFrame) return _win;

  const getDocument = ({ parent }) => {
    try {
      // 不同域，直接返回
      if (!parent || !parent.document) {
        return _win;
      }

      if (_win === parent) {
        return _win;
      }

      _win = parent;

      return getDocument(_win);
    } catch (_) {
      return _win;
    }
  };

  return getDocument(window);
}
