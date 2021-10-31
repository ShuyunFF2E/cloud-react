---
order: 2
title: 静态数据
desc: 参与本项目组件开发人员信息
---

```jsx

            /**
             * title: 静态数据
             * desc: 组件当前维护者信息
             */
import React, { Component } from 'react';
import { Table, Button, Message } from 'cloud-react';

// 唯一标识符，该值不允许重复
const gridManagerName = 'static-table';
const response = {
	data: [{
			  "name": "lazyperson",
			  "pic": "https://avatars3.githubusercontent.com/u/18607584?s=460&v=4",
			  "like": "打杂",
			  "github": "https://github.com/lazyperson",
			  "priority": 1
		  },
		  {
			  "name": "seawind8888",
			  "pic": "https://avatars.githubusercontent.com/u/16148014?v=4",
			  "like": "撸猫",
			  "github": "https://github.com/seawind8888",
			  "priority": 2
		  },
		  {
			  "name": "xtfan21",
			  "pic": "https://avatars3.githubusercontent.com/u/23092282?s=60&v=4",
			  "like": "旅游",
			  "github": "https://github.com/xtfan21",
			  "priority": 3
		  },
		  {
			  "name": "heriky",
			  "pic": "https://avatars1.githubusercontent.com/u/12195736?s=460&v=4",
			  "like": "Coding",
			  "github": "https://github.com/heriky",
			  "priority": 4
		  },
		  {
			  "name": "runrunlolz",
			  "pic": "https://avatars0.githubusercontent.com/u/20176682?s=60&v=4",
			  "like": "赚钱",
			  "github": "https://github.com/runrunlolz",
			  "priority": 5
		  },
		  {
			  "name": "greria",
			  "pic": "https://avatars3.githubusercontent.com/u/16697576?s=400&v=4",
			  "like": "K歌",
			  "github": "https://github.com/greria",
			  "priority": 6
		  },
		  {
			  "name": "liyuan-meng",
			  "pic": "https://avatars1.githubusercontent.com/u/34151318?s=60&v=4",
			  "like": "K歌",
			  "github": "https://github.com/liyuan-meng",
			  "priority": 7
		  },
		  {
			  "name": "zj251",
			  "pic": "https://avatars.githubusercontent.com/u/41313132?v=4",
			  "like": "逛街",
			  "github": "https://github.com/zj251",
			  "priority": 8
		  },
		  {
			  "name": "lonerhan",
			  "pic": "https://avatars.githubusercontent.com/u/25861477?v=4",
			  "like": "Coding",
			  "github": "https://github.com/lonerhan",
			  "priority": 9
		  },
		  {
			  "name": "DongWJ",
			  "pic": "https://avatars0.githubusercontent.com/u/24518633?s=60&v=4",
			  "like": "做菜",
			  "github": "https://github.com/DongWJ",
			  "priority": 10
		  },
		  {
			  "name": "jsonliu6",
			  "pic": "https://avatars1.githubusercontent.com/u/15153054?s=460&v=4",
			  "like": "红烧肉",
			  "github": "https://github.com/jsonliu6",
			  "priority": 11
		  },
		  {
			  "name": "fengjingxuan8",
			  "pic": "https://avatars.githubusercontent.com/u/12249595?v=4",
			  "like": "旅游",
			  "github": "https://github.com/fengjingxuan8",
			  "priority": 12
		  },
		  {
			  "name": "rookie125",
			  "pic": "https://avatars3.githubusercontent.com/u/11306273?s=60&v=4",
			  "like": "Coding",
			  "github": "https://github.com/rookie125",
			  "priority": 13
		  },
		  {
			  "name": "baukh789",
			  "pic": "https://avatars3.githubusercontent.com/u/11342827?s=60&v=4",
			  "like": "开车",
			  "github": "https://github.com/baukh789",
			  "priority": 14
		  },
		  {
			  "name": "silence717",
			  "pic": "https://avatars0.githubusercontent.com/u/8267830?s=60&v=4",
			  "like": "炒饭",
			  "github": "https://github.com/silence717",
			  "priority": 15
		  },
		  {
			  "name": "BoWang816",
			  "pic": "https://avatars0.githubusercontent.com/u/26587649?s=60&v=4",
			  "like": "Coding",
			  "github": "https://github.com/BoWang816",
			  "priority": 16
		  },
	],
	totals: 16
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
					<img className="demo-pic" src={rowData.pic} />
					<span className="demo-username">{name}</span>
				</a>
			);
		}
	},
	{
		key: 'github',
		text: 'github',
		template: (name, rowData) => {
        			return (
        				<a className="demo-github" href={name} target="_black">
        					{name}
        				</a>
        			);
        		}
	},
	{
		key: 'like',
		text: '爱好',
		align: 'center'
	}
];

const moveRowConfig = {
	key: 'priority',
	handler: (list, tableData) => {
		// console.log(list, tableData);
	}
};
export default class TableDemo extends Component {
	getCheckedData() {
		console.log(Table.getCheckedData(gridManagerName));
		Message.success('操作成功，请在控制面板查看');
	}
	getTableData() {
		console.log(Table.getTableData(gridManagerName));
		Message.success('操作成功, 请在控制面板查看');
	}
	render() {
		return (
			<>
				<Table
					gridManagerName={gridManagerName}
					ajaxData={response}
					columnData={columnData}
					supportMoveRow={true}
					moveRowConfig={moveRowConfig}
					height={'100%'}
					isIconFollowText={true}
				/>
				<div className="table-action">
					<Button
						onClick={() => {
							this.getCheckedData();
						}}>
						获取选中数据
					</Button>
					<Button
						onClick={() => {
							this.getTableData();
						}}>
						获取完整数据
					</Button>
				</div>
			</>
		);
	}
}
```

