---
title: CTable 新表格
nav:
    title: CTable 新表格
    path: /cloud-react
group:
    order: 14
    title: 数据
    path: /data
---

### 何时使用
可配置分页功能的表格组件。

### API

#### CTable 基础配置项

| 属性           | 说明                    | 类型              | 默认值 
| -------------- | ---------------------- | ----------------- | ------ |
| ajaxData | 表格数据源    | function/array   |   -   | |
| columnData | 表格列描述，具体详见下表 **columnData**   | array   |   -   | |
| rowKey | 表格数据的唯一标识    | string   |   'id'   | |
| bordered | 是否展示表格边框   | boolean   |   false   | |
| headerBordered | 表头带线条   | boolean   |   false   | |
| size | 表格大小，可选 `default` `small` `large`    | string   |   `default`   | |
| maxHeight | tbody最大高度    | string/number |   -   |
| onLoadGridAfter | 表格刷新后回调，Function(res)   | function   |   () => {}   | |
| onLoadGridBefore | 表格刷新前回调，Function(params)   | function   |   () => {}   | |
| onRow | 表格刷新后回调   | 设置自定义 row 属性，Function(record, index)	   |   () => {}   | |

#### CTable 手动刷新表格
this.tableRef.refreshTable(params?);

#### CTable 字段映射
| 属性           | 说明                    | 类型              | 默认值
| -------------- | ---------------------- | ----------------- | ------ |
| totalsKey | total 映射字段   | string   |   'totals'   | |
| dataKey | data 映射字段   | string   |   'data'   | |
| childrenKey | children 映射字段   | string   |   'children'   | |

#### CTable 分页相关配置
| 属性           | 说明                    | 类型              | 默认值
| -------------- | ---------------------- | ----------------- | ------ |
| supportPage | 是否支持分页    | boolean   |   false   | |
| pageOpts | 分页信息，详见**Pagination**组件：https://cloud-react.shuyun.com/v1/cloud-react/nav/pagination    | object   |   -   | |
| showTotal | 显示总条数   | boolean   |   false   | |
| showRefresh | 显示刷新按钮   | boolean   |   true   | |

#### CTable 多级表格配置（树、展开行）
| 属性           | 说明                    | 类型              | 默认值
| -------------- | ---------------------- | ----------------- | ------ |
| supportTree | 是否支持树状表格    | boolean   |   false   | |
| supportExpend | 是否支持展开    | boolean   |   false   | |
| onExpand | 表格展开的回调函数，需要设置 supportExpend 为 true    | function   |   -   | |
| expandedRowRender | 表格展开区域的内容    | function   |   -  | |
| expandable | 表格展开功能的额外配置，详见 https://table-react-component.vercel.app/#api    | object   |   {}   | |
| expandIconColumnIndex | 展开行图标将插入哪一列的索引 | 	number   |   0   | |
| isExpendAloneColumn | 树状表格的展开图标是否单独占据一列（只有两级的树状表格需要设置该属性） | 	boolean   |   false   | |
| supportGroup | 表格分组 | 	boolean   |   false   | |
| supportFullColumn | 表格通栏 | 	boolean   |   false   | |

#### CTable 多选/单选配置
| 属性           | 说明                    | 类型              | 默认值
| -------------- | ---------------------- | ----------------- | ------ |
| supportCheckbox | 是否支持多选    | boolean   |   false   | |
| checkedData | 已选数据    | array   |   []   | |
| supportRadio | 是否支持单选   | boolean   |   false   | |
| onCheckedAfter | 选中行回调，需要设置 supportCheckbox 为 true，Function(checkedList, checkedRow)    | function   |   -   | | 
| onCheckedAllAfter | 选中当页回调，需要设置 supportCheckbox 为 true，Function(checkedList)   | function   |   -   | |

#### CTable 表格拖拽配置
| 属性           | 说明                    | 类型              | 默认值
| -------------- | ---------------------- | ----------------- | ------ |
| supportDrag | 是否支持表格拖拽行 | 	bool   |   false   | |
| showDragIcon | 是否展示拖拽手柄 | 	bool   |   false   | |
| onDragAfter | 表格拖拽行回调 | 	function   |   -   | |
| dragSelector | 指定表格拖拽的选择器 | 	string   |   ''   | |

#### CTable 自定义模板配置
| 属性           | 说明                    | 类型              | 默认值
| -------------- | ---------------------- | ----------------- | ------ |
| footerTpl | 自定义 footer    | function   |   -   | |
| emptyTpl | 自定义数据为空模板   | function   |   -   | |
| rowClassName | 自定义行类名   | function   |   -   | |
| lightCheckedRow | 选中行高亮   | boolean   |   false   | |
| disabledData | 禁用行（也可以通过给 data 设置 disabled: true 来实现禁用行）   | array   |   []   | |
| loadingOpts | 表格自定义loading属性，详细见**Loading**组件：https://cloud-react.shuyun.com/v1/cloud-react/action/loading   | object   |   []   | |
| loadingTpl | 自定义 loading    | function   |   -   | |

