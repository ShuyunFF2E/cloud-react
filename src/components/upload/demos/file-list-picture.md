---
title: 图片形式已上传列表
order: 6
desc: 使用 fileList 设置已上传的图片列表进行控制。
---

```jsx

/**
 * title: 图片形式已上传列表
 * desc: 使用 fileList 设置已上传的图片列表进行控制。
 */
import React from 'react';
import { Upload } from 'cloud-react';

class UploadDemo extends React.Component {
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
					url: 'https://brand-guide.shuyun.com/mpcm/20220817144023/9272cf9e90daa4065f85c57c6f9ad3e0/qqxIWa/31.jpg'
				},
				{
					id: '-4',
					status: 'error',
					name: 'image.png',
					url: 'https://brand-guide.shuyun.com/mpcm/20220817144022/9272cf9e90daa4065f85c57c6f9ad3e0/LQWGLi/27.jpg'
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

export default UploadDemo;
```

