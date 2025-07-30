---
title: Popover 气泡
nav:
  title: Popover 气泡
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## 何时使用

点击元素，弹出气泡确认框。

## API

### Popover

| 属性            | 说明                                      | 类型             | 默认值                                      |
| --------------- | ----------------------------------------- | ---------------- | ------------------------------------------- |
| width           | 宽度                                      | string ｜ number | -                                           |
| title           | 标题                                      | string           | ''                                          |
| size            | 气泡尺寸 `mini` `small` `defult` `large`  | string           | `default`                                   |
| content         | 内容                                      | string           | ''                                          |
| showIcon        | 是否展示图标                              | boolean          | false                                       |
| iconTpl         | 自定义图标                                | Element          | ''                                          |
| iconType        | 自定义图标，可直接传入组件库的图标类型    | string           | ''                                          |
| iconStyle       | 图标样式，配置 iconTpl 时，该值无效       | object           | {}                                          |
| isReverseBtn    | 是否反转确定和取消的位置                  | boolean          | `false`                                     |
| showCancelBtn   | 是否展示取消按钮                          | boolean          | false                                       |
| showConfirmBtn  | 是否展示确认按钮                          | boolean          | false                                       |
| cancelBtnText   | 取消按钮自定义文本                        | string           | '取消'                                      |
| confirmText     | 确认按钮自定义文本                        | string           | '确认'                                      |
| onCancelClick   | 取消按钮回调                              | function         | () => {}                                    |
| onConfirmClick  | 确认按钮回调                              | function         | () => {} (函数返回为 true 时不隐藏 popover) |
| cancelBtnOpts   | 取消按钮配置项                            | object           | {}                                          |
| confirmBtnOpts  | 确认按钮配置项                            | object           | {}                                          |
| onVisibleChange | 显示/隐藏回调                             | function         | (visible) => {}                             |
| ignoreClassList | 气泡内，点击会关闭气泡的元素累名          | array            | []                                          |
| contentStyle    | 内容区自定义样式，类名 cloud-popover-desc | object           | {}                                          |

**继承自 Tooltip，支持配置 Tooltip 相关参数，详细请参考 [Tooltip API](https://cloud-react.shuyun.com/v1/cloud-react/common/tooltip#api)**

## 代码演示

### 基础使用

<embed src="@components/popover/demos/basic.md" />

### 自定义图标

<embed src="@components/popover/demos/customIcon.md" />
