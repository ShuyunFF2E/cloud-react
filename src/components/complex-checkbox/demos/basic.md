---
order: 1
title: ComplexCheckboxbox
desc: 默认样式
---

```jsx
import React, { useState, useEffect } from 'react';
import { ComplexCheckbox, Checkbox, Button } from 'cloud-react';

export default function ComplexCheckboxDemo() {
    const [disabled, setDisabled] = useState(false);
    const [imgSrc] = useState('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')
     const checkCon = (
        <>
            <p>路漫漫其修远兮，吾将上下而求索</p>
            <p>长太息以掩涕兮，哀民生之多艰</p>
        </>
    );
	return (
        <div>
            <div style={{ marginBottom: 24 }}>基础+说明</div>
            <Checkbox.Group layout="h">
                <ComplexCheckbox
                    title="标题"
                    content="长太息以掩涕兮，哀民生之多艰"
                />
                <ComplexCheckbox
                    title="标题"
                    content="长太息以掩涕兮，哀民生之多艰"
                    defaultChecked
                />
                <ComplexCheckbox
                    title="标题"
                    content="长太息以掩涕兮，哀民生之多艰"
                    disabled
                />
                <ComplexCheckbox
                    title="标题"
                    content="长太息以掩涕兮，哀民生之多艰"
                    defaultChecked
                    disabled
                />
            </Checkbox.Group>
            <div style={{ marginBottom: 24, marginTop: 40 }}>基础+头像</div>
            <Checkbox.Group layout="h">
                <ComplexCheckbox
                    title="标题"
                    imgSrc={imgSrc}
                />
                <ComplexCheckbox
                    title="标题"
                    imgSrc={imgSrc}
                    defaultChecked
                />
                <ComplexCheckbox
                    title="标题"
                    imgSrc={imgSrc}
                    disabled
                />
                <ComplexCheckbox
                    title="标题"
                    imgSrc={imgSrc}
                    defaultChecked
                    disabled
                />
            </Checkbox.Group>
            <div style={{ marginBottom: 24, marginTop: 40 }}>基础+头像+说明</div>
            <Checkbox.Group layout="h">
                <ComplexCheckbox
                    title="标题"
                    content={checkCon}
                    imgSrc={imgSrc}
                />
                <ComplexCheckbox
                    title="标题"
                    content={checkCon}
                    imgSrc={imgSrc}
                    defaultChecked
                />
                <ComplexCheckbox
                    title="标题"
                    content={checkCon}
                    imgSrc={imgSrc}
                    disabled
                />
                <ComplexCheckbox
                    title="标题"
                    content={checkCon}
                    imgSrc={imgSrc}
                    disabled
                    defaultChecked
                />
            </Checkbox.Group>
            <div style={{ marginBottom: 24, marginTop: 40 }}>基础卡片</div>
            <Checkbox.Group layout="h">
                <ComplexCheckbox
                    title="标题"
                    type="card"
                />
                <ComplexCheckbox
                    title="标题"
                    defaultChecked
                    type="card"
                />
                <ComplexCheckbox
                    title="标题"
                    disabled
                    type="card"
                />
                <ComplexCheckbox
                    title="标题"
                    type="card"
                    defaultChecked
                    disabled
                />
            </Checkbox.Group>
            <div style={{ marginBottom: 24, marginTop: 40 }}>基础卡片+说明</div>
            <Checkbox.Group layout="h">
                <ComplexCheckbox
                    title="标题"
                    type="card"
                    content={checkCon}
                />
                <ComplexCheckbox
                    title="标题"
                    type="card"
                    content={checkCon}
                    defaultChecked
                />
                <ComplexCheckbox
                    title="标题"
                    type="card"
                    content={checkCon}
                    disabled
                />
                <ComplexCheckbox
                    title="标题"
                    type="card"
                    content={checkCon}
                    defaultChecked
                    disabled
                />
            </Checkbox.Group>
        </div>
	);
}
```
