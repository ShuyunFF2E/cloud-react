/**
 * 右键菜单
 * list.js
 * wangbo
 * 2019-07-02
 */

import React, { Component } from 'react';
import ToolTip from '../tooltip';
import './index.less';
import TreeContext from './context';

class TreeMenu extends Component {
	static contextType = TreeContext;

	/**
	 * 新增节点
	 * @param e
	 */
	addNode = e => {
		const { disableAdd, options } = this.props;
		if (disableAdd) {
			e.preventDefault();
			return;
		}
		options.showInput();
	};

	/**
	 * 删除节点
	 * @param e
	 */
	deleteNode = e => {
		const { disableRemove } = this.props;
		if (disableRemove) {
			e.preventDefault();
			return;
		}
		this.props.deleteNode();
	};

	/**
	 * 重命名节点
	 * @param e
	 */
	renameNode = e => {
		const { disableRename, options, name } = this.props;
		if (disableRename) {
			e.preventDefault();
			return;
		}
		options.showInput(name);
	};

	render() {
		const { visible, name, disableRemove, disableAdd, disableRename, menuStyle } = this.props;
		return visible && this.context.supportMenu && (
			<ul className="tree-menu" style={menuStyle}>
				<ToolTip content={name} placement="top" clear>
					<span className="tree-menu-node-name">当前节点</span>
				</ToolTip>
				<li role="presentation" className={disableAdd ? 'disabled' : ''} onClick={this.addNode}>新增</li>
				<li role="presentation" className={disableRemove ? 'disabled' : ''} onClick={this.deleteNode}>删除</li>
				<li role="presentation" className={disableRename ? 'disabled' : ''} onClick={this.renameNode}>重命名</li>
			</ul>
		);
	};
}
export default TreeMenu;
