---
title: 自定义上传显示
order: 7
desc: 自定义上传显示。
---

```jsx
/**
 * title: 自定义上传显示
 * desc: 自定义上传显示
*/
import React from 'react';
import { Message, Upload, Button } from 'cloud-react';

export default class UploadDemo extends React.Component {
  state = {
    imageUrl: ''
  };

  handleSuccess = ({ file, fileList, response }) => {
    Message.success(file.name + '文件上传成功！');

    this.setState({ imageUrl: response.data });
  };

  render() {
    const props = {
      size: 2,
      isShowIcon: false,
      hasPreview: false,
      headers: {},
      action: '/upload',
      onSuccess: this.handleSuccess
    };

    return (
      <div>
        <Upload {...props}>
          <Button >
              上传
          </Button>
        </Upload>
        {this.state.imageUrl ? <img src={this.state.imageUrl} style={{ width: 100, height: 100 }} /> : null}
      </div>
    )
  }
}
```
