---
category: Components
title: Table
subtitle: 表格
---

### 何时使用

可配置分页功能的表格组件。

### API

| 属性             | 说明                            | 类型                                       | 默认值    |
| ---------------- | ------------------------------- | ------------------------------------------ | --------- |
| gridManagerName  | 唯一标识符                      | string                                     | ''        |
| ajaxData         | 数据或请求地址                  | 1、url string 2、response data 3、function | undefined |
| columnData       | 列配置                          | array                                      | []        |
| supportAjaxPage  | 是否使用分页                    | boolean                                    | false     |
| dataKey          | 指定返回数据列表的 key 键值     | string                                     | 'data'    |
| totalsKey        | 指定返回数据总条数的 key 键值   | string                                     | 'totals'  |
| supportAutoOrder | 是否支持自动序号                | boolean                                    | true      |
| supportDrag      | 用于配置是否支持拖拽功能        | boolean                                    | true      |
| supportAdjust    | 用于配置是否支持宽度调整功能    | boolean                                    | true      |
| supportMenu      | 配置是否支持右键菜单功能        | boolean                                    | true      |
| supportCheckbox  | 配置是否支持选择与反选          | boolean                                    | true      |
| useRowCheck      | 配置是否使用行选中功能          | boolean                                    | false     |
| useRadio         | 配置是否使用单选                | boolean                                    | false     |
| useNoTotalsMode  | 配置是否使用无总页模式          | boolean                                    | false     |
| isCombSorting    | 用于配置是否使用组合排序功能    | boolean                                    | false     |
| mergeSort        | 配置是否合并排序字段            | boolean                                    | false     |
| sortKey          | ajax 请求中排序字段所使用的前缀 | string                                     | 'sort\_'  |

更多 API 请参考: [GridManager API](http://gridmanager.lovejavascript.com/api/index.html)
