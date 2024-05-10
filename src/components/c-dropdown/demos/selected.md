---
order: 1
title: 下拉菜单选择器（新）
desc: 基本用法。
---

```jsx

import React, { useState } from 'react';
import { 
	CDropdown as Dropdown,
	Icon,
	CMenu as Menu,
	Message
} from 'cloud-react';

const { Item } = Menu;

const dataList = [
  { label: '租户', id: '1' },
  { label: '客户', id: '2' },
  { label: '店铺', id: '3' },
];

class DropdownDemo extends React.Component {

    state = {
      current: '1',
      checkedId: '1',
	};

	handleMenuClick = key => {
        Message.success(`菜单Item onClick ${key}`);
    }
    onOpenChange = e => {
        console.log('收缩、展开', e)
		Message.success(`收缩、展开 ${e}`);
    }

	render() {
		const overlay = (
            <Dropdown.Menu checkedId={this.state.checkedId} onClick={id => {
              this.setState({ checkedId: id })
            }}>
              {dataList.map(item => (
                <Dropdown.Item key={item.id} id={item.id}>{item.label}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
        );
		return (
			<Dropdown
              // arrow
              placement="bottom"
              overlay={overlay}
              trigger={['click']}>
              <div>
                <span>{dataList.find(item => item.id === this.state.checkedId)?.label || '点击展示'}</span>
                <Icon type="down" />
              </div>
			</Dropdown>
		);
	}
}

export default DropdownDemo;
```
