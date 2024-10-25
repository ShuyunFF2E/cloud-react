/* eslint-disable */
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@utils';

import Tree from '../../tree';
import Button from '../../button';
import { selector, MULTIPLE } from '../const';

import '../index.less';

const OptionsEmpty = ({ emptyRender, ...props }) => {
	return (
		<div className={`${selector}-empty-options`} {...props}>
			{' '}
			{emptyRender}{' '}
		</div>
	);
};
class TreeContainer extends React.Component {
	get buttons() {
		const { okBtnText, cancelBtnText, resetBtnText, onOk, onCancel, onReset } = this.props;
		return {
			ok: (
				<Button type="primary" size="small" key="ok" className="btn" onClick={onOk}>
					{okBtnText}
				</Button>
			),
			cancel: (
				<Button type="secondary" size="small" className="btn" key="cancel" onClick={onCancel}>
					{cancelBtnText}
				</Button>
			),
			reset: (
				<Button type="secondary" size="small" className="btn" key="reset" onClick={onReset}>
					{resetBtnText}
				</Button>
			)
		};
	}

	selectNode = (node, selectedNodes) => {
		this.props.onChange(node, selectedNodes);
	};

	render() {
		const {
			dataSource,
			type,
			searchable,
			value,
			hasConfirmButton,
			footerTypes,
			dropdownClassName,
			dropdownStyle,
			style,
			emptyRender,
			...otherProps
		} = this.props;
		const classNames = cls(`${selector}-options`, dropdownClassName, {
			[`${selector}-options-confirm`]: hasConfirmButton
		});
		return (
			<div className={classNames} style={dropdownStyle}>
				{dataSource.length > 0 && (
					<Tree
						{...otherProps}
						ref={this.props.treeRef}
						supportSearch={false}
						selectedValue={Array.isArray(value) ? value : (value?.id ? [value] : [])}
						onSelectedNode={this.selectNode}
						treeData={dataSource}
						supportCheckbox={type === MULTIPLE}
					/>
				)}
				{hasConfirmButton && <div className={`${selector}-operate-btn`}>{footerTypes.map(v => this.buttons[v])}</div>}
				{!dataSource.length && <OptionsEmpty emptyRender={emptyRender} />}
			</div>
		);
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
	setTreeRef: PropTypes.func,
};

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
	onOk: noop,
	onCancel: noop,
	setTreeRef: noop,
};

export default TreeContainer;
