---
title: Step 步骤
nav:
  title: Step 步骤
  path: /cloud-react
group:
  order: 4
  title: 导航
  path: /nav
---

### 何时使用

步骤可以帮助用户对操作流程长度和步骤有个预期，并且知道自己当前在哪个步骤。同时也可以对用户的任务完成度有明确的度量。

### API

### Step

| 属性      | 说明                                  | 类型                          | 默认值       |
| --------- | ------------------------------------- | ----------------------------- | ------------ |
| current   | 当前步骤，从`0`开始                   | number                        | `0`          |
| direction | 方向，可设置：`horizontal` `vertical` `inline` | string                        | `horizontal` |
| type      | 类型，可设置：`circle` `dot`          | string                        | `circle`     |
| size      | 方向，可设置：`default` `small`       | string                        | `default` |
| onClick   | 步骤节点（图标）的 click 回调         | function(currentStep: number) | -            |
| className | 自定义样式名，提供给外部覆盖样式用    | string                        | -            |

### Step.Item

| 属性      | 说明                                                                                           | 类型                          | 默认值 |
| --------- | ---------------------------------------------------------------------------------------------- | ----------------------------- | ------ |
| status    | 当前步骤状态，不传会根据外层的`Step`的`current`属性自动生成，可设置：`wait` `process` `finish` | string                        | `wait` |
| title     | 标题                                                                                           | any                           | -      |
| content   | 用于垂直状态下的内容填充                                                                       | any                           | -      |
| onClick   | 步骤节点（图标）的 click 回调，`Step`统一上设置了后，`Item`上一般不用设置了，除非有特殊的需求  | function(currentStep: number) | -      |
| className | 自定义样式名，提供给外部覆盖样式用                                                             | string                        | -      |

-   注意：如果`Step`和`Step.Item`上同时设置了`onClick`事件，会并存，触发顺序为`Step.Item > Step`

 ### 代码演示 

<embed src="@components/step/demos/basic-step.md" /> 

<embed src="@components/step/demos/direction.md" /> 

<embed src="@components/step/demos/inline.md" /> 

<embed src="@components/step/demos/type.md" /> 