#### CTable 业务相关配置
| 属性           | 说明                    | 类型              | 默认值
| -------------- | ---------------------- | ----------------- | ------ |
| isDelay | 刷新表格时，是否延迟loading，一般在纯前端表格中使用   | boolean   |   false   | |
| isCheckboxFixed | 是否固定多选框列或单选框列  | boolean	   |   false   | |
| useCustomScroll | 业务中是否使用自定义滚动条 | 	boolean   |   true   | |
| scrollIntoTop | 翻页后表格自动滚到顶部 | 	boolean   |   true   | |

#### CTable 其他功能配置
| 属性           | 说明                    | 类型              | 默认值
| -------------- | ---------------------- | ----------------- | ------ |
| supportResizeColumn | 是否支持配置列的拉伸  | boolean	   |   false   | |
| summaryData | 表格合计（API 同 columnData） | 	array   |   []   | |
| showFilterBtn | 过滤下拉是否展示确认取消按钮 | 	boolean   |   false   | |

[comment]: <> (| supportConfigColumn | 是否支持配置列的隐藏和展示  | boolean	   |   false   | |)

[comment]: <> (| supportMemory | 是否开启表格记忆功能（开发中）  | boolean     |   false   | | )

[comment]: <> (| tableId | 表格ID。supportMemory 为 true 的时候，需要设置 tableId；其他场景无需设置（开发中）  | string     |   ''   | | )

#### CTable columnData
| 属性                | 说明                                         | 类型                        | 默认值           |
| ------------------- | -------------------------------------------- | --------------------------- | ---------------- |
| title             | 表头                                     | string/function                    | -                |
| dataIndex            | 列对应的唯一标识                                     | string                      | -               |
| align     | 对齐方式 `left` `right` `center`                       | string                     | `left`            |
| width     | 列宽                       | string/number                   | - |
| fixed     | 是否固定列                       | boolean                   |false |
| ellipsis | 文字超出显示省略号                  | boolean                     | false            |
| render     | 自定义列模板                                     | function                      | -               |
| sortable     | 是否支持排序                                     | boolean                      | false               |
| sorter     | 自定义列排序规则                                     | function                      | -               |
| onCell     | 为每个单元格设置自定义参数 Function(record, index)                                   | function                      | -               |
| minWidth     | 列拉伸的最小宽                       | number                   | - |
| filters     | 配置表格列筛选项 [{ text: '男', value: 'male' }, { text: '女', value: 'female' }]                      | array                   | [] |

### 代码演示
<embed src="@components/c-table/demos/basic.md" /> 

<embed src="@components/c-table/demos/header-bordered.md" /> 

<embed src="@components/c-table/demos/bordered.md" /> 

<embed src="@components/c-table/demos/checkbox.md" /> 

<embed src="@components/c-table/demos/radio.md" /> 

<embed src="@components/c-table/demos/tree.md" /> 

<embed src="@components/c-table/demos/tree1.md" /> 

<embed src="@components/c-table/demos/edit.md" /> 

<embed src="@components/c-table/demos/expand-row.md" /> 

<embed src="@components/c-table/demos/custom-column-icon.md" /> 

<embed src="@components/c-table/demos/custom-column-icon-link.md" /> 

<embed src="@components/c-table/demos/custom-column-operate.md" /> 

<embed src="@components/c-table/demos/custom-column-tag.md" /> 

<embed src="@components/c-table/demos/fixed-column.md" /> 

<embed src="@components/c-table/demos/fixed-header.md" /> 

<embed src="@components/c-table/demos/tree2.md" /> 

<embed src="@components/c-table/demos/tree3.md" /> 

<embed src="@components/c-table/demos/summary.md" /> 

<embed src="@components/c-table/demos/page.md" /> 

<embed src="@components/c-table/demos/row-col-span.md" /> 

<embed src="@components/c-table/demos/light-row.md" /> 

<embed src="@components/c-table/demos/sort-no-page.md" /> 

<embed src="@components/c-table/demos/sort-with-page.md" /> 

<embed src="@components/c-table/demos/sort-front.md" /> 

<embed src="@components/c-table/demos/filter.md" />

<embed src="@components/c-table/demos/refresh-table.md" /> 

<embed src="@components/c-table/demos/disabled0.md" /> 

<embed src="@components/c-table/demos/disabled1.md" /> 

<embed src="@components/c-table/demos/disabled2.md" /> 

<embed src="@components/c-table/demos/drag.md" /> 

<embed src="@components/c-table/demos/drag1.md" />

<embed src="@components/c-table/demos/resize.md" />

<embed src="@components/c-table/demos/resize1.md" />
