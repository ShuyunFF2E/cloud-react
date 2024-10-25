---
order: 1
title: Transfer
desc: 默认样式
---

```jsx

/**
 * title: 基础用法
 * desc: 通过 oneWay 将 Transfer 转为单向样式。
 */
import React, { useState, useMemo } from 'react';
import { Transfer } from 'cloud-react';

const titles = ['标题1', '标题2'];
export default function TransferDemo() {
	const [ value, setValue ] = useState([1, 5]);

  const data = useMemo(() => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      data.push({
        key: i,
        label: `内容${i}`,
        disabled: false
      });
    }
    return data;
  }, []);

 const handleChange = (value, a, currentValue) => {
    console.log(value, a, currentValue, '----');

	  setValue(value);
  }

  return (
		<Transfer
      filterable
			data={data}
			titles={titles}
			value={value}
			onChange={handleChange}
			oneWay
			 />
    )
}
```

