import React from 'react';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import mountTest from '../../../../tests/shared/mountTest';
import YearPicker from '../year/index';

const classSelector = `${prefixCls}-datepicker`;

describe('YearPicker', () => {
	mountTest(YearPicker);

	it('renders correctly', () => {
		const wrapper = render(<YearPicker />);
		expect(wrapper).toMatchSnapshot();
	});

	it('placeholder renders correctly', () => {
		const wrapper = render(<YearPicker placeholder="年选择器" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should can not open picker when disabled', () => {
		const wrapper = mount(<YearPicker disabled isAppendToBody />);
		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
	});

	it('defaultValue work correctly', () => {
		const wrapper = mount(<YearPicker defaultValue={2020} isAppendToBody />);
		expect(wrapper.find('Picker').state().currentValue).toEqual(2020);

		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('.grid-check').text()).toEqual('2020年');
	});

	it('value work correctly', () => {
		const wrapper = mount(<YearPicker value={2020} isAppendToBody open />);
		expect(wrapper.find('Picker').state().currentValue).toEqual(2020);

		wrapper.setProps({
			value: 2021
		});
		expect(wrapper.find('Picker').state().currentValue).toEqual(2021);
	});

	it('open work correctly', () => {
		const wrapper = mount(<YearPicker value={2020} isAppendToBody />);
		wrapper.setProps({
			open: true
		});
		expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(1);

		wrapper.setProps({
			open: false
		});
		expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
	});

	it('should year disabled when less than min and more than max', () => {
		const wrapper = mount(<YearPicker min={2017} max={2025} isAppendToBody open />);
		wrapper.find('.grid-item').forEach(node => {
			const year = parseFloat(node.text());
			if (year < 2017 || year > 2025) {
				expect(node.hasClass('grid-disabled')).toBeTruthy();
			}
		});
	});

	it('onChange work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<YearPicker isAppendToBody min={2014} max={2034} onChange={onChange} />);
		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');

		wrapper
			.find('.grid-item')
			.at(0)
			.childAt(0)
			.simulate('click');
		expect(
			wrapper
				.find('.cloud-button')
				.at(1)
				.props().disabled
		).toBeTruthy();

		wrapper
			.find('.grid-item')
			.at(1)
			.childAt(0)
			.simulate('click');
		expect(
			wrapper
				.find('.grid-item')
				.at(1)
				.hasClass('grid-check')
		).toBeTruthy();

		wrapper
			.find('.grid-item')
			.at(2)
			.childAt(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(2015);

		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(0)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(new Date().getFullYear());
	});

	it('arrow left and right change region', () => {
		const wrapper = mount(<YearPicker isAppendToBody open min={2014} max={2034} />);
		wrapper
			.find('.arrow-right')
			.at(0)
			.simulate('click');
		expect(wrapper.find('Popup').state().region).toEqual([2028, 2042]);
		expect(wrapper.find('.arrow-right').hasClass('arrow-disabled')).toBeTruthy();

		wrapper
			.find('.arrow-left')
			.at(0)
			.simulate('click');
		expect(wrapper.find('Popup').state().region).toEqual([2013, 2027]);
		expect(wrapper.find('.arrow-left').hasClass('arrow-disabled')).toBeTruthy();
	});
});
