import React, { Component } from 'react';
import { prefixCls } from '@utils';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import TransferPanel from './panel';
import './index.less';

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
    if (leftDefaultChecked.length) {
      this.setState({ leftChecked: leftDefaultChecked });
    }
    if (rightDefaultChecked.length) {
      this.setState({ rightChecked: rightDefaultChecked });
    }
  }

  get sourceData() {
    const { data, value, propsAlias } = this.props;
    return data.filter((item) => !value.includes(item[propsAlias.key]));
  }

  get targetData() {
    const { data, value, propsAlias } = this.props;
    return data.filter((item) => value.includes(item[propsAlias.key]));
  }

  addToLeft = () => {
    const { value, disabled } = this.props;
    if (disabled) {
      return;
    }
    const { rightChecked } = this.state;
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
    const { value, disabled } = this.props;
    if (disabled) {
      return;
    }
    const { leftChecked } = this.state;
    let currentValue = value.slice();

    leftChecked.forEach((item) => {
      if (!value.includes(item)) {
        currentValue = currentValue.concat(item);
      }
    });
    this.setState({ leftChecked: [] }, () => this.props.onChange(currentValue, 'right', leftChecked));
  };

  onSourceCheckedChange = (val) => {
    this.setState({ leftChecked: val });
  };

  onTargetCheckedChange = (val) => {
    this.setState({ rightChecked: val });
  };

  onRemoveLeft = (val) => {
    const { value: _value } = this.props;

    this.props.onChange(
      _value.filter((item) => !val.includes(item)),
      'left',
      val,
    );
  };

  onSimpleChange = (val) => {
    this.props.onChange(val, 'right', []);
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
      onRemoveLeft,
      onSimpleChange,
    } = this;
    const {
      propsAlias, titles, filterable, style, oneWay, simple, disabled,
    } = this.props;
    const buttonCls = classNames(classSelector, {
      [`${classSelector}-simple`]: simple,
      [`${classSelector}-disabled`]: disabled,
    });
    return (
      <div className={buttonCls}>
        <TransferPanel
          style={style}
          data={sourceData}
          type="source"
          filterable={filterable}
          titles={titles[0]}
          propsAlias={propsAlias}
          checked={leftChecked}
          onChange={simple ? onSimpleChange : onSourceCheckedChange}
          oneWay={oneWay}
          simple={simple}
          disabled={disabled}
        />
        {simple ? null : (
          <div className={`${classSelector}-button`}>
            {!oneWay && (
              <div
                className={classNames(
                  `${classSelector}-button-text`,
                  rightChecked.length && 'active',
                )}
                onClick={addToLeft}
              >
                <Icon type="left" />
              </div>
            )}
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
        )}
        <TransferPanel
          style={style}
          data={targetData}
          type="target"
          filterable={filterable}
          titles={titles[1]}
          propsAlias={propsAlias}
          checked={rightChecked}
          onChange={simple ? null : onTargetCheckedChange}
          onRemove={onRemoveLeft}
          oneWay={oneWay}
          simple={simple}
          disabled={disabled}
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
  propsAlias: PropTypes.object,
  onChange: PropTypes.func,
  filterable: PropTypes.bool,
  simple: PropTypes.bool,
};

Transfer.defaultProps = {
  data: [],
  titles: [ '列表1', '列表2' ],
  leftDefaultChecked: [],
  rightDefaultChecked: [],
  value: [],
  style: {},
  propsAlias: {
    label: 'label',
    key: 'key',
    disabled: 'disabled',
  },
  filterable: false,
  simple: false,
  onChange() {},
};
