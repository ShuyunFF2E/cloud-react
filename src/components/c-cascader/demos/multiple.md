---
order: 1
title: 级联选择器
desc: 多选级联组件
---

```jsx

import React, { useState } from 'react';
import { CCascader } from 'cloud-react';
const addressOptions = [{
  label: '福建',
  value: 'fj',
  children: [{
    label: '福州',
    value: 'fuzhou',
    children: [{
      label: '马尾',
      value: 'mawei',
    }],
  }, {
    label: '泉州',
    value: 'quanzhou',
  }],
}, {
  label: '占位1',
  value: 'zw1',
}, {
  label: '占位2',
  value: 'zw2',
}, {
  label: '占位3',
  value: 'zw3',
}, {
  label: '占位4',
  value: 'zw4',
}, {
  label: '占位5',
  value: 'zw5',
}, {
  label: '浙江',
  value: 'zj',
  children: [{
    label: '杭州',
    value: 'hangzhou',
    children: [{
      label: '余杭',
      value: 'yuhang',
    }],
  }],
}, {
  label: '北京',
  value: 'bj',
  children: [{
    label: '朝阳区',
    value: 'chaoyang',
  }, {
    label: '海淀区',
    value: 'haidian',
  }],
}];

export default function Demo() {
	const [ value, setValue ] = useState([]);
  const maxTagCount = addressOptions.reduce((acc, item) => {
    if (item.children && item.children.length){
      acc = acc + item.children.length;
    } else {
      acc += 1;
    }
    return acc;
  }, 0)
	const onChange = value => {
		setValue(value);
	}

	const filter = (inputValue, path) => {
		return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	}
	return (
		<div>
			<div style={{ marginBottom: 24 }}>多选级联组件</div>
			<CCascader
				options={addressOptions}
				onChange={onChange}
				placeholder="Please select"
				value={value}
				multiple
				showSearch={{ filter: filter }}
				maxTagCount={1}/>
			<div style={{ marginBottom: 24, marginTop: 40 }}>多选级联组件不可用</div>
			<CCascader
				options={addressOptions}
				placeholder="Please select"
				value={value}
				disabled
				multiple
				maxTagCount={1}/>
      <div style={{ marginBottom: 24, marginTop: 40 }}>多选级联组件，全部展开</div>
			<CCascader
				options={addressOptions}
				onChange={onChange}
				placeholder="Please select"
				value={value}
				multiple
				maxTagCount={maxTagCount}/>
		</div>
    );
}
```
