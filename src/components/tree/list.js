/**
 * 树列表
 * list.js
 * wangbo
 * 2019-07-02
 */

import React, { Component } from 'react';
import Node from './node';

class List extends Component{
	render() {
		const { data } = this.props;
		return(
			!data.length ? null : <div className="tree-list">
				{
					data.map(node => {
						return (
							<li key={node.id}>
								<Node data={node}>
									<List data={node.children}/>
								</Node>
							</li>
						)
					})
				}
			</div>
		);
	}
}

export default List;
