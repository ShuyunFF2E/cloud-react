---
order: 1
title: 基本使用
desc: 基础使用
---

```jsx
import React from 'react';
import { TreeSelect } from 'cloud-react';

const treeData = [
	{
		label: '栗子',
		value: 'apple',
		children: [
			{
				label: '栗子1',
				value: 'litchi',
                children: [
                    {
                        label: '栗子11',
                        value: 'litchi1',
                        children: [
                            {
                                label: '栗子111',
                                value: 'litchi11',
                            }
                        ]
                    }
                ]
			}
		]
	},
	{
		label: '草莓',
		value: 'caomei',
		children: [
			{
				label: '栗子',
				value: 'lizi'
			}
		]
	}
];

class TreeSelectDemo extends React.Component {

	handleChange = node => {
		// console.log(node);
	};

	handleSearch = (value, nodes) => {
		// console.log(value, nodes);
	};

	render() {

		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                {/*<h5>单选搜索框在下拉框内</h5>*/}
                <TreeSelect
                  searchable
                  allowClear
                  onSearch={this.handleSearch}
                  value={{
                    label: '栗子111',
                    value: 'litchi11',
                  }}
                  placeholder="选择一个选项"
                  searchPlaceholder="搜索一个选项"
                  dataSource={treeData}
                  onChange={this.handleChange}
                />
              </div>
              {/*<div>*/}
              {/*  <h5>单选搜索框在下拉框外（新）</h5>*/}
              {/*  <TreeSelect*/}
              {/*    searchInBox*/}
              {/*    searchable*/}
              {/*    allowClear*/}
              {/*    onSearch={this.handleSearch}*/}
              {/*    value={{*/}
              {/*      label: '栗子111',*/}
              {/*      value: 'litchi11',*/}
              {/*    }}*/}
              {/*    placeholder="选择一个选项"*/}
              {/*    searchPlaceholder="搜索一个选项"*/}
              {/*    dataSource={treeData}*/}
              {/*    onChange={this.handleChange}*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
		);
	}
}

export default TreeSelectDemo;
```
