---
title: 图片形式已上传列表
order: 5
desc: 使用 fileList 设置已上传的图片列表进行控制。
---

```jsx

/**
 * title: 图片形式已上传列表
 * desc: 使用 fileList 设置已上传的图片列表进行控制。
 */
import React from 'react';
import { Upload } from 'cloud-react';

export default class UploadDemo extends React.Component {
	render() {
		const props = {
			action: '/upload',
			type: 'picture',
			fileList: [
				{
					id: '-1',
					name: 'image.png',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
				},
				{
					id: '-2',
					name: 'image.png',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
				},
				{
					id: '-3',
					name: 'image.png',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
				},
				{
					id: '-4',
					status: 'error',
					name: 'image.png',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
				}
			]
		};

		return (
			<div className="wrapper">
				<Upload {...props} />
			</div>
		);
	}
}
```

