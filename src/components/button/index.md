---
title: Button 按钮
nav:
  title: Button 按钮
  path: /cloud-react
group:
  order: 1
  title: 通用
  path: /common
---

### 何时使用

按钮的作用是对用户的触发作出反应并执行相应的操作命令。

### API

| 属性     | 说明                                                               | 类型            | 默认值    |
| -------- | ------------------------------------------------------------------ | --------------- | --------- |
| disabled | 按钮失效状态                                                       | boolean         | `false`   |
| href     | 点击跳转的地址，设置此属性 `button` 的行为和 `a` 链接行为一致      | string          | -         |
| target   | 设置 `a` 链接的 `target` 属性，`href` 存在时生效                   | string          | -         |
| htmlType | 设置 `button` 原生属性 `type`                                      | string          | `button`  |
| size     | 设置按钮大小，可选值为 `large` `default` `small` 或者不设          | string          | `default` |
| type     | 设置按钮类型，可选值为 `normal` `primary`  `secondary` `dashed` `link` `text` 或者不设 | string | `normal`  |
| colorType| 设置按钮颜色类型，可选值为 `tips` `danger` `success` 或者不设       | string          | -  |
| icon     | 按钮文字前添加图标，可选值为组件库内所有Icon图标对应的字符（例如：remark）， 或者不设     | string          | -  |
| block    | 将按钮宽度调整为其父宽度的选项                                     | boolean         | `false`   |
| onClick  | 点击触发的回调（支持 async 回调函数，组件自行组织 loading 状态）          | (event) => void \| Promise | -         |

### Button.Group

跟 `Button` 组件的一致，如果在 `Button.Group` 上设置了，则会覆盖掉子元素上设置的参数

 ### 代码演示 

<embed src="@components/button/demos/basic-button.md" />
<embed src="@components/button/demos/size.md" />
<embed src="@components/button/demos/disabled.md" />
<embed src="@components/button/demos/icon-button.md" />
<embed src="@components/button/demos/loading.md" />
<embed src="@components/button/demos/block.md" />
<embed src="@components/button/demos/color-button.md" />
<embed src="@components/button/demos/group.md" />
