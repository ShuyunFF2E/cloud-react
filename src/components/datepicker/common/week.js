import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from '@utils';
import { today } from '../utils';

import '../index.less';

class Week extends Component {
  miniWeek = ['日', '一', '二', '三', '四', '五', '六'];

  onDayClick = (_year, _month, _day) => {
    this.props.onPickDate({
      year: _year,
      month: _month,
      day: _day,
    });
  };

  getDisabled = (date) => {
    const { minDate, maxDate } = this.props;

    const currentTimeStamp = new Date(date);
    const minDateStamp = new Date(minDate);
    const maxDateStamp = new Date(maxDate);

    const currentDate = currentTimeStamp.getDate();
    const currentMonth = currentTimeStamp.getMonth();

    if (minDate && currentTimeStamp.getTime() <= minDateStamp.getTime()) {
      if (
        currentMonth === minDateStamp.getMonth() &&
        currentDate === minDateStamp.getDate()
      ) {
        return false;
      }
      return true;
    }

    if (maxDate && currentTimeStamp.getTime() >= maxDateStamp.getTime()) {
      if (
        currentMonth === maxDateStamp.getMonth() &&
        currentDate === maxDateStamp.getDate()
      ) {
        return false;
      }
      return true;
    }
    return false;
  };

  renderWeekHead() {
    return (
      <div className="week-head">
        {this.miniWeek.map((e, i) => (
          <span key={i.toString()}>{e}</span>
        ))}
      </div>
    );
  }

  renderOtherDays(year, month, days) {
    return days.map((v) => {
      const isDisabled = this.getDisabled(`${year}/${month}/${v}`);
      const classes = classnames('grid-day', 'not-included', {
        'day-disabled': isDisabled,
      });
      return (
        <div className={classes} key={`${year}-${month}-${v}`}>
          <span onClick={() => !isDisabled && this.onDayClick(year, month, v)}>
            {v}
          </span>
        </div>
      );
    });
  }

  renderPrev(days) {
    const { year, month } = this.props.currentDateObj;
    let _month = month;
    let _year = year;
    if (parseInt(month, 10) === 1) {
      _month = 12;
      _year = year - 1;
    } else {
      _month = month - 1;
    }
    return this.renderOtherDays(_year, _month, days);
  }

  renderCurrent(days) {
    const { year, month, day } = this.props.currentDateObj;
    return days.map((v) => {
      const isDisabled = this.getDisabled(`${year}/${month}/${v}`);
      const isCheck = v === day;
      const isToday = `${year}-${month}-${v}` === today();
      const classes = classnames('grid-day', {
        'grid-check': isCheck,
        'grid-now': isToday,
        'not-included': false,
        'day-disabled': isDisabled,
      });
      return (
        <div className={classes} key={`${year}-${month}-${v}`}>
          <span onClick={() => !isDisabled && this.onDayClick(year, month, v)}>
            {v}
          </span>
        </div>
      );
    });
  }

  renderNext(days) {
    const { year, month } = this.props.currentDateObj;
    let _month = month;
    let _year = year;
    if (parseInt(month, 10) === 12) {
      _month = 1;
      _year = year + 1;
    } else {
      _month = month + 1;
    }
    return this.renderOtherDays(_year, _month, days);
  }

  render() {
    const { prev, current, next } = this.props.days;

    return (
      <div className="grid-table">
        {this.renderWeekHead()}

        <div className="grid-week">
          {/* 上月 */}
          {this.renderPrev(prev)}

          {/* 当月 */}
          {this.renderCurrent(current)}

          {/* 下月 */}
          {this.renderNext(next)}
        </div>
      </div>
    );
  }
}

Week.propTypes = {
  days: PropTypes.object,
  currentDateObj: PropTypes.object,
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onPickDate: PropTypes.func,
};

Week.defaultProps = {
  days: {},
  currentDateObj: null,
  minDate: undefined,
  maxDate: undefined,
  onPickDate: noop,
};

export default Week;
