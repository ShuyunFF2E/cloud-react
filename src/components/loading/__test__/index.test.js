import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import mountTest from '@tests/shared/mountTest';
import { prefixCls } from '@utils';
import Loading from '../index';
import Toggle from '../../toggle';

const classSelector = `${prefixCls}-loading`;

describe('Loading', () => {
	mountTest(Loading);

	it('renders correctly', () => {
		const wrapper = render(<Loading />);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders different size', () => {
		expect(render(<Loading size="small" />)).toMatchSnapshot();
		expect(render(<Loading />)).toMatchSnapshot();
		expect(render(<Loading size="large" />)).toMatchSnapshot();
	});

	it('should render correctly with loading state', () => {
		const wrapper = mount(<Loading />);
		expect(wrapper.find(`.${classSelector}`)).toHaveLength(1);
	});

	it('should render text with tip', () => {
		const tip = 'Loading加载提示';
		const wrapper = render(<Loading tip={tip} />);
		expect(wrapper.find('.cloud-loading-text').text()).toEqual(tip);
	});

	it('should render correctly after delay time', () => {
		class TestComponent extends Component {
			constructor(props) {
				super(props);
				this.state = {
					loading: false
				};
			}

			handleChange = loading => {
				this.setState({ loading });
			};

			render() {
				return (
					<div>
						<Toggle checked={this.state.loading} onChange={this.handleChange} />
						<Loading delay={1000} loading={this.state.loading} />
					</div>
				);
			}
		}

		const wrapper = mount(<TestComponent />);

		jest.useFakeTimers();

		expect(wrapper.find('Loading').state('delayShow')).toBeFalsy();

		wrapper.find(Toggle).simulate('click');

		jest.advanceTimersByTime(1000);

		expect(wrapper.find('Loading').state('delayShow')).toBeTruthy();

		jest.useRealTimers();
	});

	it('should render correctly has children props', () => {
		const wrapper = mount(
			<Loading>
				<div className="test">这里是我要秀的文案啦。</div>
			</Loading>
		);
		expect(wrapper.find('.test')).toHaveLength(1);
	});
});
