---
category: Components
subtitle: 上传组件
title: Upload
---

### 何时使用

上传是将本地文件通过网页发布到远程服务器的过程。  
需要上传一个或者多个文件时

### API

| 参数              | 说明                                                            | 类型        | 默认值        |
| ----------------- | --------------------------------------------------------------- | ----------- | ------------- |
| type              | 上传组件的类型                                                  | string      | button        |
| labelText         | 上传`label`显示文件                                             | string      | 选择文件      |
| name              | 上传文件的名称                                                  | string      |               |
| accept            | 接受上传的文件类型                                              | string      |               |
| size              | 文件上传的大小(默认单位为`M`)                                   | number      | 1             |
| disabled          | 禁用上传                                                        | boolean     | false         |
| fileList          | 已上传的文件列表                                                | Array<File> | []            |
| action            | 文件上传的地址                                                  | string      |               |
| headers           | 发送 http 请求的头信息,比如 content-type、cookie、accept-xxx 等 | object      | {}            |
| withCredentials   | 跨域请求是否允许发送 cookie 认证信息                            | boolean     | false         |
| multiple          | 是否上传多个文件                                                | boolean     | false         |
| showBeforeConfirm | 上传前是否显示确认对话框                                        | boolean     | false         |
| beforeConfirmBody | 上传前的确认对话框中的提示信息                                  | any         | '确认上传吗?' |
| customRequest     | 自定义上传                                                      | func        |               |
| onProgress        | 上传过程中                                                      | func        |               |
| onSuccess         | 上传成功后                                                      | func        |               |
| onError           | 上传失败                                                        | func        |               |
| onRemove          | 删除已上传列表的文件                                            | func        |               |
| className         | 外部控制样式                                                    | string      |               |

#### filelist 中的 File 对象

| 参数 | 说明                                    | 类型   | 默认值 |
| ---- | --------------------------------------- | ------ | ------ |
| id   | 已上传的文件唯一标识 id                 | string | ''     |
| name | 上传文件的名称                          | string |        |
| url  | 如果为图片的话展示缩略图需要的 url 地址 | string |        |

#### onProgress

文件上传中会调用该函数，返回值为：

```js
{
    // 当前正在上传中的文件信息
    file: {},
    // 当前文件已经上传的进度
    percent: 21.34,
}
```

#### onSuccess

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

#### onError

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

#### onRemove

删除已上传列表单个文件的时候调用此函数，返回值为：

```js
{
    // 当前被删除的文件信息
    file: {},
    // 已上传的文件列表，删除成功以后用户需要手动去更新该列表
    fileList: {}
}
```
