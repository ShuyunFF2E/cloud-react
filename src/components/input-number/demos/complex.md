---
order: 1
title: 输入框
desc: 最基本的一个输入框
---

```jsx

/**
 * title: 复合型数值输入框
 * desc: 可前置或后置元素，一般为标签或按钮
 */
import React from 'react';
import { InputNumber } from 'cloud-react';

export default function InputDemo() {
  return (
    <div>
      <InputNumber style={{ marginBottom: 20, width: 200 }} placeholder="请输入" size="small" noStep addonAfter="分" />
      <InputNumber style={{ marginBottom: 20, width: 200 }} placeholder="请输入" noStep addonAfter="分" />
      <InputNumber style={{ marginBottom: 20, width: 200 }} placeholder="请输入" size="large" noStep addonAfter="分" />
      <InputNumber style={{ width: 200 }} placeholder="请输入" addonBefore="¥" />
    </div>
  );
}
```
