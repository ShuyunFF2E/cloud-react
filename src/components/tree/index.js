/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ShuyunUtils from 'shuyun-utils';
import { noop, prefixCls } from '@utils';
import TreeContext from './context';
import Search from './search';
import TreeList from './list';
import Message from '../message';
import Input from '../input';
import Modal from '../modal';
import Store from './store';
import Menu from './menu';
import { copyData } from './const';
import empty from '../../assets/images/empty.png';
import './index.less';

// 默认菜单类型，右键打开
const MENU_TYPE = 'rightMenu';
const store = new Store();
// 菜单弹框样式
const menuModalStyle = {
  width: 450,
  height: 240,
  minHeight: 240,
};
const menuModalBodyStyle = {
  height: 106,
  maxHeight: 106,
  padding: '23px 30px',
};

// 搜索区域样式
const hasSearchStyle = {
  height: 'calc(100% - 42px)',
  overflow: 'auto',
};

class Tree extends Component {
  // 默认值
  static defaultProps = {
    style: {},
    className: '',
    disabled: false,
    searchPlaceholder: '搜索一个选项',
    searchMaxLength: '',
    nodeNameMaxLength: '',
    maxLevel: 0,
    isUnfold: false,
    showIcon: false,
    showErrMsg: false,
    openIconType: 'folder-solid-open',
    closeIconType: 'folder-solid',
    iconColor: '#999',
    supportCheckbox: false,
    breakCheckbox: false,
    supportMenu: false,
    menuType: MENU_TYPE,
    addMenuName: '子目录',
    supportSearch: false,
    supportDrag: false,
    supportImmediatelySearch: false,
    supportTooltip: true,
    isAddFront: true,
    selectedValue: [],
    onDoubleClick: noop,
    onAddNode: noop,
    onRenameNode: noop,
    onRemoveNode: noop,
    onSelectedNode: noop,
    onSearchNode: noop,
    onDragMoving: noop,
    onDragBefore: noop,
    onDragAfter: noop,
    customNodeTpl: noop,
    renderItem: noop,
    onLoadData: noop,
    showLine: false,
    lineType: 'default',
  };

