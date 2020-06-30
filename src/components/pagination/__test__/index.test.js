import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import mountTest from '@tests/shared/mountTest';

import Pagination from '../index';

describe('Pagination', () => {
	class Test extends Component {
		state = { current: 1, pageSize: 10 };

		onChange = (current, pageSize) => {
			this.setState({ current, pageSize });
		};

		render() {
			return <Pagination total={50} current={this.state.current} pageSize={this.state.pageSize} onChange={this.onChange} {...this.props} />;
		}
	}

	mountTest(Pagination);

	it('renders correctly', () => {
		const wrapper = render(<Pagination />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should jump next page or preview page', () => {
		const wrapper = mount(<Test />);
		expect(wrapper.find('li:first-child.nomore')).toHaveLength(1);

		wrapper.setState({ current: 5 });
		expect(wrapper.find('li:last-child.nomore')).toHaveLength(1);

		wrapper.find('li:first-child').simulate('click');
		expect(wrapper.state().current).toBe(4);

		wrapper.find('li:last-child').simulate('click');
		expect(wrapper.state().current).toBe(5);

		wrapper
			.find('li')
			.at(2)
			.simulate('click');
		expect(wrapper.state().current).toBe(2);

		wrapper.unmount();
	});

	it('support pageSizeOptions', () => {
		const wrapper = mount(<Test showPageSizeOptions pageSizeOptions={[10, 20, 30, 50, 100]} />);
		wrapper.setState({ pageSize: 20 });
		const { length } = wrapper.find('li');
		expect(
			wrapper
				.find('li')
				.at(length - 2)
				.getDOMNode().textContent
		).toBe('3');
		wrapper.unmount();

		const wrapper1 = mount(<Test showPageSizeOptions pageSizeOptions={[20, 30, 50, 100]} />);
		expect(wrapper1.props().pageSizeOptions.indexOf(10) === 0).toBeTruthy();
		wrapper1.unmount();
	});

	it('should not show ellipse when pageLength is less than 10', () => {
		const wrapper = mount(<Test total={90} current={5} />);
		expect(wrapper.find('li.ellips')).toHaveLength(0);
		wrapper.unmount();
	});

	it('should show right ellipse when pageLength is more than 9 and current is less than 5', () => {
		const wrapper = mount(<Test total={500} current={4} />);
		const lis = wrapper.find('li');
		expect(
			lis
				.at(lis.length - 3)
				.getDOMNode()
				.classList.contains('ellips')
		).toBeTruthy();
		wrapper.unmount();
	});

	it('should show left ellipse when pageLength is more than 9 and current is less than (pageLength - 4)', () => {
		const wrapper = mount(<Test total={500} current={48} />);
		expect(
			wrapper
				.find('li')
				.at(2)
				.getDOMNode()
				.classList.contains('ellips')
		).toBeTruthy();
		wrapper.unmount();
	});

	it('should show left ellipse and right ellipse when current is more than 4 or current is more than (pageLength - 5)', () => {
		const wrapper = mount(<Test total={500} current={5} />);
		expect(wrapper.find('li.ellips')).toHaveLength(2);
		wrapper.unmount();
	});

	it('should support click when ellipse is shown', () => {
		[4, 5, 48].forEach(current => {
			const wrapper = mount(<Test total={500} current={current} />);

			const lis = wrapper.find('li');
			lis.at(1).simulate('click');
			expect(wrapper.state().current).toBe(1);

			lis.at(lis.length - 2).simulate('click');
			expect(wrapper.state().current).toBe(50);

			// show left ellipse
			if (current === 48) {
				lis.at(lis.length - 5).simulate('click');
				expect(wrapper.state().current).toBe(47);
			}

			// show left ellipse and right ellipse
			if (current === 5) {
				lis.at(4).simulate('click');
				expect(wrapper.state().current).toBe(4);

				lis.at(6).simulate('click');
				expect(wrapper.state().current).toBe(6);
			}

			wrapper.unmount();
		});
	});
});
