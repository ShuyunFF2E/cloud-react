---
order: 2
title: 分页基础用法
desc: 更多分页
---

````javascript
import React from 'react';
import Pagination from 'ccms-components-react/pagination';


export default class PaginationDemo extends React.Component {

	render() {
		return (
			<>
				<Pagination
					current={5}
					total={500}
				/>
			</>
		);
	}
}
````
