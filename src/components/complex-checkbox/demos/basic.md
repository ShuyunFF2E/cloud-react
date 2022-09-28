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
     const checkCon = (
        <>
            <p>
                长太息以掩涕兮，哀民生之多艰
            </p>
            <p>
                路漫漫其修远兮，吾将上下而求索
            </p>
        </>
        
    );
	return (
        <div>
            <Button type="primary" onClick={() => {
                setDisabled(!disabled);
            }}>切换禁用状态</Button>
            <div style={{ height: 20 }}/>
 
            <Checkbox.Group layout="v">
                <ComplexCheckbox
                    disabled={disabled}
                    content="长太息以掩涕兮，哀民生之多艰"
                    title="标题"
                />
                <div style={{ height: 20 }}/>
                <ComplexCheckbox
                    disabled={disabled}
                    defaultChecked
                    content={checkCon}
                    imgSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                  <div style={{ height: 20 }}/>
                <ComplexCheckbox
                    disabled={disabled}
                    defaultChecked
                    content="长太息以掩涕兮，哀民生之多艰"
                    imgSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <div style={{ height: 20 }}/>
                <ComplexCheckbox
                    disabled={disabled}
                    defaultChecked
                    content={checkCon}
                    title="标题"
                    imgSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <div style={{ height: 20 }}/>
                <ComplexCheckbox
                    disabled={disabled}
                    textOverflowEllipsis
                    contentStyle={{ width: 300 }}
                    content="长太息以掩涕兮，哀民生之多艰。余虽好修姱以鞿羁兮，謇朝谇而夕替。既替余以蕙纕兮，又申之以揽茝。亦余心之所善兮，虽九死其犹未悔。怨灵修之浩荡兮，终不察夫民心。众女嫉余之蛾眉兮，谣诼谓余以善淫。固时俗之工巧兮，偭规矩而改错。背绳墨以追曲兮，竞周容以为度"
                    title="标题"
                    imgSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
								<div style={{ height: 20 }}/>
                <ComplexCheckbox
                    disabled={disabled}
                    textOverflowEllipsis
                    contentStyle={{ width: 300 }}
										checkboxType="card"
                    content="长太息以掩涕兮，哀民生之多艰。余虽好修姱以鞿羁兮，謇朝谇而夕替。既替余以蕙纕兮，又申之以揽茝。亦余心之所善兮，虽九死其犹未悔。怨灵修之浩荡兮，终不察夫民心。众女嫉余之蛾眉兮，谣诼谓余以善淫。固时俗之工巧兮，偭规矩而改错。背绳墨以追曲兮，竞周容以为度"
                    title="标题"
                    imgSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            </Checkbox.Group>
        </div>
	);
}
```
