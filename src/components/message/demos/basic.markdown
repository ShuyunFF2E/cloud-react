---
title: 基础用法
desc: ''
---

````javascript
import React, { Component } from 'react';
import message from 'ccms-components-react/message';
import Button from 'ccms-components-react/button';

const blank = '\u00A0';

export default class MessageDemo extends Component {

    onSuccessClick() {
        message.success('更改成功内容很多的要全部显示不需要隐藏，内容很多很多内容很多很多内容很多很多内容很多很多内容很多很多内容很多很多内容很多很多内容很多很多内容很多很多内容很多很多内容很多很多内容很多很多', { duration: 0 });
    }
    onErrorClick() {
        message.error('更新失败');
    }

    render() {
        return (
            <div className="app-contain">
            	<Button type="normal" onClick={this.onSuccessClick}>success</Button>
                {blank}
                <Button type="normal" onClick={this.onErrorClick}>error</Button>
            </div>
        )
    }
}

````
