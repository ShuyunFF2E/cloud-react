---
order: 1
title: Transfer
desc: 默认样式
---

```jsx

/**
 * title: 基础用法
 * desc: 通过 simple 将 Transfer 转为极简模式。 极简模式下，用户只能选择一个项目
 */
import React, { useState, useMemo } from 'react';
import { Transfer } from 'cloud-react';

export default function TransferDemo() {
	const [ value, setValue ] = useState([]);

  const data = useMemo(() => {
    const data = [];
    for (let i = 1; i <= 6; i++) {
      data.push({
        key: i,
        label: `内容${i}`,
        disabled: false
      });
    }
    return data;
  }, []);

  const titles = useMemo(() => {
    return ['标题1', `已选：${value.length}`];
  }, [value])

 const handleChange = (value, a, currentValue) => {
    console.log(value, a, currentValue, '----');
	  setValue(value);
  }

  return (
		<Transfer
            simple
			data={data}
			titles={titles}
			value={value}
			onChange={handleChange}
			/>
    )
}
```

