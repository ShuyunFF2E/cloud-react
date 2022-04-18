import { tablePrefixCls } from './constant';

/**
 * 如果 ajaxData 是数组，则返回 ajaxData；如果 ajaxData 是函数，则返回 ajaxData() 执行后的结果
 * @param ajaxData
 * @param params 表格组件透出的一些参数
 * @returns {*[]|*}
 */
export function getDataSource(ajaxData, params) {
  if (typeof ajaxData === 'function') {
    return ajaxData(params);
  }
  return ajaxData;
}

const DELAY_TIME = 300;
export function getDataSourceWithDelay(ajaxData, params) {
  if (typeof ajaxData === 'function') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ajaxData(params));
      }, DELAY_TIME);
    });
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ajaxData);
    }, DELAY_TIME);
  });
}

/**
 * 全部选中
 * @param data
 * @returns {*}
 */
export function isEveryChecked(data) {
  return (data || []).length && data.every((item) => item.checked);
}

/**
 * 部分选中
 * @param data
 * @returns {*}
 */
export function isSomeChecked(data) {
  return (data || []).length && data.some((item) => item.checked);
}

/**
 * 是否是叶子节点
 * @param node
 * @returns {boolean}
 */
export function isLeaf(node) {
  return !node.children || !node.children.length;
}

/**
 * 获取节点的所有叶子节点
 * @param node
 * @returns {*[]}
 */
export function getLeafNodes(node) {
  const leafNodes = [];
  const fn = (n) => {
    if (n.children && n.children.length) {
      n.children.forEach(fn);
    } else {
      leafNodes.push(n);
    }
  };
  fn(node);
  return leafNodes;
}

/**
 * 遍历 tree
 * @param tree
 * @param callback
 */
export function traverseTree(tree, callback) {
  const fn = (node, parentNode) => {
    if (node.children && node.children.length) {
      node.children.forEach((n) => fn(n, node));
    }
    callback(node, parentNode);
  };
  tree.forEach((node) => fn(node));
}

function getConfigKey(tableName) {
  const { pathname, hash } = window.location;
  return `${pathname}${hash}${tablePrefixCls}-config-${tableName}`;
}

export const setConfig = (data, tableName) => {
  if (!tableName) {
    return;
  }
  window.sessionStorage.setItem(getConfigKey(tableName), JSON.stringify(data));
};

export const getConfig = (tableName) => {
  if (!tableName) {
    return '';
  }
  return JSON.parse(window.sessionStorage.getItem(getConfigKey(tableName)));
};

export const removeConfig = (tableName) => {
  if (!tableName) {
    return;
  }
  window.sessionStorage.removeItem(getConfigKey(tableName));
};

export const isFirefox = () => {
  return navigator.userAgent.indexOf('Firefox') > -1;
};
