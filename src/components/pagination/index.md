---
category: Components
title: Pagination
subtitle: 分页
---
当数据量过多时，采用分页的形式分隔数据，每次只加载显示一部分数据。

### 何时使用
1. 当加载/渲染所有数据将花费很多时间时；
2. 需要切换页码浏览数据。

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| version | 分页组件版本 | string | 'new' |
| current | 当前页数 | number | 1 |
| pageSize | 每页条数 | number | 10 |
| showTotal | 显示总数 | boolean | false |
| showQuickJumper | 是否可以快速跳转至某页 | boolean | false |
| pageSizeOptions | 指定每页可以显示多少条 | number[] | [10, 20, 30, 40] |
| showPageSizeOptions | 显示下拉选择每页显示多少条 | boolean | true |
| total | 数据总数 | number | 0 |
| onChange | 页码改变的回调，参数是改变后的页码及每页条数 | Function(page, pageSize) | noop |
| onShowSizeChange | pageSize 变化的回调 | Function(current, size) | noop |

