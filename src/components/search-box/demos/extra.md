---
order: 2
title: 展开收起表单项
desc: 展开收起表单项
---

```jsx
/**
 * title: 展开收起表单项
 * desc: 展开收起表单项
 */
import React, { useState } from "react";
import { SearchBox, Input, Field, Form, Checkbox } from "cloud-react";

export default function Demo() {
  const field = Field.useField();
  const searchList = [
    {
      label: "计划名称",
      content: (
        <Input
          style={{ width: 250 }}
          placeholder="请输入计划名称"
          {...field.init("name")}
        />
      ),
    },
    {
      label: "计划ID",
      content: (
        <Input
          style={{ width: 250 }}
          placeholder="请输入计划ID"
          {...field.init("id")}
        />
      ),
    },
    {
      label: "场景名称",
      content: (
        <Input
          style={{ width: 250 }}
          placeholder="请输入场景名称"
          {...field.init("sceneName")}
        />
      ),
    },
    {
      label: "状态",
      content: (
        <Input
          style={{ width: 250 }}
          placeholder="请输入状态"
          {...field.init("status")}
        />
      ),
    },
    {
      label: "触发类型",
      content: (
        <Input
          style={{ width: 250 }}
          placeholder="请输入触发类型"
          {...field.init("trigger")}
        />
      ),
    },
  ];
  return (
    <SearchBox
      field={field}
      searchList={searchList}
      defaultLine={2}
      onSearch={() => {
        console.log(field.getValues());
      }}
      onReset={() => {
        field.reset();
        console.log(field.getValues());
      }}
      extraEle={
        <Form.Item>
          <Checkbox
            style={{ marginLeft: 25, position: "relative", top: 2 }}
            onChange={(v) => {
              console.log(v);
            }}
          >
            我创建的
          </Checkbox>
        </Form.Item>
      }
    />
  );
}
```
