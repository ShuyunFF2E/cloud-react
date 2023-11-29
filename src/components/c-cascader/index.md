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
## 何时使用

用于具有层级信息的多组数据展示

## API

| 属性           | 说明                    | 类型              | 默认值 |
| -------------- | ----------------------- | ----------------- | ------ |
| options        | 可选项数据源              | array             | --     |
| splitInput     | input显示的分隔符     		 |      string      | /   |
| disabled       | 是否禁用                 | boolean           | false  |
| defaultValue   | 初始化所选值    | Array           | false  |
| value          | 所选值         | Array            | --     |
| change         | 变化时回调函数            | Function(e:Event) | --     | 
| changeOnSelect | 每个选项都触发改变  | boolean            | false  | 
| displayRender  | 自定义回写格式  | Function(labels:Array)        | --  |
| expandTrigger  | 展开当前选项的事件点击或者移动，默认是 点击 | string | "click" |
| loadData       | 异步加载更多子项目 | function(selectedOptions) | -- |
| loadingIcon    | 加载子项目图标 | ReactNode | -- |
| allowClear     | 点击清空图标删除选中内容 | boolean | false |
| clearIcon      | 清空图标 | ReactNode | <Icon type="close-fill-1" style={{ fontSize: '14px' }} />|
| placement | 弹框位置 | bottomRight topRight bottomLeft topLeft | bottomLeft |
| notFoundContent | 下拉列表为空时显示的内容 | string \| ReactNode | -- |
| showSearch     | 搜索配置               | object   | -- |
| fieldNames     | 标签、值和子项的自定义字段名称  | object | { label: 'label', value: 'value', children: 'children' } |
| borderRadiusSize       | 圆角大小： `small`: 3px；`default`: 6px；`large`: 12px；         | string | `default`     |


 ## 代码演示 

### 单选级联组件
<embed src="@components/c-cascader/demos/basic.md" /> 

### 多选级联组件
<embed src="@components/c-cascader/demos/multiple.md" /> 

### 自定义回写格式
<embed src="@components/c-cascader/demos/customer-render.md" /> 

### 触发方式
<embed src="@components/c-cascader/demos/triggerType.md" /> 

### 异步加载子项目
<embed src="@components/c-cascader/demos/dynamic.md" /> 

### 清空选中项目
<embed src="@components/c-cascader/demos/clear.md" /> 

### 弹出位置
<embed src="@components/c-cascader/demos/placement.md" /> 

### 不可用
<embed src="@components/c-cascader/demos/disabled.md" /> 

### 尺寸
<embed src="@components/c-cascader/demos/size.md" /> 

### 下拉项目没数据
<embed src="@components/c-cascader/demos/empty.md" />

### 动画 
<embed src="@components/c-cascader/demos/transition.md" />

### 设置下拉框圆角
<embed src="@components/c-cascader/demos/borderRadius.md" />
