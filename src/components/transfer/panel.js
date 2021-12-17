import React, { Component } from 'react';
import { prefixCls } from '@utils';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox';
import Input from '../input';
import Icon from '../icon';
import classNames from 'classnames';

const classSelector = `${prefixCls}-transfer`;
class TransferPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
  }

  get filteredData() {
    return this.props.data.filter(item => {
      const label = item[this.labelProp] || item[this.keyProp].toString();
      return label.includes(this.state.searchValue);
    })
  }

  get labelProp() {
    return this.props.propsAlias.label;
  }

  get keyProp() {
    return this.props.propsAlias.key;
  }

  get disabledProp() {
    return this.props.propsAlias.disabled;
  }

  get checkableData() {
    return this.props.data.filter(item => !item[this.disabledProp]);
  }

  handleAllChange = (isChecked) => {
      const checked = isChecked ? this.checkableData.map(item => item[this.keyProp]) : [];
      this.props.onChange(checked);
  }

  handleGroupChange = (val) => {
    this.props.onChange(val);
  }

  handleAllClear = () => {
    this.props.onChange([]);
  }

  onSearch = (e) => {
    const { searchValue } = this.state;
    const val = e.target.value === undefined ? searchValue || '' : e.target.value;
    this.setState({ searchValue: val })
  }

  renderHeader() {
    const { handleAllChange, checkableData } = this;
    const { type, data, checked, titles } = this.props;
    const isChecked = !!checkableData.length && checked.length === checkableData.length;
    return (
      <header className={`${classSelector}-panel-header`}>
        <Checkbox
          className={`${classSelector}-panel-header-checkbox`}
          checked={isChecked}
          indeterminate={!!checked.length}
          onChange={handleAllChange}>
          {titles}
        </Checkbox>
        {type === 'source' &&
        <span className={`${classSelector}-panel-header-page`}>{checked.length}/{data.length}</span>}
      </header>
    )
  }

  renderSearch() {
    const { filterable } = this.props;
    if (filterable) {
      return (
        <Input className={`${classSelector}-panel-search`}
               placeholder="请输入"
               size="small"
               value={this.state.searchValue}
               onEnter={this.onSearch}
               onChange={this.onSearch}
               suffix={<Icon style={{ color: 'rgba(0, 0, 0, 0.25)' }} type="search" onClick={this.onSearch}/>} />
      )
    }
    return null
  }

  render() {
    const { handleGroupChange, filteredData } = this;
    const { checked, filterable } = this.props;
    return (
      <div className={`${classSelector}-panel`}>
        {this.renderHeader()}
        {this.renderSearch()}
        <div className={classNames(`${classSelector}-panel-content`, filterable && 'filterable')}>
          <Checkbox.Group value={checked} onChange={handleGroupChange}>
            {filteredData.map((item, index) => (
              <Checkbox key={index}
                        label={item[this.labelProp]}
                        disabled={item[this.disabledProp]}
                        value={item[this.keyProp]}>{item.label}</Checkbox>))
            }
          </Checkbox.Group>
        </div>
      </div>
    )
  }
}
export default TransferPanel
TransferPanel.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
  titles: PropTypes.string,
  checked: PropTypes.array,
  propsAlias: PropTypes.object,
  filterable: PropTypes.bool,
  onChange: PropTypes.func
}
TransferPanel.defaultProps = {
  data: [],
  type: '',
  titles: '',
  checked: [],
  propsAlias: {
    label: 'label',
    key: 'key',
    disabled: 'disabled'
  },
  filterable: false,
  onChange() {}
}
