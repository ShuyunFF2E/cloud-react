import React, { Component } from 'react';
import classNames from 'classnames';
import Node from './node';

class List extends Component {
	render() {
		const { data, prefixCls } = this.props;
		return !data.length ? null : (
			<div className={classNames(`${prefixCls}-list`)}>
				{data.map(node => {
					return (
						<li key={node.id}>
							<Node data={node} prefixCls={prefixCls}>
								<List data={node.children} prefixCls={prefixCls} />
							</Node>
						</li>
					);
				})}
			</div>
		);
	}
}

export default List;
