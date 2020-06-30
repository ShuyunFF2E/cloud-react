import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import mountTest from '@tests/shared/mountTest';
import Step from '../index';
import { HORIZONTAL, VERTICAL, INLINE, CIRCLE, DOT } from '../constants';

const classSelector = `${prefixCls}-step`;
const LAYOUTS = [HORIZONTAL, VERTICAL, INLINE];
const TYPES = [CIRCLE, DOT];

class StepApp extends Component {
	render() {
		return (
			<Step {...this.props}>
				<Step.Item title="把冰箱门打开" />
				<Step.Item title="把大象放进去" />
			</Step>
		);
	}
}

describe('Step', () => {
	mountTest(Step);

	it('renders correctly', () => {
		const wrapper = render(<StepApp current={0} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('mount correctly', () => {
		expect(() => renderer.create(<StepApp current={0} />)).not.toThrow();
	});

	it('should active current step when current set', () => {
		const wrapper = mount(<StepApp current={1} />);
		expect(
			wrapper
				.find(`.${classSelector}-icon`)
				.at(1)
				.hasClass('process')
		).toBeTruthy();
	});

	it('renders different direction correctly', () => {
		LAYOUTS.forEach(layout => {
			const wrapper = render(<StepApp direction={layout} />);
			expect(wrapper).toMatchSnapshot();
		});
	});

	it('renders different type correctly', () => {
		TYPES.forEach(type => {
			const wrapper = render(<StepApp type={type} />);
			expect(wrapper).toMatchSnapshot();
		});
	});

	it('className work correctly', () => {
		const wrapper = mount(<StepApp className="step-test" />);
		expect(
			wrapper
				.find(`.${classSelector}`)
				.at(0)
				.hasClass('step-test')
		).toBeTruthy();
	});

	it('onClick work correctly', () => {
		const onClick = jest.fn();
		const wrapper = mount(<StepApp onClick={onClick} />);
		wrapper
			.find(`.${classSelector}-icon`)
			.at(1)
			.simulate('click');
		expect(onClick).toHaveBeenCalledWith(1);
	});
});
