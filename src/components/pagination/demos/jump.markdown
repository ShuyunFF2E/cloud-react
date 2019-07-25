---
order: 4
title: 跳转
desc: 快速跳转到某一页
---

````javascript
import React from 'react';
import Pagination from 'ccms-components-react/pagination';


export default class PaginationDemo extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			showPageSizeOptions: true,
			current:1,
			pageSize:150
		}
	}

	onChange = (current)=> {
		this.setState({
			current
		})
	}

	onShowSizeChange = (current, pageSize)=> {
		console.log('onShowSizeChange:',current, pageSize)
		this.setState({
			current,
			pageSize
		})
	}

	render() {
		return (
			<>
				<Pagination
					onChange={this.onChange}
					onShowSizeChange={this.onShowSizeChange}
					current={this.state.current}
					total={500}
					pageSize={this.state.pageSize}
					pageSizeOptions={[100,200,300]}
					showPageSizeOptions={this.state.showPageSizeOptions}
					showQuickJumper={true}
				/>
			</>
		);
	}
}
````
