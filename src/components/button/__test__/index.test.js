import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import { render, mount } from 'enzyme';
import mountTest from '@tests/shared/mountTest';

import Button from '../index';

describe('Button', () => {
	mountTest(Button);

	it('renders correctly', () => {
		const wrapper = render(<Button>Follow</Button>);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders correctly123', () => {
		const wrapper = renderer.create(<Button>Follow</Button>).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('mount correctly', () => {
		expect(() => renderer.create(<Button>Follow</Button>)).not.toThrow();
	});

	it('should render empty button without error', () => {
		const wrapper = mount(
			<Button>
				{null} {undefined}
			</Button>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should not clickable when button is disabled ', () => {
		const handleClick = jest.fn();
		const wrapper = mount(
			<Button disabled onClick={handleClick}>
				save
			</Button>
		);

		wrapper.simulate('click');
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('should change button  when set size ', () => {
		const largeBtn = mount(<Button size="large" />);
		expect(largeBtn.find('.large')).toHaveLength(1);

		const smallBtn = mount(<Button size="small" />);
		expect(smallBtn.find('.small')).toHaveLength(1);
	});

	it('should support link button', () => {
		const wrapper = mount(
			<Button target="__blank" href="https://baidu.com">
				link
			</Button>
		);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('should change loading state instantly by default', () => {
		class DefaultButton extends Component {
			state = {
				loading: false
			};

			handleClick = () => {
				this.setState({ loading: true });
			};

			render() {
				const { loading } = this.state;
				return (
					<Button loading={loading} onClick={this.handleClick}>
						save
					</Button>
				);
			}
		}

		const wrapper = mount(<DefaultButton />);
		wrapper.simulate('click');
		expect(wrapper.find('.cloud-button-loading')).toHaveLength(1);
	});

	it('should not clickable when buttion is loading', () => {
		const handleClick = jest.fn();
		const wrapper = mount(
			<Button loading onClick={handleClick}>
				save
			</Button>
		);

		wrapper.simulate('click');
		expect(handleClick).not.toHaveBeenCalled();
	});
});

describe('Button Group', () => {
	mountTest(Button.Group);

	it('renders correctly', () => {
		const wrapper = mount(
			<Button.Group>
				<Button>left</Button>
				<Button type="primary">middle</Button>
				<Button>right</Button>
			</Button.Group>
		);
		expect(wrapper.find(Button)).toHaveLength(3);
	});
});
