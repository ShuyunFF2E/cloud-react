---
title: 经典款式，用户点击按钮弹出文件选择框。
order: 1
desc: 包含上传进度 onProgress 和上传成功 onSuccess。
---

```javascript
import React from 'react';
import Message from 'cloud-react/message';
import Upload from 'cloud-react/upload';

export default class UploadDemo extends React.Component {


    state = {
        fileList: []
    };

    handleProgress = info => {
        // TODO 上传进度条...
        // Message.success(info.file.name + '文件上传进度为:' + info.file.percent + '%');
    }

    handleSuccess = info => {
        
        Message.success(info.file.name + '文件上传成功！');

        let fileList = [...info.fileList];
        fileList.push(info.file);

        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    };

	render() {

        const props = {
            size: 2,
            labelText: '点击上传',
            // 此接口调用的 ant-design 的上传的mock服务接口
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onBeforeUpload(file) {
                return true;
            },
            onProgress: this.handleProgress,
            onSuccess: this.handleSuccess
        };

		return (
            <Upload {...props} fileList={this.state.fileList} />
		);
	}
}
```
