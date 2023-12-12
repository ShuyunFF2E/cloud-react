import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ShuyunUtils from 'shuyun-utils';
import ContextProvider from '@contexts/context-provider';
import { noop } from '@utils';

import Tree from './tree';
import Selected from './selected';
import SingleTree from './single-tree';
import { selector, SINGLE, MULTIPLE, getNodePath } from './const';

import './index.less';

class TreeSelect extends Component {
  static contextType = ContextProvider;

  constructor(props) {
    super(props);

    const { open, defaultOpen, value, defaultValue, single, multiple, dataSource } = props;
    let values;
    if (this.isTree) {
      values = value || defaultValue || [];
    } else {
      values = value !== null ? value : defaultValue;
    }
    this.state = {
      open: open || defaultOpen,
      value: values,
      prevValue: values,
      prevProps: props,
      style: {},
      isSearch: false,
      treeData: getNodePath(dataSource),
    };
    this.node = React.createRef();
    this.selectedNode = React.createRef();
    this.optionsNode = React.createRef();
    this.treeRef = React.createRef();
    // this.singleTreeRef = React.createRef();

    if (single || multiple) {
      console.warn(
        'single/multiple属性将于后续版本中废弃，如需使用可设置type="single || multiple"',
      );
    }
  }

  static getDerivedStateFromProps(props, prevState) {
    const { prevProps } = prevState;
    const { value, dataSource, open } = props;
    const {
      value: prevValue,
      dataSource: prevData,
      open: prevOpen,
    } = prevProps;
    if (
      !ShuyunUtils.equal(value, prevValue) ||
      !ShuyunUtils.equal(dataSource, prevData)
    ) {
      return {
        value,
        prevValue: value,
        prevProps: props,
      };
    }
    if (open !== prevOpen) {
      return {
        open,
        prevProps: props,
      };
    }
    return null;
  }

  componentDidMount() {
    this.document.addEventListener('click', this.handleClick);
    if (this.state.open) this.positionPop();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { disabled, width, open: propOpen, searchable } = nextProps;
    const { open, value, style } = nextState;
    const {
      disabled: prevDisabled,
      width: prevWidth,
      open: prevPropOpen,
      searchable: prevSearchable,
    } = this.props;
    const { open: prevOpen, value: prevValue, style: prevStyle } = this.state;
    return (
      disabled !== prevDisabled ||
      width !== prevWidth ||
      propOpen !== prevPropOpen ||
      open !== prevOpen ||
      value !== prevValue ||
      searchable !== prevSearchable ||
      style !== prevStyle
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.open !== prevState.open && this.state.open) {
      this.positionPop();
    }
    if (this.props.dataSource !== prevProps.dataSource) {
      this.setState({ treeData: getNodePath(this.props.dataSource) });
    }
  }

  componentWillUnmount() {
    this.document.removeEventListener('click', this.handleClick);
  }

