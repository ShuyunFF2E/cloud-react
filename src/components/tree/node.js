import React, { Component } from 'react';
import classNames from 'classnames';
import { getTextWidth } from 'shuyun-utils';
import { noop } from '@utils';
import Icon from '../icon';
import Message from '../message';
import Checkbox from '../checkbox';
import TreeContext from './context';
import Input from '../input';
import Tooltip from '../tooltip';
import './index.less';
// 默认菜单类型
const RIGHT_MENU = 'rightMenu';
const DIALOG_MENU = 'dialogMenu';
// 双击事件记录器
let count = 0;
class Node extends Component {
  static contextType = TreeContext;

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  // 打开菜单
  onHandleShowMenu = (e, menuTypeNow, node, options) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    // 不使用右键菜单则使用浏览器默认右键菜单
    const { menuType, onShowMenu } = this.context;
    let menuStyle = {};

    // dialog模式，并且当前正在右键，则正常走浏览器的菜单
    if (menuType === DIALOG_MENU && menuTypeNow === RIGHT_MENU) {
      return;
    }

    // right模式，并且当前正在右键，则使用右键
    if (menuType === RIGHT_MENU && menuTypeNow === RIGHT_MENU) {
      e.preventDefault();
      menuStyle = {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
      };
    }

    // dialog模式，并且点击了菜单区域，则显示菜单
    if (menuType === DIALOG_MENU && menuTypeNow === DIALOG_MENU) {
      menuStyle = {
        left: `${e.clientX - 80}px`,
        top: `${e.clientY + 10}px`,
      };
    }

