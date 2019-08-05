import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import utils from './util';

export default class TimePicker extends Component {
    static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func
    }

    static defaultProps = {
		className: '',
		style: {},
        value: undefined,
        defaultValue: '00:00:00',
        disabled: false,
        onChange: () => { },
        onBlur: () => { }
    }

    constructor(props) {
        super(props);
        const controlled = typeof props.value !== 'undefined';
        let value = null;
        if(controlled) {
			value = props.value.split(':');
		}
        else if (props.defaultValue !== undefined) {
			value = props.defaultValue.split(':')
		}
        else {
			value = ['', '', ''];
		}
        this.state = {
            hour: value[0],
            minute: value[1],
            second: value[2],
            props
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { value } = nextProps;
        if (nextProps.value !== prevState.props.value) {
            const arr = value.split(':');
            return {
                hour: utils.time.formatTime(arr[0]),
                minute: utils.time.formatTime(arr[1]),
                second: utils.time.formatTime(arr[2]),
                props: nextProps
            }
        }
        return null;
    }

    onChange = params => evt => {
        let value = evt.target.value.trim().replace(/[^\d]/g, '');
        if (params === 'hour') {
            if (value !== '' && parseInt(value, 10) >= 24) {
                value = value.substr(0, 1);
            }
        } else if (value !== '' && parseInt(value, 10) >= 60) {
            value = value.substr(0, 1);
        }
        const { hour, minute, second } = this.state;
        if (this.props.controlled) {
            this.props.onChange({
                hour,
                minute,
                second
            })
            return;
        }
        this.setState({
            [params]: value
        }, () => {
            this.props.onChange({
                hour,
                minute,
                second
            })
        });
    }


    onBlur = () => {
        const { hour, minute, second } = this.state;
        this.setState({
            hour: utils.time.formatTime(hour, '00'),
            minute: utils.time.formatTime(minute, '00'),
            second: utils.time.formatTime(second, '00'),
        }, () => {
            this.props.onBlur();
        })
    }

    render() {
        const { hour, minute, second } = this.state;
        const { disabled, className, style } = this.props;
        const classes = cls({
            'timepicker': true,
            'timepicker-disabled': disabled,
			[className]: true,
        });

        return (<div className={classes} onBlur={this.onBlur} style={style}>
            <input value={hour} disabled={disabled} maxLength="2" onChange={this.onChange('hour')} /><label className="colon">:</label>
            <input value={minute} disabled={disabled} maxLength="2" onChange={this.onChange('minute')} /><label className="colon">:</label>
            <input value={second} disabled={disabled} maxLength="2" onChange={this.onChange('second')} />
        </div>);
    }
}
