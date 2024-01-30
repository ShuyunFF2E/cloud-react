import React, { Component } from 'react';
import CascaderMenu from 'rc-cascader';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils';
import {
  defaultSearchRender,
  defaultLoadingRender,
  DefaultRenderEmpty,
  ALL_VALUE,
} from './constant.js';
import Icon from '../icon';
import './index.less';

class Cascader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // inputValue: '',
      open: false,
      options: [],
      // 组件内容选中内容。
      value: [],
    };
  }

  componentDidMount() {
    // this.setState({
    //   inputValue: this.props.defaultValue
    //     .map((o) => o.label)
    //     .join(this.props.splitInput),
    // });
    this.setState({ value: this.props.value });
    this.initOptions();
  }

  componentDidUpdate(prevProps) {
    const { options, hasSelectAll, value } = this.props;
    if (JSON.stringify(prevProps.options) !== JSON.stringify(options)) {
      this.initOptions();
    }
    // hasSelectAll: 全选选项是内部实现提供的。 仅在组件刚挂着的时候赋值，外部取值
    if (
      !hasSelectAll
      && JSON.stringify(prevProps.value) !== JSON.stringify(value)
    ) {
      this.setState({ value });
    }
  }

  // 适配下拉数据
  initOptions = () => {
    const {
      multiple,
      hasSelectAll,
      options,
      fieldNames: { label, value },
    } = this.props;
    let result = [...options];

    if (multiple && hasSelectAll) {
      result = [
        {
          [label]: '全选',
          [value]: ALL_VALUE,
        },
        ...options,
      ];
    }
    this.setState({
      options: result,
    });
  };

  onPopupVisibleChange = (visible) => {
    this.setState({
      open: visible,
    });
  };

  isAll = (value) => {
    const { options, hasSelectAll } = this.props;
    let parentValue = value.filter((item) => item.length === 1);
    if (hasSelectAll) {
      // value数据结构 [['ALL'], ['pId1','pId11'], ['pId2','pId21'], ['pId3']]
      // 获取除全选以外的选中项
      const removeAllItem = value.filter(
        (item) => JSON.stringify(item) !== JSON.stringify([ALL_VALUE]),
      );

      // 获取选中的一级节点。
      parentValue = removeAllItem.filter((item) => item.length === 1);
    }

    return parentValue.length === options.length;
  };

  getValue = (value) => {
    // value数据结构 [['ALL'], ['pId1','pId11'], ['pId2','pId21'], ['pId3']]
    // 获取除全选以外的选中项
    const removeAllItem = value.filter(
      (item) => JSON.stringify(item) !== JSON.stringify([ALL_VALUE]),
    );

    let result = {
      outerValue: removeAllItem,
      isSelectedAll: false,
      innerValue: removeAllItem,
    };
    // 一级节点是否全部选中
    if (this.isAll(value)) {
      result = {
        ...result,
        isSelectedAll: true,
        innerValue: [[ALL_VALUE], ...removeAllItem],
      };
    }
    return result;
  };

  changeValue = (
    innerValue = [],
    outerValue = [],
    selectedOptions = [],
    isSelectedAll = false,
  ) => {
    this.setState({ value: innerValue });
    this.props.onChange(outerValue, selectedOptions, isSelectedAll);
  };

  handleChange = (value, valueObj) => {
    const { value: preValue } = this.state;
    const { hasSelectAll } = this.props;
    if (!hasSelectAll) {
      this.changeValue(value, value, valueObj, this.isAll(value));
      return;
    }

    // 包含全选，需要处理选中数据。
    // 【选中全部按钮】获取最后一次点击的Item，是否和全选值相等，
    if (
      JSON.stringify(value[value.length - 1]) === JSON.stringify([ALL_VALUE])
    ) {
      this.handelAllChange(true);
      return;
    }
    // 【取消全部按钮】1、上一次代码的value是否包含全选值 2、 本次value是否取消了全选。
    if (
      preValue?.some(
        (x) => JSON.stringify(x) === JSON.stringify([ALL_VALUE]),
      )
      && value.every((x) => JSON.stringify(x) !== JSON.stringify([ALL_VALUE]))
    ) {
      this.handelAllChange(false);
      return;
    }
    // 【点击其他项目】
    const { innerValue, outerValue, isSelectedAll } = this.getValue(value);
    this.changeValue(innerValue, [...outerValue], valueObj, isSelectedAll);
  };

  // 全选项目是否选中， 选中
  handelAllChange = (checked) => {
    const {
      options,
      fieldNames: { value: valueKey },
    } = this.props;
    if (checked) {
      const _value = options?.map((x) => [x[valueKey]]);
      this.changeValue([[ALL_VALUE], ..._value], [..._value], options, true);
      return;
    }
    this.changeValue();
  };

  mergedNotFoundContent = this.props.notFoundContent || (
    <DefaultRenderEmpty prefixCls={this.props.prefixCls} />
  );

  render() {
    const { multiple, showSearch, loadingIcon, ...props } = this.props;
    const iconClasses = this.state.open ? 'open' : 'close';
    const checkable = multiple ? (
      <div className={`${this.props.prefixCls}-checkbox-inner`} />
    ) : (
      false
    );
    const mergedShowSearch = () => {
      if (!showSearch) {
        return showSearch;
      }

      let searchConfig = {
        render: defaultSearchRender,
      };

      if (typeof showSearch === 'object') {
        searchConfig = {
          ...searchConfig,
          ...showSearch,
        };
      }

      return searchConfig;
    };

    // fixed: React does not recognize the `***` prop on a DOM element
    const divProps = Object.assign({}, props);
    delete divProps.splitInput;
    delete divProps.hasSelectAll;

    return (
      <CascaderMenu
        {...divProps}
        value={this.state.value}
        options={[...this.state.options]}
        onChange={this.handleChange}
        loadingIcon={loadingIcon || defaultLoadingRender(this.props.prefixCls)}
        className={iconClasses}
        checkable={checkable}
        notFoundContent={this.mergedNotFoundContent}
        showSearch={mergedShowSearch()}
      />
    );
  }
}
Cascader.defaultProps = {
  onChange() {},
  maxTagPlaceholder: (text) => (text?.length ? `+ ${text.length}` : ''),
  multiple: false,
  allowClear: false,
  disabled: false,
  transitionName: undefined,
  defaultValue: [],
  inputIcon: <Icon type="down" style={{ fontSize: '12px' }} />,
  prefixCls: `${prefixCls}-ccascader`,
  popupClassName: '',
  placement: 'bottomLeft',
  showArrow: true,
  expandTrigger: 'click',
  fieldNames: { label: 'label', value: 'value', children: 'children' },
  expandIcon: <Icon type="right" style={{ fontSize: '16px' }} />,
  clearIcon: <Icon type="close-fill-1" style={{ fontSize: '14px' }} />,
  loadingIcon: undefined,
  removeIcon: <Icon type="close" style={{ fontSize: '12px' }} />,
  splitInput: '/',
  hasSelectAll: false,
};

Cascader.propTypes = {
  defaultValue: PropTypes.array,
  options: PropTypes.array.isRequired,
  hasSelectAll: PropTypes.bool,
  onChange: PropTypes.func,
  maxTagPlaceholder: PropTypes.func,
  multiple: PropTypes.bool,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  transitionName: PropTypes.string,
  inputIcon: PropTypes.element,
  prefixCls: PropTypes.string,
  popupClassName: PropTypes.string,
  placement: PropTypes.string,
  showArrow: PropTypes.bool,
  expandTrigger: PropTypes.string,
  fieldNames: PropTypes.object,
  expandIcon: PropTypes.element,
  clearIcon: PropTypes.element,
  loadingIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  removeIcon: PropTypes.element,
  splitInput: PropTypes.string,
};

export default Cascader;
