---
order: 6
title: 静态数据
desc: 通过静态数据渲染方式介绍
---

````javascript
import React, { Component } from 'react';
import Table from 'ccms-components-react/table';

// 唯一标识符，该值不允许重复
const gridManagerName = 'static-table';
const response = {
    "data":[
        {
            "id": 1,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序",
            "operation": "修改"
        },
        {
             "id": 2,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序",
            "operation": "修改"
        },
        {
             "id": 3,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序",
            "operation": "修改"
        },
        {
             "id": 4,
            "name": "baukh",
            "age": "28",
            "createDate": "2015-03-12",
            "info": "野生前端程序",
            "operation": "修改"
        }
    ],
    "totals": 4
};
const columnData = [
	{
		key: 'name',
		remind: 'the username',
		width: '200px',
		text: 'username'
	},{
		key: 'age',
		remind: 'the age',
		width: '200px',
		text: 'age'
	},{
		key: 'createDate',
		remind: 'the createDate',
		width: '200px',
		text: 'createDate'
	},{
		key: 'info',
		remind: 'the info',
		text: 'info'
    }
];
export default class TableDemo extends Component {
	render() {
		return (
			<Table
				gridManagerName={gridManagerName}
				ajaxData={response}
				columnData={columnData}
				height={'100%'}
			/>
		);
	}
}

````
