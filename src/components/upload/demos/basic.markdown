---
title: 经典款式，用户点击按钮弹出文件选择框。
order: 1
desc: 包含上传进度 onProgress 和上传成功 onSuccess。
---

```javascript
import React from 'react';
import { Message, Upload } from 'cloud-react';

export default class UploadDemo extends React.Component {
	state = {
		fileList: []
	};

	handleProgress = info => {
		// TODO 上传进度条...
		// Message.success(info.file.name + '文件上传进度为:' + info.file.percent + '%');
	};

	handleSuccess = ({ file, fileList, response }) => {
		Message.success(file.name + '文件上传成功！');

		file.url = response.url;

		fileList.unshift(file);
		this.setState({ fileList });
	};

	render() {
		const props = {
			size: 2,
			multiple: true,
			labelText: '点击上传',
			// 此接口调用的 ant-design 的上传的mock服务接口
			action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
			onBeforeUpload(file) {
				return true;
			},
			onProgress: this.handleProgress,
			onSuccess: this.handleSuccess
		};

		return <Upload {...props} fileList={this.state.fileList} />;
	}
}
```
