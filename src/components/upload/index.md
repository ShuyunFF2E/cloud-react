---
title: Upload 上传组件
nav:
  title: Upload 上传组件
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## 何时使用

上传是将本地文件通过网页发布到远程服务器的过程。  
需要上传一个或者多个文件时

## API

| 参数                | 说明                                                              | 类型          | 默认值                                  |
| ------------------- | ----------------------------------------------------------------- | ------------- | --------------------------------------- |
| type                | 上传组件的类型                                                    | string        | button，可选 button，picture            |
| labelText           | 上传`label`显示文件                                               | string        | 选择文件                                |
| accept              | 接受上传的文件类型                                                | string        |                                         |
| size                | 文件上传的大小(默认单位为`M`)                                     | number        | 1                                       |
| unit                | 文件上传的大小限制单位(`M` `KB`)                                  | string        | 'M'                                     |
| limit               | 最多可上传文件个数                                                | number        | null                                    |
| btnOptions          | 上传按钮配置                                                      | object        | {}                                      |
| hasPreview          | 上传的图片是否可预览（仅适用 type="pciture"）                     | boolean       | true                                    |
| disabled            | 禁用上传                                                          | boolean       | false                                   |
| fileList            | 已上传的文件列表                                                  | Array< File > | []                                      |
| action              | 文件上传的地址                                                    | string        |                                         |
| headers             | 发送 http 请求的头信息,比如 content-type、cookie、accept-xxx 等   | object        | {}                                      |
| withCredentials     | 跨域请求是否允许发送 cookie 认证信息                              | boolean       | false                                   |
| multiple            | 是否上传多个文件                                                  | boolean       | false                                   |
| isShowIcon          | 是否显示上传按钮前面的图标                                        | boolean       | true                                    |
| showBeforeConfirm   | 上传前是否显示确认对话框                                          | boolean       | false                                   |
| beforeConfirmBody   | 上传前的确认对话框中的提示描述，如只需配置提示描述可使用此参数    | any           | '确认上传吗?'                           |
| beforeConfirmConfig | 上传前的确认对话框的配置信息，相关配置信息可参考 Modal.confirm    | any           | { title: '确定要上传文件吗？' }         |
| unify               | 是否一次性上传多个文件                                            | boolean       | false                                   |
| onClick             | 返回 Promise 对像，当未执行 resolve()时将中止上传                 | func          | () => new Promise(resolve => resolve()) |
| onBeforeUpload      | 选中文件之后，上传前执行，通过返回的 boolean 值来决定是否继续上传 | func          |                                         |
| customRequest       | 自定义上传                                                        | func          |                                         |
| onProgress          | 上传过程中                                                        | func          |                                         |
| onSuccess           | 上传成功后                                                        | func          |                                         |
| onError             | 上传失败                                                          | func          |                                         |
| onReUpload          | 重新上传(仅适用 type="picture")                                   | func          |                                         |
| onRemove            | 删除已上传列表的文件                                              | func          |                                         |
| className           | 外部控制样式                                                      | string        |                                         |
| params              | FormData 中的额外参数                                             | object        | {}                                      |
| acceptErrorTip      | 格式校验失败的提示文案                                            | string        |                                         |

### filelist 中的 File 对象

| 参数   | 说明                                    | 类型   | 默认值 |
| ------ | --------------------------------------- | ------ | ------ |
| id     | 已上传的文件唯一标识 id                 | string | ''     |
| name   | 上传文件的名称                          | string |        |
| url    | 如果为图片的话展示缩略图需要的 url 地址 | string |        |
| status | 上传状态('done','error')                | string |        |

### onProgress

文件上传中会调用该函数，返回值为：

```js
{
    // 当前正在上传中的文件信息
    file: {},
    // 当前文件已经上传的进度
    percent: 21.34,
}
```

### onSuccess

文件上传成功会调用该函数，返回值为：

```js
{
    // 当前上传完成的文件信息
    file: {},
    // 已上传的文件列表，用户需要手动去更新
    fileList: [],
    // 调用api成功后端返回的值
    response: {...},
}
```

### onError

文件上传失败会调用此函数，返回值为：

```js
{
    // 当前上传失败的文件信息
    file: {},
    // 已上传的文件列表
    fileList: [],
    // 请求失败的错误信息
    error: {
        // 请求的错误信息
        message: '上传失败',
        // 请求错误状态码
        status: 404,
        // 请求方法
        method: 'post',
        // 请求的api地址
        url: 'upload'
    }
}
```

### onRemove

删除已上传列表单个文件的时候调用此函数，返回值为：

```js
{
    // 当前被删除的文件信息
    file: {},
    // 已上传的文件列表，删除成功以后用户需要手动去更新该列表
    fileList: {}
}
```

## 代码演示

### 经典使用

<embed src="@components/upload/demos/basic-upload.md" />

### 上传前显示确认对话框

<embed src="@components/upload/demos/before-confirm.md" />

### 选中文件之后，上传前执行，可以控制是否继续上传

<embed src="@components/upload/demos/before-upload.md" />

### 自定义上传

<embed src="@components/upload/demos/custom-request.md" />

### 图片形式已上传列表

<embed src="@components/upload/demos/file-list-picture.md" />

### 已上传的文件列表

<embed src="@components/upload/demos/file-list-text.md" />

### 图片形式上传

<embed src="@components/upload/demos/picture.md" />

### 自定义上传显示

<embed src="@components/upload/demos/custom-upload.md" />
