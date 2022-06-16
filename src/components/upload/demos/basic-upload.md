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
			// type: 'picture',
			// limit: 1,
			size: 2,
			multiple: true,
			isShowIcon: false,
			hasPreview: false,
            showBeforeConfirm: true,
            params: {test: 1},
			// style: { width: 66, height: 66 },
            beforeConfirmBody: (
                <span>
                    请确定您要上传文件么？
                </span>
            ),
			labelText: '点击上传1',
			headers: {},
			action: '/upload',
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
