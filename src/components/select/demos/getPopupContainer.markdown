---
order: 9
title: 设置下拉菜单渲染父节点
desc: 如果发现下拉菜单被挡住，可以尝试修改定位父元素
---

```javascript
import React from 'react';
import Select from 'cloud-react/select';

const Option = Select.Option;

const dataList = [
	{
		label: '苹果',
		value: 'apple'
	}
];

export default function SelectDemo() {
	const handleChange = value => {
		console.log(value);
	};

	return (
		<div style={{ height: 100, overflow: 'scroll' }}>
			<span>滚动区域</span>
			<div style={{ height: 300, position: 'relative' }} id="test">
				<Select
					placeholder="请选择..."
					defaultValue="litchi"
					getPopupContainer={() => document.getElementById('test')}
					onChange={handleChange}
				>
					{dataList.map((item, index) => (
						<Option value={item.value} key={index}>
							{item.label}
						</Option>
					))}
				</Select>
			</div>
		</div>
	);
}
```
