import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import Week from './week';
import utils from './util';
import InnerTimePicker from './inner-time-picker';

export default class Grid extends Component {
    static propTypes = {
        year: PropTypes.number,
        month: PropTypes.number,
        days: PropTypes.array,
        day: PropTypes.number,
        hour: PropTypes.string,
        minute: PropTypes.string,
        second: PropTypes.string,
        currentDate: PropTypes.object,
        showTimePicker: PropTypes.bool,
        showToday: PropTypes.bool,
        onPickDate: PropTypes.func,
        onTimePickChange: PropTypes.func,
        onOK: PropTypes.func,
    }

    static defaultProps = {
        year: utils.time.displayNow.year,
        month: utils.time.displayNow.month,
        days: [],
        day: utils.time.displayNow.day,
        hour: '',
        minute: '',
        second: '',
        currentDate: null,
        showToday: false,
        showTimePicker: false,
        onPickDate: ()=>{},
        onTimePickChange: ()=>{},
        onOK: ()=>{}
    }

    constructor(props) {
        super(props);
        const { year, month, day, hour, minute, second } = props;
        this.state = {
            year,
            month,
            day,
            hour,
            minute,
            second,
            prevProps: null
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(!shallowequal(nextProps, prevState.prevProps)) {
            const { year, month, day, hour, minute, second } = nextProps;
            return {
                year,
                month,
                day,
                hour,
                minute,
                second,
                prevProps: nextProps
            }
        }
        return null;
    }

    onPickDate = (params) => {
        this.props.onPickDate(params);
    }

    onToadyClick = () => {
    	if (this.props.showTimePicker) {
    		this.props.onOK(utils.time.displayNow());
    		return;
		}
        this.props.onPickDate(utils.time.displayNow());
    }

    onOK = () =>{
        this.props.onOK();
    }

    render() {
        const { days, showToday, showTimePicker } = this.props;
        const { year, month, day, hour, minute, second } = this.state;
        const len = Math.ceil(days.length / 7);

        return (
            <div className="grid">
                <table className="grid-table">
                    <thead>
                        <tr>
                            {utils.time.miniWeek.map((e, i) => <th key={i.toString()}>{e}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {utils.range(len).map((e, i) =>
                            <Week {...this.props} key={i.toString()}
                                year={year}
                                month={month}
                                day={day}
                                onPickDate={this.onPickDate}
                                days={days.slice(i * 7, (i + 1) * 7)}
                                head={i === 0}
                                tail={i === len - 1} />
                        )}
                    </tbody>
                </table>
                {
                    showTimePicker && <InnerTimePicker hour={hour}
                     onChange={this.props.onTimePickChange}
                     minute={minute}
                     second={second} />
                }
                <div className="datepicker-btns">
                    {
                       showToday && <button type="button" className="datepicker-btns-today" onClick={this.onToadyClick}>今天</button>
                    }
                    {
                       showTimePicker && <button type="button" className="datepicker-btns-ok" onClick={this.onOK}>确定</button>
                    }
                </div>
            </div>
        )
    }
}