  static propsTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
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
    menuType: PropTypes.string,
    addMenuName: PropTypes.string,
    supportSearch: PropTypes.bool,
    supportDrag: PropTypes.bool,
    supportImmediatelySearch: PropTypes.bool,
    supportTooltip: PropTypes.bool,
    isAddFront: PropTypes.bool,
    selectedValue: PropTypes.array,
    breakCheckbox: PropTypes.bool,
    onDoubleClick: PropTypes.func,
    onAddNode: PropTypes.func,
    onRenameNode: PropTypes.func,
    onRemoveNode: PropTypes.func,
    onSelectedNode: PropTypes.func,
    onSearchNode: PropTypes.func,
    onDragMoving: PropTypes.func,
    onDragBefore: PropTypes.func,
    onDragAfter: PropTypes.func,
    customNodeTpl: PropTypes.func,
    renderItem: PropTypes.func,
    onLoadData: PropTypes.func,
    showLine: PropTypes.bool,
    lineType: PropTypes.oneOf(['default', 'dashed']),
  };

  constructor(props) {
    // 从外部接收到的数据存放到state中，便于子组件对其树数据进行修改
    super(props);

    const { treeData, maxLevel, selectedValue, isUnfold, disabled } = props;

    const _treeData = store.initData({
      treeData,
      maxLevel,
      selectedValue,
      isUnfold,
      disabled,
    });

    this.state = {
      showRightMenu: false,
      showDialogMenu: false,
      nodeData: {},
      isAddMenuOpen: false,
      parentNodeNames: {},
      menuStyle: null,
      menuOptions: null,
      searchText: '',
      treeWidth: 0,
      treeData: copyData(_treeData),
      allTreeData: copyData(_treeData),
      prevProps: props,
      preSelectedNode: selectedValue && selectedValue[0],
      preSelectedList: store.getSelectedLowestNodeList(selectedValue),
    };

    this.treeAreaRef = React.createRef();
  }

  // 监听外部回显数据变化
  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps } = prevState;

    if (prevProps.treeData !== nextProps.treeData) {
      const _treeData = store.initData({
        treeData: nextProps.treeData,
        maxLevel: nextProps.maxLevel,
        selectedValue: nextProps.selectedValue,
        isUnfold: nextProps.isUnfold,
        disabled: nextProps.disabled,
      });
      return {
        prevProps: nextProps,
        treeData: copyData(_treeData),
        allTreeData: copyData(_treeData),
      };
    }

    if (prevProps.selectedValue !== nextProps.selectedValue) {
      return {
        selectedValue: nextProps.selectedValue,
        preSelectedNode: nextProps.selectedValue && nextProps.selectedValue[0],
        prevProps: nextProps,
        treeData: store.initData({
          treeData: prevState.treeData,
          maxLevel: prevProps.maxLevel,
          selectedValue: nextProps.selectedValue,
          disabled: nextProps.disabled,
        }),
        preSelectedList: store.getSelectedLowestNodeList(
          nextProps.selectedValue,
        ),
      };
    }

    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onHideMenu, true);
    document.addEventListener('click', this.onHideMenu);
    this.setState({
      treeWidth: this.treeAreaRef?.current?.clientWidth,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onHideMenu);
    document.removeEventListener('scroll', this.onHideMenu, true);
  }

  /**
   * 更新激活节点
   * @param data
   * @param node
   */
  updateActiveNode = (data, node) => {
    store.updateNodeById(data, node.id, { isActive: true });
    // 点击同个节点则状态不变
    if (
      this.state.preSelectedNode &&
      this.state.preSelectedNode.id !== node.id
    ) {
      store.updateNodeById(data, this.state.preSelectedNode.id, {
        isActive: false,
      });
    }
  };

  /**
   * 搜索
   * @returns {*}
   */
  onSearchAction = (searchText) => {
    // 将搜索文字放到state中，供node节点中高亮使用
    this.setState({
      searchText,
    });
    const { disabled, isUnfold, supportSearch, supportCheckbox, onSearchNode } =
      this.props;

    const tmp = copyData(this.state.allTreeData);

    // 搜索结果数据
    const backTree = store.searchNode(tmp, searchText);

    if (supportSearch && supportCheckbox) {
      const currentSelectedTemp = this.getSelectedMoreList(this.state.treeData);
      // eslint-disable-next-line react/no-access-state-in-setstate
      const allSelectedLowest = store.getSelectedLowestNodeList(
        this.state.preSelectedList,
        currentSelectedTemp,
      );

      this.setState({
        treeData: store.initData({
          treeData: [...backTree],
          maxLevel: null,
          selectedValue: [...allSelectedLowest],
          isUnfold: searchText ? true : undefined,
          disabled,
        }),
        preSelectedList: allSelectedLowest,
      });
    } else {
      this.setState({
        treeData: [...backTree],
      });
    }

    // 支持搜索则返回搜素结果
    if (supportSearch && onSearchNode) {
      onSearchNode(searchText, backTree);
    }
  };

  /**
   * 选中节点
   * @param node
   */
  onSelectedAction = (node) => {
    this.onHideMenu();
    const data = this.state.treeData;
    const { supportSearch, supportCheckbox, onSelectedNode } = this.props;

    if (node.selectable === false) return;

    // 更新节点选中状态
    this.updateActiveNode(data, node);

    // 选中结果
    let selectedResult = null;
    const searchMap = {};

    // 单选节点列表
    if (!supportCheckbox) {
      selectedResult = store.selectedForRadio(data, node);
    }

    // 多选节点列表
    if (supportCheckbox) {
      selectedResult = this.getSelectedMoreList(data, node);
      selectedResult = store.getSelectedLowestNodeList(
        this.state.preSelectedList,
        selectedResult,
        node,
      );
      if (supportSearch) {
        searchMap.preSelectedList = selectedResult;
      }
    }

    // 传递到外部
    onSelectedNode(node, selectedResult);

    // 更新树列表数据
    this.setState({
      treeData: copyData(data),
      preSelectedNode: node,
      ...searchMap,
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
    let tmp = data;
    if (node) {
      this.updateActiveNode(data, node);
      // 更新checked状态
      tmp = store.selectedForCheckbox(data, node);
    }
    const filterSelected = (selectedData) => {
      selectedData.forEach((item) => {
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
    if (this.props.isDynamicLoad && !node?.children?.length) {
      node.isLoading = true;
      this.setState({
        treeData: [...this.state.treeData],
      }, () => {
        this.props.onLoadData(data, node).then(res => {
          node.isLoading = false
          const backData = store.onFoldNode(res, node);

          // 如果点击的节点被选中，则其子节点也被选中，更新选中节点状态
          if (this.props.supportCheckbox && node.checked) {
            const selectedResult = store.getSelectedLowestNodeList(
              this.state.selectedValue,
              this.getSelectedMoreList(backData, node),
              node,
            ).filter(item => item.id !== node.id);
            this.props.onSelectedNode(node, selectedResult);
          }

          // 更新 allTreeData（用作筛选）
          const currentNode = store.findNodeById(this.state.allTreeData, node.id);
          Object.assign(currentNode, node);

          this.setState({
            allTreeData: this.state.allTreeData,
            treeData: [...backData],
          });
        })
      });
    } else {
      const backData = store.onFoldNode(data, node);
      this.setState({
        treeData: [...backData],
      });
    }
  };

  /**
   * 新增节点保存
   * @param pId
   * @param value
   * @param pLevel
   */
  onAddAction = (pId, value, pLevel) => {
    const { onAddNode, isAddFront, maxLevel } = this.props;
    onAddNode(pId, value)
      .then((res) => {
        const newNode = {
          id: res.data || res.id,
          name: value,
          children: [],
          pId,
          level: pLevel + 1,
          disableAdd: maxLevel - pLevel === 1,
        };
        const treeData = store.addChildNode(
          this.state.treeData,
          pId,
          newNode,
          isAddFront,
        );
        const allTreeData = store.addChildNode(
          this.state.allTreeData,
          pId,
          newNode,
          isAddFront,
        );
        this.setState({
          treeData: copyData(treeData),
          allTreeData: copyData(allTreeData),
        });
        Message.success('添加成功');
        // 关闭弹框
        this.onHideMenuDialog();
      })
      .catch((err) => {
        if (this.props.showErrMsg) {
          Message.error(err || '添加失败');
        }
      });
  };

  /**
   * 重命名节点保存
   * @param id
   * @param newValue
   */
  onRenameAction = (id, newValue, node) => {
    const { onRenameNode } = this.props;
    onRenameNode(id, newValue, node)
      .then(() => {
        const treeData = store.renameChildNode(
          this.state.treeData,
          id,
          newValue,
        );
        const allTreeData = store.renameChildNode(
          this.state.allTreeData,
          id,
          newValue,
        );
        this.setState({
          treeData: copyData(treeData),
          allTreeData: copyData(allTreeData),
        });
        Message.success('更新成功');
        // 关闭弹框
        this.onHideMenuDialog();
      })
      .catch((err) => {
        if (this.props.showErrMsg) {
          Message.error(err || '更新失败');
        }
      });
  };

  /**
   * 名称重复校验
   * @param node
   * @param name
   */
  onCheckRepeatNameAction = (node, name) => {
    return store.checkRepeatName(this.state.treeData, node, name);
  };

  /**
   * 删除节点
   * @param node
   */
  removeNode = node => {
    const { treeData } = this.state;
    store.removeChildNode(treeData, node);
    this.setState({
      treeData,
      allTreeData: copyData(treeData),
    });
  };

  /**
   * 新增节点
   * @param node
   */
  addNode = node => {
    this.onReRenderNode({ currentNode: node, isEdit: false, isAdd: true });
    this.setState({ treeData: this.state.treeData });
  };

  /**
   * 删除节点
   * @param node
   */
  onRemoveAction = (node) => {
    const { onRemoveNode } = this.props;
    this.onHideMenu();
    Modal.confirm({
      isShowIcon: false,
      title: '删除',
      body: '你确定删除此目录吗?',
      onOk: () => {
        const { treeData } = this.state;
        if (!store.removeChildNode(treeData, node)) {
          Message.error('该目录存在子目录，不可删除!');
          return;
        }
        onRemoveNode(node.id, node)
          .then(() => {
            this.removeNode(node)
          })
          .catch((err) => {
            if (this.props.showErrMsg) {
              Message.error(err || '删除失败');
            }
          });
      },
      onCancel: noop,
    });
  };

  onReRenderNode = ({
    preNode,
    currentNode,
    isEdit = false,
    isAdd = false,
    isUnfold,
  }) => {
    const { treeData } = this.state;
    // 获取上一个节点
    const previousNode = store.findNodeById(treeData, preNode && preNode.id);
    if (previousNode) {
      Object.assign(previousNode, { isEdit: false, isAdd: false });
    }

    if (this.props.menuType === 'dialogMenu') {
      this.onHideMenu();
      this.setState({
        showDialogMenu: true,
        nodeData: isAdd
          ? { id: currentNode.id, level: currentNode.level }
          : currentNode,
        parentNodeNames: this.getCurrentNodeOfParent(currentNode, isAdd),
        isAddMenuOpen: isAdd,
      });
      return;
    }

    const current = store.findNodeById(treeData, currentNode && currentNode.id);
    if (current) {
      Object.assign(current, { isEdit, isAdd });
      if (isUnfold !== undefined) {
        Object.assign(current, { isUnfold });
      }
    }
  };

  /**
   * 显示右键菜单
   * @param node
   * @param menuStyle
   * @param options
   */
  onShowMenu = (node, menuStyle, options) => {
    this.setState({
      showRightMenu: true,
      menuStyle,
      nodeData: node,
      menuOptions: options,
    });
  };

  /**
   * 隐藏菜单弹出框
   */
  onHideMenuDialog = () => {
    if (!this.state.showDialogMenu) {
      return;
    }
    this.setState({
      showDialogMenu: false,
    });
  };

  /**
   * 隐藏右键菜单
   */
  onHideMenu = () => {
    if (!this.state.showRightMenu) {
      return;
    }
    this.setState({
      showRightMenu: false,
    });
  };

  /**
   * 菜单名称输入
   * @param value
   */
  onHandleInputNodeName = (value) => {
    const tmp = this.state.nodeData;
    this.setState({
      nodeData: {
        ...tmp,
        name: value,
      },
    });
  };

  /**
   * 弹框菜单保存节点
   */
  onSaveNode = () => {
    const { id, name, level } = this.state.nodeData;
    const isNameRepeat = this.onCheckRepeatNameAction(
      this.state.nodeData,
      name,
    );
    if (isNameRepeat) {
      Message.error('该名称已存在');
      return;
    }
    if (!name) {
      Message.error('节点名称不能为空');
      return;
    }

    if (this.state.isAddMenuOpen) {
      // 新增
      this.onAddAction(id, name, level);
    } else {
      // 重命名
      this.onRenameAction(id, name, this.state.nodeData);
    }
  };

  /**
   * 查找到当前节点的所有父节点名称
   * @param currentNode
   * @param isAdd
   */
  getCurrentNodeOfParent = (currentNode, isAdd) => {
    const ancestryNames = [];
    // 新建情况下需要添加当前节点名称
    if (isAdd) {
      ancestryNames.unshift(currentNode.name);
    }
    const getNames = (pId) => {
      const pNode = store.findNodeById(this.state.treeData, pId);
      if (!pNode) {
        return;
      }
      ancestryNames.unshift(pNode.name);
      if (pNode.pId || pNode.pId === 0) {
        getNames(pNode.pId);
      }
    };
    getNames(currentNode.pId);
    const reg = new RegExp(',', 'g');
    return (
      ancestryNames.length > 0 && ancestryNames.join(',').replace(reg, '/')
    );
  };

  render() {
    const {
      treeData,
      searchText,
      treeWidth,
      nodeData,
      menuStyle,
      menuOptions,
      showRightMenu,
      showDialogMenu,
      parentNodeNames,
      isAddMenuOpen,
    } = this.state;

    const selector = `${prefixCls}-tree`;

    const {
      style,
      className,
      disabled,
      isUnfold,
      searchPlaceholder,
      searchMaxLength,
      supportSearch,
      supportImmediatelySearch,
      nodeNameMaxLength,
      supportCheckbox,
      breakCheckbox,
      supportMenu,
      supportDrag,
      supportTooltip,
      menuType,
      addMenuName,
      isAddFront,
      showIcon,
      openIconType,
      closeIconType,
      iconColor,
      selectedValue,
      onDoubleClick,
      onDragBefore,
      onDragMoving,
      onDragAfter,
      customNodeTpl,
      renderItem,
      isDynamicLoad,
      showLine,
      lineType,
    } = this.props;

    const {
      onAddAction,
      onRenameAction,
      onRemoveAction,
      onSelectedAction,
      onFoldNodeAction,
      onCheckRepeatNameAction,
      onShowMenu,
      onReRenderNode,
      removeNode,
      addNode,
    } = this;
    const { id, name, disableAdd, disableRename, disableRemove } = nodeData;

    return (
      <TreeContext.Provider
        value={{
          treeData,
          isUnfold,
          disabled,
          searchText,
          supportCheckbox,
          breakCheckbox,
          supportMenu,
          supportDrag,
          supportTooltip,
          isAddFront,
          nodeNameMaxLength,
          showIcon,
          treeWidth,
          menuType,
          addMenuName,
          openIconType,
          closeIconType,
          iconColor,
          selectedValue,
          onDoubleClick,
          onShowMenu,
          onAddAction,
          onRenameAction,
          onRemoveAction,
          onSelectedAction,
          onFoldNodeAction,
          onCheckRepeatNameAction,
          onReRenderNode,
          onDragBefore,
          onDragMoving,
          onDragAfter,
          customNodeTpl,
          renderItem,
          removeNode,
          addNode,
          isDynamicLoad,
          showLine,
          lineType,
        }}
      >
        <div className={`${selector} ${className}`} style={style}>
          <Search
            prefixCls={selector}
            onSearchAction={this.onSearchAction}
            supportImmediatelySearch={supportImmediatelySearch}
            supportSearch={supportSearch}
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
            visible={showRightMenu}
            onEditNodeBefore={onReRenderNode}
          />

          {treeData && treeData.length > 0 && (
            <div
              className={classNames(`${selector}-list-container`)}
              style={supportSearch ? hasSearchStyle : null}
              ref={this.treeAreaRef}
            >
              {
                // componentDidMount 中会更改treeWidth的值，在这里进行验证是为防止无效渲染
                treeWidth === 0 ? null : (
                  <TreeList
                    prefixCls={selector}
                    nodeNameMaxLength={nodeNameMaxLength}
                    data={treeData}
                  />
                )
              }
            </div>
          )}

          {(!treeData || !treeData.length) && (
            <div className={`${selector}-no-data`}>
              <img src={empty} alt="暂无数据" />
              <p>暂无数据</p>
            </div>
          )}

          {showDialogMenu && (
            <Modal
              visible
              title={isAddMenuOpen ? `新建${addMenuName}` : '重命名'}
              modalStyle={menuModalStyle}
              bodyStyle={menuModalBodyStyle}
              onOk={this.onSaveNode}
              onCancel={this.onHideMenuDialog}
              onClose={this.onHideMenuDialog}
            >
              <div style={{ color: '#666' }}>
                <p
                  style={{
                    marginBottom: 20,
                    lineHeight: '26px',
                    wordBreak: 'break-all',
                  }}
                >
                  {parentNodeNames}
                </p>
                <span style={{ display: 'inline-block', lineHeight: '30px' }}>
                  {addMenuName}名称：
                </span>
                <Input
                  style={{ width: 300 }}
                  defaultValue={nodeData && nodeData.name}
                  onChange={(e) => this.onHandleInputNodeName(e.target.value)}
                  onEnter={this.onSaveNode}
                  placeholder={`请输入${addMenuName}名称`}
                  hasClear
                  hasCounter
                  maxLength={nodeNameMaxLength}
                />
              </div>
            </Modal>
          )}
        </div>
      </TreeContext.Provider>
    );
  }
}

export default Tree;
