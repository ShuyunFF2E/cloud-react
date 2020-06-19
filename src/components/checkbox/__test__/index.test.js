import React from 'react';
import renderer from 'react-test-renderer';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import mountTest from '../../../../tests/shared/mountTest';
import Checkbox from '../index';

const classSelector = `${prefixCls}-checkbox`;

describe('Checkbox', () => {
	mountTest(Checkbox);

	const Component = <Checkbox defaultChecked={true} disabled={true} indeterminate={false} value={2} onChange={() => {}} />;

	it('renders correctly', () => {
		const wrapper = render(Component);
		expect(wrapper).toMatchSnapshot();
	});

	it('mount correctly', () => {
		expect(() => renderer.create(Component)).not.toThrow();
	});

	it('change event correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<Checkbox onChange={onChange}>Checkbox</Checkbox>);
		wrapper
			.find('input')
			.at(0)
			.simulate('change');
		expect(wrapper.find('label').hasClass(`${classSelector}-checked`)).toBeTruthy();
	});

	it('return value correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<Checkbox value={2} onChange={onChange}>
				Checkbox
			</Checkbox>
		);
		wrapper
			.find('input')
			.at(0)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith(true, 2);
	});

	it('disabled changed invalid', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<Checkbox disabled onChange={onChange}>
				Checkbox
			</Checkbox>
		);
		wrapper
			.find('input')
			.at(0)
			.simulate('change');
		expect(onChange).not.toHaveBeenCalled();
	});
});
