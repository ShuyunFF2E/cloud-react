---
order: 1
title: 基本使用
desc: 不显示帮助文本，只配置我们需要显示的文本
---

````javascript
import React from 'react';
import NewComponent from 'ccms-components-react/new-component';


export default class NewComponentDemo extends React.Component {

    constructor(props) {
        
        super(props);

        this.state = {
           content : '我就是需要显示的文本内容'
        }
    }

	render() {

        const { content } = this.state;

		return (
            <>
                <NewComponent text={content} />
            </>
		);
	}
}
````
