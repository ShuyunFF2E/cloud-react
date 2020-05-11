import React, { Component } from 'react';
import Time from '../common/time';

class TimePicker extends Component {
	render() {
		return <Time {...this.props} type="alone" />;
	}
}

export default TimePicker;
