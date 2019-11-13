import React, { Component } from 'react';
import classNames from 'classnames';
import ToolTip from '../tooltip';
import TreeContext from './context';

import './index.less';

class TreeMenu extends Component {

	static contextType = TreeContext;

	addNode = e => {
		const { disableAdd, options } = this.props;
		if (disableAdd) {
			e.preventDefault();
			return;
		}
		options.showInput();
	};

	deleteNode = e => {
		const { disableRemove } = this.props;
		if (disableRemove) {
			e.preventDefault();
			return;
		}
		this.props.deleteNode();
	};

	renameNode = e => {
		const { disableRename, options, name } = this.props;
		if (disableRename) {
			e.preventDefault();
			return;
		}
		options.showInput(name);
	};

	render() {
		const { visible, name, disableRemove, disableAdd, disableRename, menuStyle, prefixCls } = this.props;
		return visible && this.context.supportMenu && (
			<ul className="tree-menu" style={menuStyle}>
				<ToolTip content={name} placement="top" clear>
					<span className={classNames(`${prefixCls}-node-name`)}>当前节点</span>
				</ToolTip>
				<li role="presentation" className={disableAdd ? 'disabled' : ''} onClick={this.addNode}>新增</li>
				<li role="presentation" className={disableRemove ? 'disabled' : ''} onClick={this.deleteNode}>删除</li>
				<li role="presentation" className={disableRename ? 'disabled' : ''} onClick={this.renameNode}>重命名</li>
			</ul>
		);
	};
}
export default TreeMenu;
