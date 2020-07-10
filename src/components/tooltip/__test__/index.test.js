import React, { Component } from 'react';
import { mount } from 'enzyme';
import mountTest from '@tests/shared/mountTest';

import Tooltip from '../index';
import Button from '../../button';

describe('Tooltip', () => {
	mountTest(Tooltip);

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should change visible to show or hide tootip', () => {
		class MyComponent extends Component {
			state = {
				content: 'click close tooltip',
				show: true
			};

			onChangeStatus = () => {
				this.setState(prevState => {
					return {
						show: !prevState.show
					};
				});
			};

			render() {
				const { content, show } = this.state;

				return (
					<div>
						<Button onClick={this.onChangeStatus}>{show ? 'close' : 'show'} tooltip</Button>
						<Tooltip content={content} placement="top" visible={show}>
							<span>Click button {show ? 'close' : 'show'} toolTip.</span>
						</Tooltip>
					</div>
				);
			}
		}

		const wrapper = mount(<MyComponent />);
		expect(wrapper.state('show')).toBeTruthy();
		wrapper.find('Button').simulate('click');
		expect(wrapper.state('show')).toBeFalsy();
		wrapper.find('Button').simulate('click');
		expect(wrapper.state('show')).toBeTruthy();
	});

	it('trigger by click event', () => {
		const wrapper = mount(
			<Tooltip content="click content" trigger="click">
				<Button type="normal">点击显示 Tooltip</Button>
			</Tooltip>
		);

		wrapper.find('Button').simulate('click');
		jest.runAllTimers();
		expect(wrapper.state('visible')).toBeTruthy();

		wrapper
			.find('div')
			.at(0)
			.simulate('mouseLeave');
		jest.runAllTimers();
		expect(wrapper.state('visible')).toBeFalsy();
	});

	it('should hide tips when visible set false or content is empty', () => {
		const wrapper = mount(
			<Tooltip content="" trigger="click" visible={false}>
				<Button type="normal">点击显示 Tooltip</Button>
			</Tooltip>
		);

		wrapper.find('Button').simulate('click');
		jest.runAllTimers();
		expect(wrapper.state('visible')).toBeFalsy();
	});

	it('should show tips when visible set true', () => {
		const wrapper = mount(
			<Tooltip content="click content" trigger="click" visible>
				<Button type="normal">点击显示 Tooltip</Button>
			</Tooltip>
		);

		wrapper
			.find('div')
			.at(0)
			.simulate('mouseLeave');
		jest.runAllTimers();
		expect(wrapper.state('visible')).toBeTruthy();
	});
});
