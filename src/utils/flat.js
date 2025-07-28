export default function flat(children, deep) {
  const flatDeep = (arr, d) => {
    if (d > 0) {
      return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []);
    }
    return arr.slice();
  };
  return flatDeep(children, deep);
}
