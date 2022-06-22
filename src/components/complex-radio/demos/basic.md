---
order: 1
title: ComplexRadio
desc: 默认样式
---

```jsx
import React, { useState, useEffect } from 'react';
import { ComplexRadio, Radio, Button } from 'cloud-react';

export default function ComplexRadioDemo() {
    const [disabled, setDisabled] = useState(false);
    const radioCon = (
        <>
            <p>
                说明1
            </p>
            <p>
                说明2
            </p>
        </>
        
    );
	return (
        <div>
            <Button type="primary" onClick={() => {
                setDisabled(!disabled);
            }}>切换禁用状态</Button>
            <div style={{ height: 10 }}/>
            <Radio.Group  vertical>
                <ComplexRadio
                    disabled={disabled}
                    checked
                    content="说明"
                    title="标题"
                />
                <div style={{ height: 10 }}/>
                <ComplexRadio
                    disabled={disabled}
                    style={{ height: 48 }}
                    content="说明"
                    imgSrc="https://brand-guide.shuyun.com/IAM/77c28a6547cd.png"
                />
                <div style={{ height: 10 }}/>
                <ComplexRadio
                    disabled={disabled}
                    style={{ height: 48 }}
                    content={radioCon}
                    imgSrc="https://brand-guide.shuyun.com/IAM/77c28a6547cd.png"
                />
                <ComplexRadio
                    disabled={disabled}
                    content={radioCon}
                    title="标题"
                    checked
                    imgSrc="https://brand-guide.shuyun.com/IAM/77c28a6547cd.png"
                />
                <div style={{ height: 10 }}/>
                <ComplexRadio
                    disabled={disabled}
                    textOverflowEllipsis
                    checked
                    contentStyle={{ width: 100 }}
                    content="说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明"
                    title="标题"
                    imgSrc="https://brand-guide.shuyun.com/IAM/77c28a6547cd.png"
                />
            </Radio.Group>
        </div>
	);
}
```
