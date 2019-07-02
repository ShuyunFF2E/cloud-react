---
order: 2
title: 自定义下拉宽度
desc: 自定义选择框宽度，可选择区域在最大宽度范围内根据选项最大宽度决定宽度
---

````javascript
import React, { useState } from 'react';
import Select from 'ccms-components-react/select';
import Button from 'ccms-components-react/button';

const Option = Select.Option;

const dataList = [{
  label: '苹果',
  value: 'apple'
}, {
  label: '草莓',
  value: 'strawberry'
}, {
  label: '特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项',
  value: 'long'
}]

export default function SelectDemo() {
  const [width, setWidth] = useState(100);

  const onClick = () => setWidth(width + 20);

  return (
    <div>
      <Select 
        placeholder="请选择..."
        defaultValue="apple"
        width={width}
        style={{ marginBottom: '10px' }}>
        {
          dataList.map((item, index) => (
            <Option value={item.value} key={index} >{item.label}</Option>
          ))
        }
      </Select>
      <Button type="primary" onClick={onClick}>修改宽度</Button>
    </div>
  )
}
````
