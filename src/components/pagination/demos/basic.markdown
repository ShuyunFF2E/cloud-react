---
order: 1
title: 分页基础用法
desc: 基础分页。
---

````javascript
import React from 'react';
import Pagination from 'ccms-components-react/pagination';


export default class PaginationDemo extends React.Component {

	render() {
		return (
			<>
				<h3>版本1</h3>
				<Pagination
					current={1}
					total={50}
					version="past"
					showQuickJumper={true}
					showPageSizeOptions={true}
					/>
				<h3>版本2</h3>
				<Pagination
					current={1}
					total={50}
				/>
			</>
		);
	}
}
````
