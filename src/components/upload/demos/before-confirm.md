---
title: 上传前显示确认对话框。
order: 2
desc: 上传前和用户进行确认，可配置具体提示内容。
---

```jsx
/**
 * title: 上传前显示确认对话框。
 * desc: 上传前和用户进行确认，可配置具体提示内容。
 */
import React from 'react';
import { Message, Upload } from 'cloud-react';

class UploadDemo extends React.Component {

  state = {
    fileList: []
  };

  handleProgress = info => {
    // TODO 上传进度条...
    // Message.success(info.file.name + '文件上传进度为:' + info.file.percent + '%');
  };

  handleSuccess = ({ file, fileList, response }) => {
    console.log(file, fileList, response);
    Message.success(file.name + '文件上传成功！');

    file.url = response.data;

    fileList.unshift(file);
    this.setState({ fileList });
  };

  handleRemove = info => {
    const id = info.file.id;

    // 这里可能需要调用后端接口，删除已经上传的文件
    let restFileList = info.fileList.filter(file => id !== file.id);

    this.setState({
      fileList: restFileList
    });

    Message.success(info.file.name + ' 删除成功！');
  };

  handleReUpload = ({ file, fileList, response }) => {
    console.log(file, fileList, response);
    Message.success(file.name + '文件上传成功！');

    file.url = response.data;

    fileList[file.index] = file;
    this.setState({ fileList });
  };

  render() {
    const props = {
      size: 2,
      multiple: true,
      isShowIcon: true,
      params: {test: 1},
      labelText: '点击上传',
      headers: {},
      action: '/upload',
      showBeforeConfirm: true,
      beforeConfirmBody: <span>确认需要上传吗？</span>,
      beforeConfirmConfig: {
        title: '确定要上传文件吗？',
        body: '这里是上传后响应状态的描述'
      },
      onProgress: this.handleProgress,
      onSuccess: this.handleSuccess,
      onRemove: this.handleRemove,
      onReUpload: this.handleReUpload
    };

    return <Upload {...props} fileList={this.state.fileList} />;
  }
}

export default UploadDemo;
```
