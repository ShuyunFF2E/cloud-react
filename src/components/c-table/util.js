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

/**
 * 全部选中
 * @param data
 * @returns {*}
 */
export function isEveryChecked(data) {
	return (data || []).length && data.every(item => item.checked);
}

/**
 * 部分选中
 * @param data
 * @returns {*}
 */
export function isSomeChecked(data) {
	return (data || []).length && data.some(item => item.checked);
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
	const fn = n => {
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
	const fn = node => {
		if (node.children && node.children.length) {
			node.children.forEach(fn);
		}
		callback(node);
	};
	tree.forEach(fn);
}