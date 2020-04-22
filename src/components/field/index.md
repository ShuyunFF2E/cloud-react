---
category: Components
title: Field
subtitle: 表单通用工具
---

### 何时使用

当你需要集体收集信息或者对控件做校验的时候。

### API

### 初始化

```javascript
// class API
class Form extends React.Component {
	field = new Field(this, options);
	...
};

// Hooks API
function Form() {
	cosnt field = Field.useField(options);
	...
}
```

| 属性    | 说明                                                                                           | 类型            | 默认值 |
| ------- | ---------------------------------------------------------------------------------------------- | --------------- | ------ |
| this    | 传入调用`class`的`this`，`class`组件中使用必须设置，函数组件中使用`Field.useField(options)`API | React.Component | -      |
| options | 可选配置项, 详细参数如下                                                                       | object          | -      |

### options

| 属性             | 说明                                                     | 类型                  | 默认值 |
| ---------------- | -------------------------------------------------------- | --------------------- | ------ |
| options.onChange | 所有控件的`change`都会到达这里（手动调用`setValue`除外） | Function(name, value) | -      |

### API 接口

| 属性      | 说明                                                                                                                                            | 类型                                                                          | 默认值 |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------ |
| init      | 初始化每个组件，详细参数如下，`init`方法会接管组件的`value`和`onChange`字段，请不要再手动赋值，如需使用`onChange`事件可以配置`options.onChange` | Function(name: string, option: object)                                        | -      |
| getState  | 判断校验状态，分别有`error` `success` `validating`                                                                                              | Function(name: string)                                                        | -      |
| getValue  | 获取单个输入控件的值                                                                                                                            | Function(name: string)                                                        |        |
| getValues | 获取一组输入控件的值，如不传入参数，则获取全部组件的值                                                                                          | Function([names: string])                                                     | -      |
| setValue  | 设置单个输入控件的值，会触发`render`                                                                                                            | Function(name: string, value: any)                                            | -      |
| setValues | 设置一组输入控件的值，会触发`render`                                                                                                            | Function(obj: object)                                                         | -      |
| getError  | 获取单个输入控件的`error`                                                                                                                       | Function(name: string)                                                        | -      |
| getErrors | 获取一组输入控件的`error`                                                                                                                       | Function([names: string])                                                     | -      |
| validate  | 校验并获取一组输入域的值与`error`，`names`可不传，默认是表单域的全部`init`过的`names`                                                           | Function([names: string], callback: Function(errors: object, values: object)) | -      |
| setError  | 设置单个输入控件的`error`                                                                                                                       | Function(name: string, errors: string/array[string])                          | -      |
| setErrors | 设置一组输入控件的`error`                                                                                                                       | Function(obj: object)                                                         | -      |
| reset     | 重置一组输入控件的值、清空校验（initValue 存在时重置回 initValue）                                                                              | Function([names: string[]])                                                   | -      |
| clear     | 清空一组输入控件的值、清空校验                                                                                                                  | Function([names: string[]])                                                   | -      |
| remove    | 删除某一个或者一组控件的数据，删除后与之相关的`validate` `value`都会被清空                                                                      | Function(name: string/string[])                                               |

### init

`init(name[, options])`

| 属性              | 说明                                                                      | 类型                 | 默认值     |
| ----------------- | ------------------------------------------------------------------------- | -------------------- | ---------- |
| name              | 必填输入控件唯一标志                                                      | string               | -          |
| options.initValue | 组件初始值，对控件件的`defaultValue`                                      | any                  | -          |
| options.valueName | 组件值的属性名称，如`Radio`的是`checked`，`Input`是`value`                | string               | `value`    |
| options.trigger   | 触发取数据的方法，对应控件的 handle 方法，如`onChange`、`onSelect`        | string               | `onChange` |
| options.onChange  | 在组件触发`onChange`时调用                                                | Function(evt: event) | -          |
| options.rules     | 校验规则                                                                  | array                | -          |
| options.checkable | 是否可校验，当设置为`false`时仅跳过该字段的校验，不会清空该字段的其他信息 | boolean              | `true`     |

### options.rules

```javascript
[
	{ required: true, message: '内容不允许为空' },
	{ len: 20, message: '最长只能输入20个字符' }
];
```

| 属性      | 说明                                                                 | 类型                            | 默认值    |
| --------- | -------------------------------------------------------------------- | ------------------------------- | --------- |
| required  | 是否必选（如`Form.Item`组件的`required`不设置则会调用此字段的值）    | boolean                         | false     |
| pattern   | 正则表达式校验，不会自动加上前后规则`^|$`，如有需要自行添加          | RegExp                          | -         |
| len       | 字段长度                                                             | number                          | -         |
| min       | 最小长度                                                             | number                          | -         |
| max       | 最大长度                                                             | number                          | -         |
| message   | 校验文案                                                             | string                          | ReactNode | - |
| validator | 自定义校验，必须调用`callback`，参数是错误信息，没有错误则什么也不传 | function(name, value, callback) | -         |
