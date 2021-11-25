import React from 'react';
import { render } from 'enzyme';
import Icon from '../index';

describe('Icon', () => {

  it('renders correctly', () => {
    const wrapper = render(<Icon type="config"/>);
    expect(wrapper).toMatchSnapshot();
  })

  it('should render correctly has style', () => {
    const style = {
      color: '#0083BA',
      fontSize: 12
    }
    const wrapper = render(<Icon type="edit" style={style}/>)
    expect(wrapper).toMatchSnapshot();
  })
});
