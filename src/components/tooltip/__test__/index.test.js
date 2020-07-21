import React, { Component } from 'react';
import { mount } from 'enzyme';
import mountTest from '@tests/shared/mountTest';

import Tooltip from '../index';
import Button from '../../button';
import Select from '../../select';

describe('Tooltip', () => {
	function setStyle(tooltipStyle = {}, buttonStyle = {}) {
		const isTooltip = classList => classList.contains('cloud-tooltip');
		const isButton = classList => classList.contains('cloud-button');
		const tooltipConfig = {
			offsetHeight: 26,
			offsetWidth: 88,
			...tooltipStyle
		};
		const buttonConfig = {
			offsetHeight: 30,
			offsetWidth: 132,
			offsetTop: 57,
			offsetLeft: 185,
			...buttonStyle
		};
		Object.defineProperties(window.HTMLElement.prototype, {
			offsetHeight: {
				get() {
					if (isTooltip(this.classList)) {
						return tooltipConfig.offsetHeight;
					}
					if (isButton(this.classList)) {
						return buttonConfig.offsetHeight;
					}
					return 0;
				}
			},
			offsetWidth: {
				get() {
					if (isTooltip(this.classList)) {
						return tooltipConfig.offsetWidth;
					}
					if (isButton(this.classList)) {
						return buttonConfig.offsetWidth;
					}
					return 0;
				}
			},
			offsetParent: {
				get() {
					return this.parentElement;
				}
			}
		});
	}

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

	it('should show tips when trigger is onDoubleClick', () => {
		const wrapper = mount(
			<Tooltip content="click content" trigger="onDoubleClick">
				<Button type="normal">双击显示 Tooltip</Button>
			</Tooltip>
		);
		wrapper.find('Button').simulate('dblclick');
		jest.runAllTimers();
		expect(wrapper.state('visible')).toBeTruthy();
	});

	it('support placement', () => {
		[
			'auto',
			'top',
			'right',
			'bottom',
			'left',
			'top-left',
			'top-right',
			'bottom-left',
			'bottom-right',
			'left-top',
			'left-bottom',
			'right-top',
			'right-bottom',
			'auto'
		].forEach((placement, index) => {
			setStyle(index === 13 ? {} : { offsetHeight: 0 });
			const wrapper = mount(
				<Tooltip content={<span>click content</span>} trigger="click" visible placement={placement}>
					<Button type="normal">点击显示 Tooltip</Button>
				</Tooltip>
			);
			wrapper.find('Button').simulate('click');
			jest.runAllTimers();
			const { top, left } = window.getComputedStyle(document.querySelector('.cloud-tooltip'));
			expect(top || left).toBeTruthy();
		});
	});

	it('when tooltipcontainer is not bind to parent element ', () => {
		const wrapper = mount(
			<Tooltip content="click content" trigger="click" visible>
				<Select />
			</Tooltip>
		);
		wrapper.find('.cloud-select-wrapper').simulate('click');
		jest.runAllTimers();
		expect(wrapper.state('visible')).toBeTruthy();
	});
});
