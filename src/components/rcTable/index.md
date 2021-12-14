---
category: Components
title: RcTable
subtitle: 表格
---

### 何时使用
可配置分页功能的表格组件。

### API

#### RcTable

| 属性           | 说明                    | 类型              | 默认值 
| -------------- | ---------------------- | ----------------- | ------ |
| ajaxData | 表格数据源    | function/array   |   -   | |
| columnData | 表格列描述，具体详见下表 **columnData**   | array   |   -   | |
| keyField | 表格数据的唯一标识    | string   |   -   | |
| bordered | 是否展示表格边框   | boolean   |   false   | |
| size | 表格大小，可选 `default` `small`     | string   |   `default`   | |
| supportExpend | 是否支持展开    | boolean   |   false   | |
| onExpand | 表格展开的回调函数，需要设置 supportExpend 为 true    | function   |   -   | |
| expandedRowRender | 表格展开区域的内容    | function   |   -  | |
| expandable | 表格展开功能的额外配置，详细见下表 **expandable**    | object   |   {}   | |
| supportTree | 是否支持树状表格    | boolean   |   false   | |
| supportPage | 是否支持分页    | boolean   |   false   | |
| footerTpl | 自定义 footer    | function   |   -   | |
| pageOpts | 分页信息，详细见下表 **pageOpts**    | object   |   -   | |
| supportCheckbox | 是否支持多选    | boolean   |   false   | |
| checkedData | 已选数据    | array   |   []   | |
| onCheckedAfter | 选中行回调，需要设置 supportCheckbox 为 true    | function   |   -   | |
| onCheckedAllAfter | 选中当页回调，需要设置 supportCheckbox 为 true    | function   |   -   | |
| emptyTpl | 自定义数据为空模板   | function   |   -   | |

#### columnData
| 属性                | 说明                                         | 类型                        | 默认值           |
| ------------------- | -------------------------------------------- | --------------------------- | ---------------- |
| title             | 表头                                     | string                      | -                |
| dataIndex            | 列对应的唯一标识                                     | string                      | -               |
| align     | 对齐方式 `left` `right` `center`                       | string                     | `left`            |
| width     | 列宽                       | string/number                   | - |
| fixed     | 是否固定列                       | boolean                   |false |
| ellipsis | 文字超出显示省略号                  | boolean                     | false            |
| render     | 自定义列模板                                     | function                      | -               |


#### pageOpts
| 属性                | 说明                                         | 类型                        | 默认值           |
| ------------------- | -------------------------------------------- | --------------------------- | ---------------- |
| pageNum             | 当前页数                                     | number                      | 1                |
| pageSize            | 每页条数                                     | number                      | 10               |
| showQuickJumper     | 是否可以快速跳转至某页                       | boolean                     | false            |
| pageSizeOptions     | 指定每页可以显示多少条                       | number[]                    | [10, 20, 50, 100] |
| showPageSizeOptions | 显示下拉选择每页显示多少条                   | boolean                     | false            |
| total               | 数据总数                                     | number                      | 0                |
| onChange            | 页码改变的回调，参数是改变后的页码及每页条数 | Function(current, pageSize) | noop             |

#### expandable
https://table-react-component.vercel.app/
