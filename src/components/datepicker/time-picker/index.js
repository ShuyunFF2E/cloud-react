import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Time from '../common/time';
import { PROPTYPES, DEFAULT_PROPS } from '../proptypes';

class TimePicker extends Component {
	render() {
		return <Time {...this.props} type="alone" />;
	}
}

TimePicker.propTypes = {
	...PROPTYPES,
	onBlur: PropTypes.func
};

TimePicker.defaultProps = {
	...DEFAULT_PROPS,
	onBlur: noop
};

export default TimePicker;
