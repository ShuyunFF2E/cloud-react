/* eslint-disable */

import React, { Component, cloneElement } from 'react';
import  CascaderMenu from './cascader'
import  Input from '../input'
import PropTypes from 'prop-types';

class Cascader extends Component {
	state = {
    inputValue: '',
  }
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		this.setState({
			inputValue:this.props.defaultValue.map(o => o.label).join(this.props.splitInput)
		})
	}
  onChange = (value, selectedOptions) => {
  
    this.setState({
      inputValue: selectedOptions.map(o => o.label).join(this.props.splitInput),
    });
		this.props.onChange(
			value, selectedOptions
		);
  }
	render() {
		const {splitInput,onChange,...props} = this.props
    return (
      <CascaderMenu {...props} onChange={this.onChange}>
        <Input value={this.state.inputValue} readOnly disabled={this.props.disabled}/>
      </CascaderMenu>
    );
  }
}
Cascader.defaultProps = {
	onChange() {},
	onPopupVisibleChange() {},
	disabled: false,
	transitionName: '',
	prefixCls: 'cloud-cascader',
	popupClassName: '',
	popupPlacement: 'bottomLeft',
	expandTrigger: 'click',
	fieldNames: { label: 'label', value: 'value', children: 'children' },
	expandIcon: '>',
	splitInput:'/'
};

Cascader.propTypes = {
	defaultValue: PropTypes.array,
	options: PropTypes.array.isRequired,
	splitInput: PropTypes.String
};

export default Cascader;
