import React, { Component } from 'react';
import classNames from 'classnames';
import Node from './node';
import TreeContext from './context';
import Store from './store';

const store = new Store();

let dropNode = null;
let startData = null;
let endData = null;

class List extends Component {
	static contextType = TreeContext;

	/**
	 * 开始拖动节点
	 * @param e
	 * @param data
	 */
	onDragNodeStart = (e, data) => {
		e.stopPropagation();
		// 确定开始节点
		startData = data;
		this.context.onDragBefore(data);
	};

	/**
	 * 移动节点中
	 * @param e
	 * @param data
	 */
	onDragNodeMoving = (e, data) => {
		e.stopPropagation();
		this.context.onDragMoving(data, endData);
	};

	/**
	 * 移动节点结束
	 * @param e
	 * @param data
	 */
	onDragNodeEnd = (e, data) => {
		e.stopPropagation();
		e.preventDefault();
		const node = e.currentTarget;
		const pNode = node.parentNode;
		Array.from(pNode.children).forEach(snode => {
			// eslint-disable-next-line no-param-reassign
			snode.className = '';
		});
		if (dropNode) {
			// 最终切换的节点是临近节点则直接互换
			if (dropNode.nextSibling === node || dropNode.previousSibling === node) {
				const temp = document.createElement('li');
				pNode.replaceChild(temp, dropNode);
				pNode.replaceChild(dropNode, node);
				pNode.replaceChild(node, temp);
			} else {
				// 否则插入到前面
				pNode.insertBefore(node, dropNode);
			}
		}

		const pData = store.findNodeById(this.context.treeData, data.pId);
		this.context.onDragAfter(data, endData, pData);
	};

	/**
	 * 节点悬浮
	 * @param e
	 * @param data
	 */
	onDragNodeOver = (e, data) => {
		e.stopPropagation();
		e.preventDefault();
		const node = e.currentTarget;
		dropNode = node;
		endData = data;
		if (data.pId === startData.pId) {
			node.className = 'move-style';
		} else {
			dropNode = null;
			endData = null;
		}
	};

	/**
	 * 节点释放
	 * @param e
	 */
	onDragNodeLeave = e => {
		e.stopPropagation();
		const node = e.currentTarget;
		node.className = '';
	};

	render() {
		const { data, prefixCls } = this.props;
		return !data.length ? null : (
			<ul className={classNames(`${prefixCls}-list`)}>
				{data.map(node => {
					return (
						<li
							key={node.id}
							id={node.id}
							onDragStart={e => this.onDragNodeStart(e, node)}
							onDrag={e => this.onDragNodeMoving(e, node)}
							onDragEnd={e => this.onDragNodeEnd(e, node)}
							onDragOver={e => this.onDragNodeOver(e, node)}
							onDragLeave={this.onDragNodeLeave}
							draggable={this.context.supportDrag}>
							<Node data={node} prefixCls={prefixCls}>
								<List data={node.children} prefixCls={prefixCls} />
							</Node>
						</li>
					);
				})}
			</ul>
		);
	}
}

export default List;
