/* eslint-disable */

import React, { Component } from 'react';
import CascaderMenu from 'rc-cascader';
import Icon from '../icon';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils';
import {
  defaultSearchRender,
  defaultLoadingRender,
  DefaultRenderEmpty,
  ALL_VALUE,
} from './constant.js';
import './index.less';

class Cascader extends Component {
  state = {
    inputValue: '',
    open: false,
    options: [],
    // 组件内容选中内容
    value: [],
  };

  componentDidMount() {
    this.setState({
      inputValue: this.props.defaultValue
        .map((o) => o.label)
        .join(this.props.splitInput),
    });
    this.setState({ value: this.props.value });
    this.initOptions();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.options) !== JSON.stringify(this.props.options)
    ) {
      this.initOptions();
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

  handleChange = (value, valueObj) => {
    const { value: preValue } = this.state;
    const { hasSelectAll } = this.props;
    this.props.onChange(value, valueObj);
    if (!hasSelectAll) {
      this.setState({ value });
      return;
    }

    // 选中全部按钮
    if (
      JSON.stringify(value[value.length - 1]) === JSON.stringify([ALL_VALUE])
    ) {
      this.handelAllChange(true);
      return;
    }
    // 取消全部按钮
    if (
      preValue?.some(
        (x) => JSON.stringify(x) === JSON.stringify([ALL_VALUE]),
      ) &&
      value.every((x) => JSON.stringify(x) !== JSON.stringify([ALL_VALUE]))
    ) {
      this.handelAllChange(false);
      return;
    }
    // // 点击其他多选按钮
    this.setState({ value: this.getInnerValue(value) });
  };

  handelAllChange = (checked) => {
    const {
      options,
      fieldNames: { value: valueKey },
    } = this.props;
    if (checked) {
      const _value = options?.map((x) => [x[valueKey]]);
      this.setState({ value: [[ALL_VALUE], ..._value] });
      this.props.onChange([..._value], options);
      return;
    }
    this.setState({ value: [] });
    this.props.onChange([]);
  };

  getInnerValue = (value) => {
    const { hasSelectAll, options } = this.props;
    // 不支持全选按钮
    if (!hasSelectAll) {
      return value;
    }
    // 点击其他多选按钮
    const removeAllItem = value.filter(
      (item) => JSON.stringify(item) !== JSON.stringify([ALL_VALUE]),
    );
    const parentValue = removeAllItem.filter((item) => item.length === 1);

    if (parentValue.length === options.length) {
      return [[ALL_VALUE], ...removeAllItem];
    }
    return removeAllItem;
  };

  mergedNotFoundContent = this.props.notFoundContent || (
    <DefaultRenderEmpty prefixCls={this.props.prefixCls} />
  );

  render() {
    const {
      splitInput,
      multiple,
      showSearch,
      loadingIcon,
      popupClassName,
      borderRadiusSize,
      ...props
    } = this.props;
    const iconClasses = this.state.open ? 'open' : 'close';
    const checkable = multiple ? (
      <div className={`${this.props.prefixCls}-checkbox-inner`}></div>
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
    return (
      <CascaderMenu
        {...props}
        popupClassName={`${popupClassName} ${borderRadiusSize}`}
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
  maxTagPlaceholder: (text) => {
    return text?.length ? `+ ${text.length}` : '';
  },
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
  borderRadiusSize: 'default',
  hasSelectAll: false,
};

Cascader.propTypes = {
  defaultValue: PropTypes.array,
  options: PropTypes.array.isRequired,
  borderRadiusSize: PropTypes.oneOf(['small', 'default', 'large']),
  hasSelectAll: PropTypes.bool,
};

export default Cascader;
