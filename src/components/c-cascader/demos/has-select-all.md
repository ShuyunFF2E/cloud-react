---
order: 1
title: 级联选择器
desc: 全选
---

```jsx

import React, { useState } from 'react';
import { CCascader } from 'cloud-react';
const addressOptions = [{
  label: '贵州 - 黔西南布依族苗族自治州',
  value: 'fj',
  children: [{
    label: '福州',
    value: 'fuzhou',
    children: [{
      label: '马尾',
      value: 'mawei',
    },{
      label: '马尾1',
      value: 'mawei1',
    }],
  }, {
    label: '泉州',
    value: 'quanzhou',
  }],
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
	const [ value, setValue ] = useState([['zj']]);
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
    console.log(value, 'onChange');
	}

	const filter = (inputValue, path) => {
		return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	}

	return (
		<div>
			<div style={{ marginBottom: 24 }}>多选级联组件</div>
			<CCascader
                hasSelectAll
				options={addressOptions}
				onChange={onChange}
				placeholder="Please select"
				value={value}
				multiple
        allowClear
				showSearch={{ filter: filter }}
				maxTagCount={1}/>
		</div>
    );
}
```
