import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

export default class Day extends Component {

    static propTypes = {
        day: PropTypes.number.isRequired,
        date: PropTypes.string,
        check: PropTypes.bool,
        inMonth: PropTypes.bool,
        disabled: PropTypes.bool,
        today: PropTypes.bool,
        onPickDate: PropTypes.func,
    }

    static defaultProps = {
        date: null,
        check: false,
        today: false,
        inMonth: true,
        disabled: false,
        onPickDate: () => {}
    }

    onDayClick = () => {
        const { date, onPickDate, disabled } = this.props;
        if (disabled) {
            return ;
        }
        const arr = date.split('-');
        onPickDate({
            year: parseInt(arr[0], 10),
            month: parseInt(arr[1], 10),
            day: parseInt(arr[2], 10)
        });
    }

    render() {
        const { today, check, inMonth, day, disabled } = this.props;
        const classes = cls({
            'check': check,
            'today': today,
            'in-month': inMonth,
            'not-in-month': !inMonth,
            'day-disabled': disabled
        });

		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        return (<td className={classes} onClick={this.onDayClick}>
                <span>{day}</span>
            </td>);
    }
}
