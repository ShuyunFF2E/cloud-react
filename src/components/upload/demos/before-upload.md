---
title: 选中文件之后，上传前执行，可以控制是否继续上传。
order: 8
desc: 通过返回的boolean值来决定是否继续上传。
---

```jsx
/**
 * title: 选中文件之后，上传前执行，可以控制是否继续上传。
 * desc: 通过返回的boolean值来决定是否继续上传。
 */
import React from "react";
import { Message, Upload } from "cloud-react";

class UploadDemo extends React.Component {
  state = {
    fileList: [],
  };

  handleProgress = (info) => {
    // TODO 上传进度条...
    // Message.success(info.file.name + '文件上传进度为:' + info.file.percent + '%');
  };

  handleSuccess = ({ file, fileList, response }) => {
    console.log(file, fileList, response);
    Message.success(file.name + "文件上传成功！");

    file.url = response.data;

    fileList.unshift(file);
    this.setState({ fileList });
  };

  handleRemove = (info) => {
    const id = info.file.id;

    // 这里可能需要调用后端接口，删除已经上传的文件
    let restFileList = info.fileList.filter((file) => id !== file.id);

    this.setState({
      fileList: restFileList,
    });

    Message.success(info.file.name + " 删除成功！");
  };

  handleReUpload = ({ file, fileList, response }) => {
    console.log(file, fileList, response);
    Message.success(file.name + "文件上传成功！");

    file.url = response.data;

    fileList[file.index] = file;
    this.setState({ fileList });
  };

  render() {
    const props = {
      size: 2,
      multiple: true,
      isShowIcon: true,
      params: { test: 1 },
      labelText: "点击上传",
      headers: {},
      action: "/upload",
      onBeforeUpload: () => {
        Message.error("操作失败");
        return false;
      },
      onProgress: this.handleProgress,
      onSuccess: this.handleSuccess,
      onRemove: this.handleRemove,
      onReUpload: this.handleReUpload,
    };

    return <Upload {...props} fileList={this.state.fileList} />;
  }
}

export default UploadDemo;
```
