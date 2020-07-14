import React, { Component } from 'react';
import classNames from 'classnames';
import Node from './node';
import TreeContext from './context';
import Store from './store';

const store = new Store();

let dropNode = null;
let dragingNodePosition = null;
let moveType = '';
let dragingNode = null;
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
		dragingNode = e.currentTarget;
		// dragingNodeEvent = e;
		dragingNodePosition = {
			startY: e.clientY
		};
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
			node.className = 'insert-animation';
			if (moveType === 'up') {
				pNode.insertBefore(node, dropNode);
			} else {
				pNode.replaceChild(node, dropNode);
				pNode.insertBefore(dropNode, node);
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
		// 鼠标移动的距离
		const moveRange = dragingNodePosition.startY - e.clientY;
		// 相对与父级的位置
		const relativeP = dragingNode.offsetTop - moveRange;
		// 目标节点高度
		const nodeHeight = node.offsetHeight;
		const pNodeHeight = node.parentNode.offsetHeight;

		if (data.pId === startData.pId) {
			// 小于0则表示移出了，相对父级的位置如果大于节点的一半则在下，小于则在上
			moveType = '';
			node.className = 'move-bottom-style';
			if (relativeP <= nodeHeight) {
				node.className = 'move-top-style';
				moveType = 'up';
				return;
			}
			if (relativeP >= pNodeHeight - nodeHeight) {
				moveType = 'down';
			}
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
