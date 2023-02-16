---
title: CCascader 级联选择器
nav:
  title: CCascader 级联选择器
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---
### 何时使用

定义一个或者一组 Cascader

### API

#### Cascader

| 属性           | 说明                    | 类型              | 默认值 |
| -------------- | ----------------------- | ----------------- | ------ |
| options        | 可选项数据源              | array             | --     |
| splitInput     | input显示的分隔符     		 |      string      | /   |
| disabled       | 是否禁用                 | boolean           | false  |
| defaultValue   | 初始化 selected value    | Array           | false  |
| value          | selected value          | Array            | --     |
| onChange         | 变化时回调函数            | Function(e:Event) | --     |


 ### 代码演示 

<embed src="@components/c-cascader/demos/basic.md" /> 
<embed src="@components/c-cascader/demos/disable.md" /> 