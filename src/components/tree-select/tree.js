import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import Tree from '../tree';
import Button from '../button';
import { selector } from './const';

import './index.less';

const ConfirmBtn = ({ onOk, onCancel, okBtnText, cancelBtnText }) => {
	return (
		<div className={`${selector}-operate-btn`}>
			<Button type="primary" size="small" className="btn" onClick={onOk}>{ okBtnText }</Button>
			<Button size="small" className="btn" onClick={onCancel}>{ cancelBtnText }</Button>
		</div>
	)
}

class TreeContainer extends React.Component {

	selectNode = (node, selectedNodes) => {
		this.props.onChange(node, selectedNodes);
	}

	render() {
		const {
			dataSource,
			multiple,
			searchable,
			value,
			hasConfirmButton,
			okBtnText,
			cancelBtnText,
			dropdownClassName,
			dropdownStyle,
			onOk,
			onCancel,
			...otherProps
		} = this.props;
		const classNames = cls(`${selector}-options`, dropdownClassName, {
			[`${selector}-options-confirm`]: hasConfirmButton
		});
		return (
			<div className={classNames} style={dropdownStyle}>
				<Tree
					{...otherProps}
					supportSearch={searchable}
					selectedValue={value}
					onSelectedNode={this.selectNode}
					treeData={dataSource}
					supportCheckbox={multiple} />
				{
					hasConfirmButton &&
					<ConfirmBtn
						onOk={onOk}
						onCancel={onCancel}
						okBtnText={okBtnText}
						cancelBtnText={cancelBtnText} />
				}
			</div>
		)
	}
}

TreeContainer.propTypes = {
	dataSource: PropTypes.array,
	multiple: PropTypes.bool,
	searchable: PropTypes.bool,
	hasConfirmButton: PropTypes.bool,
	okBtnText: PropTypes.string,
	cancelBtnText: PropTypes.string,
	dropdownClassName: PropTypes.string,
	dropdownStyle: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
}

TreeContainer.defaultProps = {
	dataSource: [],
	multiple: false,
	searchable: false,
	hasConfirmButton: false,
	okBtnText: '',
	cancelBtnText: '',
	dropdownClassName: '',
	dropdownStyle: {},
	onOk: () => {},
	onCancel: () => {},
}

export default TreeContainer;
