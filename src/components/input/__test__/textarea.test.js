import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import mountTest from '../../../../tests/shared/mountTest';
import Input from '../index';

describe('TextArea', () => {
	mountTest(Input.Textarea);

	it('renders correctly', () => {
		const wrapper = render(<Input.Textarea />);
		expect(wrapper).toMatchSnapshot();
	});

	it('it should support focus and blur', () => {
		const onBlur = jest.fn();
		const wrapper = mount(<Input.Textarea onBlur={onBlur} />);
		wrapper.find('textarea').simulate('blur');
		expect(onBlur).toBeCalled();
		wrapper.unmount();
	});

	it('it should support keydown', () => {
		const onKeydown = jest.fn();
		const wrapper = mount(<Input.Textarea onKeyDown={onKeydown} />);
		wrapper.find('textarea').simulate('keydown', { keyCode: 13 });
		expect(onKeydown).toBeCalled();
		wrapper.unmount();
	});

	it('it should support onChange', () => {
		const onChange = jest.fn();
		const wrapper = mount(<Input.Textarea onChange={onChange} />);
		wrapper.find('textarea').simulate('change');
		expect(onChange).toBeCalled();
	});

	it('it should not trigger onChange when disabled', () => {
		class TextareaComponent extends Component {
			state = {
				value: '1'
			};

			onChange = () => {
				this.setState({
					value: '2'
				});
			};

			render() {
				return <Input.Textarea disabled={this.props.disabled} value={this.state.value} onChange={this.onChange} />;
			}
		}

		const wrapper = mount(<TextareaComponent disabled />);
		wrapper.simulate('change');
		expect(wrapper.state().value).toEqual('1');
		wrapper.unmount();
	});

	it('it should auto calculate height according to content length', async () => {
		const wrapper = mount(<Input.Textarea value="" autoSize />);
		const mockFunc = jest.spyOn(wrapper.instance(), 'calcAutoHeight');
		wrapper.setProps({ value: '1111\n2222\n3333\n4444\n5555\n6666\n7777' });
		expect(mockFunc).toHaveBeenCalledTimes(1);
		wrapper.unmount();
	});
});
