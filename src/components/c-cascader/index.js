/* eslint-disable */

import React, { Component, cloneElement } from 'react';
import CascaderMenu from 'rc-cascader';
import Icon from '../icon';
import Input from '../input';
import PropTypes from 'prop-types';
import './index.less';
function highlightKeyword(str, lowerKeyword, prefixCls) {
  const cells = str
    .toLowerCase()
    .split(lowerKeyword)
    .reduce(
      (list, cur, index) =>
        index === 0 ? [cur] : [...list, lowerKeyword, cur],
      [],
    );
  const fillCells = [];
  let start = 0;

  cells.forEach((cell, index) => {
    const end = start + cell.length;
    let originWorld = str.slice(start, end);
    start = end;

    if (index % 2 === 1) {
      originWorld = (
        // eslint-disable-next-line react/no-array-index-key
        <span
          className={`${prefixCls}-menu-item-keyword`}
          key={`seperator-${index}`}
        >
          {originWorld}
        </span>
      );
    }

    fillCells.push(originWorld);
  });

  return fillCells;
}
const defaultSearchRender = (inputValue, path, prefixCls, fieldNames) => {
  const optionList = [];

  // We do lower here to save perf
  const lower = inputValue.toLowerCase();

  path.forEach((node, index) => {
    if (index !== 0) {
      optionList.push(' / ');
    }

    let label = node[fieldNames.label];
    const type = typeof label;
    if (type === 'string' || type === 'number') {
      label = highlightKeyword(String(label), lower, prefixCls);
    }

    optionList.push(label);
  });
  return optionList;
};

const defaultLoadingRender = (prefixCls) => (
  <span className={`${prefixCls}-loading-spin`} />
);

function DefaultRenderEmpty({ prefixCls }) {
  return (
    <div className={`${prefixCls}-empty`}>
      <img
        src="https://brand-guide.shuyun.com/IAM/276d125f58c2.png"
        alt="缺省"
      />
      暂无数据
    </div>
  );
}
class Cascader extends Component {
  state = {
    inputValue: '',
    open: false,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.setState({
      inputValue: this.props.defaultValue
        .map((o) => o.label)
        .join(this.props.splitInput),
    });
  }
  onPopupVisibleChange = (visible) => {
    this.setState({
      open: visible,
    });
  };

  mergedNotFoundContent = this.props.notFoundContent || (
    <DefaultRenderEmpty prefixCls={this.props.prefixCls} />
  );

  render() {
    const { splitInput, multiple, showSearch, loadingIcon, ...props } =
      this.props;
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
  transitionName: '',
  defaultValue: [],
  inputIcon: <Icon type="down" style={{ fontSize: '12px' }} />,
  prefixCls: 'cloud-ccascader',
  popupClassName: '',
  popupPlacement: 'bottomLeft',
  showArrow: true,
  expandTrigger: 'click',
  fieldNames: { label: 'label', value: 'value', children: 'children' },
  expandIcon: <Icon type="right" style={{ fontSize: '16px' }} />,
  clearIcon: <Icon type="close-fill-1" style={{ fontSize: '14px' }} />,
  loadingIcon: undefined,
  removeIcon: <Icon type="close" style={{ fontSize: '12px' }} />,
  splitInput: '/',
};

Cascader.propTypes = {
  defaultValue: PropTypes.array,
  options: PropTypes.array.isRequired,
};

export default Cascader;
