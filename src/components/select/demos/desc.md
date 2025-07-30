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
import React, { useState } from "react";
import { Select } from "cloud-react";

const Option = Select.Option;

const dataList = [
  {
    label: "JQuery",
    value: "1",
    desc: "描述",
  },
  {
    label: "Vue",
    value: "2",
    desc: "描述",
  },
  {
    label: "React",
    value: "3",
    desc: "描述",
  },
  {
    label: "Angular",
    value: "4",
    desc: "描述",
  },
];

const groupList = [
  {
    label: "淘宝",
    value: "taobao",
    options: [
      {
        label: "淘宝店",
        value: 11,
        desc: "2323",
      },
      {
        label: "天猫店",
        value: 10,
        desc: "2323",
      },
    ],
  },
  {
    label: "京东",
    value: "jos",
    options: [
      {
        label: "自营店",
        value: 20,
        desc: "2323",
      },
      {
        label: "非自营店",
        value: 21,
        desc: "2323",
      },
    ],
  },
];

export default function SelectDemo() {
  const [multiDataList, setDataList] = useState(dataList);
  const handleChange = (value, prevValue) => {
    console.log("select --- " + value);
    console.log("prevSelect --- " + prevValue);
  };

  return (
    <div className="demo">
      <Select
        allowClear
        searchable
        defaultValue={"3"}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
      />
      <Select
        mode="imageText"
        allowClear
        searchable
        defaultValue={"3"}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        optionRender={(item, index) => {
          return (
            <div>
              <p>{item.label}</p>
              <p>{item.value}</p>
            </div>
          );
        }}
      />
      <Select
        allowClear
        searchable
        multiple
        defaultValue={["3", "4"]}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
      />
      <Select
        mode="imageText"
        allowClear
        searchable
        multiple
        defaultValue={["3", "4"]}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
      />
      <Select
        allowClear
        searchable
        multiple
        showTag={false}
        scrollSelected
        defaultValue={["3", "4"]}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
      />
      <Select
        mode="imageText"
        allowClear
        searchable
        multiple
        showTag={false}
        scrollSelected
        defaultValue={["3", "4"]}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
      />
      <Select
        allowClear
        onChange={handleChange}
        style={{ width: 328 }}
        searchable
        dataSource={groupList}
      />
      <Select
        mode="imageText"
        allowClear
        onChange={handleChange}
        style={{ width: 328 }}
        searchable
        dataSource={groupList}
      />
      {/*<Select*/}
      {/*  searchable*/}
      {/*  multiple*/}
      {/*  showTag={false}*/}
      {/*  defaultValue={['3', '4']}*/}
      {/*  onChange={handleChange}*/}
      {/*  style={{ width: 328 }}*/}
      {/*>*/}
      {/*  {dataList.map((item, index) => (*/}
      {/*    <Option value={item.value} disabled={item.disabled} key={index}>*/}
      {/*      <span>{item.label}</span>*/}
      {/*      <p>232323</p>*/}
      {/*    </Option>*/}
      {/*  ))}*/}
      {/*</Select>*/}
    </div>
  );
}
```
