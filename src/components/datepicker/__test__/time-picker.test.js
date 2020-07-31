import React from 'react';
import { render, mount } from 'enzyme';
import mountTest from '../../../../tests/shared/mountTest';
import TimePicker from '../time-picker/index';

describe('YearPicker', () => {
	mountTest(TimePicker);

	it('renders correctly', () => {
		const wrapper = render(<TimePicker />);
		expect(wrapper).toMatchSnapshot();
	});

	it('defaultValue work correctly', () => {
		const wrapper = mount(<TimePicker defaultValue="22:00:00" />);
		expect(wrapper.find('Time').state().hour).toEqual('22');
		expect(wrapper.find('Time').state().minute).toEqual('00');
		expect(wrapper.find('Time').state().second).toEqual('00');
	});

	it('value work correctly', () => {
		const wrapper = mount(<TimePicker />);
		wrapper.setProps({
			value: '12:12:12'
		});
		expect(wrapper.find('Time').state().hour).toEqual('12');
		expect(wrapper.find('Time').state().minute).toEqual('12');
		expect(wrapper.find('Time').state().second).toEqual('12');
	});

	it('onChange work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<TimePicker onChange={onChange} />);
		wrapper
			.find('.timepicker-hour')
			.at(0)
			.simulate('change', { target: { value: '22' } });
		wrapper
			.find('.timepicker-minute')
			.at(0)
			.simulate('change', { target: { value: '22' } });
		wrapper
			.find('.timepicker-second')
			.at(0)
			.simulate('change', { target: { value: '22' } });
		expect(onChange).toHaveBeenCalledWith({ hour: '22', minute: '22', second: '22' });
	});

	it('should disappear when focus input', () => {
		const wrapper = mount(<TimePicker defaultValue="22:23:24" />);
		wrapper
			.find('.timepicker-hour')
			.at(0)
			.simulate('focus');
		expect(wrapper.find('Time').state().temp).toEqual('22');
		expect(wrapper.find('Time').state().hour).toEqual('');
		wrapper
			.find('.timepicker-hour')
			.at(0)
			.simulate('change', { target: { value: '4' } });
		wrapper
			.find('.timepicker-hour')
			.at(0)
			.simulate('blur');
		expect(wrapper.find('Time').state().hour).toEqual('04');

		wrapper
			.find('.timepicker-minute')
			.at(0)
			.simulate('focus');
		expect(wrapper.find('Time').state().temp).toEqual('23');
		expect(wrapper.find('Time').state().minute).toEqual('');
		wrapper
			.find('.timepicker-minute')
			.at(0)
			.simulate('blur');
		expect(wrapper.find('Time').state().minute).toEqual('23');

		wrapper
			.find('.timepicker-second')
			.at(0)
			.simulate('focus');
		expect(wrapper.find('Time').state().temp).toEqual('24');
		expect(wrapper.find('Time').state().second).toEqual('');
		wrapper
			.find('.timepicker-second')
			.at(0)
			.simulate('blur');
		expect(wrapper.find('Time').state().second).toEqual('24');
	});

	it('control input value in normal time', () => {
		const onChange = jest.fn();
		const wrapper = mount(<TimePicker onChange={onChange} />);
		wrapper
			.find('.timepicker-hour')
			.at(0)
			.simulate('change', { target: { value: '40' } });
		expect(onChange).toHaveBeenCalledWith({ hour: '23', minute: '00', second: '00' });
		wrapper
			.find('.timepicker-minute')
			.at(0)
			.simulate('change', { target: { value: '70' } });
		expect(onChange).toHaveBeenCalledWith({ hour: '23', minute: '59', second: '00' });
		wrapper
			.find('.timepicker-second')
			.at(0)
			.simulate('change', { target: { value: '70' } });
		expect(onChange).toHaveBeenCalledWith({ hour: '23', minute: '59', second: '59' });
	});

	it('should return empty string when wrong hour value input', () => {
		const onChange = jest.fn();
		const wrapper = mount(<TimePicker onChange={onChange} />);
		wrapper
			.find('.timepicker-hour')
			.at(0)
			.simulate('change', { target: { value: 'e' } });
		expect(onChange).toHaveBeenCalledWith({ hour: '', minute: '00', second: '00' });
	});

	it('should return empty string when wrong minute value input', () => {
		const onChange = jest.fn();
		const wrapper = mount(<TimePicker onChange={onChange} />);
		wrapper
			.find('.timepicker-minute')
			.at(0)
			.simulate('change', { target: { value: 'e' } });
		expect(onChange).toHaveBeenCalledWith({ hour: '00', minute: '', second: '00' });
	});

	it('should return empty string when wrong second value input', () => {
		const onChange = jest.fn();
		const wrapper = mount(<TimePicker onChange={onChange} />);
		wrapper
			.find('.timepicker-second')
			.at(0)
			.simulate('change', { target: { value: 'e' } });
		expect(onChange).toHaveBeenCalledWith({ hour: '00', minute: '00', second: '' });
	});
});