  setSearchStatus = isSearch => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isSearch });
    this.forceUpdate();
  };

  get document() {
    return this.context.rootDocument;
  }

  get portal() {
    const { getContext } = this.context;
    return getContext() || this.document.body;
  }

  get type() {
    const { type, single, multiple } = this.props;
    if (single) return SINGLE;
    if (multiple) return MULTIPLE;
    return type;
  }

  get isTree() {
    const { type } = this;
    return type === MULTIPLE || type === SINGLE;
  }

  get selectedContainerStyle() {
    const selectNode = this.selectedNode.current;
    if (selectNode) {
      return selectNode.ref.current?.getBoundingClientRect() || {};
    }
    return {};
  }

  get optionsNodeStyle() {
    return this.optionsNode.current?.getBoundingClientRect() || {};
  }

  positionPop = () => {
    setTimeout(() => {
      const {
        props: { isAppendToBody, position },
        selectedContainerStyle: { left, top, bottom, height },
        optionsNodeStyle: { height: optionsHeight },
      } = this;
      const isBottomDistanceEnough = bottom + optionsHeight < this.document.documentElement.clientHeight;
      const isLocationTop = position === 'top' || optionsHeight < top && !isBottomDistanceEnough && position === 'auto';
      if (isAppendToBody) {
        this.setState({
          style: {
            position: 'fixed',
            left: `${left}px`,
            top: isLocationTop ? `${top - optionsHeight}px` : `${bottom + 4}px`,
          },
        });
      } else {
        this.setState({
          style: {
            top: isLocationTop ? `${-optionsHeight - 4}px` : `${height + 4}px`,
          },
        });
      }
    });
  };

  handleClick = (e) => {
    const { open, prevValue } = this.state;
    const isClickSelect =
      this.node.current.contains(e.target) ||
      (this.optionsNode.current && this.optionsNode.current.contains(e.target));
    if (!isClickSelect && open) {
      const { onSelectClose, open: propOpen, hasConfirmButton } = this.props;
      onSelectClose();
      if (hasConfirmButton) this.onTreeOptionChange({}, prevValue);
      if (propOpen === null) {
        this.optionsNode.current.classList.remove('show');
        setTimeout(() => {
          this.setState({ open: false });
        }, 100);
      }
    }
  };

  handleSelect = () => {
    const { open } = this.state;
    const { onSelectOpen, onSelectClose, open: propOpen, searchInBox, type } = this.props;
    if (open) {
      onSelectClose();
    } else {
      onSelectOpen();
    }
    if (propOpen === null) {
      if (!open) {
        this.setState({ open: !open });
        setTimeout(() => {
          this.optionsNode.current.classList.add('show');
        });
      } else if (!searchInBox || searchInBox && type === MULTIPLE || searchInBox && type !== MULTIPLE && !this.state.isSearch) {
        this.optionsNode.current.classList.remove('show');
        setTimeout(() => {
          this.setState({ open: !open });
        }, 100);
      }
    }
  };

  onClickSelected = () => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.handleSelect();
  };

  onValueChange = (node, selectedNodes) => {
    if (this.isTree) {
      this.onTreeOptionChange(node, selectedNodes);
    } else {
      this.onSimpleChange(node);
    }
  };

  onSimpleChange = (node) => {
    const { onChange } = this.props;
    this.setState({
      value: node,
      prevValue: node,
    });
    this.handleSelect();
    onChange(node);
  };

  onTreeOptionChange = (node, selectedNodes) => {
    const {
      type,
      props: { hasConfirmButton, containParentNode, onChange },
    } = this;
    const selectedData = containParentNode
      ? selectedNodes
      : selectedNodes.filter((v) => !v.children || !v.children.length);
    this.setState({
      value: selectedData,
      node,
    });
    if (!hasConfirmButton || type === SINGLE) {
      this.setState({
        prevValue: selectedData,
      });
      onChange(node, selectedData);
      if (type === SINGLE) this.handleSelect();
    }
  };

  onClearSelected = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const value = this.isTree ? [] : {};
    this.setState({
      value,
      prevValue: value,
    });

    if (this.isTree) {
      this.props.onChange({}, value);
    } else {
      this.props.onChange(value);
    }
  };

  handleOk = () => {
    const { value: selectedNodes, node } = this.state;
    this.setState({
      prevValue: selectedNodes,
    });
    this.props.onOk(node, selectedNodes);
    this.handleSelect();
  };

  handleCancel = () => {
    const { prevValue } = this.state;
    this.setState({
      value: prevValue,
    });
    this.props.onCancel();
    this.handleSelect();
  };

  handleReset = () => {
    this.setState({
      value: [],
    });
    this.props.onReset();
  };

  renderTreeNode() {
    if (!this.isTree) {
      return (
        <SingleTree
          {...this.props}
          // ref={this.singleTreeRef}
          value={this.state.value}
          onChange={this.onValueChange}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          open={this.state.open}
          setSearchStatus={this.setSearchStatus}
        />
      );
    }
    return (
      <Tree
        {...this.props}
        treeRef={this.treeRef}
        type={this.type}
        value={this.state.value}
        supportTooltip={false}
        onChange={this.onValueChange}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        onReset={this.handleReset}
      />
    );
  }

  render() {
    const {
      placeholder,
      disabled,
      allowClear,
      style,
      className,
      dropdownStyle,
      dropdownClassName,
      isAppendToBody,
      searchable,
    } = this.props;
    const { value, open, style: popupStyle } = this.state;
    const { width } = this.selectedContainerStyle;

    const classNames = classnames(
      `${selector}`,
      { [`${selector}-open`]: open },
      className,
    );
    const treeOptionsContainer = open ? (
      <div
        className={`${selector}-container ${dropdownClassName}`}
        ref={this.optionsNode}
        style={{ ...popupStyle, minWidth: width, ...dropdownStyle }}
      >
        {this.renderTreeNode()}
      </div>
    ) : null;

    return (
      <div className={`${classNames}`} style={style} ref={this.node}>
        <Selected
          ref={this.selectedNode}
          onClick={this.onClickSelected}
          onClear={this.onClearSelected}
          open={open}
          allowClear={allowClear}
          placeholder={placeholder}
          dataSource={value}
          treeData={this.props.isDynamicLoad ? this.props.dataSource : this.state.treeData}
          disabled={disabled}
          searchable={searchable}
          searchInBox={this.props.searchInBox}
          treeRef={this.treeRef}
          setSearchStatus={this.setSearchStatus}
          type={this.props.type}
          onMultiChange={this.onValueChange}
          positionPop={this.positionPop}
          maxTagCount={this.props.maxTagCount}
          selectedList={this.state.value}
          isSearch={this.state.isSearch}
          showPath={this.props.showPath}
          // singleTreeRef={this.singleTreeRef}
          // singleTreeValue={this.state.value}
        />
        {isAppendToBody
          ? ReactDOM.createPortal(treeOptionsContainer, this.portal)
          : treeOptionsContainer}
      </div>
    );
  }
}

TreeSelect.propTypes = {
  type: PropTypes.string,
  allowClear: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  open: PropTypes.bool,
  isUnfold: PropTypes.bool,
  dataSource: PropTypes.array,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  searchable: PropTypes.bool,
  emptyRender: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  hasConfirmButton: PropTypes.bool,
  className: PropTypes.string,
  isAppendToBody: PropTypes.bool,
  onChange: PropTypes.func,
  onSelectOpen: PropTypes.func,
  onSelectClose: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  searchInBox: PropTypes.bool,
  maxTagCount: PropTypes.number,
  dropdownStyle: PropTypes.object,
  dropdownClassName: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'auto']),
};

TreeSelect.defaultProps = {
  type: 'default',
  allowClear: false,
  defaultOpen: false,
  open: null,
  isUnfold: false,
  dataSource: [],
  disabled: false,
  placeholder: '',
  width: 'auto',
  searchable: false,
  emptyRender: '暂时没有数据',
  defaultValue: [],
  value: [],
  hasConfirmButton: false,
  className: '',
  isAppendToBody: false,
  onChange: noop,
  onSelectOpen: noop,
  onSelectClose: noop,
  onOk: noop,
  onCancel: noop,
  onReset: noop,
  searchInBox: true,
  maxTagCount: undefined,
  dropdownStyle: {},
  dropdownClassName: '',
  position: 'bottom',
};

export default TreeSelect;
