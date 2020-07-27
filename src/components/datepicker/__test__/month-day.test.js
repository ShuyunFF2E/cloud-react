import React from 'react';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import mountTest from '../../../../tests/shared/mountTest';
import MonthDayPicker from '../month-day/index';

const classSelector = `${prefixCls}-datepicker`;
const now = new Date();
const month = now.getMonth() + 1;
const currentMonth = month < 10 ? `0${month}` : month;
const currentDate = now.getDate();

describe('YearPicker', () => {
	mountTest(MonthDayPicker);

	it('renders correctly', () => {
		const wrapper = render(<MonthDayPicker />);
		expect(wrapper).toMatchSnapshot();
	});

	it('placeholder renders correctly', () => {
		const wrapper = render(<MonthDayPicker placeholder="年月选择器" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should can not open picker when disabled', () => {
		const wrapper = mount(<MonthDayPicker disabled isAppendToBody />);
		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
	});

	it('defaultValue work correctly', () => {
		const wrapper = mount(<MonthDayPicker defaultValue="06/25" isAppendToBody />);
		expect(wrapper.find('Picker').state().currentValue).toEqual('06/25');

		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('Select').state().value).toEqual(6);
		expect(wrapper.find('.grid-check').text()).toEqual('25');
	});

	it('value work correctly', () => {
		const wrapper = mount(<MonthDayPicker value="06/24" isAppendToBody open />);
		expect(wrapper.find('Picker').state().currentValue).toEqual('06/24');

		wrapper.setProps({
			value: '07/29'
		});
		expect(wrapper.find('Picker').state().currentValue).toEqual('07/29');
	});

	it('onChange work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<MonthDayPicker open isAppendToBody onChange={onChange} />);
		wrapper
			.find('.grid-day')
			.filter('.grid-now')
			.childAt(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(`${currentMonth}/${currentDate}`);
	});

	it('today button work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<MonthDayPicker open isAppendToBody onChange={onChange} />);
		wrapper
			.find('.cloud-button')
			.at(0)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(`${currentMonth}/${currentDate}`);
	});

	it('format display value work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<MonthDayPicker isAppendToBody open format="MM-DD" onChange={onChange} />);
		wrapper
			.find('.grid-day')
			.filter('.grid-now')
			.childAt(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(`${currentMonth}-${currentDate}`);
	});

	it('min and max work correctly', () => {
		const min = `${currentMonth}/02`;
		const max = `${currentMonth}/20`;
		const wrapper = mount(<MonthDayPicker min={min} max={max} isAppendToBody open />);
		wrapper.find('.grid-day').forEach(node => {
			if (!node.hasClass('not-included')) {
				const day = node.text();
				if (day < 2 || day > 20) {
					expect(node.hasClass('day-disabled')).toBeTruthy();
				}
			}
		});
	});

	it('arrow left and right change region', () => {
		const max = month < 12 ? month + 1 : month;
		const maxMonth = max < 10 ? `0${max}` : max;
		const wrapper = mount(<MonthDayPicker isAppendToBody open min={`${currentMonth}/10`} max={`${maxMonth}/10`} />);
		wrapper
			.find('.arrow-right')
			.at(0)
			.simulate('click');
		expect(wrapper.find('Select').state().value).toEqual(max);

		wrapper
			.find('.arrow-left')
			.at(0)
			.simulate('click');
		expect(wrapper.find('Select').state().value).toEqual(month);
	});
});
