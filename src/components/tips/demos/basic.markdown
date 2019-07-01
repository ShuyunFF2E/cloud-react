---
title: 基础用法
desc: ''
---

````javascript
import React, { Component } from 'react';
import Tips from 'ccms-components-react/tips';

const blank = '\u00A0';
export default class TipsDemo extends React.Component {

    render() {
    	const tipsWidth = {maxWidth: '300px'}
        return (
        	<div>
        		<Tips msg="默认提示信息"></Tips> {blank}
        		<Tips msg="正常提示信息" type="normal"></Tips> {blank}
        		<Tips msg="警告提示长显显示信息文本内容会很长很长的" type="warning"></Tips> {blank}
        		<Tips msg="重要长显显示信息<span class='stressColor'>强调文字变色</span>" type="major"></Tips> {blank}
        		<Tips style={tipsWidth} msg="普通常显提示,当提示文字多时,文字全部展示，有多少展示多少普通常显提示,当提示文字多时,文字全部展示，有多少展示多少普通常显提示,当提示文字多时,文字全部展示，有多少展示多少"></Tips>
        	</div>
        )
    }
}

````

````less
.stressColor {
	color: red;
}
````
