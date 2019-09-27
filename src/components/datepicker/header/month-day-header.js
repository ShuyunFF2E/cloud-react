import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icon';
import enumObj from '../util/enum';

const monthArr = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];

function MonthDayHeader(props) {
	const { month, onChange } = props;

	function onArrowChange(params) {
        onChange(params);
	}

	function renderMonthLabel() {
		if(month) {
			return (<section>
			<span className="arrow-left" onClick={() => onArrowChange(enumObj.left)}>
				<Icon type="left" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
			</span>
			<label>{monthArr[month-1] }月</label>
			<span className="arrow-right" onClick={() => onArrowChange(enumObj.right)}>
				<Icon type="right" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
			</span></section>);
		}
		return (<label>选择月份</label>);
	}

	return (
		<div className="header">
			{renderMonthLabel()}
		</div>
	);
}

MonthDayHeader.propTypes = {
	month: PropTypes.number,
	onChange: PropTypes.func
}

MonthDayHeader.defaultProps = {
	month: undefined,
	onChange: () => { }
}

export default MonthDayHeader;
