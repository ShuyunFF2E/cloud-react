---
order: 2
title: 基本使用
desc: 基本使用
---

```jsx
/**
 * title: 基本使用
 * desc: 基本使用
 */
import React, { useState } from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [
  {
    label: 'JQuery',
    value: '1',
    desc: '描述'
  },
  {
    label: 'Vue',
    value: '2',
    desc: '描述'
  },
  {
    label: 'React',
    value: '3',
    desc: '描述'
  },
  {
    label: 'Angular',
    value: '4',
    desc: '描述'
  },
];

const groupList = [
  {
    "label":"淘宝",
    "value":"taobao",
    "options":[
      {
        "label":"淘宝店",
        "value":11,
        "desc": '2323'
      },
      {
        "label":"天猫店",
        "value":10,
        "desc": '2323'
      }
    ]
  },
  {
    "label":"京东",
    "value":"jos",
    "options":[
      {
        "label":"自营店",
        "value":20,
        "desc": '2323'
      },
      {
        "label":"非自营店",
        "value":21,
        "desc": '2323'
      }
    ]
  }
];

export default function SelectDemo() {
  const [multiDataList, setDataList] = useState(dataList);
  const handleChange = (value, prevValue) => {
    console.log('select --- ' + value);
    console.log('prevSelect --- ' + prevValue);
  };

  return (
    <div className="demo">
      <Select
        showDesc
        searchable
        defaultValue={'3'}
        onChange={handleChange}
        style={{ width: 300 }}
        dataSource={dataList}
      />
      <Select
        showDesc
        searchable
        multiple
        defaultValue={['3', '4']}
        onChange={handleChange}
        style={{ width: 300 }}
        dataSource={dataList}
      />
      <Select
        onChange={handleChange}
        style={{ width: 300 }}
        showDesc
        searchable
        dataSource={groupList}
      />
      <Select
        showDesc
        searchable
        searchInBox={false}
        defaultValue={'3'}
        onChange={handleChange}
        style={{ width: 300 }}
        dataSource={dataList}
      />
      <Select
        showDesc
        searchable
        multiple
        searchInBox={false}
        showTag={false}
        defaultValue={['3', '4']}
        onChange={handleChange}
        style={{ width: 300 }}
        dataSource={dataList}
      />
    </div>
  );
}
```
