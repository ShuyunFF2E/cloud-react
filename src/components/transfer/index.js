import React, { Component } from 'react';
import { prefixCls } from '@utils';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import TransferPanel from './panel';
import './index.less';
import {
  initTree,
  calcTree,
  getLeafNodes,
  getSourceTree,
  getTargetTree,
  generateTreeMap,
} from './utils';

const classSelector = `${prefixCls}-transfer`;
class Transfer extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    const {
      data,
      value,
      leftDefaultChecked = [],
      rightDefaultChecked = [],
    } = this.props;
    const base = initTree(data);
    const sourceData = getSourceTree(base, value);
    const sourceMap = generateTreeMap(sourceData);
    calcTree(sourceMap, leftDefaultChecked);
    const targetData = getTargetTree(base, value);
    const targetMap = generateTreeMap(targetData);
    calcTree(targetMap, rightDefaultChecked);
    this.state = {
      leftChecked: leftDefaultChecked,
      rightChecked: rightDefaultChecked,
      value,
      base,
      sourceData,
      sourceMap,
      targetData,
      targetMap,
    };
  }

  static getDerivedStateFromProps(props, state) {
    // value 更新后，树的数据随之更新
    if (props.value !== state.value) {
      const { base } = state;
      const { value } = props;
      const sourceData = getSourceTree(base, value);
      const sourceMap = generateTreeMap(sourceData);
      const targetData = getTargetTree(base, value);
      const targetMap = generateTreeMap(targetData);
      return {
        value,
        sourceData,
        sourceMap,
        targetData,
        targetMap,
      };
    }
    return null;
  }

  onFold = (item, type) => {
    if (type === 'source') {
      const { sourceMap, sourceData } = this.state;
      sourceMap[item.key].isFold = !sourceMap[item.key].isFold;
      this.setState({
        sourceData,
        sourceMap,
      });
    }
    if (type === 'target') {
      const { targetMap, targetData } = this.state;
      targetMap[item.key].isFold = !targetMap[item.key].isFold;
      this.setState({
        targetData,
        targetMap,
      });
    }
  };

  get leafNodes() {
    const { base } = this.state;
    return getLeafNodes(base);
  }

  addToLeft = () => {
    const { rightChecked, value } = this.state;
    const currentValue = value.slice();
    rightChecked.forEach((item) => {
      const index = currentValue.indexOf(item);
      if (index > -1) {
        currentValue.splice(index, 1);
      }
    });
    this.setState({ rightChecked: [] }, () => this.props.onChange(currentValue, 'left', rightChecked));
  };

  addToRight = () => {
    const { leftChecked, value } = this.state;
    let currentValue = value.slice();
    leftChecked.forEach((item) => {
      if (!value.includes(item)) {
        currentValue = currentValue.concat(item);
      }
    });
    this.setState(
      {
        leftChecked: [],
      },
      () => this.props.onChange(currentValue, 'right', leftChecked),
    );
  };

  onSourceCheckedChange = (checkeds) => {
    const { sourceData, sourceMap } = this.state;
    Object.keys(sourceMap).forEach((key) => {
      sourceMap[key].checked = false;
      sourceMap[key].indeterminate = false;
    });
    calcTree(sourceMap, checkeds);
    this.setState({
      leftChecked: checkeds,
      sourceMap,
      sourceData,
    });
  };

  onSourceCheckedChange = (checkeds) => {
    const { sourceData, sourceMap } = this.state;
    Object.keys(sourceMap).forEach((key) => {
      sourceMap[key].checked = false;
      sourceMap[key].indeterminate = false;
    });
    calcTree(sourceMap, checkeds);
    this.setState({
      leftChecked: checkeds,
      sourceData,
      sourceMap,
    });
  };

  onTargetCheckedChange = (checkeds) => {
    const { targetData, targetMap } = this.state;
    Object.keys(targetMap).forEach((key) => {
      targetMap[key].checked = false;
      targetMap[key].indeterminate = false;
    });
    calcTree(targetMap, checkeds);
    this.setState({
      rightChecked: checkeds,
      targetData,
      targetMap,
    });
  };

  render() {
    const {
      sourceData, targetData, leftChecked, rightChecked, value,
    } = this.state;
    const {
      onFold,
      onSourceCheckedChange,
      onTargetCheckedChange,
      addToLeft,
      addToRight,
    } = this;
    const { titles, filterable, style } = this.props;
    return (
      <div className={classSelector}>
        <TransferPanel
          value={value}
          style={style}
          data={sourceData}
          type="source"
          filterable={filterable}
          titles={titles[0]}
          checked={leftChecked}
          onFold={(item) => onFold(item, 'source')}
          onChange={onSourceCheckedChange}
        />
        <div className={`${classSelector}-button`}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className={classNames(
              `${classSelector}-button-text`,
              rightChecked.length && 'active',
            )}
            onClick={addToLeft}
          >
            <Icon type="left" />
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className={classNames(
              `${classSelector}-button-text`,
              leftChecked.length && 'active',
            )}
            onClick={addToRight}
          >
            <Icon type="right" />
          </div>
        </div>
        <TransferPanel
          value={value}
          style={style}
          data={targetData}
          type="target"
          filterable={filterable}
          titles={titles[1]}
          checked={rightChecked}
          onFold={(item) => onFold(item, 'target')}
          onChange={onTargetCheckedChange}
        />
      </div>
    );
  }
}

export default Transfer;
Transfer.propTypes = {
  data: PropTypes.array,
  titles: PropTypes.array,
  leftDefaultChecked: PropTypes.array,
  rightDefaultChecked: PropTypes.array,
  value: PropTypes.array,
  style: PropTypes.object,
  onChange: PropTypes.func,
  filterable: PropTypes.bool,
};

Transfer.defaultProps = {
  data: [],
  titles: [ '列表1', '列表2' ],
  leftDefaultChecked: [],
  rightDefaultChecked: [],
  value: [],
  style: {},
  filterable: false,
};
