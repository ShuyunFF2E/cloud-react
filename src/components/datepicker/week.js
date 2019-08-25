import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Day from './day';
import utils from './util';

export default class Week extends Component {
    static propTypes = {
        year: PropTypes.number,
        month: PropTypes.number,
        days: PropTypes.array,
        day: PropTypes.number,
        currentDate: PropTypes.object,
        maxDate: PropTypes.instanceOf(Date),
		minDate: PropTypes.instanceOf(Date),
        head: PropTypes.bool,
        tail: PropTypes.bool,
        onPickDate: PropTypes.func,
    }

    static defaultProps = {
        year: utils.time.displayNow.year,
        month: utils.time.displayNow.month,
        days: [],
        day: utils.time.displayNow.day,
        currentDate: null,
        minDate: undefined,
		maxDate: undefined,
        head: true,
        tail: true,
        onPickDate: () => { }
    }

    onPickDate = (params) => {
        this.props.onPickDate(params);
    }

    getDisabled = (currentDate) => {
        const { minDate, maxDate } = this.props;
        const currentTimeStamp = new Date(currentDate).getTime();
        return minDate && currentTimeStamp < new Date(minDate).getTime() || maxDate && currentTimeStamp > new Date(maxDate).getTime();
    }

    render() {
        const { head, tail, year, month, days, currentDate } = this.props;
        const idx = days.indexOf(1);
        const today = utils.time.today();

        return (
            <tr className="week">
                {days.map((e, i) => {
                    const inMonth = !((head && i < idx) || (tail && idx > -1 &&  i > idx - 1));
                    let date = null;
                    if (inMonth) {
                        date = `${year}-${month}-${e}`;
                    }
                    else if (!inMonth && i < idx) {
                        date = `${year}-${month - 1}-${e}`;
                    }
                    else if (!inMonth && i > idx - 1) {
                        date = `${year}-${month + 1}-${e}`;
                    }
                    const isToday = inMonth && (`${year}-${month}-${e}` === today);
					const isCheck = currentDate !== null && inMonth && (`${year}-${month}-${e}` === `${currentDate.year}-${currentDate.month}-${currentDate.day}`);
                    return <Day key={e}
                        day={e}
                        date={date}
                        onPickDate={this.onPickDate}
                        inMonth={inMonth}
                        disabled={this.getDisabled(date)}
                        check={isCheck}
                        today={isToday} />
                })}
            </tr>
        )
    }
}
