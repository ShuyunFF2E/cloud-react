---
title: Form 表单
nav:
  title: Form 表单
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

当你需要集体收集信息或者对控件做校验的时候。

### API

### Form

| 属性       | 说明                                                                  | 类型                | 默认值     |
| ---------- | --------------------------------------------------------------------- | ------------------- | ---------- |
| field      | `new Field(this)`之后的实例，用到表单校验则时此项必填                 | object              | -          |
| size       | 表单的尺寸，可设置`small` `default` `large`，设置此项后表单内的数据获取类组件的尺寸会自动联动  | string     | `default` |
| layout     | 表单展示方向，可设置`horizontal` `vertical` `inline`                  | string              | `vertical` |
| labelAlign | 标签的对齐位置，可设置`left` `right`                                  | string              | `right`    |
| labelCol   | `label` 标签布局，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` | string              | -          |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol`           | string              | -          |
| onSubmit   | form 内有`htmlType="submit"`的元素的时候会触发                        | Function(evt:Event) | -          |
| colon      | 配合`label`属性使用，表示是否显示`label`后面的冒号                    | boolean             | `true`     |
| labelWrap  | 配合`label`属性使用，表示`label`是否在超宽时换行                    | boolean             | `false`     |
| className  | Form 的 className 属性                                                | string              | -          |
| scrollToFirstError | 提交失败自动滚动到第一个错误字段，`field`字段不存在时无效			| boolean              | `false`     |
| fixedError | 展示报错提示时表单项位置是否发生变化			| boolean              | `false`     |
| gap | 各个表单项的间距			|  number              | 20     |

如果 Form 和 Form.Item 相同的属性，Form.Item 的优先级更高，如果 Form 上设置了就不用每一个 Form.Item 上都进行设置，更加方便

### Form.Item

| 属性       | 说明                                                                  | 类型    | 默认值    |
| ---------- | --------------------------------------------------------------------- | ------- | --------- |
| label      | `label` 标签的文本                                                    | string  | ReactNode | - |
| description      | `label` 标签的解释                                                  | string  | - | - |
| help       | 提示信息，如不设置，则会根据校验规则自动生成                          | string  | ReactNode | - |
| htmlFor    | 设置子元素 `label` `htmlFor` 属性                                     | string  | -         |
| required   | 是否必填，如不设置，则会根据校验规则自动生成                          | boolean | `false`   |
| labelCol   | `label` 标签布局，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` | string  | -         |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol`           | string  | -         |
| className  | Form.Item 的 className 属性                                           | string  | -         |
| name  | 字段名                                           | string  | -         |
| preserve  | 当Form.Item卸载时保留字段值                                           | boolean  | -         |

### Form.Nexus

当你的表单校验场景比较复杂或者将`Form.Item`内容抽离出去的时候就需要使用到`Form.Nexus`组件跟`Form`建立关系了，因为程序无法窥视到自定义组件的内容，添加了该组件并不会在 HTML 结构上破坏你预想的结构

<!-- ```jsx
import { Form, Field, Input } from 'cloud-react';

// 简单场景
function FormA() {
	const field = Field.useField();

	return (
		<Form field={field}>
			<Form.Item>
				<Input
					{...field.init('name', {
						rules: [{ required: true, message: '用户名必须填写' }]
					})}
				/>
			</Form.Item>
		</Form>
	);
}
// 复杂场景，需要使用Nexus组件
function FormB() {
	const field = Field.useField();

	return (
		<>
			<Form field={field}>
				<Form.Item>
					<UseNexus field={field} />
				</Form.Item>
			</Form>
		</>

	);
}

function UseNexus() {
	return (
		<Form.Nexus>
			<Input
				{...field.init('firstName', {
					rules: [{ required: true, message: '名字必须填写' }]
				})}
			/>

			<Input
				{...field.init('lastName', {
					rules: [{ required: true, message: '姓氏必须填写' }]
				})}
			/>
		</Form.Nexus>
	);
}
``` -->

 ### 代码演示

<embed src="@components/form/demos/basic-forms.md" />

<embed src="@components/form/demos/basic-usage.md" />

<embed src="@components/form/demos/horizontal.md" />

<embed src="@components/form/demos/inline.md" />
