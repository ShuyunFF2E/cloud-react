---
order: 3
title: 改变
desc: 改变每页显示条目数
---

````javascript
import React from 'react';
import Pagination from 'ccms-components-react/pagination';


export default class PaginationDemo extends React.Component {

	render() {
		return (
			<>
				<Pagination
					current={1}
					total={500}
					showPageSizeOptions={true}
					style={{marginBottom: '20'}}
				/>
				<Pagination
					current={1}
					total={500}
					showPageSizeOptions={true}
					pageSizeOptions={[100,200,300]}
				/>
			</>
		);
	}
}
````
