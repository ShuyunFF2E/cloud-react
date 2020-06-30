import React from 'react';
import renderer from 'react-test-renderer';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import mountTest from '@tests/shared/mountTest';
import Radio from '../index';

const classSelector = `${prefixCls}-radio`;

describe('Radio', () => {
	mountTest(() => <Radio value={1}>单选</Radio>);

	const Component = (
		<Radio value={1} checked>
			单选
		</Radio>
	);

	it('renders correctly', () => {
		const wrapper = render(Component);
		expect(wrapper).toMatchSnapshot();
	});

	it('mount correctly', () => {
		expect(() => renderer.create(Component)).not.toThrow();
	});

	it('change event correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<Radio onChange={onChange} value={1}>
				单选
			</Radio>
		);
		wrapper
			.find(`.${classSelector}-input`)
			.at(0)
			.simulate('change');
		expect(onChange).toHaveBeenCalled();
	});

	it('disabled changed invalid', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<Radio disabled value={1} onChange={onChange}>
				单选
			</Radio>
		);
		wrapper
			.find(`.${classSelector}-input`)
			.at(0)
			.simulate('change');
		expect(onChange).not.toHaveBeenCalled();
	});
});
