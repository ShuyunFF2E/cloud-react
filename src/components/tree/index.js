import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jEasy from 'jeasy';
import { prefixCls } from '@utils/config';
import TreeContext from './context';
import Search from './search';
import TreeList from './list';
import Message from '../message';
import Modal from '../modal';
import store from './store';
import Menu from './menu';
import './index.less';

const noop = () => {};

class Tree extends Component {
	// 默认值， 默认类型与值不匹配
	static defaultProps = {
		style: {},
		className: '',
		searchPlaceholder: '',
		searchMaxLength: '',
		nodeNameMaxLength: '',
		maxLevel: 0,
		isUnfold: false,
		showIcon: false,
		openIconType: 'folder-solid-open',
		closeIconType: 'folder-solid',
		iconColor: '#999',
		supportCheckbox: false,
		supportMenu: false,
		supportSearch: false,
		supportImmediatelySearch: false,
		isAddFront: true,
		selectedValue: [],
		onAddNode: noop,
		onRenameNode: noop,
		onRemoveNode: noop,
		onSelectedNode: noop,
		onSearchResult: noop
	};

	static propsTypes = {
		style: PropTypes.object,
		className: PropTypes.string,
		treeData: PropTypes.array,
		searchPlaceholder: PropTypes.string,
		searchMaxLength: PropTypes.number,
		nodeNameMaxLength: PropTypes.number,
		maxLevel: PropTypes.number,
		isUnfold: PropTypes.bool,
		showIcon: PropTypes.bool,
		openIconType: PropTypes.string,
		closeIconType: PropTypes.string,
		iconColor: PropTypes.string,
		supportCheckbox: PropTypes.bool,
		supportMenu: PropTypes.bool,
		supportSearch: PropTypes.bool,
		supportImmediatelySearch: PropTypes.bool,
		isAddFront: PropTypes.bool,
		selectedValue: PropTypes.array,
		onAddNode: PropTypes.func,
		onRenameNode: PropTypes.func,
		onRemoveNode: PropTypes.func,
		onSelectedNode: PropTypes.func,
		onSearchResult: PropTypes.func
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
			treeData: store.initData(props.treeData, props.maxLevel, props.selectedValue, props.isUnfold),
			prevProps: props
		};
	}

	// 监听外部回显数据变化
	static getDerivedStateFromProps(nextProps, prevState) {
		const { prevProps } = prevState;

		if (prevProps.selectedValue !== nextProps.selectedValue) {
			return {
				selectedValue: nextProps.selectedValue,
				prevProps: nextProps,
				treeData: store.initData(nextProps.treeData, prevProps.maxLevel, nextProps.selectedValue, prevProps.isUnfold)
			};
		}

		return null;
	}

	componentDidMount() {
		document.addEventListener('click', this.hideMenu);
		document.addEventListener('scroll', this.hideMenu, true);
	}

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
		const { supportSearch, onSearchNode } = this.props;

		// 保留原始数据供每次搜索使用
		const tmp = jEasy.clone(store.initData(this.props.treeData, this.props.maxLevel));

		// 搜索结果数据
		const backTree = store.searchNode(tmp, searchText);

		// 是多选并且存在已多选的节点列表才进行合并数据
		this.setState({
			treeData: [...backTree]
		});

		// 支持搜索则返回搜素结果
		if (supportSearch && onSearchNode) {
			onSearchNode(searchText, backTree);
		}
	};

	/**
	 * 选中节点
	 * @param node
	 */
	onSelectedAction = node => {
		const data = this.state.treeData;
		const { supportCheckbox, onSelectedNode } = this.props;

		// 更新节点选中状态
		store.updateActiveNode(data, node);
		// 单选节点列表
		const radioSelectedList = store.selectedForRadio(data, node);
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
		store.updateActiveNode(data, node);
		// 更新checked状态
		const tmp = store.selectedForCheckbox(data, node);
		const filterSelected = selectedData => {
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
	 * 展开/隐藏节点
	 * @param data
	 * @param node
	 */
	onFoldNodeAction = (data, node) => {
		const backData = store.onFoldNode(data, node);
		this.setState({
			treeData: [...backData]
		});
	};

	/**
	 * 新增节点
	 * @param pId
	 * @param value
	 */
	onAddAction = (pId, value) => {
		const { onAddNode, isAddFront } = this.props;
		onAddNode(pId, value)
			.then(res => {
				const data = store.addChildNode(this.state.treeData, pId, { id: res.data || res.id, name: value, children: [], pId }, isAddFront);
				// 新增之后重新init判断层级，不然会出现无层级可继续添加问题
				this.setState({
					treeData: [...data]
				});
			})
			.catch(() => {
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
		onRenameNode(id, newValue)
			.then(() => {
				const data = store.renameChildNode(this.state.treeData, id, newValue);
				this.setState({
					treeData: [...data]
				});
				Message.success('更新成功');
			})
			.catch(() => {
				Message.error('更新失败');
			});
	};

	/**
	 * 名称重复校验
	 * @param name
	 */
	onCheckRepeatNameAction = name => {
		return store.checkRepeatName(this.state.treeData, name);
	};

	/**
	 * 删除节点
	 * @param node
	 */
	onRemoveAction = node => {
		const { onRemoveNode } = this.props;
		Modal.confirm({
			body: `确定删除节点【${node.name}】吗?`,
			onOk: () => {
				onRemoveNode(node.id)
					.then(() => {
						// 删除DOM节点
						const data = store.removeChildNode(this.state.treeData, node);
						this.setState({
							treeData: [...data]
						});
					})
					.catch(() => {
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
			style,
			className,
			isUnfold,
			searchPlaceholder,
			searchMaxLength,
			supportSearch,
			supportImmediatelySearch,
			nodeNameMaxLength,
			supportCheckbox,
			supportMenu,
			isAddFront,
			showIcon,
			openIconType,
			closeIconType,
			iconColor,
			selectedValue
		} = this.props;

		const { onAddAction, onRenameAction, onRemoveAction, onSelectedAction, onFoldNodeAction, onCheckRepeatNameAction, showMenu } = this;
		const { treeData, searchText, nodeData, menuStyle, menuOptions, visibleMenu } = this.state;
		const { id, name, disableAdd, disableRename, disableRemove } = nodeData;

		return (
			<TreeContext.Provider
				value={{
					treeData,
					isUnfold,
					searchText,
					supportCheckbox,
					supportMenu,
					isAddFront,
					nodeNameMaxLength,
					showIcon,
					openIconType,
					closeIconType,
					iconColor,
					selectedValue,
					showMenu,
					onAddAction,
					onRenameAction,
					onRemoveAction,
					onSelectedAction,
					onFoldNodeAction,
					onCheckRepeatNameAction
				}}>
				<div className={`${selector} ${className}`} style={style}>
					<Search
						prefixCls={selector}
						onSearchAction={this.onSearchAction}
						supportImmediatelySearch={supportImmediatelySearch}
						supportSearch={supportSearch && !supportCheckbox}
						searchPlaceholder={searchPlaceholder}
						searchMaxLength={searchMaxLength}
					/>

					<Menu
						id={id}
						name={name}
						nodeData={nodeData}
						menuStyle={menuStyle}
						prefixCls={selector}
						disableAdd={disableAdd}
						disableRename={disableRename}
						disableRemove={disableRemove}
						options={menuOptions}
						deleteNode={() => this.onRemoveAction(nodeData)}
						visible={visibleMenu}
					/>

					{treeData && treeData.length > 0 && treeData[0].children && treeData[0].children.length > 0 && (
						<TreeList prefixCls={selector} nodeNameMaxLength={nodeNameMaxLength} data={treeData} />
					)}

					{(!treeData || !treeData.length || !treeData[0].children || !treeData[0].children.length) && <p>暂无结果</p>}
				</div>
			</TreeContext.Provider>
		);
	}
}

export default Tree;
