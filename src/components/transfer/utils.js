// 为树数据增加必要属性
export const initTree = (data, level = 0, pid = null) => data.map((item) => {
  const newItem = {
    level,
    isFold: false,
    checked: false,
    indeterminate: false,
    pid,
    ...item,
  };
  if (item.children) {
    newItem.children = initTree(item.children, level + 1, item.key);
  }
  return newItem;
});

// checkeds 必须为叶子节点的key数组
// 递归更新父节点的选中状态
export const calcTree = (treeMap, checkeds) => {
  const calcItem = (key) => {
    const item = treeMap[key];
    item.checked = false;
    item.indeterminate = false;
    if (item) {
      item.checked = true;
    }
    // 有子节点 则更新为选择状态
    if (item.children && item.children.length) {
      // 全选子节点
      item.checked = item.children.filter((child) => child.checked).length
        === item.children.length;
      // 半选子节点
      item.indeterminate = !item.checked;
    }
    // 仅向顶层递归
    if (item.pid && treeMap[item.pid]) {
      calcItem(item.pid);
    }
  };
  checkeds.forEach(calcItem);
};

// 遍历树 自上而下
export const loop = (nodes, callback) => nodes.forEach((node) => {
  callback(node);
  if (node.children) {
    loop(node.children, callback);
  }
});

// 生成指向树各节点的对象
export const generateTreeMap = (data) => {
  const treeMap = {};
  loop(data, (node) => {
    treeMap[node.key] = node;
  });
  return treeMap;
};

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
  .filter((item) => !checkeds.includes(item.key))
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
    .map((item) => item.key)
    .filter((key) => !value.includes(key));
  return getSourceTree(nodes, leaf);
};

export const copy = (data) => JSON.parse(JSON.stringify(data));

export const filterTree = (nodes, callback) => {
  if (nodes.length === 0) return [];
  const search = (node) => node.filter((item) => {
    // 当前节点包含则直接
    if (callback(item)) {
      // 仅向上保留父节点
      if (
        item.children
          && Array.isArray(item.children)
          && item.children.length
      ) {
        const children = search(item.children);
        if (children.length) {
          Object.assign(item, { children, isFold: false });
        } else {
          Object.assign(item, { isFold: false });
        }
      }
      return true;
    }

    // 当前节点未匹配: 对子项进行匹配
    if (Array.isArray(item.children) && item.children.length) {
      Object.assign(item, { children: search(item.children), isFold: false });
      return item.children.length > 0;
    }
    return false;
  });
  return search(nodes);
};
