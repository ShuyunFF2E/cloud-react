import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import mountTest from '@tests/shared/mountTest';

import TablePagination from '../index';

describe('TablePagination', () => {
	class Test extends Component {
		state = { current: 1, pageSize: 10 };

		onChange = (current, pageSize) => {
			this.setState({ current, pageSize });
		};

		render() {
			return <TablePagination total={50} current={this.state.current} pageSize={this.state.pageSize} onChange={this.onChange} {...this.props} />;
		}
	}

	mountTest(TablePagination);

	it('renders correctly', () => {
		const wrapper = render(<Test />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should support jump next page or preview page', () => {
		const wrapper = mount(<Test />);
		wrapper.find('.cloud-icon-right-solid').simulate('click');
		expect(wrapper.state().current).toBe(2);

		wrapper.find('.cloud-icon-left-solid').simulate('click');
		expect(wrapper.state().current).toBe(1);

		wrapper.unmount();
	});

	it('should support jump last page or first page', () => {
		const wrapper = mount(<Test />);
		wrapper.find('.cloud-icon-last-solid').simulate('click');
		expect(wrapper.state().current).toBe(5);

		wrapper.find('.cloud-icon-first-solid').simulate('click');
		expect(wrapper.state().current).toBe(1);

		wrapper.unmount();
	});

	it('preview page button and first page button is disabled when it is first page', () => {
		const wrapper = mount(<Test current={1} />);
		wrapper.find('.cloud-icon-left-solid').simulate('click');
		expect(wrapper.state().current).toBe(1);

		wrapper.find('.cloud-icon-first-solid').simulate('click');
		expect(wrapper.state().current).toBe(1);

		wrapper.unmount();
	});

	it('next page button and last page button is disabled when it is last page', () => {
		const wrapper = mount(<Test current={5} />);
		wrapper.find('.cloud-icon-right-solid').simulate('click');
		expect(wrapper.find('.goto-page span').getDOMNode().textContent).toBe('5');

		wrapper.find('.cloud-icon-last-solid').simulate('click');
		expect(wrapper.find('.goto-page span').getDOMNode().textContent).toBe('5');

		wrapper.unmount();
	});

	it('should support pageSizeOptions', () => {
		const wrapper = mount(<Test showPageSizeOptions pageSizeOptions={[10, 20, 30, 50, 100]} />);
		wrapper.setState({ pageSize: 20 });
		expect(wrapper.find('.goto-page span').getDOMNode().textContent).toBe('3');
		wrapper.unmount();

		const wrapper1 = mount(<Test showPageSizeOptions pageSizeOptions={[20, 30, 50, 100]} />);
		expect(wrapper1.props().pageSizeOptions.indexOf(10) === 0).toBeTruthy();
		wrapper1.unmount();
	});

	it('support showTotal', () => {
		const wrapper = mount(<Test showTotal />);
		expect(wrapper.find('.total-count')).toHaveLength(1);
		wrapper.unmount();
	});

	it('support showRefresh', () => {
		const wrapper = mount(<Test showRefresh />);
		expect(wrapper.find('.refresh-action')).toHaveLength(1);
		wrapper.unmount();
	});

	it('support checkedTotal', () => {
		const wrapper = mount(<Test checkedTotal={1} />);
		expect(wrapper.find('.checked-info')).toHaveLength(1);
		wrapper.unmount();

		const checkedTotalContent = '已选择1条';
		const wrapper1 = mount(<Test checkedTotal={checkedTotalContent} />);
		expect(wrapper1.find('.checked-info').getDOMNode().textContent).toBe(checkedTotalContent);
		wrapper1.unmount();
	});

	it('should trigger onChange when click refresh button', () => {
		const onChange = jest.fn();
		const wrapper = mount(<Test showRefresh onChange={onChange} />);
		wrapper.find('.refresh-action').simulate('click');
		expect(onChange).toBeCalled();
		wrapper.unmount();
	});

	it('should trigger onChange when change pageSize', () => {
		const wrapper = mount(<Test current={2} showPageSizeOptions />);
		wrapper.setProps({ pageSize: 30 });
		wrapper.find('.change-size select').simulate('change');
		expect(wrapper.state().current).toBe(1);
		wrapper.unmount();
	});

	it('should trigger input onChange when set pageNum', () => {
		const wrapper = mount(<Test />);
		wrapper.setProps({ current: 2 });
		const inputWrapper = wrapper.find('.gp-input');
		inputWrapper.simulate('change');
		expect(inputWrapper.getDOMNode().value).toBe('2');
		wrapper.unmount();
	});

	it('pageNum should change when input valid value', () => {
		const wrapper = mount(<Test />);
		const inputWrapper = wrapper.find('.gp-input');
		inputWrapper.getDOMNode().value = '2';

		inputWrapper.simulate('keypress', { nativeEvent: { keyCode: 13 } });
		expect(inputWrapper.getDOMNode().value).toBe('2');

		inputWrapper.getDOMNode().value = '3';
		inputWrapper.simulate('keypress', { nativeEvent: { keyCode: 14 } });
		expect(inputWrapper.getDOMNode().value).toBe('2');

		wrapper.unmount();
	});

	it('pageNum should not change when input invalid value', () => {
		['0', '6', 'abc'].forEach(inputPage => {
			const wrapper = mount(<Test />);
			const inputWrapper = wrapper.find('.gp-input');
			inputWrapper.getDOMNode().value = inputPage;
			inputWrapper.simulate('keypress', { nativeEvent: { keyCode: 13 } });
			expect(inputWrapper.getDOMNode().value).toBe('1');
			wrapper.unmount();
		});
	});
});
