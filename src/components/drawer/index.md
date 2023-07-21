---
title: Drawer 抽屉
nav:
    title: Drawer 抽屉
    path: /cloud-react
group:
    order: 14
    title: 数据
    path: /action
---

### 何时使用
有时候 Modal 组件并不满足需求, 比如表单很长, 亦或是需要临时展示一些文档, 可以使用 Drawer 组件，在 UI 上带来不一样的体验.

### API

#### Drawer 基础配置项

| 属性           | 说明                    | 类型              | 默认值 
| -------------- | ---------------------- | ----------------- | ------ |
| title |  header内容  |  string  |   -  | |
| placement | Drawer 打开的方向，`top` `right` `bottom` `left`   |  string  |   `right`   | |
| size | Drawer 窗体的大小   |  number/string  |   30%  | |
| showHeader |  是否展示	header  |  boolean  |   true  | |
| showMask | 是否需要遮罩层    | boolean   |   false   | |
| wrapperClosable |  点击 外部区域/遮罩区域 是否可以关闭 Drawer	  |  boolean  |   false  | |
| onCloseAfter |  关闭抽屉后的回调函数	  |  func  |   () => {}  | |

#### 打开抽屉
```js
drawerRef.current.open();
```

#### 关闭抽屉
```js
drawerRef.current.close();
```

### 代码演示

### 基础用法

<embed src="@components/drawer/demos/basic.md" />
