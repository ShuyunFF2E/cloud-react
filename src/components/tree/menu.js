import React, { Component } from 'react';
import classNames from 'classnames';
import TreeContext from './context';

import './index.less';

class TreeMenu extends Component {
	static contextType = TreeContext;

	preNode = null;

	addNode = (e, node) => {
		const { disableAdd, options } = this.props;
		if (disableAdd) {
			e.preventDefault();
			return;
		}
		options.setInputValue('');
		this.props.onEditNodeBefore({ preNode: this.preNode, currentNode: node, isAdd: true, isUnfold: true });
		this.preNode = node;

		this.scrollIntoView();
	};

	deleteNode = e => {
		const { disableRemove, nodeData } = this.props;
		const isDisabledDel = !nodeData.pId || (Array.isArray(nodeData.children) && nodeData.children.length);

		if (disableRemove || isDisabledDel) {
			e.preventDefault();
			return;
		}
		this.props.deleteNode();
	};

	renameNode = (e, node) => {
		const { disableRename, options, name } = this.props;
		if (disableRename) {
			e.preventDefault();
			return;
		}
		options.setInputValue(name);
		this.props.onEditNodeBefore({ preNode: this.preNode, currentNode: node, isEdit: true });
		this.preNode = node;

		this.scrollIntoView();
	};

	scrollIntoView = () => {
		setTimeout(() => {
			const ele = document.querySelector('.cloud-tree .cancel-icon');
			if (ele) {
				ele.scrollIntoView({ block: 'nearest', inline: 'nearest' });
			}
		});
	};

	render() {
		const { visible, nodeData, disableRemove, disableAdd, disableRename, menuStyle, prefixCls } = this.props;
		const isDisabledDel = !nodeData.pId || (Array.isArray(nodeData.children) && nodeData.children.length);
		return (
			visible &&
			this.context.supportMenu && (
				<ul className={classNames(`${prefixCls}-menu`)} style={menuStyle}>
					<li role="presentation" className={disableAdd ? 'disabled' : ''} onClick={e => this.addNode(e, nodeData)}>
						新增{this.context.addMenuName}
					</li>
					<li role="presentation" className={disableRename ? 'disabled' : ''} onClick={e => this.renameNode(e, nodeData)}>
						重命名
					</li>
					<li role="presentation" className={disableRemove || isDisabledDel ? 'disabled' : ''} onClick={this.deleteNode}>
						删除
					</li>
				</ul>
			)
		);
	}
}
export default TreeMenu;
