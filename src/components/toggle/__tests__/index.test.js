import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import mountTest from '@tests/shared/mountTest';

import Toggle from '../index';

describe('Toggle', () => {
  mountTest(Toggle);

  it('renders correctlly', () => {
    const wrapper = render(<Toggle />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should change big or small set size', () => {
    const wrapper = render(<Toggle size="small" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should change status by set checked', () => {
    const checkwrapper = render(<Toggle checked />);
    expect(checkwrapper).toMatchSnapshot();

    const unCheckwrapper = render(<Toggle checked={false} />);
    expect(unCheckwrapper).toMatchSnapshot();
  });

  it('should render correctlly set checkedText and unCheckedText', () => {
    const wrapper = render(<Toggle checkedText="on" unCheckedText="off" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have called handle change on click', async () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Toggle checked onChange={handleChange} />);

    wrapper.simulate('click');
    expect(handleChange).toHaveBeenCalled();
  });

  it('should change checked status by onchange', () => {
    class Test extends Component {
      state = {
        checked: true,
      };

      handleChange = checked => {
        this.setState({ checked });
      };

      render() {
        return <Toggle checked={this.state.checked} onChange={this.handleChange} />;
      }
    }
    const wrapper = mount(<Test />);
    wrapper.simulate('click');
    expect(wrapper.state().checked).toBeFalsy();
  });

  it('should call before change on exits', () => {
    const handleChange = jest.fn();
    const handleBeforeChange = jest.fn();

    const wrapper = mount(<Toggle onChange={handleChange} onBeforeChange={handleBeforeChange} />);
    wrapper.find('button').simulate('click');

    expect(handleBeforeChange).toHaveBeenCalled();
  });

  it('should not changed status when toogle is disabled', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Toggle disabled onChange={handleChange} />);

    wrapper.simulate('click');

    expect(handleChange).not.toHaveBeenCalled();
  });
});
