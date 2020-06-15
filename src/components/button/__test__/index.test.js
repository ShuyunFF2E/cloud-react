import React from 'react';
import renderer from 'react-test-renderer';
import { render } from 'enzyme';
import mountTest from '../../../../tests/shared/mountTest';

import Button from '../index';

describe('Button', () => {
	mountTest(Button);
	mountTest(() => <Button size="large" />);
	mountTest(() => <Button size="small" />);
	mountTest(Button.Group);
	mountTest(() => <Button.Group size="large" />);
	mountTest(() => <Button.Group size="small" />);

	it('renders correctly', () => {
		const wrapper = render(<Button>Follow</Button>);
		expect(wrapper).toMatchSnapshot();
	});

	it('mount correctly', () => {
		expect(() => renderer.create(<Button>Follow</Button>)).not.toThrow();
	});
});
