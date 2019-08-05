---
order: 6
title: 排序
desc: 排序使用方式介绍, 交互方式为显示移入thead区域
---

````javascript
import React, { Component } from 'react';
import Table from 'ccms-components-react/table';

// 唯一标识符，该值不允许重复
const gridManagerName = 'sort-table';
const columnData = [
	{
        key: 'title',
        remind: 'the title',
        text: '标题'
    },{
        key: 'readNumber',
        text: '阅读量',
        width: '150px',
        align: 'center'
    },{
        key: 'info',
        text: '简介',
    },{
         key: 'createDate',
         width: '130px',
         text: '创建时间',
         sorting: 'DESC',
         // 使用函数返回 htmlString
         template: (createDate, row) => {
             return (
                <span>{new Date(createDate).toLocaleDateString()}</span>
             );
         }
     }, {
         key: 'lastDate',
         width: '130px',
         text: '最后修改时间',
         sorting: '',
         // 使用函数返回 htmlString
         template: function (lastDate, row) {
             return (
                <span>{new Date(lastDate).toLocaleDateString()}</span>
             );
         }
     }
];
export default class TableDemo extends Component {
	render() {
		return (
			<Table
				gridManagerName={gridManagerName}
				ajaxData='https://www.lovejavascript.com/blogManager/getBlogList'
				ajaxType='POST'
				columnData={columnData}
				supportAjaxPage={true}
				isCombSorting={false}
				mergeSort={false}
				sortKey={'sort_'}
			/>
		);
	}
}

````
