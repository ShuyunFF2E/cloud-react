import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jEasy from 'jeasy';
import classNames from 'classnames';
import { prefixCls } from '@utils/config';
import TreeContext from './context';
import Search from './search';
import TreeList from './list';
import Message from '../message';
import Modal from '../modal';
import Store from './store';
import Menu from './menu';

import './index.less';


const noop = () => {};

class Tree extends Component{
	// 默认值， 默认类型与值不匹配
	static defaultProps = {
		searchPlaceholder: '',
		searchMaxLength: '',
		nodeNameMaxLength: '',
		maxLevel: 0,
		supportRadio: false,
		supportCheckbox: false,
		supportMenu: false,
		supportSearch: false,
		isAddFront: true,
		onAddNode: noop,
		onRenameNode: noop,
		onRemoveNode: noop,
		onSelectedNode: noop
	};

	static propsTypes = {
		treeData: PropTypes.array,
		searchPlaceholder: PropTypes.string,
		searchMaxLength: PropTypes.number,
		nodeNameMaxLength: PropTypes.number,
		maxLevel: PropTypes.number,
		supportCheckbox: PropTypes.bool,
		supportRadio: PropTypes.bool,
		supportMenu: PropTypes.bool,
		supportSearch: PropTypes.bool,
		isAddFront: PropTypes.bool,
		onAddNode: PropTypes.func,
		onRenameNode: PropTypes.func,
		onRemoveNode: PropTypes.func,
		onSelectedNode: PropTypes.func,
	};

	constructor(props) {
		// 从外部接收到的数据存放到state中，便于子组件对其树数据进行修改
		super(props);

		this.state = {
			visibleMenu: false,
			nodeData: {},
			menuStyle: null,
			menuOptions: null,
			searchText: '',
			treeData: Store.initData(props.treeData, props.maxLevel)
		};
	}

	componentDidMount() {
		document.addEventListener('click', this.hideMenu);
		document.addEventListener('scroll', this.hideMenu, true);
	};

	componentWillUnmount() {
		document.removeEventListener('click', this.hideMenu);
		document.removeEventListener('scroll', this.hideMenu, true);
	}

	/**
	 * 搜索
	 * @returns {*}
	 */
	onSearchAction = searchText => {
		// 将搜索文字放到state中，供node节点中高亮使用
		this.setState({
			searchText
		});

		// 保留原始数据供每次搜索使用
		const tmp = jEasy.clone(Store.initData(this.props.treeData, this.props.maxLevel));

		// 搜索结果数据
		const backTree = Store.searchNode(tmp, searchText);

		// 是多选并且存在已多选的节点列表才进行合并数据
		this.setState({
			treeData: [...backTree]
		});
	};

	/**
	 * 选中节点
	 * @param node
	 */
	onSelectedAction = node => {
		const data = this.state.treeData;
		const { supportCheckbox, onSelectedNode } = this.props;
		// 更新节点选中状态
		Store.updateActiveNode(data, node);
		// 单选节点列表
		const radioSelectedList = Store.selectedForRadio(data, node);
		// 多选节点列表
		const checkboxSelectedList = this.getSelectedMoreList(data, node);

		const selectedResult = supportCheckbox ? checkboxSelectedList : radioSelectedList;

		// 传递到外部
		onSelectedNode(node, selectedResult);

		// 更新树列表数据
		this.setState({
			treeData: [...data]
		});
	};

	/**
	 * 多选选中节点列表
	 * @param data
	 * @param node
	 * @returns {Array}
	 */
	getSelectedMoreList = (data, node) => {
		const selectedList = [];
		Store.updateActiveNode(data, node);
		// 更新checked状态
		const tmp = Store.selectedForCheckbox(data, node);
		const filterSelected = (selectedData) => {
			selectedData.forEach(item => {
				if (item.checked) {
					selectedList.push(item);
				}
				if (item.children && item.children.length) {
					return filterSelected(item.children);
				}
				return selectedList;
			});
		};
		filterSelected(tmp);
		return selectedList;
	};

