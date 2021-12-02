---
title: 经典款式，用户点击按钮弹出文件选择框。
order: 1
desc: 包含上传进度 onProgress 和上传成功 onSuccess。
---

```jsx

            /**
             * title: 经典款式，用户点击按钮弹出文件选择框。
             * desc: 包含上传进度 onProgress 和上传成功 onSuccess。
             */
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
			type: 'picture',
			size: 2,
			multiple: true,
			isShowIcon: false,
			hasPreview: false,
            showBeforeConfirm: true,
            params: {test: 1},
            beforeConfirmBody: (
                <span>
                    请确定您要上传文件么？
                </span>
            ),
			labelText: '点击上传1',
			headers: { 'x-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRJZCI6InF5d3hfc3l5al93dzljNjE2MDc1MjMzMGNiYzQiLCJ1c2VySWQiOjExODQ5NzY3LCJ1c2VyVHlwZSI6InF5d3giLCJ1c2VyTmFtZSI6Ik11TXVNdS4uLiIsImV4dCI6MTYzODI4MzE2MzM2NSwiaWF0IjoxNjM4MjM5OTYzMzY1LCJjb3JwSWQiOiJ3dzljNjE2MDc1MjMzMGNiYzQiLCJidXNpbmVzc1VzZXJJZCI6Ik11TXVNdS4uLiJ9.uElbqOFLBFtDIrMrVWeW5f6vnQ-RNv-O3-y53Cf4O0Y' },
			action: 'https://qa-ual.shuyun.com/pcrm-account/1.0/file/uploadImageFile',
			onBeforeUpload(file) {
				return true;
			},
			onProgress: this.handleProgress,
			onSuccess: this.handleSuccess,
			onRemove: this.handleRemove,
			onReUpload: this.handleReUpload
		};

		return <Upload {...props} fileList={this.state.fileList} />;
	}
}
```
