---
category: 组件文档
title: api 文档
---

1. 组件的文档放到组件目录上，文件名称 `index.md`，例如：

````javascript
|- src
	|- components
		|- button
			|- index.md
````

2. 文件内容格式

````markdown
---
category: Components
title: Button
subtitle: 按钮
---

### 何时使用
标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 代码演示
<div id="code-demo">
	// 该组件中的 demos/*.markdown 文件都会被动态解析并加载到这
	// 详情请查看【组件文档 -> 组件Demos文档】
</div>

### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 按钮失效状态 | boolean | false |
| onClick | 点击触发的回调 | (event) => void | - |
````
3. 输出：

### 何时使用
标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 代码演示
````javascript
// 这里是demo.markdown中的代码执行后的效果
````

### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 按钮失效状态 | boolean | false |
| onClick | 点击触发的回调 | (event) => void | - |
