export const getCoordinate = (id, ref) => {
  if (!ref.current) return {};

  const {
    x, y, width, height,
  } = ref.current.getBoundingClientRect();
  return {
    x1: x,
    x2: x + width,
    y1: y,
    y2: y + height,
  };
};

export const isInsideRect = (target, rect) => {
  const { x, y } = target;
  const {
    x1, x2, y1, y2,
  } = rect;
  return x >= x1 && x <= x2 && y >= y1 && y <= y2;
};

export const findAllChildNodeClassList = (ele) => {
  const classList = [];
  const fn = (node) => {
    if (node?.childNodes?.length) {
      const childNodes = Array.from(node?.childNodes);
      childNodes.forEach(fn);
    }
    if (node?.classList?.length) {
      classList.push(...Array.from(node.classList));
    }
  };

  if (ele) {
    classList.push(...Array.from(ele.classList));
    if (ele?.childNodes?.length) {
      Array.from(ele?.childNodes).forEach(fn);
    }
  }

  return classList;
};
