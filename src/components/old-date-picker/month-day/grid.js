import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Button from '../../button';
import { selectorClass } from '../constant';
import { formatZero, refreshDays, displayNow } from '../utils';
import Week from '../common/week';

class Grid extends Component {
  constructor(props) {
    super(props);

    const { day } = props;

    this.state = {
      tempDay: day,
    };
  }

  componentDidUpdate(prevProps) {
    const { day } = prevProps;

    if (day !== this.props.day) {
      this.updateDayState();
    }
  }

  getMonthDay() {
    const { min, max } = this.props;
    const maxMonth = max ? parseInt(max.split('/')[0], 10) : '';
    const minMonth = min ? parseInt(min.split('/')[0], 10) : '';
    const maxMonthDay = max ? parseInt(max.split('/')[1], 10) : '';
    const minMonthDay = min ? parseInt(min.split('/')[1], 10) : '';
    return { maxMonth, minMonth, maxMonthDay, minMonthDay };
  }

  getTodayDisabled = () => {
    const { minMonth, maxMonth, minMonthDay, maxMonthDay } = this.getMonthDay();
    const { day: currentDay, month: currentMonth } = displayNow();
    if (
      (minMonth && currentMonth < minMonth) ||
      (maxMonth && currentMonth > maxMonth) ||
      (currentMonth === minMonth && currentDay < minMonthDay) ||
      (currentMonth === maxMonth && currentDay > maxMonthDay)
    ) {
      return true;
    }
    return false;
  };

  getSaveDisabled = () => {
    const { tempDay: selectedDay } = this.state;
    if (!selectedDay) {
      return true;
    }
    const { month: selectedMonth } = this.props;
    const { minMonth, maxMonth, minMonthDay, maxMonthDay } = this.getMonthDay();
    if (
      (minMonth && selectedMonth < minMonth) ||
      (maxMonth && selectedMonth > maxMonth)
    ) {
      return true;
    }
    if (selectedMonth === minMonth && selectedDay < minMonthDay) {
      return true;
    }
    if (selectedMonth === maxMonth && selectedDay > maxMonthDay) {
      return true;
    }
    return false;
  };

  updateDayState() {
    this.setState({
      tempDay: this.props.day,
    });
  }

  handlePickDate = ({ month, day }) => {
    this.setState({
      tempDay: day,
    });
    this.props.onPickDate({ month, day });
  };

  handleSave = (_, value, m) => {
    if (value) {
      this.props.onOk(value, m);
    } else {
      this.props.onOk(formatZero(this.state.tempDay));
    }
  };

  render() {
    const {
      props: { month, min, max },
      state: { tempDay },
      handleSave,
    } = this;

    const { year, day, month: currentMonth } = displayNow();
    const days = refreshDays(year, month);
    const minDate = min ? new Date(min).setFullYear(year) : undefined;
    const maxDate = max ? new Date(max).setFullYear(year) : undefined;

    return (
      <div className="grid">
        <Week
          currentDateObj={{
            year,
            month,
            day: tempDay,
          }}
          minDate={new Date(minDate)}
          maxDate={new Date(maxDate)}
          onPickDate={this.handlePickDate}
          days={days}
        />
        <div className={`${selectorClass}-popup-btns`}>
          <Button
            size="small"
            disabled={this.getTodayDisabled()}
            onClick={() => handleSave(null, formatZero(day), currentMonth)}
          >
            今天
          </Button>
          <Button
            type="primary"
            size="small"
            disabled={this.getSaveDisabled()}
            onClick={handleSave}
          >
            确认
          </Button>
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onOk: PropTypes.func,
};

Grid.defaultProps = {
  month: undefined,
  day: undefined,
  onOk: noop,
};

export default Grid;
