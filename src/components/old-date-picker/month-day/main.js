import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Select from '../../select';
import { ArrowLeft, ArrowRight } from '../common/arrow';
import { monthArr } from '../constant';
import { formatZero, displayNow } from '../utils';
import Grid from './grid';

class MonthDay extends Component {
  constructor(props) {
    super(props);

    const { checkValue } = props;

    this.state = {
      tempMonth: checkValue
        ? parseInt(checkValue.split('/')[0], 10)
        : displayNow().month,
      tempDay: checkValue ? parseInt(checkValue.split('/')[1], 10) : '',
    };
  }

  changeCheckValue = (checkValue) => {
    this.setState({
      tempMonth: checkValue
        ? parseInt(checkValue.split('/')[0], 10)
        : displayNow().month,
      tempDay: checkValue ? parseInt(checkValue.split('/')[1], 10) : '',
    });
  };

  handleLeftClick = () => {
    const { tempMonth } = this.state;

    if (tempMonth > 1) {
      this.setState({
        tempMonth: tempMonth - 1,
      });
    }
  };

  handleRightClick = () => {
    const { tempMonth } = this.state;

    if (tempMonth < 12) {
      this.setState({
        tempMonth: tempMonth + 1,
      });
    }
  };

  handleMonthChange = (value) => {
    this.setState({
      tempMonth: value,
    });
  };

  handleDayGridChange = (value, m) => {
    this.setState({
      tempDay: value,
    });

    if (m) {
      this.setState({
        tempMonth: m,
      });
      this.props.onChange({
        month: formatZero(m),
        day: formatZero(value),
      });
    } else {
      this.props.onChange({
        month: formatZero(this.state.tempMonth),
        day: formatZero(value),
      });
    }
  };

  onPickDate = ({ month, day }) => {
    this.setState({
      tempMonth: month,
      tempDay: day,
    });
  };

  render() {
    const { tempMonth, tempDay } = this.state;

    return (
      <>
        <div className="header">
          <section>
            <ArrowLeft
              disabled={tempMonth === 1}
              onClick={this.handleLeftClick}
            />
            <Select onChange={this.handleMonthChange} value={tempMonth}>
              {monthArr.map((str, index) => (
                <Select.Option value={index + 1} key={String(index + 1)}>
                  {str}
                </Select.Option>
              ))}
            </Select>
            <ArrowRight
              disabled={tempMonth === 12}
              onClick={this.handleRightClick}
            />
          </section>
        </div>
        <Grid
          {...this.props}
          month={tempMonth}
          day={tempDay}
          onOk={this.handleDayGridChange}
          onPickDate={this.onPickDate}
        />
      </>
    );
  }
}

MonthDay.propTypes = {
  checkValue: PropTypes.string,
  onChange: PropTypes.func,
};

MonthDay.defaultProps = {
  checkValue: '',
  onChange: noop,
};

export default MonthDay;
