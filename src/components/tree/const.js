export const copyData = (data = {}) => {
  let result = [];

  if (!(data instanceof Array)) return result;

  if (typeof data === 'object' && data !== null) {
    data.forEach((v, index) => {
      result[index] = { ...v };
      if (v.children && v.children.length) {
        result[index].children = copyData(v.children);
      }
    });
  } else {
    result = data;
  }
  return result;
};
