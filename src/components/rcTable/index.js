import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'rc-table';
import classnames from 'classnames';
import { prefixCls, noop } from '@utils';
import { getDataSource } from './util';
import Icon from '../icon';
import './index.less';

const tablePrefixCls = `${prefixCls}-table`;

const ExpandIcon = props => {
	return (
		<Icon
			className={`${tablePrefixCls}-expend-icon`}
			type={props.expanded ? 'down' : 'right'}
			onClick={e => {
				props.onExpand(props.record, e);
			}}
		/>
	);
};

const RcTable = props => {
	const { columnData, ajaxData, style, bordered, size, supportExpend, expandable } = props;

	const ref = useRef();

	const [dataSource, setDataSource] = useState([]);
	useEffect(() => {
		setDataSource(getDataSource(ajaxData, {}));
	}, [ajaxData]);

	const [headHeight, setHeadHeight] = useState(0);
	useEffect(() => {
		if (ref.current && ref.current.querySelector) {
			const headerEle = ref.current.querySelector(`.${tablePrefixCls}-thead`);
			setHeadHeight(headerEle.offsetHeight || 0);
		}
	}, []);

	return (
		<div
			className={classnames(`${tablePrefixCls}-box`, {
				[`${tablePrefixCls}-${size}`]: true,
				[`${tablePrefixCls}-bordered`]: bordered
			})}
			style={style}
			ref={ref}>
			<Table
				prefixCls={tablePrefixCls}
				columns={columnData}
				data={dataSource}
				scroll={{ x: '100%', y: `calc(100% - ${headHeight}px)` }}
				expandable={
					supportExpend
						? {
								expandRowByClick: true,
								expandIcon: ExpandIcon,
								onExpand: args => {
									if (props.onExpand) {
										props.onExpand(args);
									}
								},
								expandedRowRender: args => {
									if (props.expandedRowRender) {
										return props.expandedRowRender(args);
									}
									return null;
								},
								...expandable
						  }
						: {}
				}
				// summary={() => (
				//     <Table.Summary fixed={scrollY}>
				//         <Table.Summary.Row>
				//             <Table.Summary.Cell index={0} />
				//             <Table.Summary.Cell index={1} colSpan={2}>
				//                 Summary
				//             </Table.Summary.Cell>
				//             <Table.Summary.Cell index={3} colSpan={8}>
				//                 Content
				//             </Table.Summary.Cell>
				//             <Table.Summary.Cell index={11} colSpan={2}>
				//                 Right
				//             </Table.Summary.Cell>
				//         </Table.Summary.Row>
				//     </Table.Summary>
				// )}
			/>
		</div>
	);
};

export default RcTable;

RcTable.propTypes = {
	ajaxData: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
	columnData: PropTypes.array.isRequired,
	bordered: PropTypes.bool,
	size: PropTypes.oneOf(['default', 'small']),
	style: PropTypes.object,
	supportExpend: PropTypes.bool,
	onExpand: PropTypes.func,
	expandedRowRender: PropTypes.func,
	expandable: PropTypes.object
};

RcTable.defaultProps = {
	bordered: false,
	size: 'default',
	style: {},
	supportExpend: false,
	onExpand: noop,
	expandedRowRender: noop,
	expandable: {}
};
