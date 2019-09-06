---
order: 2
title: 配置 isShowHelp 显示帮助文本
desc: 显示帮助信息
---

````javascript
import React from 'react';
import NewComponent from 'ccms-components-react/new-component';


export default class NewComponentDemo extends React.Component {

    constructor(props) {
        
        super(props);

        this.state = {
           isShowHelp : true
        }
    }

	render() {

        const { isShowHelp } = this.state;

		return (
            <>
                <NewComponent isShowHelp={isShowHelp} />
            </>    
		);
	}
}
````
