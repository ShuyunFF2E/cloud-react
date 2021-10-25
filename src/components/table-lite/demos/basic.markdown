---
order: 1
title: 基础用法
desc: 最基本的一个表格
---

```javascript
import React, { Component } from 'react';
import { TableLite } from 'cloud-react';

const columnData =  [
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
let dataSource = [{
	  "name": "lazyperson",
	  "pic": "https://avatars3.githubusercontent.com/u/18607584?s=460&v=4",
	  "like": "打杂",
	  "github": "https://github.com/lazyperson",
	  "id": 1
  },
  {
	  "name": "seawind8888",
	  "pic": "https://avatars.githubusercontent.com/u/16148014?v=4",
	  "like": "撸猫",
	  "github": "https://github.com/seawind8888",
	  "id": 2
  },
  {
	  "name": "xtfan21",
	  "pic": "https://avatars3.githubusercontent.com/u/23092282?s=60&v=4",
	  "like": "旅游",
	  "github": "https://github.com/xtfan21",
	  "id": 3
  },
  {
	  "name": "heriky",
	  "pic": "https://avatars1.githubusercontent.com/u/12195736?s=460&v=4",
	  "like": "Coding",
	  "github": "https://github.com/heriky",
	  "id": 4
  },
  {
	  "name": "runrunlolz",
	  "pic": "https://avatars0.githubusercontent.com/u/20176682?s=60&v=4",
	  "like": "赚钱",
	  "github": "https://github.com/runrunlolz",
	  "id": 5
  },
  {
	  "name": "greria",
	  "pic": "https://avatars3.githubusercontent.com/u/16697576?s=400&v=4",
	  "like": "K歌",
	  "github": "https://github.com/greria",
	  "id": 6
  },
  {
	  "name": "liyuan-meng",
	  "pic": "https://avatars1.githubusercontent.com/u/34151318?s=60&v=4",
	  "like": "K歌",
	  "github": "https://github.com/liyuan-meng",
	  "id": 7
  },
  {
	  "name": "zj251",
	  "pic": "https://avatars.githubusercontent.com/u/41313132?v=4",
	  "like": "逛街",
	  "github": "https://github.com/zj251",
	  "id": 8
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
	  "id": 10
  },
  {
	  "name": "jsonliu6",
	  "pic": "https://avatars1.githubusercontent.com/u/15153054?s=460&v=4",
	  "like": "红烧肉",
	  "github": "https://github.com/jsonliu6",
	  "id": 11
  },
  {
	  "name": "fengjingxuan8",
	  "pic": "https://avatars.githubusercontent.com/u/12249595?v=4",
	  "like": "旅游",
	  "github": "https://github.com/fengjingxuan8",
	  "id": 12
  },
  {
	  "name": "rookie125",
	  "pic": "https://avatars3.githubusercontent.com/u/11306273?s=60&v=4",
	  "like": "Coding",
	  "github": "https://github.com/rookie125",
	  "id": 13
  },
  {
	  "name": "baukh789",
	  "pic": "https://avatars3.githubusercontent.com/u/11342827?s=60&v=4",
	  "like": "开车",
	  "github": "https://github.com/baukh789",
	  "id": 14
  },
  {
	  "name": "silence717",
	  "pic": "https://avatars0.githubusercontent.com/u/8267830?s=60&v=4",
	  "like": "炒饭",
	  "github": "https://github.com/silence717",
	  "id": 15
  },
  {
	  "name": "BoWang816",
	  "pic": "https://avatars0.githubusercontent.com/u/26587649?s=60&v=4",
	  "like": "Coding",
	  "github": "https://github.com/BoWang816",
	  "id": 16
  },
]

export default class IconDemo extends Component {
	constructor() {
		super();
		this.state = {
			dataSource
		};
	}

	render() {
		const { dataSource } = this.state;
		return <TableLite height={300} dataSource={dataSource} columnData={columnData} />;
	}
}
```

```less
.demo-github {
	display: block;
	.demo-pic {
		vertical-align: middle;
		margin-right: 10px;
		width: 50px;
		border-radius: 10px;
	}
	.demo-username {
		font-size: 14px;
	}
}
```
