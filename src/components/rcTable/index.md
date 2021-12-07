---
category: Components
title: RcTable
subtitle: 表格
---

### 何时使用
可配置分页功能的表格组件。

### API

#### RcTable

| 属性           | 说明                    | 类型              | 默认值 | 是否上线
| -------------- | ---------------------- | ----------------- | ------ | ------ |
| size | 表格大小，可选 `default` `small`     | string   |   `default`   | |
| headerBordered | 表格头部是否带线条     | boolean   |   false   | |
| bordered | 是否展示外边框和列边框（包括头部）    | boolean   |   false   | |
| columnData | 表格列描述，具体详见下表    | array   |   -   | |
| ajaxData | 表格数据源    | function/array   |   -   | |
| supportCheckbox | 是否多选    | boolean   |   false   | |
| supportExpend | 是否支持展开    | boolean   |   false   | |
| onExpand | 是否支持展开    | function   |   () => {}   | |
| expandedRowRender | 是否支持展开    | function   |   () => {}   | |
| expandable | 展开功能的配置    | object   |   {}   | |

#### expandable
https://table-react-component.vercel.app/
