import React from 'react';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import Step from '../index';
import { WAIT, FINISH, PROCESS, VERTICAL } from '../constants';

const classSelector = `${prefixCls}-step`;
const STATUS = [WAIT, FINISH, PROCESS];
const { Item } = Step;

describe('StepItem', () => {
	it('renders different status correctly', () => {
		STATUS.forEach(status => {
			const wrapper = render(
				<Step>
					<Item title="把冰箱门打开" status={status} />
				</Step>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});

	it('title work correctly', () => {
		const wrapper = mount(
			<Step>
				<Item title="把冰箱门打开" />
			</Step>
		);
		expect(
			wrapper
				.find(`.${classSelector}-title`)
				.at(0)
				.text()
		).toEqual('把冰箱门打开');
	});

	it('content work correctly', () => {
		const wrapper = mount(
			<Step direction={VERTICAL}>
				<Item title="把冰箱门打开" content="步骤一" />
			</Step>
		);
		expect(
			wrapper
				.find(`.${classSelector}-content`)
				.at(0)
				.text()
		).toEqual('步骤一');
	});

	it('should content not exist when direction horizontal', () => {
		const wrapper = mount(
			<Step>
				<Item title="把冰箱门打开" content="步骤一" />
			</Step>
		);
		expect(wrapper.find(`.${classSelector}-content`)).toHaveLength(0);
	});

	it('className work correctly', () => {
		const wrapper = mount(
			<Step>
				<Item title="把冰箱门打开" />
				<Item title="把大象放进去" className="step-item" />
			</Step>
		);
		expect(
			wrapper
				.find(`.${classSelector}-item`)
				.at(1)
				.hasClass('step-item')
		).toBeTruthy();
	});

	it('onClick work correctly', () => {
		const onClick = jest.fn();
		const wrapper = mount(
			<Step>
				<Item title="把冰箱门打开" onClick={onClick} />
				<Item title="把大象放进去" />
			</Step>
		);
		wrapper
			.find(`.${classSelector}-icon`)
			.at(0)
			.simulate('click');

		expect(onClick).toHaveBeenCalledWith(0);
	});
});
