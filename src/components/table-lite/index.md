---
title: TableLite 精简表格
nav:
  title: TableLite 精简表格
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

集合了组件库中所有的图标，通过 type 进行图标类型指定。

### API

| 属性        | 说明                 | 类型             | 默认值     |
| ----------- | -------------------- | ---------------- | ---------- |
| dataSource  | 渲染所需数据         | array            | []         |
| columnData  | 列配置               | array            | []         |
| height      | 表格高度             | [string, number] | -          |
| expandable  | 是否使用树形结构     | boolean          | false      |
| childrenKey | 指定子数据的存储字段 | string           | 'children' |

#### columnData

| 属性     | 说明     | 类型             | 默认值 |
| -------- | -------- | ---------------- | ------ |
| text     | th 文本  | [string, jsx]    | -      |
| template | td 模板  | function         | -      |
| width    | 列宽     | [string, number] | 'auto' |
| align    | 文本方向 | string           | 'left' |

#### dataSource

> dataSource 中每一条数据必须包含 id 字段，如 expandable===true，则子数据需存放在 childrenKey 指定的字段下并通过 rowExpandable 对展开状态进行控制。

| 属性          | 说明                                         | 类型             | 默认值 |
| ------------- | -------------------------------------------- | ---------------- | ------ |
| id            | 数据唯一 key, 必需存在                       | [string, number] | -      |
| children      | expandable===true 时，通过该字段显示子数据   | array            | -      |
| rowExpandable | expandable===true 时，通过该字段控制展开状态 | boolean          | -      |

### 代码演示

<embed src="@components/table-lite/demos/basic-table-lite.md" />

<embed src="@components/table-lite/demos/tree.md" />
