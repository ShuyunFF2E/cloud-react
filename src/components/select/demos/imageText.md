---
order: 2
title: 图文
desc: 图文
---

```jsx
/**
 * title: 图文
 * desc: 图文
 */
import React, { useState } from "react";
import { Select, Checkbox } from "cloud-react";
import Img from "./img.jpg";

const Option = Select.Option;

const dataList = [
  {
    label: "JQuery",
    value: "1",
    desc: "描述",
    imgSrc: Img,
  },
  {
    label: "Vue",
    value: "2",
    desc: "不能选择",
    imgSrc: Img,
    disabled: true,
  },
  {
    label: "React",
    value: "3",
    desc: "描述",
    imgSrc: Img,
  },
  {
    label: "AngularAngularAngularAngularAngularAngularAngularAngularAngular",
    value: "4",
    desc: "描述",
    imgSrc: Img,
  },
];

const dataList1 = [
  {
    language: "JQuery",
    lValue: "1",
    desc: "描述",
    imgSrc: Img,
  },
  {
    language: "Vue",
    lValue: "2",
    desc: "不能选择",
    imgSrc: Img,
    disabled: true,
  },
  {
    language: "React",
    lValue: "3",
    desc: "描述",
    imgSrc: Img,
  },
  {
    language: "AngularAngularAngularAngularAngularAngularAngularAngularAngular",
    lValue: "4",
    desc: "描述",
    imgSrc: Img,
  },
];

export default function SelectDemo() {
  const [multiDataList, setDataList] = useState(dataList);
  const [searchable, setSearchable] = useState(false);

  const handleChange = (value, prevValue) => {
    console.log(value, prevValue);
  };

  return (
    <div className="demo">
      <Checkbox
        checked={searchable}
        onChange={(checked) => {
          setSearchable(checked);
        }}
      >
        可搜索
      </Checkbox>
      <h5>标题+描述</h5>
      <Select
        allowClear
        searchable={searchable}
        supportLightText
        defaultValue={"3"}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        optionRender={(item1, index, searchProps) => {
          return (
            <Select.ImageText
              label={item1.label}
              desc={item1.desc}
              {...searchProps}
            />
          );
        }}
      />
      <Select
        allowClear
        searchable={searchable}
        supportLightText
        multiple
        defaultValue={["3", "4"]}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        checkboxStyle={{ position: "relative", top: -11 }}
        optionRender={(item, index, searchProps) => {
          return (
            <Select.ImageText
              label={item.label}
              desc={item.desc}
              disabled={item.disabled}
              {...searchProps}
            />
          );
        }}
      />
      <Select
        allowClear
        searchable={searchable}
        supportLightText
        multiple
        showTag={false}
        defaultValue={["1", "3"]}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        checkboxStyle={{ position: "relative", top: -11 }}
        optionRender={(item, index, searchProps) => {
          return (
            <Select.ImageText
              label={item.label}
              desc={item.desc}
              disabled={item.disabled}
              {...searchProps}
            />
          );
        }}
      />
      <h5>标题+图片</h5>
      <Select
        allowClear
        searchable={searchable}
        supportLightText
        defaultValue={"3"}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        optionRender={(item, index, searchProps) => {
          return (
            <Select.ImageText
              label={item.label}
              imgSrc={item.imgSrc}
              imgStyle={{ width: 24, height: 24 }}
              disabled={item.disabled}
              {...searchProps}
            />
          );
        }}
      />
      <Select
        allowClear
        searchable={searchable}
        supportLightText
        multiple
        defaultValue={["3", "4"]}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        optionRender={(item, index, searchProps) => {
          return (
            <Select.ImageText
              label={item.label}
              imgSrc={item.imgSrc}
              imgStyle={{ width: 24, height: 24 }}
              disabled={item.disabled}
              {...searchProps}
            />
          );
        }}
      />
      <Select
        allowClear
        searchable={searchable}
        supportLightText
        multiple
        showTag={false}
        defaultValue={["1", "3"]}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        optionRender={(item, index, searchProps) => {
          return (
            <Select.ImageText
              label={item.label}
              imgSrc={item.imgSrc}
              imgStyle={{ width: 24, height: 24 }}
              disabled={item.disabled}
              {...searchProps}
            />
          );
        }}
      />
      <h5>标题+图片+描述</h5>
      <Select
        allowClear
        searchable={searchable}
        supportLightText
        defaultValue={"3"}
        onChange={handleChange}
        style={{ width: 328 }}
        labelKey="language"
        valueKey="lValue"
        dataSource={dataList1}
        optionRender={(item, index, searchProps) => {
          return (
            <Select.ImageText
              label={item.language}
              desc={item.desc}
              imgSrc={item.imgSrc}
              imgStyle={{ width: 48, height: 48 }}
              disabled={item.disabled}
              {...searchProps}
            />
          );
        }}
      />
      <Select
        allowClear
        searchable={searchable}
        supportLightText
        multiple
        hasSelectAll
        defaultValue={["3", "4"]}
        onChange={handleChange}
        style={{ width: 328 }}
        labelKey="language"
        valueKey="lValue"
        dataSource={dataList1}
        optionRender={(item, index, searchProps) => {
          return (
            <Select.ImageText
              label={item.language}
              desc={item.desc}
              imgSrc={item.imgSrc}
              imgStyle={{ width: 48, height: 48 }}
              disabled={item.disabled}
              {...searchProps}
            />
          );
        }}
      />
      <Select
        allowClear
        searchable={searchable}
        supportLightText
        multiple
        showTag={false}
        hasSelectAll
        defaultValue={["1", "3"]}
        onChange={handleChange}
        style={{ width: 328 }}
        labelKey="language"
        valueKey="lValue"
        dataSource={dataList1}
        optionRender={(item, index, searchProps) => {
          return (
            <Select.ImageText
              label={item.language}
              desc={item.desc}
              imgSrc={item.imgSrc}
              imgStyle={{ width: 48, height: 48 }}
              disabled={item.disabled}
              {...searchProps}
            />
          );
        }}
      />
    </div>
  );
}
```
