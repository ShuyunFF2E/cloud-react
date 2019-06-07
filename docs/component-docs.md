---
category: Components
title: Button
subtitle: 按钮
---

组件的文档放到组件目录上，文件名称 `index.md`，例如：

````javascript
|- src
	|- components
		|- button
			|- index.md
````

文件内容格式

````javascript
---
category: Components
title: Button
subtitle: 按钮
---

### 何时使用
标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 按钮失效状态 | boolean | false |
| onClick | 点击触发的回调 | (event) => void | - |
````
输出：

### 何时使用
标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 按钮失效状态 | boolean | false |
| onClick | 点击触发的回调 | (event) => void | - |
