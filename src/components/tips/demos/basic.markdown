---
title: 基础用法
desc: ''
order: 1
---

````javascript
import React from 'react';
import { Tips } from 'cloud-react';

export default class TipsDemo extends React.Component {

    render() {
    	const tipsWidth = {maxWidth: '300px'}
    	const msgReactNode = (
    	    <span>重要长显显示信息<span className='stressColor'>强调文字变色</span></span>
    	);
        return (
        	<ul className="tips-demo-list">
        	    <li>
        	        <Tips msg="默认提示信息"></Tips>
        	    </li>
        	    <li>
        		    <Tips msg="警告提示长显显示信息文本内容会很长很长的" type="warning"></Tips>
        	    </li>
        	    <li>
        		    <Tips msg={msgReactNode} type="major"></Tips>
        	    </li>
        	    <li>
        		    <Tips style={tipsWidth} msg="自定义宽度，普通常显提示,当提示文字多时,文字全部展示，有多少展示多少普通常显提示,当提示文字多时,文字全部展示，有多少展示多少普通常显提示,当提示文字多时,文字全部展示，有多少展示多少"></Tips>
        	    </li>
        	</ul>
        )
    }
}

````

````less
.tips-demo-list {
    list-style: none;
    padding: 0;
    margin: 0;
	>li{
    	list-style: none;
    	padding: 0;
    	margin-top: 0;
    	margin-bottom: 15px;
    	&:last-child {
         	margin-bottom: 0;
        }
    }
}
.stressColor {
	color: red;
}
````
