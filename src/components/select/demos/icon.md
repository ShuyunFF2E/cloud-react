---
order: 8
title: 定制化选项
desc: 定制化选项
---

```jsx
/**
 * title: 带图标
 * desc: 带图标
 */
import React from 'react';
import { Select, Icon } from 'cloud-react';

const Option = Select.Option;

const dataList = [
  {
    label: 'React',
    value: 1,
    img: 'https://brand-guide.shuyun.com/IAM/52e939494f3b.png'
  },
  {
    label: 'Vue',
    value: 2,
    img: 'https://brand-guide.shuyun.com/IAM/52e939494f3b.png'
  },
  {
    label: 'Angular',
    value: 3,
    img: 'https://brand-guide.shuyun.com/IAM/52e939494f3b.png'
  },
  {
    label: 'Jquery',
    value: 4,
    img: 'https://brand-guide.shuyun.com/IAM/52e939494f3b.png'
  },
];

export default function SelectDemo() {
  const onOk = (value, prevValue) => {
    console.log('select --- ' + value);
    console.log('prevSelect --- ' + prevValue);
  };



  return (
      <div>
        <h5>使用 ImageText 组件（推荐使用）</h5>
        <Select
          allowClear
          searchable
          supportLightText
          defaultValue={3}
          style={{ width: 328, marginRight: 8, marginBottom: 10 }}
          dataSource={dataList}
          optionRender={(item, index, searchProps) => {
            return (
              <Select.ImageText
                icon={<Icon type="config" style={{ fontSize: 12, marginRight: 5 }} />}
                label={item.label}
                disabled={item.disabled}
                {...searchProps}
              />
            )
          }}
        />
        <Select
          allowClear
          searchable
          supportLightText
          multiple
          defaultValue={[3]}
          style={{ width: 328, marginRight: 8, marginBottom: 10 }}
          dataSource={dataList}
          optionRender={(item, index, searchProps) => {
            return (
              <Select.ImageText
                icon={<Icon type="config" style={{ fontSize: 12, marginRight: 5 }} />}
                label={item.label}
                disabled={item.disabled}
                {...searchProps}
              />
            )
          }}
        />
        <h5>自定义模板</h5>
        <Select
          allowClear
          style={{ width: 328, marginRight: 8, marginBottom: 10 }}
          placeholder="请选择"
          value={[4]}
          searchable
          supportLightText
        >
          <Option value="">不限</Option>
          {dataList.map((item, index) => (
            <Option value={item.value} disabled={item.disabled} key={index}>
              <Icon type="config" style={{ fontSize: 12, marginRight: 5 }} />
              {item.label}
            </Option>
          ))}
        </Select>
        <Select
          allowClear
          multiple
          dataSource={dataList}
          style={{ width: 328 }}
          placeholder="请选择"
          value={[4]}
          searchable
          supportLightText
        >
          {dataList.map((item, index) => (
            <Option value={item.value} disabled={item.disabled} key={index}>
              <Icon type="config" style={{ fontSize: 12, marginRight: 5 }} />{item.label}
            </Option>
          ))}
        </Select>
      </div>
  );
}
```
