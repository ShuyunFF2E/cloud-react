import { tablePrefixCls } from './constant';
import { getRootWindow } from '../../utils';

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
 * @param childrenKey
 * @returns {boolean}
 */
export function isLeaf(node, childrenKey = 'children') {
  return !node[childrenKey] || !node[childrenKey].length;
}

/**
 * 获取节点的所有叶子节点
 * @param node
 * @param childrenKey
 * @returns {*[]}
 */
export function getLeafNodes(node, childrenKey = 'children') {
  const leafNodes = [];
  const fn = (n) => {
    if (n[childrenKey] && n[childrenKey].length) {
      n[childrenKey].forEach(fn);
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
 * @param childrenKey
 * @param isTreeIncludeChildren
 */
export function traverseTree({
  tree,
  callback,
  childrenKey = 'children',
  isTreeIncludeChildren = true,
}) {
  const fn = (node, parentNode) => {
    if (isTreeIncludeChildren) {
      if (node[childrenKey] && node[childrenKey].length) {
        node[childrenKey].forEach((n) => fn(n, node));
      }
      callback({ node, parentNode });
    } else {
      callback({ node, parentNode: undefined, childNodes: [node] });
    }
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

export const isFirefox = () => navigator.userAgent.indexOf('Firefox') > -1;

/**
 * 回调函数在 delay 时间段内只执行一次
 * @param callback
 * @param delay
 * @returns {(function(): void)|*}
 */
export const debounce = (callback, delay) => {
  let timer = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
};

export const hasCustomScroll = (useRootWindow) => {
  const _window = useRootWindow ? getRootWindow() : window;
  const bodyEle = document.querySelector('body');
  return _window
    .getComputedStyle(bodyEle, '::-webkit-scrollbar')
    .width.includes('px');
};

export const getTrEle = (targetEle) => {
  if (targetEle && !targetEle?.hasAttribute('data-row-key')) {
    return getTrEle(targetEle?.parentElement);
  }
  return targetEle;
};

/**
 * 千分位
 * @param num
 * @returns {string}
 */
export const formatThousands = (num) => {
  let numStr = `${num}`;
  if (!numStr.includes('.')) numStr += '.';
  return numStr
    .replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => `${$1},`)
    .replace(/\.$/, '');
};

export const isFalsy = (value) => (value === 0 ? false : !value);
export const isVoid = (value) => value === undefined || value === null || value === '';

export const getTextWidth = (text, fontSize = '14px') => {
  const element = document.createElement('div');

  element.style.display = 'inline-block';
  element.style.opacity = '0';
  element.innerText = text;
  element.style.fontSize = fontSize;
  element.style.width = 'fit-content';

  document.body.appendChild(element);

  const { width } = window.getComputedStyle(element);

  document.body.removeChild(element);

  return Math.ceil(parseFloat(width));
};
