import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import Icon from 'cloud-react/icon';
import enumObj from '../util/enum';

const monthArr = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];

function Header(props) {
	const { month, onChooseMonth, onChange } = props;

	function onArrowChange(params) {
        onChange(params);
	}

	function renderMonthLabel() {
		if(month) {
			const leftCls = cls('arrow-left', {
				'arrow-disabled': month === 1
			});
			const rightCls = cls('arrow-right', {
				'arrow-disabled': month === 12
			});
			return (<section>
			<span className={leftCls} onClick={() => onArrowChange(enumObj.LEFT)}>
				<Icon type="left" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
			</span>
			<label className="header-label" onClick={onChooseMonth}>{monthArr[month - 1] }月</label>
			<span className={rightCls} onClick={() => onArrowChange(enumObj.RIGHT)}>
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

Header.propTypes = {
	month: PropTypes.number,
	onChooseMonth: PropTypes.func,
	onChange: PropTypes.func
}

Header.defaultProps = {
	month: undefined,
	onChooseMonth: () => { },
	onChange: () => { }
}

export default Header;
