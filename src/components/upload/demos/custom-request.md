---
title: 自定义上传。
order: 2
desc: 根据自身业务需求，传相应FormData。
---

```jsx

            /**
             * title: 自定义上传。
             * desc: 根据自身业务需求，传相应FormData。
             */
import React from 'react';
import { Message, Upload } from 'cloud-react';

export default class UploadDemo extends React.Component {
	render() {
		const props = {
			size: 2,
			labelText: '自定义上传',
			customRequest: option => {
				const formData = new FormData();
				formData.append('file', option.file);
				formData.append('other', '1');
				formData.append('xxx', '2');
				fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
					method: 'POST',
					body: formData
				}).then(res => Message.success('文件上传成功！'));
			}
		};

		return <Upload {...props} />;
	}
}
```
