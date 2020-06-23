import React from 'react';
import { render, mount } from 'enzyme';

import Tips from '../index';

describe('Tips', () => {
	it('renders correctly', () => {
		const wrapper = render(<Tips msg="默认提示信息" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('it support different types', () => {
		['major', 'warning', 'normal'].forEach(type => {
			const wrapper = mount(<Tips msg="提示信息" type={type} />);
			expect(wrapper.find(`.${type}`)).toBeTruthy();
			wrapper.unmount();
		});
	});
});
