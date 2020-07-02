import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShuyunUtils from 'shuyun-utils';
import Icon from '../icon';

import './index.less';

export default class TableLite extends Component {
	static propTypes = {
		className: PropTypes.string,
		height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		dataSource: PropTypes.array,
		columnData: PropTypes.array,
		expandable: PropTypes.bool,
		childrenKey: PropTypes.string
	};

	static defaultProps = {
		height: '100%',
		dataSource: [],
		columnData: [],
		expandable: false,
		className: '',
		childrenKey: 'children'
	};

	constructor(props) {
		super(props);
		const { height, className, dataSource, columnData, expandable, childrenKey } = props;
		this.state = {
			height,
			className,
			dataSource,
			columnData,
			expandable,
			childrenKey,
			preProps: props
		};
		this.emptyText = '暂无数据';
	}

	static getDerivedStateFromProps(newProps, state) {
		if (ShuyunUtils.equal(newProps, state.preProps)) {
			return null;
		}
		const { height, className, dataSource, columnData, expandable, childrenKey } = newProps;
		return {
			height,
			className,
			dataSource,
			columnData,
			expandable,
			childrenKey,
			preProps: newProps
		};
	}

	/**
	 * 渲染: 表头
	 * @returns {*}
	 */
	renderTheadContent() {
		const { columnData, expandable } = this.state;
		return (
			<tr>
				{expandable ? <th width={40}></th> : null}
				{columnData.map(item => {
					const { text, align = 'left', width = 'auto' } = item;
					return (
						<th key={Math.random()} align={align} width={width}>
							{text}
						</th>
					);
				})}
			</tr>
		);
	}

	/**
	 * 事件: 树icon
	 * @param row
	 */
	onClickTreeAction(row) {
		const dataSource = this.state.dataSource.map(element => {
			if (element.id === row.id) {
				return {
					...element,
					rowExpandable: !row.rowExpandable
				};
			}
			return element;
		});
		this.setState(() => {
			return {
				dataSource
			};
		});
	}

	/**
	 * 渲染: tbody
	 * @returns {*}
	 */
	renderTbodyContent() {
		const { dataSource, columnData, expandable } = this.state;
		const renderTreeTd = (rowExpandable, row, children) => {
			const type = rowExpandable ? 'sub-solid' : 'plus-solid';
			return (
				<td align="center">
					{children && children.length ? (
						<Icon
							className="cloud-table-lite-tree-action"
							type={type}
							onClick={() => {
								this.onClickTreeAction(row);
							}}></Icon>
					) : null}
				</td>
			);
		};
		// 渲染tr
		const renderTr = (row, rowIndex, isChildren = false) => {
			const { rowExpandable } = row;
			const children = row[this.state.childrenKey];
			return (
				<React.Fragment key={rowIndex}>
					<tr data-is-children={isChildren}>
						{expandable ? renderTreeTd(rowExpandable, row, children) : null}
						{columnData.map((item, index) => {
							const { key, template, align = 'left' } = item;
							return (
								<td key={index.toString()} align={align}>
									{template ? template(row[key], row, index, key) : row[key]}
								</td>
							);
						})}
					</tr>
					{expandable && children && children.length && rowExpandable ? children.map((child, childIndex) => renderTr(child, childIndex, true)) : null}
				</React.Fragment>
			);
		};

		if (!dataSource.length) {
			return this.renderEmptyTemplate();
		}
		return <>{dataSource.map((item, index) => renderTr(item, index))}</>;
	}

	/**
	 * 渲染: 空模板
	 * @returns {*}
	 */
	renderEmptyTemplate() {
		const { columnData } = this.state;
		return (
			<tr className="cloud-table-lite-empty">
				<td colSpan={columnData.length}>
					<div>
						<Icon type="warning-circle-solid" />
						<span>{this.emptyText}</span>
					</div>
				</td>
			</tr>
		);
	}

	render() {
		const { height, dataSource, className } = this.state;
		const theadContent = this.renderTheadContent();
		const tbodyContent = this.renderTbodyContent();
		return (
			<div className={`cloud-table-lite-warp ${className}`} style={{ height }}>
				<div className="cloud-table-lite-header">
					<table>
						<thead>{theadContent}</thead>
					</table>
				</div>
				<div className="cloud-table-lite-main">
					<table style={{ height: dataSource.length ? 'auto' : '100%' }}>
						<thead>{theadContent}</thead>
						<tbody>{tbodyContent}</tbody>
					</table>
				</div>
			</div>
		);
	}
}
