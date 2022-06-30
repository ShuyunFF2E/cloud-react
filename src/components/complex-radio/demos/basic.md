---
order: 1
title: ComplexRadio
desc: 默认样式
---

```jsx
import React, { useState, useEffect } from 'react';
import { ComplexRadio, Radio, Button } from 'cloud-react';

export default function ComplexRadioDemo() {
  const [value, setValue] = useState();

  const onChange = (value) => {
    console.log('AAAA', value);
    setValue(value);
  };

	return (
        <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: "wrap"}}>
            <div>
              <h4>基础+头像</h4>
              <Radio.Group  vertical value={value} defaultValue={"A"} onChange={onChange}>
                <ComplexRadio
                    title="单选文字"
                    imgSrc="https://brand-guide.shuyun.com/IAM/52e939494f3b.png"
                    value="A"
                />
                <ComplexRadio
                    title="单选文字"
                    imgSrc="https://brand-guide.shuyun.com/IAM/52e939494f3b.png"
                    value="B"
                /> 
                <ComplexRadio
                    title="单选文字"
                    imgSrc="https://brand-guide.shuyun.com/IAM/52e939494f3b.png"
                    value="C"
                />
                <ComplexRadio
                    title="单选文字"
                    imgSrc="https://brand-guide.shuyun.com/IAM/52e939494f3b.png"
                    value="D"
                />
                <ComplexRadio
                    title="单选文字"
                    imgSrc="https://brand-guide.shuyun.com/IAM/52e939494f3b.png"
                    value="E"
                    checked
                    imgSrc="https://brand-guide.shuyun.com/IAM/77c28a6547cd.png"
                />
              </Radio.Group>
            </div>
            <div>
              <h4>标题</h4>
              <Radio.Group  vertical value={value} defaultValue={"A"} onChange={onChange}>
                <ComplexRadio
                    title="单选文字标题"
                    value="A"
                    content="说明文案"
                />
                <ComplexRadio
                    title="单选文字标题"
                    value="B"
                    content="说明文案"
                />
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="C"
                    checked
                />
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="D"
                    disabled
                />
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="E"
                    checked
                    disabled
                />
            </Radio.Group>
            </div>
            <div>
              <h4>标题+头像</h4>
              <Radio.Group  vertical value={value} defaultValue={"A"} onChange={onChange}>
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="A"
                    imgSrc="https://brand-guide.shuyun.com/IAM/52e939494f3b.png"
                />
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="B"
                    imgSrc="https://brand-guide.shuyun.com/IAM/52e939494f3b.png"
                />
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="C"
                    imgSrc="https://brand-guide.shuyun.com/IAM/52e939494f3b.png"
                    checked
                />
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="D"
                    imgSrc="https://brand-guide.shuyun.com/IAM/52e939494f3b.png"
                    disabled
                />
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="E"
                    imgSrc="https://brand-guide.shuyun.com/IAM/52e939494f3b.png"
                    checked
                    disabled
                />
            </Radio.Group>
            </div>
            <div>
              <h4>卡片样式</h4>
              <Radio.Group value={value} defaultValue={"A"} onChange={onChange}>
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="A"
                    type="card"
                />
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="B"
                    checked
                    type="card"
                />
            </Radio.Group>
            <br/>
            <br/>
            <Radio.Group value={value} defaultValue={"A"} onChange={onChange}>
            <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="A"
                    disabled
                    type="card"
                />
                <ComplexRadio
                    title="单选文字标题"
                    content="说明文案"
                    value="B"
                    checked
                    disabled
                    type="card"
                />
            </Radio.Group>
            </div>
        </div>
	);
}
```