    // 将节点信息、点击位置、点击函数传递出去
    onShowMenu(node, menuStyle, options);
  };

  // 显示/隐藏子节点
  toggle = (e, node) => {
    this.context.onFoldNodeAction(this.context.treeData, node);
    e.stopPropagation();
  };

  // 行内菜单输入
  setInputValue = (name) => {
    this.setState({ inputValue: name || '' });
  };

  // 输入节点名称
  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  // 保存节点信息
  onSaveClick = (e, node, name) => {
    e.stopPropagation();
    const { id, level } = node;
    // 输入内容不能为空
    if (!this.state.inputValue) {
      Message.error('名称不能为空！');
      return;
    }

    const isRepeat = this.context.onCheckRepeatNameAction(node, name);
    if (isRepeat) {
      Message.error('该目录名称已存在！');
      return;
    }

    this.setState({
      inputValue: '',
    });

    // 编辑与新增
    this.context[!node.isAdd ? 'onRenameAction' : 'onAddAction'](
      id,
      name,
      level,
    );

    this.context.onReRenderNode({ currentNode: node });
  };

  // 取消保存
  onClickCancel = (e, data) => {
    e.stopPropagation();
    this.setState({
      inputValue: '',
    });
    this.context.onReRenderNode({ currentNode: data });
  };

  // 选中节点
  handleSelect = (checked, isCheckbox) => {
    const { data } = this.props;
    const { supportCheckbox, onSelectedAction, onDoubleClick } = this.context;
    if (supportCheckbox) {
      data.checked = checked;
    }

    // 当前未配置双击事件 或 由Checkbox触发: 不再进行双击验证以提升性能
    if (onDoubleClick === noop || isCheckbox) {
      onSelectedAction(data);
      return;
    }
    count += 1;
    setTimeout(() => {
      if (count === 1) {
        // 单击
        onSelectedAction(data);
      } else if (count === 2) {
        // 双击
        onDoubleClick(data);
      }
      count = 0;
    }, 200);
  };

  render() {
    const { data, children, prefixCls } = this.props;
    const {
      supportCheckbox,
      supportDrag,
      showIcon,
      openIconType,
      closeIconType,
      iconColor,
      searchText,
      menuType,
      treeWidth,
      supportMenu,
      breakCheckbox,
      nodeNameMaxLength,
      onDoubleClick,
      supportTooltip,
    } = this.context;
    const { setInputValue, onSaveClick, onClickCancel } = this;
    // 将三个方法传递出去可以供外部调用
    const options = { setInputValue, onSaveClick, onClickCancel };
    // 无拖拽时根节点不缩进
    const paddingLeft = supportDrag ? 18 * data.level : 18 * data.level - 18;
    //
    return (
      <>
        <div
          className={classNames(
            `${prefixCls}-list-node-area ${
              data.children && !data.children.length ? 'child-style' : null
            }`,
          )}
        >
          <div
            onContextMenu={(e) =>
              supportMenu && this.onHandleShowMenu(e, RIGHT_MENU, data, options)
            }
            style={{ minWidth: `calc(100% - ${paddingLeft}px)`, paddingLeft }}
            className={`node-item-container ${
              data.isActive ? 'is-active' : null
            } ${supportCheckbox ? 'support-checkbox' : ''}`}
          >
            {/* 拖拽icon: 根节点不支持拖拽 */}
            {supportDrag && (data.pId || data.pId === 0) && (
              <Tooltip content="拖拽行调整顺序">
                <div className="drag-icon" />
              </Tooltip>
            )}

            {/* 折叠展开icon */}
            <ToggleFold
              hasChildren={data?.children.length > 0}
              showChildrenItem={data.isUnfold}
              toggle={(e) => this.toggle(e, data)}
            />
            <div
              onClick={supportCheckbox ? () => {} : this.handleSelect}
              className={`node-item ${
                data.isEdit && !data.isAdd ? 'hide-node' : null
              } ${breakCheckbox ? 'break-checkbox' : ''}`}
            >
              {/* 节点前面的icon */}
              <NodeIcon
                showIcon={showIcon}
                openIconType={openIconType}
                closeIconType={closeIconType}
                iconColor={iconColor}
                hasChildren={data?.children.length > 0}
                showChildrenItem={data.isUnfold}
              />

              {/* checkbox选择，新增或编辑时不显示 */}
              <ShowSelection
                id={data.id}
                name={data.name}
                disableSelected={data.disableSelected}
                searchText={searchText}
                supportMenu={supportMenu}
                indeterminate={data.indeterminate}
                checked={data.checked}
                indentValue={paddingLeft}
                treeWidth={treeWidth}
                menuType={menuType}
                onHandleSelect={this.handleSelect}
                breakCheckbox={breakCheckbox}
                supportCheckbox={supportCheckbox}
                supportTooltip={supportTooltip}
                onDoubleClick={() => onDoubleClick(data)}
              />
              {/* 点击菜单 */}
              {supportMenu && menuType !== RIGHT_MENU && (
                <span
                  className="edit-icon"
                  onClick={(e) =>
                    this.onHandleShowMenu(e, DIALOG_MENU, data, options)
                  }
                >
                  ...
                </span>
              )}
            </div>

            <ShowInput
              isEdit={data.isEdit}
              isAdd={data.isAdd}
              inputValue={this.state.inputValue}
              maxLength={nodeNameMaxLength}
              handleInputChange={this.handleInputChange}
              saveItem={(e) => this.onSaveClick(e, data, this.state.inputValue)}
              cancelSave={(e) => this.onClickCancel(e, data)}
            />
          </div>
          {data.isUnfold && <>{children}</>}
        </div>
      </>
    );
  }
}

/**
 * 显示折叠与展开图标
 * @param isShow
 * @param hasChildren
 * @param showChildrenItem
 * @param toggle
 * @returns {null|*}
 * @constructor
 */
function ToggleFold({ hasChildren, showChildrenItem, toggle }) {
  return (
    hasChildren && (
      <Icon
        className="toggle-icon"
        type={!showChildrenItem ? 'down' : 'up'}
        onClick={toggle}
      />
    )
  );
}

/**
 * 显示输入框
 * @param isEdit
 * @param isAdd
 * @param maxLength
 * @param inputValue
 * @param handleInputChange
 * @param saveItem
 * @param cancelSave
 * @returns {*}
 * @constructor
 */
function ShowInput({
  isEdit,
  isAdd,
  maxLength,
  inputValue,
  handleInputChange,
  saveItem,
  cancelSave,
}) {
  return isEdit || isAdd ? (
    <div className={!isAdd ? 'is-rename' : 'is-add'}>
      <Input
        className="node-input"
        value={inputValue}
        onChange={handleInputChange}
        autoFocus
        onEnter={saveItem}
        maxLength={maxLength}
        placeholder={`最多可输入${maxLength}个字符`}
      />
      <Icon type="success-line" className="save-icon" onClick={saveItem} />
      <Icon type="close-line" className="cancel-icon" onClick={cancelSave} />
    </div>
  ) : null;
}

