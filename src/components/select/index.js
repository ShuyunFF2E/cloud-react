import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ShuyunUtils from 'shuyun-utils';

import { flat, noop } from '@utils';
import ContextProvider from '@contexts/context-provider';
import SingleSelect from './views/select/single-select';
import MultiSelect from './views/select/multi-select';
import GroupSelect from './views/select/group-select';
import Selected from './views/selected';
import Option from './views/option';
import ImageText from './views/image-text';
import { selector } from './views/common';

import { formatOptionSource, isGroupSelectPicker } from './utils';

import './index.less';

const getSelected = (data, children, dataSource) => {
  const options = Array.isArray(data) ? data : [data];
  if (!options.length) return [];
  let selected = [];
  if (isGroupSelectPicker(dataSource)) {
    const groupOptionData = dataSource.map((x) => x.options).flat();
    groupOptionData.forEach((x) => {
      const { label, value } = x;
      if (options.includes(value)) {
        selected.push({ label, value });
      }
    });
  } else {
    selected = Children.map(children, (child) => {
      const { children: label, value } = child.props;
      return options.includes(value) ? { label, value } : null;
    });
  }
  return selected;
};

const getOptions = (
  dataSource,
  labelKey,
  valueKey,
  descKey,
  optionRender,
  isSupportTitle,
  searchValue,
  supportLightText,
  lightTextColor,
  scrollItem,
  checkboxStyle,
  searchable,
) => dataSource.map((v, index) => (
  <Option
    item={{ ...v, index }}
    value={v[valueKey]}
    disabled={v.disabled}
    isSupportTitle={isSupportTitle}
    key={Math.random()}
    searchValue={searchValue}
    supportLightText={supportLightText}
    lightTextColor={lightTextColor}
    scrollItem={scrollItem}
    checkboxStyle={checkboxStyle}
    searchable={searchable}
    optionRender={optionRender}
  >
    {optionRender ? optionRender(v, index, { searchable, searchValue, supportLightText, lightTextColor }) : v[labelKey]}
  </Option>
));

class Select extends Component {
  static Option = Option;
  static ImageText = ImageText;

  static contextType = ContextProvider;

  constructor(props) {
    super(props);

    const { open, defaultOpen, labelInValue, dataSource } = props;
    const { defaultSelectValue, children } = this;

    const selected = getSelected(defaultSelectValue, children, dataSource);

    this.state = {
      open: open || defaultOpen,
      value: defaultSelectValue,
      prevValue: defaultSelectValue,
      prevResult: labelInValue ? selected : defaultSelectValue,
      selected,
      prevProps: props,
      style: {},
      searchValue: '',
      isSearch: false,
      hoveredOption: null,
    };
    this.node = React.createRef();
    this.optionsNode = React.createRef();
    this.selectedNode = React.createRef();
  }

  static getDerivedStateFromProps(props, prevState) {
    const { prevProps } = prevState;
    const { value, children, dataSource, multiple, open, isSupportTitle } = props;
    const {
      value: prevValue,
      children: prevChildren,
      dataSource: prevData,
      open: prevOpen,
    } = prevProps;

    if (
      value !== prevValue
      || Children.count(children) !== Children.count(prevChildren)
      || !ShuyunUtils.equal(dataSource, prevData)
    ) {
      const { labelKey, valueKey, descKey, optionRender, labelInValue, defaultValue } = props;
      const displayValue = value !== null ? value : defaultValue;
      const childs = Array.isArray(children)
        ? flat(children, Infinity)
        : Children.toArray(children);
      const source = childs.length
        ? childs
        : getOptions(
          dataSource,
          labelKey,
          valueKey,
          descKey,
          optionRender,
          isSupportTitle,
          prevState?.searchValue,
          props.supportLightText,
          props.lightTextColor,
          props.scrollItem,
          props.checkboxStyle,
          props.searchable,
        );
      const selected = getSelected(displayValue, source, dataSource);
      const emptyValue = multiple ? [] : '';
      const currentValue = displayValue !== null ? displayValue : emptyValue;
      return {
        value: currentValue,
        prevValue: currentValue,
        prevResult: labelInValue ? selected : displayValue,
        selected,
        prevProps: props,
        searchValue: prevState?.searchValue,
      };
    }

    if (open !== prevOpen) {
      return {
        prevProps: props,
        open,
      };
    }

    return null;
  }

