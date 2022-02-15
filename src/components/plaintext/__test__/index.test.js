import React, { Component } from 'react';
import { render, mount } from 'enzyme';
// eslint-disable-next-line
import mountTest from '@tests/shared/mountTest';
import Plaintext from '../index';
import Icon from '../../icon';

describe('Plaintext', () => {
  mountTest(Plaintext);
  it('render correctly', () => {
    const wrapper = render(<Plaintext text="李子最美" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be plain', () => {
    const wrapper = render(<Plaintext text="李子最美呀" isPlain />);
    expect(wrapper).toMatchSnapshot();
  });

  it('viewPlainClick event correctly', () => {
    class PlaintextComponent extends Component {
      state = {
        content: '李**',
      };

      handleViewPlainClick = () => {
        this.setState({
          content: '李子最美',
        });
      };

      render() {
        return (
          <Plaintext
            text={this.state.content}
            onViewPlainClick={this.handleViewPlainClick}
          />
        );
      }
    }
    const wrapper = mount(<PlaintextComponent />);
    wrapper.find('Icon').simulate('click');
    expect(wrapper.state().content).toBe('李子最美');
  });

  it('ViewSecretClick event correctly', () => {
    class PlaintextComponent extends Component {
      state = {
        content: '李子**',
      };

      handleViewSecretClick = () => {
        this.setState({
          content: '李子不美',
        });
      };

      render() {
        return (
          <Plaintext
            text={this.state.content}
            isPlain
            onViewSecretClick={this.handleViewSecretClick}
          />
        );
      }
    }
    const wrapper = mount(<PlaintextComponent />);
    wrapper.find(Icon).simulate('click');
    expect(wrapper.state().content).toBe('李子不美');
  });
});
