import React, { Component } from 'react';
import { prefixCls } from '@utils';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PanelContent from './panelContent';
import Button from '../button';
import Checkbox from '../checkbox';
import Input from '../input';
import Icon from '../icon';

const classSelector = `${prefixCls}-transfer`;
class TransferPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  get filteredData() {
    return this.props.data.filter((item) => item[this.labelProp].includes(this.state.searchValue));
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
    return this.props.data.filter((item) => !item[this.disabledProp]);
  }

  get isSingle() {
    return (
      (this.props.type === 'target' && this.props.oneWay) || this.props.simple
    );
  }

  get showRemove() {
    return this.props.type === 'target' && this.props.oneWay;
  }

  handleAllChange = (isChecked) => {
    const checked = isChecked
      ? this.checkableData.map((item) => item[this.keyProp])
      : [];
    this.props.onChange(checked);
  };

  handleAllClear = () => {
    const { searchValue } = this.state;
    if (searchValue) {
      this.setState({ searchValue: '' });
    }
    this.props.onRemove(this.props.data.map((x) => x[this.keyProp]));
  };

  onSearch = (e) => {
    const { searchValue } = this.state;
    const val = e.target.value === undefined ? searchValue || '' : e.target.value;
    this.setState({ searchValue: val });
  };

  renderTools() {
    const { handleAllClear } = this;
    const {
      data, simple, checked, type, disabled,
    } = this.props;
    if (this.showRemove) {
      return (
        <Button
          className={`${classSelector}-panel-header-removeAll`}
          onClick={handleAllClear}
          type="text"
          disabled={!data.length || disabled}
        >
          清空
        </Button>
      );
    }
    if (simple) {
      return null;
    }
    return (
      <span
        className={`${classSelector}-panel-header-page ${classSelector}-panel-${type}`}
      >
        {checked?.length}
        /
        {data.length}
      </span>
    );
  }

  renderHeader() {
    const { handleAllChange, checkableData } = this;
    const { checked, titles, disabled } = this.props;
    const isChecked = !!checkableData.length && checked.length === checkableData.length;
    return (
      <header className={`${classSelector}-panel-header`}>
        {this.isSingle ? (
          <div className={`${classSelector}-panel-header-title`}>{titles}</div>
        ) : (
          <Checkbox
            className={`${classSelector}-panel-header-checkbox`}
            checked={isChecked}
            disabled={disabled}
            indeterminate={!!checked.length}
            onChange={handleAllChange}
          >
            {titles}
          </Checkbox>
        )}

        {this.renderTools()}
      </header>
    );
  }

  renderSearch() {
    const { filterable } = this.props;
    const { searchValue } = this.state;
    if (filterable) {
      return (
        <div className={`${classSelector}-panel-search`}>
          <Input
            className={`${classSelector}-panel-search-input`}
            placeholder="请输入"
            size="small"
            value={searchValue}
            onEnter={this.onSearch}
            onChange={this.onSearch}
            suffix={(
              <Icon
                style={{ color: 'rgba(0, 0, 0, 0.25)' }}
                type="search"
                onClick={this.onSearch}
              />
            )}
          />
        </div>
      );
    }
    return null;
  }

  renderContent() {
    const {
      filteredData, labelProp, disabledProp, keyProp,
    } = this;
    const { filterable, oneWay } = this.props;
    return (
      <div
        className={classNames(
          `${classSelector}-panel-content`,
          filterable && 'filterable',
        )}
      >
        {!filteredData.length && (
          <span className={`${classSelector}-empty`}>暂无数据</span>
        )}
        {!!filteredData.length && (
          <PanelContent
            filteredData={filteredData}
            labelProp={labelProp}
            disabledProp={disabledProp}
            keyProp={keyProp}
            classSelector={classSelector}
            showRemove={oneWay}
            isSingle={this.isSingle}
            {...this.props}
          />
        )}
      </div>
    );
  }

  render() {
    const { style } = this.props;
    return (
      <div className={`${classSelector}-panel`} style={style}>
        {this.renderHeader()}
        {this.renderSearch()}
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
  propsAlias: PropTypes.object,
  style: PropTypes.object,
  filterable: PropTypes.bool,
  onChange: PropTypes.func,
};
TransferPanel.defaultProps = {
  data: [],
  type: '',
  titles: '',
  checked: [],
  propsAlias: {
    label: 'label',
    key: 'key',
    disabled: 'disabled',
  },
  style: {},
  filterable: false,
  onChange() {},
};
