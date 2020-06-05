---
title: 图片形式上传
order: 3
desc: 设置 type=picture 样式上传，并且处理上传失败 onError 的情况。
---

```javascript
import React from 'react';
import { Message, Upload } from 'cloud-react';

export default class UploadDemo extends React.Component {
	handleError = ({ error, file, fileList }) => {
		// error对象包含：status-请求错误状态码，method-请求方式post，url-请求的地址
		Message.error(info.file.name + '文件上传失败！');
	};

	render() {
		const props = {
			accept: 'image/*',
			labelText: 'Upload',
			action: '/upload',
			type: 'picture',
			onError: this.handleError
		};

		return <Upload {...props} />;
	}
}
```
