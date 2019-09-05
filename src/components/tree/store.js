/**
 * Tree数据管理
 * store.js
 * wangbo
 * 2019-07-22
 */
import jEasy from 'jeasy';
import Message from '../message';

class Store {
	// 当前节点
	static activeNode = null;

	/**
	 * 初始化数据
	 * @param treeData
	 * @param maxLevel
	 * @returns {*}
	 */
	static initData(treeData, maxLevel) {
		const cloneData = jEasy.clone(treeData);
		const format = (node, level) => {
			const { children } = node;
			const tmp = node;
			tmp.level = level;
			if (!children) {
				tmp.children = [];
			}
			// 超过最大层级的节点将不允许新增节点
			if (maxLevel && node.level >= maxLevel) {
				tmp.disableAdd = true;
			}

			if (!children || !children.length) {
				return node;
			}
			children.forEach(item => {
				format(item, node.level + 1);
			});
			return node;
		};
		if (cloneData.length) {
			cloneData.map(item => {
				return format(item, 1);
			});
		}
		return cloneData;
	}

	/**
	 * 单选选中
	 * @param data
	 * @param node
	 * @returns {Array}
	 */
	static selectedForRadio(data, node) {
		const selectedList = [];

		function getSelected(nodeList) {
			nodeList.some(item => {
				if (node.id === item.id) {
					selectedList.push(item);
				}
				if (item.children && item.children.length) {
					return getSelected(item.children);
				}
				return false;
			});
		}

		getSelected(data);
		return selectedList;
	}

	/**
	 * 多选选中
	 * @param data
	 * @param node
	 * @returns {*}
	 */
	static selectedForCheckbox(data, node) {
		const { checked, children, pId, parentId } = node;

		// 变更自身节点选中状态
		if (node.children && node.children.length) {
			node.children.forEach(item => {
				if (!item.checked) {
					const tmpNode = node;
					tmpNode.checked = checked;
					tmpNode.indeterminate = false;
				}
			})
		}

		// 变更子项选中状态
		const changeChildren = child => {
			child.forEach(item => {
				const tmp = item;
				tmp.checked = checked;
				tmp.indeterminate = false;
				const itemChildren = item.children;
				if (itemChildren && itemChildren.length) {
					changeChildren(itemChildren);
				}
			});
		};

		// 变更父项选中状态
		const changeParent = pNodeId => {
			const parentNode = this.findNodeById(data, pNodeId);
			// 无父节点
			if (!parentNode) {
				return;
			}
			let childrenCheckedNumber = 0;
			let childrenIndeterminateNumber = 0;

			parentNode.children.forEach(item => {
				// 子项中有被选中的节点childrenCheckedNumber则加1
				if (item.checked) {
					childrenCheckedNumber += 1;
				}
				// 子项存在部分选中节点则父节点部分选中
				if (item.indeterminate) {
					parentNode.indeterminate = true;
					childrenIndeterminateNumber += 1;
				}
			});

			if (childrenCheckedNumber === 0 && childrenIndeterminateNumber === 0) {
				// 子项全部未选中
				parentNode.checked = false;
				parentNode.indeterminate = false;
			} else if (childrenCheckedNumber === parentNode.children.length) {
				// 子项全部选中
				parentNode.checked = true;
				parentNode.indeterminate = false;
			} else {
				// 子项部分选中
				parentNode.checked = false;
				parentNode.indeterminate = true;
			}

			if (parentNode.pId || parentNode.parentId) {
				changeParent(parentNode.pId || parentNode.parentId);
			}
		};

		changeChildren(children || []);
		changeParent(pId || parentId);
		return data;
	}

	/**
	 * 根据参数获取节点
	 * @param data
	 * @param param
	 * @param value
	 * @returns {*}
	 */
	static findNodeByParam(data, param, value) {
		let node = null;
		const find = (array) => {
			array.some(item => {
				if (item[param] === value) {
					node = item;
					return true;
				}
				if (item.children && item.children.length) {
					return find(item.children);
				}
				return false;
			});
		};
		find(data);
		return node;
	}

	/**
	 * 根据id获取节点
	 * @param data
	 * @param id
	 * @returns {*}
	 */
	static findNodeById(data, id) {
		return this.findNodeByParam(data, 'id', id);
	}

	/**
	 * 根据id更新节点数据
	 * @param data
	 * @param id
	 * @param updatePart
	 */
	static updateNodeById(data, id, updatePart) {
		const node = this.findNodeById(data, id);
		return Object.assign(node, updatePart);
	}

	/**
	 * 更新激活节点
	 * @param data
	 * @param node
	 */
	static updateActiveNode(data, node) {
		if (this.activeNode) {
			this.updateNodeById(data, this.activeNode.id, { isActive: false });
		}
		this.activeNode = this.updateNodeById(data, node.id, { isActive: true });
	}

	/**
	 * 新增节点
	 * @param data
	 * @param pId
	 * @param newNode
	 * @param isAddFront
	 */
	static addChildNode(data, pId, newNode, isAddFront) {
		const pNode = this.findNodeById(data, pId);
		if (!pNode.children) {
			pNode.children = [];
		}
		if (isAddFront) {
			pNode.children.unshift(newNode);
			return data;
		}
		pNode.children.push(newNode);
		return data;
	}

	/**
	 * 删除节点
	 * @param data
	 * @param node
	 * @returns {*}
	 */
	static removeChildNode(data, node) {
		const parentNode = this.findNodeById(data, node.pId || node.parentId);

		// 存在子节点则不可删除
		if (!parentNode || node.children.length) {
			Message.error('该目录存在子目录，不可删除!');
			return data;
		}
		parentNode.children.forEach((child, index) => {
			if (child.name === node.name) {
				parentNode.children.splice(index, 1);
			}
		});
		return data;
	}

	/**
	 * 重命名节点
	 * @param data
	 * @param id
	 * @param newValue
	 * @returns {*}
	 */
	static renameChildNode(data, id, newValue) {
		const item = this.findNodeById(data, id);
		item.name = newValue;
		return data;
	}

	/**
	 * 搜索节点
	 * @param data
	 * @param searchText
	 */
	static searchNode(data, searchText) {
		const cloneData = jEasy.clone(data);
		// 搜索前删除掉已激活的节点
		this.activeNode = null;

		const search = (node) => {
			return node.filter(item => {
				if (item.name.indexOf(searchText) !== -1) {
					return item;
				}
				if (item.children && item.children.length) {
					const tmp = item;
					tmp.children = search(tmp.children);
					return item.children.length > 0;
				}
				return !item.children.length && item.name.indexOf(String(searchText)) !== -1;
			});
		};
		search(cloneData);
		return cloneData;
	}
}
export default Store;
