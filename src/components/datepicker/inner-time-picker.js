import React from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import utils from "./util";

export default class InnerTimePicker extends React.Component {
    static propTypes = {
		// eslint-disable-next-line react/no-unused-prop-types
        hour: PropTypes.string,
		// eslint-disable-next-line react/no-unused-prop-types
        minute: PropTypes.string,
		// eslint-disable-next-line react/no-unused-prop-types
        second: PropTypes.string,
        label: PropTypes.string,
        onChange: PropTypes.func
    }

    static defaultProps = {
        hour: '00',
        minute: '00',
        second: '00',
        label: '时间：',
        onChange: ()=>{}
    }

    constructor(props) {
        super(props);
        this.state = {
			props: null
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { hour, minute, second } = nextProps;
        if (!shallowequal(nextProps, prevState.props)) {
            return {
				hour: utils.time.formatTime(hour),
				minute: utils.time.formatTime(minute),
				second: utils.time.formatTime(second),
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
        this.setState({
            [params]: value
        }, () => {
            const { hour, minute, second } = this.state;
            this.props.onChange({
                hour,
                minute,
                second
            })
        });
    }

    render() {
        const { hour, minute, second } = this.state;

        return (<div className="inner-timepicker">
            <label>{this.props.label}</label>
            <input value={hour} maxLength="2" onChange={this.onChange('hour')} /><label className="colon">:</label>
            <input value={minute} maxLength="2" onChange={this.onChange('minute')} /><label className="colon">:</label>
            <input value={second} maxLength="2" onChange={this.onChange('second')} />
        </div>);
    }
}
