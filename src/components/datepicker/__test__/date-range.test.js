import React from 'react';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import mountTest from '../../../../tests/shared/mountTest';
import RangePicker from '../date-range/index';

const classSelector = `${prefixCls}-datepicker`;

describe('YearPicker', () => {
	mountTest(RangePicker);

	it('renders correctly', () => {
		const wrapper = render(<RangePicker />);
		expect(wrapper).toMatchSnapshot();
	});

	it('defaultValue work correctly', () => {
		const wrapper = mount(<RangePicker defaultValue={{ start: '2020/07/10', end: '2020/08/10' }} isAppendToBody />);
		expect(wrapper.find('DateRange').state().start).toEqual('2020/07/10');
		expect(wrapper.find('DateRange').state().end).toEqual('2020/08/10');
	});

	it('value work correctly', () => {
		const wrapper = mount(<RangePicker isAppendToBody />);

		wrapper.setProps({
			value: { start: '2020/07/10', end: '2020/08/10' }
		});
		expect(wrapper.find('DateRange').state().start).toEqual('2020/07/10');
		expect(wrapper.find('DateRange').state().end).toEqual('2020/08/10');
	});

	it('should end open when start confirmed', () => {
		const wrapper = mount(<RangePicker isAppendToBody />);
		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(0)
			.simulate('click');
		expect(wrapper.state().endOpen).toBeTruthy();
	});

	it('minDate and maxDate work correctly', () => {
		const time = { start: '2020/07/10 00:00:00', end: '2020/08/10 23:59:59' };
		const minDate = new Date('2020/05/10');
		const maxDate = new Date('2020/09/10');
		const wrapper = mount(<RangePicker showTimePicker isAppendToBody minDate={minDate} maxDate={maxDate} defaultValue={time} />);
		expect(
			wrapper
				.find('DatePicker')
				.at(0)
				.props().minDate
		).toEqual(minDate);
		expect(
			wrapper
				.find('DatePicker')
				.at(0)
				.props().maxDate
		).toEqual(new Date(time.end));

		expect(
			wrapper
				.find('DatePicker')
				.at(1)
				.props().minDate
		).toEqual(new Date(time.start));
		expect(
			wrapper
				.find('DatePicker')
				.at(1)
				.props().maxDate
		).toEqual(maxDate);
	});

	it('onChange work correctly', () => {
		const time = { start: '2020/07/10 00:00:00', end: '2020/08/10 23:59:59' };
		const onChange = jest.fn();
		const wrapper = mount(<RangePicker showTimePicker isAppendToBody defaultValue={time} onChange={onChange} />);
		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(time);
	});
});
