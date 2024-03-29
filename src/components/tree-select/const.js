import { prefixCls } from '@utils';

export const selector = `${prefixCls}-tree-select`;

/**
 * 判断节点是否有子节点被选中
 * @param node
 * @param selected
 * @returns {boolean}
 */
export const hasSelectedChild = (node, selected) => {
	const openValues = [];
	const fn = n => {
		if (n.children && n.children.length) {
			n.children.forEach(cNode => {
				fn(cNode);
			});
		}
		if (selected?.value === n.value) {
			openValues.push(n.value);
		}
	};
	fn(node);
	return !!openValues.length;
};

/**
 * 获取需要展开的节点ID
 * @param selected
 * @param nodes
 * @param isUnfold
 * @returns {[]}
 */
export const getOpenKeys = (selected, nodes, isUnfold) => {
	const keys = [];
	const fn = (node, level) => {
		if (node.children && node.children.length) {
			node.children.forEach(n => fn(n, level + 1));
			if (isUnfold || hasSelectedChild(node, selected)) {
				keys.push(node.value);
			}
		}
		Object.assign(node, { level });
	};
	nodes.forEach(node => fn(node, 1));
	return keys;
};

/**
 * 获取节点的所有子节点 value
 * @param node
 * @returns {[]}
 */
export const getChildValues = node => {
	const values = [];
	const fn = n => {
		if (n.children && n.children.length) {
			n.children.forEach(fn);
			values.push(n.value);
		}
	};
	fn(node);
	return values;
};

export const DEFAULT = 'default';
export const SINGLE = 'single';
export const MULTIPLE = 'multiple';
