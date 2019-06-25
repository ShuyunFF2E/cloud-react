---
category: 组件文档
title: demo 文档
---

1. 组件的文档放到组件的demos目录上，文件名称 `*.markdown`，例如：

````javascript
|- src
	|- components
		|- button
			|- demos
				|- basic.markdown
````

2. 文件内容格式

````markdown
---
title: 基础用法
desc: 当您的使用场景比较简单的时候，看看基础用法是否就能满足您的需求了，点击下面"代码"按钮查看代码例子
---

```javascript
import React form 'react';
import Button from 'ccms-components-react';

export default class BasicDemo extends React.Component {
	render() {
		return (
			<Button className="btn">普通按钮<Button/>
		)
	}
}

```

```less
.btn {
	a {
		color: red;
	}
}
```

OR

```css
.btn a {
	color: red;
}
```

````

输出：该文件的内容会自动被解析和动态引入到 `组件API文档` 的代码演示容器中 `<div id="code-demo">你在这</div>`
