import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import { monthArr } from './util/config';

export default class Header extends React.Component {
    static propTypes = {
        year: PropTypes.number,
        month: PropTypes.number,
        onChange: PropTypes.func
    }

    static defaultProps = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        onChange: ()=>{}
    }

	onChange = params => evt => {
		let _month = this.props.month;
		let _year = this.props.year;
		if(params === 'left') {
			if(this.props.month > 1) {
				_month =  this.props.month - 1;
			} else {
				_month = 12;
				_year = this.props.year - 1;
			}
		} else if(params === 'right') {
			if(this.props.month === 12) {
				_month = 1;
				_year = this.props.year + 1;
			} else {
				_month = this.props.month + 1;
			}
		} else if(params === 'month') {
			_month = evt.target.value;
		} else if(params === 'year') {
			_year = evt.target.value;
		}

		this.props.onChange(parseInt(_year, 10), parseInt(_month, 10));
	}

    renderMonth() {
        const currentMonth = this.props.month;
        return (<select onChange={this.onChange('month')} value={currentMonth}>
            {
                monthArr.map((str, index) => {
                    return <option key={(index + 1).toString()} value={index + 1}>{str}</option>
                })
            }
        </select>);
    }

    renderYear() {
        const years = [];
        const currentYear = this.props.year;
        for (let i = currentYear - 10; i < currentYear + 10; ) {
            years.push(<option key={i} value={i}>{i}</option>);
			i += 1;
        }
        return (<select onChange={this.onChange('year')} value={currentYear}>
            {
                years
            }
        </select>);
    }

    render() {
        return (
            <div className="header">
                <span className="arrow-left" onClick={this.onChange('left')}>
                    <Icon type="left" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
                </span>
                {
                    this.renderMonth()
                }
                {
                    this.renderYear()
                }
                <span className="arrow-right" onClick={this.onChange('right')}>
                    <Icon type="right" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
                </span>
            </div>
        )
    }
}
