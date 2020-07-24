import React from 'react';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import mountTest from '../../../../tests/shared/mountTest';
import YearMonthPicker from '../year-month/index';

const classSelector = `${prefixCls}-datepicker`;

describe('YearPicker', () => {
	mountTest(YearMonthPicker);

	it('renders correctly', () => {
		const wrapper = render(<YearMonthPicker />);
		expect(wrapper).toMatchSnapshot();
	});

	it('placeholder renders correctly', () => {
		const wrapper = render(<YearMonthPicker placeholder="年月选择器" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should can not open picker when disabled', () => {
		const wrapper = mount(<YearMonthPicker disabled isAppendToBody />);
		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-popup`)).toHaveLength(0);
	});

	it('defaultValue work correctly', () => {
		const wrapper = mount(<YearMonthPicker defaultValue="2021/06" isAppendToBody />);
		expect(wrapper.find('Picker').state().currentValue).toEqual('2021/06');

		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('Select').state().value).toEqual(2021);
		expect(wrapper.find('.grid-check').text()).toEqual('六月');
	});

	it('value work correctly', () => {
		const wrapper = mount(<YearMonthPicker value="2021/06" isAppendToBody open />);
		expect(wrapper.find('Picker').state().currentValue).toEqual('2021/06');

		wrapper.setProps({
			value: '2022/07'
		});
		expect(wrapper.find('Picker').state().currentValue).toEqual('2022/07');
	});

	it('onChange work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<YearMonthPicker min="2019/09" max="2024/12" isAppendToBody onChange={onChange} />);
		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.grid-item')
			.at(2)
			.childAt(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith('2020/03');

		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.grid-item')
			.at(10)
			.childAt(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith('2020/11');
	});

	it('this month button work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<YearMonthPicker min="2019/09" max="2024/12" isAppendToBody onChange={onChange} />);
		wrapper
			.find(`.${classSelector}-inp-block`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(0)
			.simulate('click');
		const now = new Date();
		expect(onChange).toHaveBeenCalledWith(`${now.getFullYear()}/0${now.getMonth() + 1}`);
	});

	it('format display value work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<YearMonthPicker defaultValue="2020/07" isAppendToBody open format="YYYY-MM" onChange={onChange} />);
		wrapper
			.find('.grid-item')
			.at(1)
			.childAt(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith('2020-02');
	});

	it('min and max work correctly', () => {
		const wrapper = mount(<YearMonthPicker min="2020/04" max="2020/09" isAppendToBody open />);
		wrapper.find('.grid-item').forEach((node, index) => {
			const month = index + 1;
			if (month < 4 || month > 9) {
				expect(node.hasClass('grid-disabled')).toBeTruthy();
			}
		});

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
	});

	it('default select year equal min year when this year less than min', () => {
		const wrapper = mount(<YearMonthPicker min="2022/04" isAppendToBody open />);
		expect(wrapper.find('Popup').state().tempYear).toEqual(2022);
	});

	it('default select year equal max year when this year more than max', () => {
		const wrapper = mount(<YearMonthPicker max="2019/04" isAppendToBody open />);
		expect(wrapper.find('Popup').state().tempYear).toEqual(2019);
	});

	it('should this month button disabled when this month less than min', () => {
		const wrapper = mount(<YearMonthPicker min="2021/09" isAppendToBody open />);
		expect(
			wrapper
				.find('.cloud-button')
				.at(0)
				.props().disabled
		).toBeTruthy();
	});

	it('should this month button disabled when this month more than max', () => {
		const wrapper = mount(<YearMonthPicker max="2020/05" isAppendToBody open />);
		expect(
			wrapper
				.find('.cloud-button')
				.at(0)
				.props().disabled
		).toBeTruthy();
	});
});
