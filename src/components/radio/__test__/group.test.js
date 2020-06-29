import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import mountTest from '../../../../tests/shared/mountTest';
import Radio from '../index';

const classSelector = `${prefixCls}-radio`;
const { Group } = Radio;

class GroupRadio extends Component {
	render() {
		return (
			<Group {...this.props}>
				<Radio value={1}>1</Radio>
				<Radio value={2}>2</Radio>
			</Group>
		);
	}
}

describe('RadioGroup', () => {
	mountTest(Group);

	it('renders correctly', () => {
		const wrapper = render(<GroupRadio />);
		expect(wrapper).toMatchSnapshot();
	});

	it('complex group renders correctly', () => {
		const wrapper = render(
			<Group>
				<Radio value={1}>1</Radio>
				<Radio value={2}>2</Radio>
				<span>单选</span>
				<Group>
					<Radio value={3}>3</Radio>
					<Radio value={4}>4</Radio>
				</Group>
			</Group>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('basic function work correctly', () => {
		class App extends Component {
			state = {};

			onChange = value => {
				this.setState({
					value
				});
			};

			render() {
				return <GroupRadio onChange={this.onChange} value={this.state.value} />;
			}
		}
		const onChange = jest.fn();
		const wrapper = mount(<App onChange={onChange} />);

		wrapper
			.find(`.${classSelector}-input`)
			.at(0)
			.simulate('change');
		expect(wrapper.state().value).toEqual(1);

		wrapper
			.find(`.${classSelector}-input`)
			.at(1)
			.simulate('change');
		expect(wrapper.state().value).toEqual(2);
	});

	it('value property work correctly', () => {
		const wrapper = mount(<GroupRadio value={1} />);

		expect(
			wrapper
				.find(`.${classSelector}-input`)
				.at(0)
				.props().checked
		).toBeTruthy();
	});

	it('horizontal property work correctly', () => {
		const wrapper = mount(<GroupRadio horizontal />);
		expect(wrapper.find(`.${classSelector}-group`).hasClass('horizontal')).toBeTruthy();
	});

	it('vertical property work correctly', () => {
		const wrapper = mount(<GroupRadio vertical />);

		expect(wrapper.find(`.${classSelector}-group`).hasClass('vertical')).toBeTruthy();
	});

	it('disabled changed invalid', () => {
		const onChange = jest.fn();
		const wrapper = mount(<GroupRadio disabled onChange={onChange} />);

		wrapper.find(`.${classSelector}-input`).forEach(node => {
			node.simulate('change');
		});
		expect(onChange).not.toHaveBeenCalled();
	});

	it('children update correctly', () => {
		const wrapper = mount(
			<Group>
				<Radio value={1}>1</Radio>
				<Radio value={2}>2</Radio>
			</Group>
		);

		wrapper.setProps({
			children: [<Radio value={1}>1</Radio>]
		});
		expect(wrapper.find(`.${classSelector}-group`).props().children).toHaveLength(1);
	});
});
