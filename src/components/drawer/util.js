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
