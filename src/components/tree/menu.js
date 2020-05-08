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
	};

	deleteNode = e => {
		const { disableRemove } = this.props;
		if (disableRemove) {
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
	};

	render() {
		const { visible, nodeData, disableRemove, disableAdd, disableRename, menuStyle, prefixCls } = this.props;
		return (
			visible &&
			this.context.supportMenu && (
				<ul className={classNames(`${prefixCls}-menu`)} style={menuStyle}>
					<li role="presentation" className={disableAdd ? 'disabled' : ''} onClick={e => this.addNode(e, nodeData)}>
						新增
					</li>
					<li role="presentation" className={disableRemove ? 'disabled' : ''} onClick={this.deleteNode}>
						删除
					</li>
					<li role="presentation" className={disableRename ? 'disabled' : ''} onClick={e => this.renameNode(e, nodeData)}>
						重命名
					</li>
				</ul>
			)
		);
	}
}
export default TreeMenu;
