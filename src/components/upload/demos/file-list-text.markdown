---
title: 已上传的文件列表
order: 3
desc: 使用 fileList 设置已上传的文件列表。
---

```javascript
import React from 'react';
import { Message, Upload } from 'cloud-react';

export default class UploadDemo extends React.Component {

    state = {
        fileList:  [
            {
                id: '1',
                name: 'xxx.png',
                url: 'http://www.baidu.com/xxx.png'
            },
            {
                id: '2',
                name: 'yyy.png',
                url: 'http://www.baidu.com/yyy.png'
            },
            {
                id: '3',
                name: 'zzz.png',
                url: 'http://www.baidu.com/zzz.png'
            }
        ]
    };

    handleRemove = (info) => {

        const id = info.file.id;

        // 这里可能需要调用后端接口，删除已经上传的文件
        let restFileList = info.fileList.filter(file => id !== file.id);

        this.setState({
            fileList: restFileList
        });

        Message.success(info.file.name + ' 删除成功！');
    };

	render() {
		const props = {
			action: '/upload',
            onRemove: this.handleRemove
		}

		return (
			<div className="wrapper">
				<Upload {...props} fileList={this.state.fileList} />
			</div>
		);
	}
}
```

```less
.wrapper {
	width: 200px;
}
```

