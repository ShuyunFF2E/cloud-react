---
title: cascade 级联选择
nav:
  title: cascade 级联选择
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

展示一个多级卡片式菜单给用户选择，用来代替原生的选择器。

### API

### cascade

| 属性              | 说明                                                              | 类型                                    | 默认值         |
| ----------------- | ----------------------------------------------------------------- | --------------------------------------- | -------------- |
| disabled      | 禁选     | boolean | false          |
| isOnlyShow      | 是否纯展示无选中逻辑     | boolean | false          |
| data      | 要展示的数据     | array | 无默认,必传,具体格式见示例          |
| value      | 要回显得数据     | string | ''          |
| container | 代表标签，标签外失焦时会调用onClose函数| string | 必传          |
| visible   | 控制显隐 | boolean | true  |
| supportCopy | 是否支持叶节点复制 需isOnlyShow | boolean | false |
| dataSource | 需要展示的数据，dataSource 和 children 同时存在时以 children 为准 | array                                   | []             |
| onChange   | 在选中某一最终子项时会调用         | func                                  | ()=>{}        |
| onClose   | 卡片失焦时且visible为true时会调用         | func                                  | ()=>{}        |
| idKey    | 指定使用的 唯一标识 键值         | string                                  | 'id'        |
| pidKey    |   同层级下指定使用的 层级标识 键值 |  string                           | 'pid'        |
| titleKey  | 指定使用的 展示文案 键值            | string                 | 'title'             |
| childrenKey | 指定使用的 存储存在嵌套关系的子级 键值  | string                                  | 'children'              |
| height| 级联卡片高度                                                    | string                                 | '300px'          |
| width | 单行文案最大展示宽度                                                    | string                                  | ''              |

 ### 代码演示 

<embed src="@components/cascade/demos/oneCascade.md" /> 
<embed src="@components/cascade/demos/moreCascade.md" /> 
<embed src="@components/cascade/demos/supportTitle.md" /> 