	/**
	 * 新增节点
	 * @param pId
	 * @param value
	 */
	onAddAction = (pId, value) => {
		const { onAddNode, isAddFront } = this.props;
		onAddNode(pId, value).then(res => {
			const data = Store.addChildNode(this.state.treeData, pId, { id: res.data || res.id, name: value, children: [], pId }, isAddFront);
			// 新增之后重新init判断层级，不然会出现无层级可继续添加问题
			this.setState({
				treeData: [...data]
			});
			Message.success('添加成功');
		}).catch(() => {
			Message.error('添加失败');
		});
	};

	/**
	 * 重命名节点
	 * @param id
	 * @param newValue
	 */
	onRenameAction = (id, newValue) => {
		const { onRenameNode } = this.props;
		onRenameNode(id, newValue).then(() => {
			const data = Store.renameChildNode(this.state.treeData, id, newValue);
			this.setState({
				treeData: [...data]
			});
			Message.success('更新成功');
		}).catch(() => {
			Message.error('更新失败');
		});
	};

	/**
	 * 删除节点
	 * @param node
	 */
	onRemoveAction = node => {
		const { onRemoveNode } = this.props;
		Modal.confirm({
			title: `确定删除节点【${node.name}】吗?`,
			onOk: () => {
				onRemoveNode(node.id).then(() => {
					// 删除DOM节点
					const data = Store.removeChildNode(this.state.treeData, node);
					this.setState({
						treeData: [...data]
					});
					Message.success('删除成功');
				}).catch(() => {
					Message.error('删除失败');
				});
			},
			onCancel: () => {}
		});
	};

	/**
	 * 显示菜单
	 * @param node
	 * @param menuStyle
	 * @param options
	 */
	showMenu = (node, menuStyle, options) => {
		this.setState({
			visibleMenu: true,
			menuStyle,
			nodeData: node,
			menuOptions: options
		});
	};

	/**
	 * 隐藏菜单
	 */
	hideMenu = () => {
		if (!this.state.visibleMenu) {
			return;
		}
		this.setState({
			visibleMenu: false
		});
	};

	render() {

		const selector = `${prefixCls}-tree`;

		const {
			searchPlaceholder,
			searchMaxLength,
			supportSearch,
			nodeNameMaxLength,
			supportRadio,
			supportCheckbox,
			supportMenu,
			isAddFront
		} = this.props;

		const { onAddAction, onRenameAction, onRemoveAction, onSelectedAction, showMenu } = this;
		const { treeData, searchText, nodeData, menuStyle, menuOptions, visibleMenu } = this.state;
		const { id, name, disableAdd, disableRename, disableRemove } = nodeData;

		return (
			<TreeContext.Provider value={{ searchText, supportRadio, supportCheckbox, supportMenu, isAddFront, nodeNameMaxLength, showMenu, onAddAction, onRenameAction, onRemoveAction, onSelectedAction }}>
				<div className={classNames(selector)}>
					<Search
						prefixCls={selector}
						onSearchAction={this.onSearchAction}
						supportSearch={supportSearch && !supportCheckbox}
						searchPlaceholder={searchPlaceholder}
						searchMaxLength={searchMaxLength}/>

					<Menu
						id={id}
						name={name}
						menuStyle={menuStyle}
						prefixCls={selector}
						disableAdd={disableAdd}
						disableRename={disableRename}
						disableRemove={disableRemove}
						options={menuOptions}
						deleteNode={() => this.onRemoveAction(nodeData)}
						visible={visibleMenu}/>

					<TreeList
						prefixCls={selector}
						nodeNameMaxLength={nodeNameMaxLength}
						data={treeData}/>
				</div>
			</TreeContext.Provider>
		);
	}
}

export default Tree;
