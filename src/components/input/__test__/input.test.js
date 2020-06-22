import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import mountTest from '../../../../tests/shared/mountTest';
import Input from '../index';
import Icon from '../../icon/index';

describe('Input', () => {
	mountTest(Input);

	it('renders correctly', () => {
		const wrapper = render(<Input />);
		expect(wrapper).toMatchSnapshot();
	});

	it('it should not trigger onChange when disabled', () => {
		class InputComponent extends Component {
			state = {
				value: 1
			};

			onChange = () => {
				this.setState({
					value: 2
				});
			};

			render() {
				return <Input disabled={this.props.disabled} value={this.state.value} onChange={this.onChange} />;
			}
		}

		const wrapper = mount(<InputComponent disabled />);
		wrapper.simulate('change');
		expect(wrapper.state().value).toEqual(1);
		wrapper.unmount();

		const wrapper1 = mount(<InputComponent />);
		wrapper1.simulate('change');
		expect(wrapper1.state().value).toEqual(2);
		wrapper1.unmount();
	});

	it('it should not show clear icon if value is undefined, null or empty string', () => {
		const wrappers = ['', undefined, null].map(val => mount(<Input hasClear value={val} />));
		wrappers.forEach(wrapper => {
			wrapper.simulate('click');
			expect(wrapper.getDOMNode().value).toEqual(undefined);
			expect(wrapper.find('.cloud-input-clear.show').exists()).toBeFalsy();
			wrapper.unmount();
		});
	});

	it('when both defaultValue and value are not undefined, value has higher priority than defaultValue ', () => {
		const wrapper = mount(<Input defaultValue={3} value={4} />);
		expect(wrapper.getDOMNode().value).toEqual('4');
		wrapper.unmount();
	});

	it('value should be empty after clear', () => {
		class InputComponent extends Component {
			state = { value: 1 };

			onChange = evt => {
				this.setState({
					value: evt.target.value
				});
			};

			render() {
				return <Input value={this.state.value} hasClear onChange={this.onChange} />;
			}
		}
		const wrapper = mount(<InputComponent />);
		wrapper
			.find('.cloud-input-clear')
			.at(0)
			.simulate('click');
		expect(
			wrapper
				.find('input')
				.at(0)
				.getDOMNode().value
		).toBe('');
		wrapper.unmount();
	});

	it('it should support focus and blur', () => {
		const onFocus = jest.fn();
		const onBlur = jest.fn();
		const wrapper = mount(<Input onFocus={onFocus} onBlur={onBlur} />);
		wrapper.simulate('focus');
		expect(onFocus).toBeCalled();
		wrapper.simulate('blur');
		expect(onBlur).toBeCalled();
		wrapper.unmount();
	});

	it('it should support keydown', () => {
		const onKeydown = jest.fn();
		const wrapper = mount(<Input onKeyDown={onKeydown} />);
		wrapper.simulate('keydown', { keyCode: 13 });
		expect(onKeydown).toBeCalled();
		wrapper.unmount();
	});

	it('it should support addonBefore addonAfter prefix and suffix', () => {
		const prefix = <Icon type="shop" />;
		const suffix = <Icon type="search" />;
		const addonBefore = <span>http://</span>;
		const addonAfter = <span>.com</span>;

		class InputComponent extends Component {
			render() {
				return <Input prefix={prefix} suffix={suffix} addonBefore={addonBefore} addonAfter={addonAfter} />;
			}
		}

		const wrapper = mount(<InputComponent />);
		expect(wrapper.contains(prefix)).toBeTruthy();
		expect(wrapper.contains(suffix)).toBeTruthy();
		expect(wrapper.contains(addonBefore)).toBeTruthy();
		expect(wrapper.contains(addonAfter)).toBeTruthy();
		wrapper.unmount();
	});
});
