---
order: 2
title: 静态数据
desc: 通过静态数据渲染方式介绍
---

````javascript
import React, { Component } from 'react';
import Table from 'cloud-react/table';

// 唯一标识符，该值不允许重复
const gridManagerName = 'static-table';
const response = {
    "data":[
        {
            name: 'rookie125',
            pic: 'https://avatars3.githubusercontent.com/u/11306273?s=60&v=4'
        },
        {
            name: 'silence717',
            pic: 'https://avatars0.githubusercontent.com/u/8267830?s=60&v=4',
            info: '前端码农'
        },
        {
            name: 'baukh789',
            pic: 'https://avatars3.githubusercontent.com/u/11342827?s=60&v=4',
            info: '静看人世风雨 、凝聚人生魅力。'
        },
        {
            name: 'xtfan21',
            pic: 'https://avatars3.githubusercontent.com/u/23092282?s=60&v=4'
        },
        {
            name: 'BoWang816',
            pic: 'https://avatars0.githubusercontent.com/u/26587649?s=60&v=4',
            info: 'Hello，Google一下，好好学习'
        },
		{
			name: 'wwELi',
			pic: 'https://avatars1.githubusercontent.com/u/22408704?s=60&v=4'
		},
        {
            name: 'runrunlolz',
            pic: 'https://avatars0.githubusercontent.com/u/20176682?s=60&v=4'
        },
		{
			name: 'liyuan-meng',
			pic: 'https://avatars1.githubusercontent.com/u/34151318?s=60&v=4'
		},
		{
			name: 'DongWJ',
			pic: 'https://avatars0.githubusercontent.com/u/24518633?s=60&v=4'
		}
    ],
    "totals": 9
};
const columnData = [
	{
		key: 'name',
		remind: 'github pic and account',
		width: '200px',
		text: 'github',
		template: (name, rowData) => {
		    return (
		        <a className="demo-github" href={'https://github.com/' + name} target="_black">
		            <img className="demo-pic" src={rowData.pic}/>
		            <span className="demo-username">{name}</span>
		        </a>
		    );
		}
	},{
		key: 'age',
		remind: 'the age',
		width: '200px',
		text: 'age',
		template: age => {
			return age || '未知';
		}
	},{
		key: 'info',
		remind: 'the info',
		text: 'info',
        template: info => {
            return info || '这个人很懒，什么也没有留下';
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
