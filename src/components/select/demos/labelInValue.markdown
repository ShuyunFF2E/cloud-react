---
order: 5
title: 获取选项的文本
desc: 默认情况下onChange只能拿到value，添加labelInValue属性后onChange等函数中拿到的value会变成由label、value组成的对象
---

````javascript
import React from 'react';
import Select from 'cloud-react/select';

const Option = Select.Option;

const dataList = [{
  label: '苹果',
  value: 'apple'
}, {
  label: '草莓',
  value: 'strawberry'
}]

export default function SelectDemo() {
  const handleChange = value => {
    console.log(value);
  }

	return (
    <Select
      labelInValue
      placeholder="请选择..."
      defaultValue="litchi"
      onChange={handleChange}>
      {
        dataList.map((item, index) => (
          <Option value={item.value} key={index} >{item.label}</Option>
        ))
      }
    </Select>
  )
}
````