  componentDidMount() {
    this.document.addEventListener('click', this.handleClick);
    this.node.current.addEventListener('mouseleave', this.handleMouseLeave);
    if (this.state.open) this.positionPop();

    if (!this.props.dataSource.length) {
      // console.warn('请传入dataSource属性，未传入可能导致部分功能不能正常使用');
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.open !== prevState.open && this.state.open) {
      this.positionPop();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { disabled, width, open: propOpen, searchable, size } = nextProps;
    const { open, value, selected, style } = nextState;
    const {
      disabled: prevDisabled,
      width: prevWidth,
      open: prevPropOpen,
      searchable: prevSearchable,
      size: prevSize,
      searchValue,
    } = this.props;
    const {
      open: prevOpen,
      value: prevValue,
      selected: prevSelected,
      style: prevStyle,
      searchValue: prevSearchValue,
    } = this.state;

    return (
      disabled !== prevDisabled
      || size !== prevSize
      || width !== prevWidth
      || propOpen !== prevPropOpen
      || open !== prevOpen
      || value !== prevValue
      || selected !== prevSelected
      || searchable !== prevSearchable
      || style !== prevStyle
      || searchValue !== prevSearchValue
    );
  }

  componentWillUnmount() {
    this.document.removeEventListener('click', this.handleClick);
    this.node.current.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  setSearchStatus = isSearch => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ isSearch });
  };

  get document() {
    return this.context.rootDocument;
  }

  get portal() {
    const { getContext } = this.context;
    return getContext() || this.document.body;
  }

  get defaultSelectValue() {
    const { value, defaultValue, multiple } = this.props;
    if (multiple) {
      return value || defaultValue || [];
    }
    return value !== null ? value : defaultValue;
  }

  get children() {
    const { children, dataSource, labelKey, valueKey, descKey, optionRender, isSupportTitle } = this.props;
    const childs = Array.isArray(children)
      ? flat(children, Infinity)
      : Children.toArray(children);

    if (childs.length) return childs;

    if (isGroupSelectPicker(dataSource)) {
      return this.getGroupOptions();
    }
    return getOptions(
      dataSource,
      labelKey,
      valueKey,
      descKey,
      optionRender,
      isSupportTitle,
      this.state?.searchValue,
      this.props.supportLightText,
      this.props.lightTextColor,
      this.props.scrollItem,
      this.props.checkboxStyle,
      this.props.searchable,
    );
  }

  get selectedContainerStyle() {
    const selectNode = this.selectedNode.current;
    if (selectNode) {
      return selectNode.ref.current.getBoundingClientRect();
    }
    return {};
  }

  get optionsNodeStyle() {
    const ele = this.optionsNode.current;
    if (!ele) return {};
    return ele.getBoundingClientRect();
  }

  getGroupOptions = () => {
    const { dataSource, labelKey, valueKey, descKey, optionRender, isSupportTitle } = this.props;
    return dataSource.map((group) => {
      const groupItem = getOptions(
        group.options || [],
        labelKey,
        valueKey,
        descKey,
        optionRender,
        isSupportTitle,
        this.state?.searchValue,
        this.props.supportLightText,
        this.props.lightTextColor,
        this.props.scrollItem,
        this.props.checkboxStyle,
        this.props.searchable,
      );
      return (
        <div>
          <p className="groupName">{group.label}</p>
          {groupItem}
        </div>
      );
    });
  };

  positionPop = () => {
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
  };

  handleMouseLeave = () => {
    const {
      props: { trigger },
      state: { open },
      handleSelect,
    } = this;
    if (trigger === 'hover' && open) {
      handleSelect();
    }
  };

  handleClick = (e) => {
    const { open, prevValue } = this.state;
    const isClickSelect = this.node.current.contains(e.target)
      || (this.optionsNode.current && this.optionsNode.current.contains(e.target));

    if (!isClickSelect && open) {
      const { onSelectClose, open: propOpen, hasConfirmButton } = this.props;
      onSelectClose();
      if (hasConfirmButton) this.onMultiOptionChange(prevValue);
      if (propOpen === null) {
        this.optionsNode.current.classList.remove('show');
        setTimeout(() => {
          this.setState({ open: false });
        }, 100);
      }
    }
  };

  handleSelect = ({ isClose = false } = {}) => {
    const { open } = this.state;
    const { onSelectOpen, onSelectClose, open: propOpen, multiple } = this.props;

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
      } else if (!multiple && !this.state.isSearch || multiple && this.props.supportUnlimited || isClose) {
        this.optionsNode.current.classList.remove('show');
        setTimeout(() => {
          this.setState({ open: !open });
        }, 100);
      }
    }
  };

  onClickSelected = () => {
    if (this.props.searchable && this.selectedNode.current.getSearchValue()) {
      return;
    }
    this.onSearchValueChange('');
    const { disabled } = this.props;
    if (disabled) return;

    this.handleSelect();
  };

  onSimpleOptionChange = (data) => {
    const { labelInValue, onChange, onBeforeChange } = this.props;
    const { prevValue, prevResult } = this.state;

    if (data.value === prevValue) {
      this.handleSelect();
      return;
    }

    const option = formatOptionSource(data);
    const selectValue = option[0].value;
    const checkedValue = labelInValue ? option[0] : selectValue;

    const onBeforeSelectChange = onBeforeChange || (() => Promise.resolve());

    onBeforeSelectChange(checkedValue).then(() => {
      this.setState({
        selected: option,
        value: selectValue,
        prevValue: selectValue,
        prevResult: checkedValue,
      });

      this.handleSelect();
      onChange(checkedValue, prevResult, data.item);
    });
  };

  onMultiOptionChange = (data) => {
    const { children } = this;
    const { labelInValue } = this.props;
    const options = Children.map(children, (child) => {
      const { children: label, value } = child.props;
      return data.includes(value) ? { label, value } : null;
    });
    const values = options.map((v) => v.value);

    this.setState({
      selected: options,
      value: values,
    });

    return labelInValue ? options : values;
  };

  onMultiSelectValueChange = (data) => {
    const {
      onMultiOptionChange,
      props: { hasConfirmButton, onChange },
      state: { prevResult },
    } = this;

    const checkedValue = onMultiOptionChange(data);

    if (!hasConfirmButton) {
      this.setState({
        prevResult: checkedValue,
      });
      onChange(checkedValue, prevResult);
    }
  };

  onClearSelected = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { multiple } = this.props;
    const value = multiple ? [] : '';
    const { prevResult } = this.state;

    this.setState({
      selected: [],
      value,
      prevValue: value,
      prevResult: value,
    });
    this.props.onChange(value, prevResult);
  };

  handleOk = () => {
    const {
      handleSelect,
      props: { labelInValue, onOk },
      state: { selected, value, prevResult },
    } = this;
    const result = labelInValue ? selected : value;

    this.setState({
      prevValue: value,
      prevResult: result,
    });

    onOk(result, prevResult);
    handleSelect({ isClose: true });
  };

  handleCancel = () => {
    const {
      onMultiOptionChange,
      handleSelect,
      props: { onCancel },
      state: { prevValue },
    } = this;

    onMultiOptionChange(prevValue);
    onCancel();
    handleSelect({ isClose: true });
  };

  onSearchValueChange = (v) => {
    this.setState({ searchValue: v });
  };

  onHoverChange = (item) => {
    this.setState({ hoveredOption: item });
  };

  renderOptions() {
    const { multiple, confirmTemplate, dataSource } = this.props;
    const { value } = this.state;

    if (multiple) {
      return (
        <MultiSelect
          {...this.props}
          value={value}
          dataSource={this.children}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmTemplate={confirmTemplate}
          onChange={this.onMultiSelectValueChange}
          onSearchValueChange={this.onSearchValueChange}
          handleSelect={this.handleSelect}
          searchValue={this.state.searchValue}
          onHoverChange={this.onHoverChange}
          open={this.state.open}
        />
      );
    }

    if (isGroupSelectPicker(dataSource)) {
      return (
        <GroupSelect
          {...this.props}
          value={value}
          dataSource={this.children}
          onChange={this.onSimpleOptionChange}
          searchValue={this.state.searchValue}
          onSearchValueChange={this.onSearchValueChange}
        />
      );
    }

    return (
      <SingleSelect
        {...this.props}
        value={value}
        dataSource={this.children}
        onChange={this.onSimpleOptionChange}
        searchValue={this.state.searchValue}
        onSearchValueChange={this.onSearchValueChange}
        onHoverChange={this.onHoverChange}
        open={this.state.open}
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
      isSupportTitle,
      size,
      supportUnlimited,
      formSize,
      dataSource,
      dropdownConfig,
      ...otherProps
    } = this.props;
    const { selected, open, style: popupStyle, hoveredOption } = this.state;
    const { width } = this.selectedContainerStyle;
    const classNames = classnames(
      `${selector}`,
      { [`${selector}-open`]: open },
      className,
    );

    const optionContainer = open ? (
      <div
        className={`${selector}-option-container ${dropdownClassName}`}
        ref={this.optionsNode}
        style={{
          ...popupStyle,
          width: hoveredOption?.[this.props.selectInfoKey]
            ? dropdownConfig?.width
            : dropdownConfig?.leftWidth || dropdownStyle?.width || `${width}px`,
          ...dropdownStyle,
        }}
      >
        {this.renderOptions()}
      </div>
    ) : null;

    return (
      <div className={`${classNames}`} style={style} ref={this.node}>
        {/* 已选显示区域 */}
        <Selected
          {...otherProps}
          ref={this.selectedNode}
          onClick={this.onClickSelected}
          onClear={this.onClearSelected}
          open={open}
          allowClear={allowClear}
          placeholder={placeholder}
          selectedList={selected}
          dataSource={dataSource}
          metaData={this.children}
          disabled={disabled}
          size={formSize || size || 'default'}
          isSupportTitle={isSupportTitle}
          supportUnlimited={supportUnlimited}
          onSearchValueChange={this.onSearchValueChange}
          onMultiChange={this.onMultiSelectValueChange}
          positionPop={this.positionPop}
          isSearch={this.state.isSearch}
          setSearchStatus={this.setSearchStatus}
        />

        {isAppendToBody
          ? ReactDOM.createPortal(optionContainer, this.portal)
          : optionContainer}
      </div>
    );
  }
}

