import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import Tree from '../tree';
import Button from '../button';
import { selector } from './const';

import './index.less';

class TreeContainer extends React.Component {

	get buttons() {
		const { okBtnText, cancelBtnText, resetBtnText, onOk, onCancel, onReset } = this.props;
		return {
			ok: <Button type="primary" size="small" key="ok" className="btn" onClick={onOk}>{ okBtnText }</Button>,
			cancel: <Button size="small" className="btn" key="cancel" onClick={onCancel}>{ cancelBtnText }</Button>,
			reset: <Button size="small" className="btn" key="reset" onClick={onReset}>{ resetBtnText }</Button>
		}
	}

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
			footerTypes,
			dropdownClassName,
			dropdownStyle,
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

					<div className={`${selector}-operate-btn`}>
						{
							footerTypes.map(v=> this.buttons[v])
						}
					</div>
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
	resetBtnText: PropTypes.string,
	footerTypes: PropTypes.array,
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
	okBtnText: '确定',
	cancelBtnText: '取消',
	resetBtnText: '重置',
	footerTypes: ['ok', 'cancel'],
	dropdownClassName: '',
	dropdownStyle: {},
	onOk: () => {},
	onCancel: () => {},
}

export default TreeContainer;
