import React, { Component } from 'react';
import { prefixCls } from '@utils';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from '../checkbox';
import Tree from '../tree';
import { getLeafNodes } from './utils';

const classSelector = `${prefixCls}-transfer`;
class TransferPanel extends Component {
  get leafNodes() {
    return getLeafNodes(this.props.data);
  }

  get isTree() {
    return this.props.data.some((item) => item.children);
  }

  onAllChange = (isChecked) => {
    const checked = isChecked ? this.leafNodes : [];
    this.props.onChange(checked);
  };

  onSelect = (_, nodes) => {
    this.props.onChange(nodes);
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

  renderContent() {
    const { onSelect, isTree } = this;
    const {
      data, filterable, value, checked,
    } = this.props;
    // value更新后 需要重新渲染Tree
    const key = JSON.stringify(value);
    return (
      <div
        className={classNames(
          `${classSelector}-panel-content`,
          isTree ? '' : 'normal',
        )}
      >
        {data.length ? (
          <Tree
            key={key}
            treeData={data}
            selectedValue={checked}
            onSelectedNode={onSelect}
            isUnfold
            supportCheckbox
            supportSearch={filterable}
          />
        ) : null}
      </div>
    );
  }

  render() {
    const { style } = this.props;
    return (
      <div className={`${classSelector}-panel`} style={style}>
        {this.renderHeader()}
        {this.renderContent()}
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
  value: PropTypes.array,
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
