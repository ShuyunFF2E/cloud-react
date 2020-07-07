import React, { Component } from 'react';
import { render, mount } from 'enzyme';

import Tabs from '../index';

describe('Tabs', () => {
	function initGetters(activeKey = 'tab1') {
		const configs = {
			tabsOffsetLeft: {
				tab1: 30,
				tab5: -215
			},
			activeTabsOffsetLeft: {
				tab1: 0,
				tab5: 788
			}
		};

		jest.spyOn(Tabs.prototype, 'tabsOffsetWidth', 'get').mockImplementation(() => 800);
		jest.spyOn(Tabs.prototype, 'tabsOffsetLeft', 'get').mockImplementation(() => {
			return configs.tabsOffsetLeft[activeKey];
		});

		jest.spyOn(Tabs.prototype, 'activeTabsOffsetWidth', 'get').mockImplementation(() => 192);
		jest.spyOn(Tabs.prototype, 'activeTabsOffsetLeft', 'get').mockImplementation(() => {
			return configs.activeTabsOffsetLeft[activeKey];
		});
	}

	beforeEach(() => {
		Object.defineProperties(window.Element.prototype, {
			scrollWidth: {
				get() {
					return 985;
				}
			}
		});
	});

	class Test extends Component {
		state = {
			activeKey: 'tab1',
			tabList: [
				{ tab: 'tab1', content: 'panel1' },
				{ tab: 'tab2', content: 'panel2' },
				{ tab: 'tab3', content: 'panel3' },
				{ tab: 'tab4', content: 'panel4' },
				{ tab: 'tab5', content: 'panel5' }
			]
		};

		onClose = key => {
			const { tabList } = this.state;
			const closedIndex = tabList.findIndex(item => item.tab === key);
			const activeIndex = Math.max(0, closedIndex - 1);

			this.setState({
				activeKey: tabList[activeIndex].key,
				tabList: tabList.filter(item => item.tab !== key)
			});
		};

		render() {
			const { panelProps = {}, ...props } = this.props;
			const { activeKey, tabList } = this.state;

			return (
				<Tabs activeKey={activeKey} onClose={this.onClose} style={{ width: 800 }} {...props}>
					{tabList.map(item => (
						<Tabs.Panel tab={item.tab} key={item.tab} closable tabBarStyle={{ width: 150 }} {...panelProps}>
							{item.content}
						</Tabs.Panel>
					))}
				</Tabs>
			);
		}
	}

	it('renders correctly', () => {
		class TabsComponent extends Component {
			render() {
				return (
					<Tabs>
						<Tabs.Panel tab="tab">tab</Tabs.Panel>
					</Tabs>
				);
			}
		}
		const wrapper = render(<TabsComponent />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should support close tab', () => {
		const wrapper = mount(<Test />);
		const tabWrapper = wrapper.find('.cloud-tabs-item-card').at(1);
		tabWrapper.simulate('click');
		expect(tabWrapper.getDOMNode().classList.contains('active')).toBeTruthy();

		wrapper.find('.cloud-icon-close').simulate('click');
		expect(
			wrapper
				.find('.cloud-tabs-item-card')
				.at(1)
				.getDOMNode().textContent
		).toBe('tab3');

		wrapper.unmount();
	});

	it('the panel content will not be destroyed when then mode is remain ', () => {
		const wrapper = mount(<Test mode="remain" />);
		expect(wrapper.find('.cloud-tabpanel-container')).toHaveLength(wrapper.state().tabList.length);
		wrapper.unmount();

		const wrapper1 = mount(<Test />);
		expect(wrapper1.find('.cloud-tabpanel-container')).toHaveLength(1);
		wrapper1.unmount();
	});

	it('should support fixed tab', () => {
		class Test2 extends Component {
			tabList = [
				{ tab: 'tab1', content: 'panel1', fixed: true },
				{ tab: 'tab2', content: 'panel2', fixed: true },
				{ tab: 'tab3', content: 'panel3' },
				{ tab: 'tab4', content: 'panel4' },
				{ tab: 'tab5', content: 'panel5' }
			];

			render() {
				return (
					<Tabs>
						{this.tabList.map(item => (
							<Tabs.Panel tab={item.tab} key={item.tab} fixed={item.fixed}>
								{item.content}
							</Tabs.Panel>
						))}
					</Tabs>
				);
			}
		}
		const wrapper = mount(<Test2 />);
		expect(wrapper.find('.cloud-tabs-items-fixed .cloud-tabs-item-card')).toHaveLength(2);

		wrapper.unmount();
	});

	it('should support preview Button', () => {
		initGetters('tab5');
		const wrapper = mount(<Test activeKey="tab5" />);

		wrapper.find('.cloud-tabs-more-icon-card.after').simulate('click');
		expect(window.getComputedStyle(wrapper.find('.cloud-tabs-items-scroll').getDOMNode()).left).toBe('-245px');

		wrapper.find('.cloud-tabs-more-icon-card.before').simulate('click');
		expect(window.getComputedStyle(wrapper.find('.cloud-tabs-items-scroll').getDOMNode()).left).toBe('0px');

		wrapper.unmount();
	});

	it('should support after Button', () => {
		initGetters();
		const wrapper = mount(<Test />);

		wrapper.find('.cloud-tabs-more-icon-card.before').simulate('click');
		expect(window.getComputedStyle(wrapper.find('.cloud-tabs-items-scroll').getDOMNode()).left).toBe('');

		wrapper.find('.cloud-tabs-more-icon-card.after').simulate('click');
		expect(window.getComputedStyle(wrapper.find('.cloud-tabs-items-scroll').getDOMNode()).left).toBe('-185px');

		wrapper.unmount();
	});

	it('itemsNextLeft', () => {
		initGetters();
		const wrapper = mount(<Test step={50} />);
		wrapper.find('.cloud-tabs-more-icon-card.after').simulate('click');
		expect(window.getComputedStyle(wrapper.find('.cloud-tabs-items-scroll').getDOMNode()).left).toBe('-20px');
		wrapper.unmount();
	});

	it('itemsPrevLeft', () => {
		initGetters('tab5');
		const wrapper = mount(<Test step={50} activeKey="tab5" />);
		wrapper.find('.cloud-tabs-more-icon-card.before').simulate('click');
		expect(window.getComputedStyle(wrapper.find('.cloud-tabs-items-scroll').getDOMNode()).left).toBe('-165px');
		wrapper.unmount();
	});

	it('should support line type', () => {
		initGetters('tab5');
		const wrapper = mount(<Test activeKey="tab5" type="line" />);
		expect(wrapper.find('.cloud-tabs-item-line')).toHaveLength(5);

		wrapper.find('.cloud-tabs-more-icon-line.before').simulate('click');
		expect(window.getComputedStyle(wrapper.find('.cloud-tabs-item-line.active').getDOMNode()).width).toBe('150px');
		wrapper.unmount();
	});

	it('renders correctly when activeEle is null', () => {
		jest.spyOn(Tabs.prototype, 'activeEle', 'get').mockImplementationOnce(() => {
			return null;
		});
		const wrapper = mount(<Test />);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders correctly when child is invalid', () => {
		const wrapper = mount(
			<Tabs activeKey="tab1">
				tab2
				<Tabs.Panel tab="tab1">tab1</Tabs.Panel>
			</Tabs>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('onClose is undefined', () => {
		class Test1 extends Component {
			render() {
				return (
					<Tabs activeKey="tab1">
						<Tabs.Panel tab="tab1" key="tab1" closable>
							tab1
						</Tabs.Panel>
						<Tabs.Panel tab="tab2" key="tab2" closable>
							tab2
						</Tabs.Panel>
					</Tabs>
				);
			}
		}
		const wrapper = mount(<Test1 />);
		wrapper.find('.cloud-icon-close').simulate('click');
		expect(wrapper.find('.cloud-tabs-item-card')).toHaveLength(2);

		wrapper.unmount();
	});
});
