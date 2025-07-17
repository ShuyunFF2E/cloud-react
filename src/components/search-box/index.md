---
title: SearchBox 搜索面板
nav:
  title: SearchBox 搜索面板
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## API
| 属性        | 说明                         | 类型                                                                 | 默认值   |
| ----------- |----------------------------| -------------------------------------------------------------------- | -------- |
| searchList  | 搜索项配置，包含 label 和 content   | Array<{ label: string, content: ReactNode }>                         | -        |
| defaultLine | 默认显示的行数，设置成999，不展示展开/收起筛选项 | number                                                              | 2        |
| onReset     | 重置按钮回调                     | function                                                            | noop     |
| onSearch    | 搜索按钮回调                     | function                                                            | noop     |
| extraEle    | 额外操作区元素                    | ReactNode                                                           | -        |
| field       | 表单 field                   | any                                                                 | -        |

## 代码演示

### 基础使用

<embed src="@components/search-box/demos/basic.md" />

### 可展开收起表单项

<embed src="@components/search-box/demos/fold.md" />

### 添加额外搜索项

<embed src="@components/search-box/demos/extra.md" />
