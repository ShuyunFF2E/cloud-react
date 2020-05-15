---
category: Components
title: Table
subtitle: 表格
---

### 何时使用

可配置分页功能的表格组件。

### API

| 属性             | 说明                                                                                                                                              | 类型                                       | 默认值            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------------- |
| gridManagerName  | 唯一标识符                                                                                                                                        | string                                     | ''                |
| width            | 配置表格宽度，需要带单位                                                                                                                          | string                                     | '100%'            |
| height           | 配置表格高度，需要带单位                                                                                                                          | string                                     | '300px'           |
| ajaxData         | 数据或请求地址                                                                                                                                    | 1、url string 2、response data 3、function | -                 |
| columnData       | 列配置                                                                                                                                            | array                                      | []                |
| query            | 配置接口请求参数，可用于搜索条件传递。当 query 的 key 与分页及排序等字段冲突时将会被忽略，如果是对已实例化表格增加请求参数，请使用 setQuery()方法 | object                                     | -                 |
| supportAjaxPage  | 是否使用分页                                                                                                                                      | boolean                                    | false             |
| dataKey          | 指定返回数据列表的 key 键值                                                                                                                       | string                                     | 'data'            |
| totalsKey        | 指定返回数据总条数的 key 键值                                                                                                                     | string                                     | 'totals'          |
| currentPageKey   | 请求参数中当前页 key 键值                                                                                                                         | string                                     | 'cPage'           |
| pageSizeKey      | 请求参数中每页显示条数 key 健值                                                                                                                   | string                                     | 'pSize'           |
| supportAutoOrder | 是否支持自动序号                                                                                                                                  | boolean                                    | true              |
| supportDrag      | 用于配置是否支持拖拽功能                                                                                                                          | boolean                                    | true              |
| supportAdjust    | 用于配置是否支持宽度调整功能                                                                                                                      | boolean                                    | true              |
| supportMenu      | 配置是否支持右键菜单功能                                                                                                                          | boolean                                    | true              |
| supportCheckbox  | 配置是否支持选择与反选                                                                                                                            | boolean                                    | true              |
| useNoTotalsMode  | 配置是否使用无总页模式                                                                                                                            | boolean                                    | false             |
| isCombSorting    | 用于配置是否使用组合排序功能                                                                                                                      | boolean                                    | false             |
| mergeSort        | 配置是否合并排序字段                                                                                                                              | boolean                                    | false             |
| sortKey          | ajax 请求中排序字段所使用的前缀                                                                                                                   | string                                     | 'sort\_'          |
| sortMode         | 指定在点击排序箭头时，所使用的模式                                                                                                                | string                                     | 'overall'         |
| sortUpText       | 更改排序操作所使用的升序标识                                                                                                                      | string                                     | 'ASC'             |
| sortDownText     | 配置排序操作所使用的降序标识                                                                                                                      | string                                     | 'DESC'            |
| disableCache     | 配置是否关闭用户记忆                                                                                                                              | boolean                                    | true              |
| requestHandler   | 请求前处理程序, 通过该函数可以修改全部的请求参                                                                                                    | function                                   | -                 |
| responseHandler  | 执行请求后执行程序, 通过该函数可以修改远端返回的数据                                                                                              | function                                   | -                 |
| rowRenderHandler | 单行数据渲染时执行程序                                                                                                                            | function                                   | -                 |
| sizeData         | 配置每页显示条数的下拉项，数组元素仅允许为正整数                                                                                                  | array                                      | [10,20,30,50,100] |
| pageSize         | 配置初次进入时每页的显示条数，需要与 sizeData 中的值匹配                                                                                          | number                                     | 20                |

更多 API 请参考: [GridManager API](http://gridmanager.lovejavascript.com/api/index.html)
