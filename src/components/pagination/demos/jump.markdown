---
order: 4
title: 跳转
desc: 快速跳转到某一页
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
					showQuickJumper={true}
				/>
			</>
		);
	}
}
````
