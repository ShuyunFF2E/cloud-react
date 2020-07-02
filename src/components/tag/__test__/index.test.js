import React from 'react';
import { mount, render } from 'enzyme';
import mountTest from '@tests/shared/mountTest';

import Tag from '../index';

describe('Tag', () => {
	mountTest(Tag);

	it('renders correctly', () => {
		const wrapper = render(<Tag>Facebook</Tag>);
		expect(wrapper).toMatchSnapshot();
	});

	it('should be trigger click', () => {
		const onClick = jest.fn();
		const wrapper = mount(<Tag onClick={onClick}>测试</Tag>);

		wrapper.find('.cloud-tag').simulate('click');
		expect(onClick).toHaveBeenCalled();
	});

	it('should be remove when click close icon', () => {
		const onClose = jest.fn();
		const wrapper = mount(
			<Tag closable onClose={onClose}>
				测试
			</Tag>
		);

		wrapper.find('Icon').simulate('click');
		expect(onClose).toHaveBeenCalled();

		expect(wrapper.find('.cloud-tag')).toEqual({});
	});

	it('should not clickable when tag is disabled ', () => {
		const handleClick = jest.fn();
		const wrapper = mount(
			<Tag disabled onClick={handleClick}>
				测试
			</Tag>
		);

		wrapper.simulate('click');
		expect(handleClick).not.toHaveBeenCalled();
	});
});
