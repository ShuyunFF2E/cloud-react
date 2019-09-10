---
order: 1
title: 基础用法
desc: 基础用法
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
}, {
  label: '荔枝',
  value: 'litchi',
  disabled: true
}, {
  label: '特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项特别特别长的选项',
  value: 'long'
}];

export default function SelectDemo() {
  const handleChange = value => {
    console.log('select --- ' + value);
  }

  const handleOpen = () => console.log('open');
  const handleClose = () => console.log('close');

  return (
      <Select
        placeholder="请选择..."
        defaultValue="litchi"
        onSelectOpen={handleOpen}
        onSelectClose={handleClose}
        onChange={handleChange}>
        {
          dataList.map((item, index) => (
            <Option value={item.value} disabled={item.disabled} key={index} >{item.label}</Option>
          ))
        }
      </Select>
    )
}
````
