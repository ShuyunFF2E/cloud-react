import React from 'react';
import renderer from 'react-test-renderer';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import mountTest from '../../../../tests/shared/mountTest';
import Checkbox from '../index';

const classSelector = `${prefixCls}-checkbox`;
const Group = Checkbox.Group;

describe('CheckboxGroup', () => {
	mountTest(Group);

	it('renders correctly', () => {
		const onChange = jest.fn();
		const wrapper = render(
			<Group onChange={onChange}>
				<Checkbox value={1}>1</Checkbox>
				<Checkbox value={2}>2</Checkbox>
				<Checkbox value={3}>3</Checkbox>
			</Group>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('basic function work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<Group onChange={onChange}>
				<Checkbox value={1}>1</Checkbox>
				<Checkbox value={2}>2</Checkbox>
				<Checkbox value={3}>3</Checkbox>
			</Group>
		);

		wrapper
			.find(`.${classSelector}-input`)
			.at(0)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith([1]);

		wrapper
			.find(`.${classSelector}-input`)
			.at(1)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith([1, 2]);

		wrapper
			.find(`.${classSelector}-input`)
			.at(2)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith([1, 2, 3]);

		wrapper
			.find(`.${classSelector}-input`)
			.at(2)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith([1, 2]);
	});

	it('value property work correctly', () => {
		const wrapper = mount(
			<Group value={[1]}>
				<Checkbox value={1}>1</Checkbox>
				<Checkbox value={2}>2</Checkbox>
			</Group>
		);

		expect(
			wrapper
				.find('label')
				.at(0)
				.hasClass(`${classSelector}-checked`)
		).toBeTruthy();
	});

	it('layout property work correctly', () => {
		const wrapper = mount(
			<Group>
				<Checkbox value={1}>1</Checkbox>
				<Checkbox value={2}>2</Checkbox>
			</Group>
		);

		expect(wrapper.find(`.${classSelector}-group`).hasClass('horizontal')).toBeTruthy();

		wrapper.setProps({ layout: 'v' });
		expect(wrapper.find(`.${classSelector}-group`).hasClass('vertical')).toBeTruthy();
	});

	it('disabled changed invalid', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<Group disabled onChange={onChange}>
				<Checkbox value={1}>1</Checkbox>
				<Checkbox value={2}>2</Checkbox>
				<Checkbox value={3}>3</Checkbox>
			</Group>
		);

		wrapper.find(`.${classSelector}-input`).forEach(node => {
			node.simulate('change');
		});
		expect(onChange).not.toHaveBeenCalled();
	});

	it('children update correctly', () => {
		const wrapper = mount(
			<Group>
				<Checkbox value={1}>1</Checkbox>
				<Checkbox value={2}>2</Checkbox>
			</Group>
		);

		wrapper.setProps({
			children: [<Checkbox value={1}>1</Checkbox>]
		});
		expect(wrapper.find(`.${classSelector}-group`).props().children.length).toEqual(1);
	});
});