Select.propTypes = {
  multiple: PropTypes.bool,
  allowClear: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  size: PropTypes.string,
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  dataSource: PropTypes.array,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  descKey: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  searchable: PropTypes.bool,
  emptyRender: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  labelInValue: PropTypes.bool,
  showSelectStyle: PropTypes.bool,
  hasSelectAll: PropTypes.bool,
  hasConfirmButton: PropTypes.bool,
  isSupportTitle: PropTypes.bool,
  okBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onSelectOpen: PropTypes.func,
  onSelectClose: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  supportLightText: PropTypes.bool,
  lightTextColor: PropTypes.string,
  supportUnlimited: PropTypes.bool,
  unlimitedLabel: PropTypes.string,
  showTag: PropTypes.bool,
  maxTagCount: PropTypes.number,
  scrollSelected: PropTypes.bool,
  scrollItem: PropTypes.bool,
  dropdownStyle: PropTypes.object,
  dropdownClassName: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'auto']),
  maxHeight: PropTypes.number,
  optionRender: PropTypes.func,
  selectAllText: PropTypes.string,
  borderRadiusSize: PropTypes.oneOf(['default', 'medium', 'large']),
  checkboxStyle: PropTypes.object,
  dropdownConfig: PropTypes.object,
  selectInfoKey: PropTypes.string,
};

