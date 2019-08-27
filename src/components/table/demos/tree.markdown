---
order: 7
title: 树表格
desc: 使用树结构数据
---

````javascript
import React, { Component } from 'react';
import Table from 'ccms-components-react/table';

// 唯一标识符，该值不允许重复
const gridManagerName = 'tree-table';

const columnData = [
	{
		key: 'name',
		text: '标签'
	},{
		key: 'info',
		text: '使用说明'
	}
];

// 静态数据
const resouse = {
	"data":[
		{
			name: 'h1~h6',
			info: '用来定义 HTML 标题',
			children: [
				{
					name: 'h1',
					info: '定义重要等级最高的标题'
				},
				{
					name: 'h2',
					info: '用来定义 HTML 标题'
				},
                {
                    name: 'h3',
                    info: '用来定义 HTML 标题'
                },
                {
                    name: 'h4',
                    info: '用来定义 HTML 标题'
                },
                {
                    name: 'h5',
                    info: '用来定义 HTML 标题'
                },
                {
                    name: 'h6',
                    info: '定义重要等级最低的标题'
                }
			]
		},
		{
			name: 'a',
			info: '定义超链接，用于从一个页面链接到另一个页面'
		},
		{
			name: 'table',
			info: '定义 HTML 表格',
			children: [
				{
					name: 'thead',
					info: '用于组合 HTML 表格的表头内容',
					children: [
						{
							name: 'th',
							info: '定义 HTML 表格中的表头单元格'
						}
					]
				},
				{
					name: 'tbody',
					info: '用于组合 HTML 表格的主体内容',
					children: [
						{
							name: 'td',
							info: '定义 HTML 表格中的标准单元格'
						}
					]
				},
                {
                    name: 'tfoot',
                    info: '用于组合 HTML 表格的页脚内容'
                }
			]
		}
	],
	"totals": 3
};

export default class TableDemo extends Component {
	render() {
		const treeConfig = {
	        // 树展开操作按键所属容器，此处配置columnData的key值。未配置时，将默认选择columnData的第一项
	        insertTo: 'name',

			// 初始将所有数据展开, 默认为false
            openState: false,

            // 子节点关键字，默认为'children'
            treeKey: 'children'
        };
		return (
			<Table
				gridManagerName={gridManagerName}
				supportTreeData={true}
                treeConfig={treeConfig}
				ajaxData={resouse}
				columnData={columnData}
			/>
		);
	}
}

````
