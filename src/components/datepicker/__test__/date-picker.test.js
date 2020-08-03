import React from 'react';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import mountTest from '../../../../tests/shared/mountTest';
import DatePicker from '../date-picker/index';
import { currentTime } from '../constant';

const classSelector = `${prefixCls}-datepicker`;
const { currentYear, currentMonth, currentDate, month, now } = currentTime;

describe('YearPicker', () => {
	mountTest(DatePicker);

	it('renders correctly', () => {
		const wrapper = render(<DatePicker />);
		expect(wrapper).toMatchSnapshot();
	});

	it('placeholder renders correctly', () => {
		const wrapper = render(<DatePicker placeholder="年月日选择器" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should open popup when click picker', () => {
		const wrapper = mount(<DatePicker value="2020/07/10" />);
		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('Picker').state().visible).toBeTruthy();
	});

	it('should can not open picker when disabled', () => {
		const wrapper = mount(<DatePicker disabled />);
		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
	});

	it('defaultValue work correctly', () => {
		const wrapper = mount(<DatePicker defaultValue="2020/06/05" isAppendToBody />);
		expect(wrapper.find('Picker').state().currentValue).toEqual('2020/06/05');

		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('Popup').state().tempMonth).toEqual(6);
		expect(wrapper.find('Popup').state().tempYear).toEqual(2020);
		expect(wrapper.find('.grid-check').text()).toEqual('5');
	});

	it('value work correctly', () => {
		const wrapper = mount(<DatePicker value="2020/06/24" isAppendToBody />);
		expect(wrapper.find('Picker').state().currentValue).toEqual('2020/06/24');

		wrapper.setProps({
			value: ''
		});
		expect(wrapper.find('Picker').state().currentValue).toEqual('');
	});

	it('onChange work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<DatePicker open isAppendToBody onChange={onChange} />);
		wrapper
			.find('.grid-day')
			.filter('.grid-now')
			.childAt(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(`${currentYear}/${currentMonth}/${currentDate}`);
	});

	it('today button work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<DatePicker open isAppendToBody onChange={onChange} />);
		wrapper
			.find('.cloud-button')
			.at(0)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(`${currentYear}/${currentMonth}/${currentDate}`);
	});

	it('should today button disabled when today less than min', () => {
		const wrapper = mount(<DatePicker minDate={`${currentYear + 1}/${currentMonth}/${currentDate}`} isAppendToBody open />);
		expect(
			wrapper
				.find('.cloud-button')
				.at(0)
				.props().disabled
		).toBeTruthy();
		expect(
			wrapper
				.find('.cloud-button')
				.at(1)
				.props().disabled
		).toBeTruthy();
	});

	it('should confirm button disabled when today less than min', () => {
		const wrapper = mount(<DatePicker value={now} minDate={`${currentYear + 1}/${currentMonth}/${currentDate}`} isAppendToBody open />);
		expect(
			wrapper
				.find('Button')
				.at(1)
				.props().disabled
		).toBeTruthy();
	});

	it('should confirm button disabled when today more than max', () => {
		const wrapper = mount(<DatePicker value={now} maxDate={`${currentYear - 1}/${currentMonth}/${currentDate}`} isAppendToBody open />);
		expect(
			wrapper
				.find('Button')
				.at(1)
				.props().disabled
		).toBeTruthy();
	});

	it('format display value work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<DatePicker isAppendToBody open format="YYYY-MM-DD" onChange={onChange} />);
		wrapper
			.find('.grid-day')
			.filter('.grid-now')
			.childAt(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(`${currentYear}-${currentMonth}-${currentDate}`);

		wrapper.find('Input').simulate('mouseenter');
		wrapper
			.find(`.${prefixCls}-input-clear`)
			.at(0)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith('');
	});

	it('min and max work correctly', () => {
		const min = `${currentYear}/${currentMonth}/02`;
		const max = `${currentYear}/${currentMonth}/20`;
		const onChange = jest.fn();
		const wrapper = mount(<DatePicker minDate={min} maxDate={max} isAppendToBody open onChange={onChange} />);
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
		const wrapper = mount(<DatePicker isAppendToBody open />);
		wrapper
			.find('.arrow-right')
			.at(0)
			.simulate('click');
		expect(wrapper.find('Popup').state().tempMonth).toEqual(month < 12 ? month + 1 : 1);
		expect(wrapper.find('Popup').state().tempYear).toEqual(month < 12 ? currentYear : currentYear + 1);

		wrapper
			.find('.arrow-left')
			.at(0)
			.simulate('click');
		expect(wrapper.find('Popup').state().tempMonth).toEqual(month);
		expect(wrapper.find('Popup').state().tempYear).toEqual(currentYear);
	});

	it('should change region to prev month or next month when click not-include day', () => {
		const wrapper = mount(<DatePicker isAppendToBody open />);
		const node = wrapper.find('.grid-day').filter('.not-included');
		if (node.at(0).text() < 10) {
			node.at(0)
				.childAt(0)
				.simulate('click');
			expect(wrapper.find('Popup').state().tempMonth).toEqual(month === 12 ? 1 : month + 1);
		}
		if (node.at(0).text() > 10) {
			node.at(0)
				.childAt(0)
				.simulate('click');
			expect(wrapper.find('Popup').state().tempMonth).toEqual(month === 1 ? 12 : month - 1);
		}
	});

	it('should return prev year when month equal January and click arrow left', () => {
		const wrapper = mount(<DatePicker isAppendToBody open defaultValue={`${currentYear + 1}/01/07`} />);
		wrapper
			.find('.arrow-left')
			.at(0)
			.simulate('click');
		expect(wrapper.find('Popup').state().tempMonth).toEqual(12);
		expect(wrapper.find('Popup').state().tempYear).toEqual(currentYear);
	});

	it('should return next year when month equal December and click arrow right', () => {
		const wrapper = mount(<DatePicker isAppendToBody open defaultValue={`${currentYear}/12/07`} />);
		wrapper
			.find('.arrow-right')
			.at(0)
			.simulate('click');
		expect(wrapper.find('Popup').state().tempMonth).toEqual(1);
		expect(wrapper.find('Popup').state().tempYear).toEqual(currentYear + 1);
	});

	it('should arrow disabled when last month less than min and next month more than max', () => {
		const min = `${currentYear}/${currentMonth}/02`;
		const max = `${currentYear}/${currentMonth}/20`;
		const wrapper = mount(<DatePicker minDate={min} maxDate={max} isAppendToBody open />);
		expect(wrapper.find('.arrow-right').hasClass('arrow-disabled')).toBeTruthy();
		expect(wrapper.find('.arrow-left').hasClass('arrow-disabled')).toBeTruthy();
	});

	it('should has time input when showTimePicker', () => {
		const wrapper = mount(<DatePicker showTimePicker isAppendToBody open />);
		expect(wrapper.find('Time')).toHaveLength(1);
	});

	it('defaultTime work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<DatePicker showTimePicker isAppendToBody open defaultTime="23:59:59" onChange={onChange} />);
		expect(wrapper.find('Time').state().hour).toEqual('23');
		expect(wrapper.find('Time').state().minute).toEqual('59');
		expect(wrapper.find('Time').state().second).toEqual('59');
		wrapper
			.find('.grid-day')
			.filter('.grid-now')
			.childAt(0)
			.simulate('click');
		wrapper
			.find('.timepicker-hour')
			.at(0)
			.simulate('change', { target: { value: '22' } });
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(`${currentYear}/${currentMonth}/${currentDate} 22:59:59`);
	});

	it('should time equal defaultValue when has defaultValue', () => {
		const wrapper = mount(<DatePicker showTimePicker isAppendToBody open defaultValue="2020/09/03 20:59:59" />);
		expect(wrapper.find('Time').state().hour).toEqual('20');
		expect(wrapper.find('Time').state().minute).toEqual('59');
		expect(wrapper.find('Time').state().second).toEqual('59');
	});

	it('should work correctly when click outside component', () => {
		let clickHandler = {};
		document.addEventListener = jest.fn((event, handler) => {
			if (event === 'click') {
				clickHandler = handler;
			}
		});
		const wrapper = mount(<DatePicker isAppendToBody open />);
		clickHandler({
			target: document.body
		});
		expect(wrapper.find('Picker').state().visible).toBeFalsy();

		clickHandler({
			target: document.body
		});
		expect(wrapper.find('Picker').state().visible).toBeFalsy();
	});
});