/**
 * 显示复选框
 * @param searchText
 * @param menuType
 * @param supportMenu
 * @param treeWidth
 * @param indentValue
 * @param indeterminate
 * @param checked
 * @param supportCheckbox
 * @param breakCheckbox
 * @param id
 * @param name
 * @param disableSelected
 * @param onDoubleClick
 * @param onHandleSelect
 * @returns {*}
 * @constructor
 */
function ShowSelection({
  searchText,
  menuType,
  supportMenu,
  treeWidth,
  indentValue,
  indeterminate,
  checked,
  supportCheckbox,
  breakCheckbox,
  id,
  name,
  disableSelected,
  onDoubleClick,
  onHandleSelect,
  supportTooltip,
}) {
  // 显示形式，有弹框菜单的与没有弹框菜单的，是否需要tooltip的，单选与多选的
  let nodeClassName = 'node-name';
  if (supportMenu) {
    if (menuType === DIALOG_MENU) {
      nodeClassName = !supportCheckbox
        ? 'dialog-menu-node-name'
        : 'dialog-menu-check-node-name';
    }
  }

  let nodeText = name;
  // 处理搜索关键字高亮
  if (searchText) {
    const re = new RegExp(
      `(${searchText.replace(/[(){}.+*?^$|\\[\]]/g, '\\$&')})`,
      'ig',
    );
    nodeText = name.replace(re, `<span class="hot-text">${searchText}</span>`);
  }
  let tmp = (
    <span
      name={id}
      className={`${nodeClassName} ${
        disableSelected ? 'disabled-node-name' : ''
      }`}
      dangerouslySetInnerHTML={{ __html: nodeText }}
    />
  );

  // 是否启用tooltip，启用后将对超出长度的增加tooltip，但会影响性能
  if (supportTooltip) {
    let nodeWidth = 0;
    if (treeWidth > 0) {
      let correctWidth = 0;
      if (
        !supportCheckbox &&
        (!supportMenu || (supportMenu && menuType === RIGHT_MENU))
      ) {
        // 单选无菜单或有右键菜单
        correctWidth = 46;
      }
      if (!supportCheckbox && supportMenu && menuType === DIALOG_MENU) {
        // 单选有菜单且为弹框菜单
        correctWidth = 71;
      }
      if (
        supportCheckbox &&
        (!supportMenu || (supportMenu && menuType === RIGHT_MENU))
      ) {
        // 多选无菜单或有右键菜单
        correctWidth = 66;
      }
      if (supportCheckbox && supportMenu && menuType === DIALOG_MENU) {
        // 多选有菜单且为弹框菜单
        correctWidth = 102;
      }
      nodeWidth = treeWidth - indentValue - correctWidth;
    }

    // 文本过长的，增加Tooltip
    if (getTextWidth(name) > nodeWidth) {
      tmp = (
        <Tooltip content={name} placement="top-left">
          {tmp}
        </Tooltip>
      );
    }
  }
  const labelWidth = {
    width:
      supportMenu && menuType === DIALOG_MENU
        ? 'calc(100% - 30px)'
        : 'calc(100%)',
    zIndex: 0,
    marginTop: '6px',
  };

  if (supportCheckbox) {
    return (
      <>
        <Checkbox
          disabled={disableSelected}
          indeterminate={indeterminate}
          checked={checked}
          value={id}
          onChange={(value) => {
            onHandleSelect(value, true);
          }}
          style={labelWidth}
        >
          <>{!breakCheckbox && tmp}</>
        </Checkbox>
        {breakCheckbox && (
          <span className="checkbox-label-text" onDoubleClick={onDoubleClick}>
            {tmp}
          </span>
        )}
      </>
    );
  }
  return tmp;
}

/**
 * 节点Icon
 * @param showIcon
 * @param openIconType
 * @param closeIconType
 * @param iconColor
 * @param hasChildren
 * @param showChildrenItem
 */
function NodeIcon({
  showIcon,
  openIconType,
  closeIconType,
  iconColor,
  hasChildren,
  showChildrenItem,
}) {
  if (!showIcon) {
    return null;
  }
  const style = {
    color: iconColor,
    fontSize: '16px',
    margin: '0 8px 0 0',
  };
  // 存在子节点,并且要显示子节点
  return (
    <Icon
      style={style}
      type={hasChildren && showChildrenItem ? openIconType : closeIconType}
    />
  );
}
export default Node;