Select.defaultProps = {
  multiple: false,
  allowClear: false,
  defaultOpen: false,
  showSelectStyle: true,
  size: 'default',
  open: null,
  disabled: false,
  placeholder: '请选择',
  dataSource: [],
  labelKey: 'label',
  valueKey: 'value',
  descKey: 'desc',
  width: 'auto',
  searchable: false,
  emptyRender: '',
  defaultValue: null,
  value: null,
  labelInValue: false,
  hasSelectAll: false,
  hasConfirmButton: false,
  isSupportTitle: false,
  okBtnText: '确定',
  cancelBtnText: '取消',
  className: '',
  children: [],
  onChange: noop,
  onSearch: noop,
  onSelectOpen: noop,
  onSelectClose: noop,
  onOk: noop,
  onCancel: noop,
  supportLightText: false,
  lightTextColor: undefined,
  supportUnlimited: false,
  unlimitedLabel: '不限',
  showTag: true,
  maxTagCount: 1,
  scrollSelected: false,
  scrollItem: false,
  dropdownStyle: {},
  dropdownClassName: '',
  position: 'bottom',
  maxHeight: undefined,
  optionRender: undefined,
  selectAllText: '全选',
  borderRadiusSize: 'default',
  checkboxStyle: {},
  selectInfoKey: 'selectInfo',
};

export default Select;
