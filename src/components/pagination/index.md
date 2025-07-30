---
title: Pagination 分页
nav:
  title: Pagination 分页
  path: /cloud-react
group:
  order: 4
  title: 导航
  path: /nav
---

当数据量过多时，采用分页的形式分隔数据，每次只加载显示一部分数据。

### 何时使用

1. 当加载/渲染所有数据将花费很多时间时；
2. 需要切换页码浏览数据。

### API

| 属性                | 说明                                                           | 类型                        | 默认值           |
| ------------------- | -------------------------------------------------------------- | --------------------------- | ---------------- |
| className           | 类名                                                           | string                      | -                |
| current             | 当前页数                                                       | number                      | 1                |
| pageSize            | 每页条数                                                       | number                      | 10               |
| showQuickJumper     | 是否可以快速跳转至某页                                         | boolean                     | false            |
| pageSizeOptions     | 指定每页可以显示多少条                                         | number[]                    | [10, 20, 30, 40] |
| showPageSizeOptions | 显示下拉选择每页显示多少条                                     | boolean                     | false            |
| total               | 数据总数                                                       | number                      | 0                |
| onChange            | 页码改变的回调，参数是改变后的页码及每页条数                   | Function(current, pageSize) | noop             |
| isAppendToBody      | 分页下拉框是否渲染在 body 上                                   | boolean                     | true             |
| disabled            | 禁用分页                                                       | boolean                     | false            |
| type                | 分页类型 `default` `simple` `small` `mini-page` `mini-no-page` | string                      | default          |
| showTotal           | 展示数据总量                                                   | boolean                     | false            |

### 代码演示

<embed src="@components/pagination/demos/basic-pagination.md" />

<embed src="@components/pagination/demos/change.md" />

<embed src="@components/pagination/demos/jump.md" />

<embed src="@components/pagination/demos/total.md" />

<embed src="@components/pagination/demos/disabled.md" />

<embed src="@components/pagination/demos/simple.md" />

<embed src="@components/pagination/demos/small.md" />

<embed src="@components/pagination/demos/mini-page.md" />

<embed src="@components/pagination/demos/mini-no-page.md" />
