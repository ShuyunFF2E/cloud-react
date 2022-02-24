/* eslint-disable */

import React, { Component, cloneElement } from 'react';
import  CascaderMenu from './cascader'
import Icon from '../icon';
import  Input from '../input'
import PropTypes from 'prop-types';
import './index.less';

class Cascader extends Component {
	wrapperRef = React.createRef();
	state = {
    inputValue: '',
		open: false,
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
	onPopupVisibleChange =(visible) => {
		this.setState({
      open: visible
    });
	}
	iconClick = () => {
		this.wrapperRef.current.onFocus()
	}
	render() {
		const {splitInput,onChange,...props} = this.props
		const iconClasses =this.state.open ? `${props.prefixCls}-open` : `${props.prefixCls}-close`
		const iconClass = `${props.prefixCls}-select-icon`
    return (
      <CascaderMenu {...props} onChange={this.onChange} onPopupVisibleChange={this.onPopupVisibleChange} className={iconClasses}>
        <span>
					<Input value={this.state.inputValue}  ref={this.wrapperRef} readOnly disabled={this.props.disabled} suffix={<Icon type="down" style={{	cursor: 'pointer',fontSize:'14px'}} className={iconClass} onClick={this.iconClick}/>}/>
				</span>
      </CascaderMenu>
    );
  }
}
Cascader.defaultProps = {
	onChange() {},
	disabled: false,
	transitionName: '',
	defaultValue:[],
	prefixCls: 'cloud-cascader',
	popupClassName: '',
	popupPlacement: 'bottomLeft',
	expandTrigger: 'click',
	fieldNames: { label: 'label', value: 'value', children: 'children' },
	expandIcon: <Icon type="right" style={{fontSize:'14px'}}/>,
	splitInput:'/'
};

Cascader.propTypes = {
	defaultValue: PropTypes.array,
	options: PropTypes.array.isRequired,
	splitInput: PropTypes.String
};

export default Cascader;
