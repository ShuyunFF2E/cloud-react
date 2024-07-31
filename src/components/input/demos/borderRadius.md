---
order: 3
title: 复合型输入框
desc: 可前置或后置元素，一般为标签或按钮
---

```jsx
import React, { useEffect, useState } from 'react';
import { Input, Icon, Radio } from 'cloud-react';
import './styles/mix.less'

export default function InputDemo() {
  const [borderRadiusSize, setBorderRadiusSize] = useState('default');
  return (
    <div className="input-demo-mix-box">
      <Radio.Group value={borderRadiusSize} onChange={setBorderRadiusSize} style={{ marginBottom: 20 }}>
        <Radio value="default">圆角：default</Radio>
        <Radio value="medium">圆角：medium</Radio>
        <Radio value="large">圆角：large</Radio>
      </Radio.Group>
      <div className="input-demo-box" key={borderRadiusSize}>
        <Input borderRadiusSize={borderRadiusSize} hasClear placeholder="请输入" />
        <Input borderRadiusSize={borderRadiusSize} hasClear addonBefore={<span>http://</span>} placeholder="请输入" />
        <Input borderRadiusSize={borderRadiusSize} hasClear addonAfter=".com" placeholder="请输入" />
        <Input borderRadiusSize={borderRadiusSize} hasClear addonBefore={<span>http://</span>} addonAfter=".com"
               placeholder="请输入" />
        <Input borderRadiusSize={borderRadiusSize} prefix={<Icon className='input-prefix-icon' type="people" style={{ color: 'rgba(0,0,0,0.25)' }} />}
               placeholder="请输入" suffix="RMB" />
        <Input.Textarea borderRadiusSize={borderRadiusSize} placeholder="请输入文案，最多10个字符" style={{ width: 400 }} autoSize maxLength={10} hasCounter />
      </div>
    </div>
  );
}
```
