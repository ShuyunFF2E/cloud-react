---
order: 2
title: 静态数据
desc: 通过静态数据渲染方式介绍
---

````javascript
import React, { Component } from 'react';
import { Table } from 'cloud-react';

// 唯一标识符，该值不允许重复
const gridManagerName = 'static-table';
const response = {
    "data":[
        {
            name: 'rookie125',
            pic: 'https://avatars3.githubusercontent.com/u/11306273?s=60&v=4',
            components: [
                'Form', 'Button', 'Input'
            ],
            other: [
                '文档化搭建'
            ]
        },
        {
            name: 'silence717',
            pic: 'https://avatars0.githubusercontent.com/u/8267830?s=60&v=4',
	        components: [
	            'Upload', 'Toggle'
	        ],
            other: [
                '前端架构', '样式整改'
            ]
        },
        {
            name: 'baukh789',
            pic: 'https://avatars3.githubusercontent.com/u/11342827?s=60&v=4',
	        components: [
	            'Icon', 'Table'
	        ],
            other: [
                '服务器搭建', 'CI'
            ]
        },
        {
            name: 'lazyperson',
            pic: 'https://avatars3.githubusercontent.com/u/18607584?s=460&v=4',
	        components: [
	            'DatePicker', 'InputNumber'
	        ]
        },
        {
            name: 'xtfan21',
            pic: 'https://avatars3.githubusercontent.com/u/23092282?s=60&v=4',
	        components: [
	            'Tree', 'Modal'
	        ]
        },
        {
            name: 'BoWang816',
            pic: 'https://avatars0.githubusercontent.com/u/26587649?s=60&v=4',
	        components: [
	            'Message', 'Tips'
	        ]
        },
        {
            name: 'heriky',
            pic: 'https://avatars1.githubusercontent.com/u/12195736?s=460&v=4',
            components: [
                'Tabs'
            ]
        },
        {
            name: 'runrunlolz',
            pic: 'https://avatars0.githubusercontent.com/u/20176682?s=60&v=4',
	        components: [
	            'Tooltip'
	        ]
        },
        {
            name: 'greria',
            pic: 'https://avatars3.githubusercontent.com/u/16697576?s=400&v=4',
            components: [
                'Select'
            ]
        },
		{
			name: 'liyuan-meng',
			pic: 'https://avatars1.githubusercontent.com/u/34151318?s=60&v=4',
	        components: [
	            'Checkbox'
	        ]
		},
		{
			name: 'wwELi',
			pic: 'https://avatars1.githubusercontent.com/u/22408704?s=60&v=4',
			components: [
				'Radio'
			]
		},
		{
			name: 'DongWJ',
			pic: 'https://avatars0.githubusercontent.com/u/24518633?s=60&v=4',
            components: [
                'Loading'
            ]
		},
		{
			name: 'liyuan-meng',
			pic: 'https://avatars1.githubusercontent.com/u/34151318?s=60&v=4',
	        components: [
	            'Checkbox'
	        ]
		},
        {
            name: 'jsonliu6',
            pic: 'https://avatars1.githubusercontent.com/u/15153054?s=460&v=4',
            components: [
                'Tag'
            ]
        }
    ],
    "totals": 14
};
const columnData = [
	{
		key: 'name',
		remind: '参与人，可点击进入参与人的github',
		width: '200px',
		text: '参与人',
		template: (name, rowData) => {
		    return (
		        <a className="demo-github" href={'https://github.com/' + name} target="_black">
		            <img className="demo-pic" src={rowData.pic}/>
		            <span className="demo-username">{name}</span>
		        </a>
		    );
		}
	},{
		key: 'components',
		remind: '参与开发的组件',
		text: '参与组件',
		template: components => {
			return components ? components.join(', ') : '--';
		}
	},{
		key: 'other',
		remind: '参与人对组件库的其它贡献',
		text: '其它贡献',
		align: 'center',
        template: other => {
			return other ? other.join(', ') : '--';
        }
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

```less
.demo-github{
	display: block;
	.demo-pic {
	    vertical-align: middle;
	    margin-right: 10px;
	    width: 50px;
        border-radius: 10px;
	}
	.demo-username{
		font-size: 14px;
	}
}
```
