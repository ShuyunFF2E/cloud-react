export const copyData = (data) => {
  const result = [];

  if (!Array.isArray(data)) return result;

  data.forEach((v, index) => {
    result[index] = { ...v };
    if (v.children && v.children.length) {
      result[index].children = copyData(v.children);
    }
  });

  return result;
};
