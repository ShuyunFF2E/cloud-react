import React, { Component } from 'react';
import { prefixCls } from '@utils';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from '../checkbox';
import Icon from '../icon';
import Input from '../input';
import {
  getLeafNodes, loop, filterTree, copy,
} from './utils';

const classSelector = `${prefixCls}-transfer`;

/**
 * 数据源数据结构
 * {
 *  key: number | string, // 唯一标识
 *  label: string       // 显示内容
 *  disabled: boolean, // 是否禁用
 *  isFold: boolean, // 是否折叠收起
 *  checked: boolean, // 是否选中
 *  indeterminate: boolean, // 是否半选
 *  children: [], // 子节点同上述类型 没有子节点的节点不需要传递children
 * }
 */

class TransferPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  get leafNodes() {
    return getLeafNodes(this.props.data);
  }

  get isTree() {
    return this.props.data.some((item) => item.children);
  }

  onAllChange = (isChecked) => {
    const checked = isChecked ? this.leafNodes.map((node) => node.key) : [];
    this.props.onChange(checked);
  };

  onSelect = (isChecked, item) => {
    const { checked } = this.props;
    // 确定当前应该选中的叶子节点
    let currentChecked = checked.slice();
    // 获取所有受影响的叶子结点
    const leaf = [];
    loop([ item ], (node) => {
      if (!node.children) {
        leaf.push(node.key);
      }
    });
    if (isChecked) {
      // 去重合并
      currentChecked = leaf.concat(
        currentChecked.filter((key) => !leaf.includes(key)),
      );
    } else {
      // 删除结点
      currentChecked = currentChecked.filter((key) => !leaf.includes(key));
    }
    this.props.onChange(currentChecked);
  };

  onSearchValueChange = (evt) => {
    this.setState({
      searchValue: evt.target.value,
    });
  };

  filterData = (data, searchValue) => {
    if (!searchValue) {
      return data;
    }
    const result = filterTree(
      copy(data),
      (node) => node.label.indexOf(searchValue) > -1,
    );
    return result;
  };

  renderHeader() {
    const { onAllChange, leafNodes } = this;
    const { type, checked, titles } = this.props;
    const isChecked = !!leafNodes.length && checked.length === leafNodes.length;
    return (
      <header className={`${classSelector}-panel-header`}>
        <Checkbox
          className={`${classSelector}-panel-header-checkbox`}
          checked={isChecked}
          indeterminate={!!checked.length}
          onChange={onAllChange}
        >
          {titles}
        </Checkbox>
        {type === 'source' && (
          <span className={`${classSelector}-panel-header-page`}>
            {checked.length}
            /
            {leafNodes.length}
          </span>
        )}
      </header>
    );
  }

  renderChildren(data) {
    const { onFold } = this.props;
    const { onSelect, isTree } = this;
    return data.map((item) => (
      <div
        key={item.key}
        className={classNames(
          `${classSelector}-panel-wrapper`,
          item.isFold ? 'fold' : '',
          isTree ? '' : 'normal',
        )}
      >
        <div
          className={classNames(
            'panel-item',
            `level-${item.level}`,
            item.disabled ? 'disabled' : '',
          )}
          style={{ paddingLeft: isTree ? (16 + 12) * item.level + 12 : 4 }}
        >
          {item.children ? (
            <Icon
              type={item.isFold ? 'down' : 'up'}
              onClick={() => onFold(item)}
              className="panel-item-icon"
            />
          ) : (
            <div className="panel-item-place" />
          )}
          <Checkbox
            checked={item.checked}
            indeterminate={item.indeterminate}
            onChange={(checked) => onSelect(checked, item)}
            disabled={item.disabled}
          >
            {item.label}
          </Checkbox>
        </div>
        {item.children ? this.renderChildren(item.children) : null}
      </div>
    ));
  }

  render() {
    const { style, data, filterable } = this.props;
    const { searchValue } = this.state;
    const { onSearchValueChange, isTree } = this;
    const filteredData = this.filterData(data, searchValue);
    return (
      <div className={`${classSelector}-panel`} style={style}>
        {this.renderHeader()}
        <div className={classNames(`${classSelector}-panel-content`, isTree)}>
          {filterable && data.length ? (
            <div className={classNames(`${classSelector}-panel-search`)}>
              <Input
                suffix={<Icon type="search" />}
                value={searchValue}
                onChange={onSearchValueChange}
                style={{ width: 'auto' }}
              />
            </div>
          ) : null}
          {this.renderChildren(filteredData)}
        </div>
      </div>
    );
  }
}
export default TransferPanel;
TransferPanel.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
  titles: PropTypes.string,
  checked: PropTypes.array,
  style: PropTypes.object,
  filterable: PropTypes.bool,
  onChange: PropTypes.func,
};
TransferPanel.defaultProps = {
  data: [],
  type: '',
  titles: '',
  checked: [],
  style: {},
  filterable: false,
  onChange() {},
};
