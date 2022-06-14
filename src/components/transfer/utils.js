// 获取所有叶子节点
export const getLeafNodes = (nodes) => {
  const resData = [];
  const map = (data) => {
    data.forEach((child) => {
      if (child.children && child.children.length > 0) {
        return map(child.children);
      }
      return resData.push(child);
    });
  };
  map(nodes);
  return resData;
};

// tree过滤掉checkeds数组中的key
export const getSourceTree = (nodes, checkeds) => nodes
  .filter((item) => !checkeds.includes(item.id))
  .map((item) => {
    const newItem = { ...item };
    if (item.children && item.children.length > 0) {
      newItem.children = getSourceTree(item.children, checkeds);
    }
    return newItem;
  })
  .filter(
    (item) => (item.children && item.children.length !== 0) || !item.children,
  );

// 获取目标树结构
export const getTargetTree = (nodes, value) => {
  const leaf = getLeafNodes(nodes)
    .map((item) => item.id)
    .filter((id) => !value.includes(id));
  return getSourceTree(nodes, leaf);
};
