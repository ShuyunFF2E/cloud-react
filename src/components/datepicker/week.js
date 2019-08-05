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
        head: true,
        tail: true,
        onPickDate: () => { }
    }

    onPickDate = (params) => {
        this.props.onPickDate(params);
    }

    render() {
        const { head, tail, year, month, days, currentDate } = this.props;
        const idx = days.indexOf(1);
        const today = utils.time.today();

        return (
            <tr className="week">
                {days.map((e, i) => {
                    const isEnable = !((head && i < idx) || (tail && i > idx - 1));
                    let date = null;
                    if (isEnable) {
                        date = `${year}-${month}-${e}`;
                    }
                    else if (!isEnable && i < idx) {
                        date = `${year}-${month - 1}-${e}`;
                    }
                    else if (!isEnable && i > idx - 1) {
                        date = `${year}-${month + 1}-${e}`;
                    }
                    const isToday = isEnable && (`${year}-${month}-${e}` === today);
					const isCheck = currentDate !== null ? isEnable && (`${year}-${month}-${e}` === `${currentDate.year}-${currentDate.month}-${currentDate.day}`) : false;
                    return <Day key={e}
                        day={e}
                        date={date}
                        onPickDate={this.onPickDate}
                        enable={isEnable}
                        check={isCheck}
                        today={isToday} />
                })}
            </tr>
        )
    }
}
