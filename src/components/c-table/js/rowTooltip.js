/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getTrEle } from '../util';
import { getTooltipPositionInBody } from '../../tooltip/toolView';
import '../css/business.less';
import { tablePrefixCls } from '../constant';
import { getRootWindow, prefixCls } from '../../../utils';

class RowTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipStyle: { visibility: 'hidden' },
      tooltipMsg: this.props.tooltipConfigs[0].tooltipMsg,
    };
  }

  componentDidMount() {
    document.body.addEventListener('mouseover', this.onBodyMouseOver);
    setTimeout(() => {
      const ele = this.props.tableContainerRef?.current?.querySelector(
        `.${tablePrefixCls}-container`,
      );
      if (ele) {
        ele.addEventListener('mouseover', this.onMouseOver);
      }
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('mouseover', this.onBodyMouseOver);
    const ele = this.props.tableContainerRef?.current?.querySelector(
      `.${tablePrefixCls}-container`,
    );
    if (ele) {
      ele.removeEventListener('mouseover', this.onMouseOver);
    }
  }

  timeStamp = new Date().getTime();

  onMouseOver = (evt) => {
    const targetRow = getTrEle(evt.target);

    const targetTooltipConfig = this.props.tooltipConfigs.find((item) => targetRow?.classList?.contains(item.tooltipRowCls));
    if (targetTooltipConfig) {
      const tooltipEles = document.querySelectorAll(
        `.${tablePrefixCls}-row-tooltip`,
      );
      const tooltipEle = Array.from(tooltipEles).find(
        (ele) => ele.dataset.id === String(this.timeStamp),
      );

      if (tooltipEle) {
        const tooltipStyle = getTooltipPositionInBody(
          tooltipEle,
          targetRow.querySelector(`.${prefixCls}-checkbox-disabled`),
          'top-left',
        );

        const isInModal = document.querySelector(`.${prefixCls}-modal-mask`);

        this.setState(
          {
            tooltipMsg: targetTooltipConfig.tooltipMsg,
          },
          () => {
            const _window = this.props.useRootWindow ? getRootWindow() : window;
            this.setState({
              tooltipStyle: {
                ...this.state.tooltipStyle,
                left: tooltipStyle.left - 7,
                top: isInModal
                  ? tooltipStyle.top + _window.pageYOffset - 8
                  : tooltipStyle.top - 8,
                visibility: 'visible',
              },
            });
          },
        );
      }
    } else {
      this.setState({
        tooltipStyle: {
          ...this.state.tooltipStyle,
          visibility: 'hidden',
        },
      });
    }
  };

  onBodyMouseOver = (evt) => {
    const targetRow = getTrEle(evt.target);
    const targetTooltipConfig = this.props.tooltipConfigs.find((item) => targetRow?.classList?.contains(item.tooltipRowCls));
    if (!targetTooltipConfig) {
      this.setState({
        tooltipStyle: {
          ...this.state.tooltipStyle,
          visibility: 'hidden',
        },
      });
    }
  };

  render() {
    return this.state.tooltipMsg
      ? ReactDOM.createPortal(
        <span
          data-id={this.timeStamp}
          className={`${tablePrefixCls}-row-tooltip`}
          style={this.state.tooltipStyle}
        >
          {this.state.tooltipMsg}
        </span>,
        document.body,
      )
      : null;
  }
}

RowTooltip.propTypes = {
  tableContainerRef: PropTypes.object.isRequired,
  tooltipConfigs: PropTypes.array,
};

RowTooltip.defaultProps = {
  tooltipConfigs: [
    {
      tooltipMsg: '不可选',
      tooltipRowCls: `${tablePrefixCls}-row-disabled`, // 需要展示 tooltip 行的类名，
    },
  ],
};

export default RowTooltip;
