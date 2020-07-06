---
title: 用户点击按钮弹出确认对话框，确认在进行文件选择。
order: 6
desc: 开启confirm提示，确认后开始上传文件，取消则不上传。
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
			action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
			showBeforeConfirm: true,
			beforeConfirmBody: '确认上传吗?',
			onProgress: this.handleProgress,
			onSuccess: this.handleSuccess
		};

		return <Upload {...props} fileList={this.state.fileList} />;
	}
}
```
