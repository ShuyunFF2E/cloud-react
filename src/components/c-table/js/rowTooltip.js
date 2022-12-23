import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTrEle } from '../util';
import { getTooltipPositionInBody } from '../../tooltip/toolView';
import '../css/business.less';

class RowTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipStyle: { visibility: 'hidden' },
      tooltipMsg: this.props.tooltipConfigs[0].tooltipMsg
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const ele = this.props.tableContainerRef?.current?.querySelector('.cloud-table-container');
      if (ele) {
        ele.addEventListener('mouseover', this.onMouseOver)
      }
    })
  }

  componentWillUnmount() {
    const ele = this.props.tableContainerRef?.current?.querySelector('.cloud-table-container');
    if (ele) {
      ele.removeEventListener('mouseover', this.onMouseOver);
    }
  }

  onMouseOver = evt => {
    const targetRow = getTrEle(evt.target);

    const targetTooltipConfig = this.props.tooltipConfigs.find(item => targetRow?.classList?.contains(item.tooltipRowCls));
    if (targetTooltipConfig) {
      const tooltipEle = document.querySelector('.cloud-table-row-tooltip');
      const tooltipStyle = getTooltipPositionInBody(tooltipEle, targetRow, 'top-right');

      this.setState({
        tooltipMsg: targetTooltipConfig.tooltipMsg
      }, () => {
        this.setState({
          tooltipStyle: {
            ...this.state.tooltipStyle,
            left: tooltipStyle.left,
            top: tooltipStyle.top + 6,
            visibility: 'visible'
          }
        })
      })
    } else {
      this.setState({
        tooltipStyle: {
          ...this.state.tooltipStyle,
          visibility: 'hidden'
        }
      })
    }
  }

  render() {
    return (
      <span className="cloud-table-row-tooltip" style={this.state.tooltipStyle}>
          {this.state.tooltipMsg}
        </span>
    )
  }
}

RowTooltip.propTypes = {
  tableContainerRef: PropTypes.object.isRequired,
  tooltipConfigs: PropTypes.array,
};

RowTooltip.defaultProps = {
  tooltipConfigs: [{
    tooltipMsg: '不可选',
    tooltipRowCls: 'cloud-table-row-disabled', // 需要展示 tooltip 行的类名，
  }]
};

export default RowTooltip;
