import React, { Component } from 'react';
import { prefixCls } from '@utils';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import TransferPanel from './panel';
import './index.less';
import { getLeafNodes, getSourceTree, getTargetTree } from './utils';

const classSelector = `${prefixCls}-transfer`;
class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftChecked: [],
      rightChecked: [],
    };
  }

  componentDidMount() {
    const { leftDefaultChecked, rightDefaultChecked } = this.props;
    const { leafNodes } = this;
    if (leftDefaultChecked.length) {
      this.setState({
        leftChecked: leafNodes.filter((node) => leftDefaultChecked.includes(node.id)),
      });
    }
    if (rightDefaultChecked.length) {
      this.setState({
        rightChecked: leafNodes.filter((node) => rightDefaultChecked.includes(node.id)),
      });
    }
  }

  get leafNodes() {
    const { data } = this.props;
    return getLeafNodes(data);
  }

  get sourceData() {
    const { data, value } = this.props;
    return getSourceTree(data, value);
  }

  get targetData() {
    const { data, value } = this.props;
    return getTargetTree(data, value);
  }

  addToLeft = () => {
    const { value } = this.props;
    const { rightChecked } = this.state;
    const currentValue = value.slice();
    rightChecked.forEach((item) => {
      const index = currentValue.indexOf(item.id);
      if (index > -1) {
        currentValue.splice(index, 1);
      }
    });
    this.setState({ rightChecked: [] }, () => this.props.onChange(
      currentValue,
      'left',
      rightChecked.map((_) => _.id),
    ));
  };

  addToRight = () => {
    const { value } = this.props;
    const { leftChecked } = this.state;
    let currentValue = value.slice();
    leftChecked.forEach((item) => {
      if (!value.includes(item.id)) {
        currentValue = currentValue.concat(item.id);
      }
    });
    this.setState({ leftChecked: [] }, () => this.props.onChange(
      currentValue,
      'right',
      leftChecked.map((_) => _.id),
    ));
  };

  onSourceCheckedChange = (val) => {
    this.setState({ leftChecked: val });
  };

  onTargetCheckedChange = (val) => {
    this.setState({ rightChecked: val });
  };

  render() {
    const { leftChecked, rightChecked } = this.state;
    const {
      sourceData,
      targetData,
      onSourceCheckedChange,
      onTargetCheckedChange,
      addToLeft,
      addToRight,
    } = this;
    const {
      propsAlias, titles, filterable, style, value,
    } = this.props;
    return (
      <div className={classSelector}>
        <TransferPanel
          value={value}
          style={style}
          data={sourceData}
          type="source"
          filterable={filterable}
          titles={titles[0]}
          propsAlias={propsAlias}
          checked={leftChecked}
          onChange={onSourceCheckedChange}
        />
        <div className={`${classSelector}-button`}>
          <div
            className={classNames(
              `${classSelector}-button-text`,
              rightChecked.length && 'active',
            )}
            onClick={() => {}}
            onKeyDown={addToLeft}
          >
            <Icon type="left" />
          </div>
          <div
            className={classNames(
              `${classSelector}-button-text`,
              leftChecked.length && 'active',
            )}
            onClick={() => {}}
            onKeyDown={addToRight}
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
          propsAlias={propsAlias}
          checked={rightChecked}
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
