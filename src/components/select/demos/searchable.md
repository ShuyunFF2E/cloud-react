---
order: 5
title: 模糊搜索
desc: 可对选项进行搜索
---

```jsx
import React, { useState } from "react";
import { Select, Checkbox, Radio } from "cloud-react";

const Option = Select.Option;

const dataList = [
  {
    label: "React",
    value: "React",
  },
  {
    label: "Vue",
    value: "Vue",
  },
  {
    label: "Angular",
    value: "Angular",
  },
  {
    label: "数云",
    value: "sy",
  },
  {
    label: "选中项1",
    value: "1",
  },
  {
    label: "选中项2",
    value: "2",
  },
  {
    label:
      "选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3",
    value: "3",
  },
  {
    label: "选中项4",
    value: "4",
  },
  {
    label: "选中项5",
    value: "5",
  },
  {
    label: "选中项6",
    value: "6",
  },
];

const dataList1 = dataList.map((item) => ({
  label1: item.label,
  value1: item.value,
}));

export default function SelectDemo() {
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState("default");

  const handleChange = (value) => {
    console.log("select --- " + value);
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
      <Checkbox
        checked={disabled}
        onChange={(checked) => {
          setDisabled(checked);
        }}
      >
        禁用
      </Checkbox>
      <Radio.Group value={size} onChange={setSize} horizontal>
        <Radio value="large">large</Radio>
        <Radio value="default">default</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      <div>
        <h5>单选</h5>
        <Select
          size={size}
          searchable
          allowClear
          disabled={disabled}
          supportLightText
          placeholder="带搜索的下拉单选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList1}
          labelKey="label1"
          valueKey="value1"
        />
      </div>
      <div>
        <h5>单选-已选数据超长可滚动</h5>
        <Select
          size={size}
          searchable
          allowClear
          disabled={disabled}
          supportLightText
          placeholder="带搜索的下拉单选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList}
          scrollSelected
        />
      </div>
      <div>
        <h5>多选</h5>
        <Select
          size={size}
          hasSelectAll
          searchable
          allowClear
          disabled={disabled}
          multiple
          supportLightText
          placeholder="带搜索的下拉多选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          labelKey="name"
          valueKey="userId"
          dataSource={dataList.map((item) => ({
            name: item.label,
            userId: item.value,
          }))}
        />
      </div>
      <div>
        <h5>多选-限制标签展示数量</h5>
        <Select
          size={size}
          hasSelectAll
          searchable
          allowClear
          disabled={disabled}
          multiple
          supportLightText
          placeholder="带搜索的下拉多选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList}
          maxTagCount={5}
        />
      </div>
      <div>
        <h5>多选-不限制标签展示数量</h5>
        <Select
          size={size}
          hasSelectAll
          searchable
          allowClear
          disabled={disabled}
          multiple
          supportLightText
          placeholder="带搜索的下拉多选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList}
          maxTagCount={0}
        />
      </div>
      <div>
        <h5>多选-不限制标签展示数量且展示滚动条</h5>
        <Select
          size={size}
          hasSelectAll
          searchable
          allowClear
          disabled={disabled}
          multiple
          supportLightText
          placeholder="带搜索的下拉多选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList}
          maxTagCount={0}
          maxHeight={80}
        />
      </div>
      <div>
        <h5>多选-已选数据逗号分隔且超长展示省略号</h5>
        <Select
          size={size}
          hasSelectAll
          searchable
          allowClear
          disabled={disabled}
          multiple
          supportLightText
          placeholder="带搜索的下拉多选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList}
          maxTagCount={0}
          showTag={false}
        />
      </div>
      <div>
        <h5>多选-已选数据逗号分隔且超长可滚动</h5>
        <Select
          size={size}
          hasSelectAll
          searchable
          allowClear
          disabled={disabled}
          multiple
          supportLightText
          placeholder="带搜索的下拉多选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList}
          maxTagCount={0}
          showTag={false}
          scrollSelected
        />
      </div>
    </div>
  );
}
```
