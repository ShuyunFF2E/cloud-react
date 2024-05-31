---
order: 1
title: Popover
desc: 默认样式
---

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Popover, Message, Checkbox } from 'cloud-react';

export default function PopoverDemo() {
	const [isClick, setIsClick] = useState(true);
  const [trigger, setTrigger] = useState('hover');

  useEffect(() => {
      setTrigger(isClick ? 'click' : 'hover');
  }, [isClick]);

  const split = <p style={{ height: 10 }} />

	return (
      <div>
        <Popover
          trigger="click"
          content="这是一段文字描述"
          iconStyle={{ color: '#555BB3' }}
          showIcon >
          <Button>确认</Button>
        </Popover>
        {split}
        <Popover
          trigger="click"
          content="这是一段文字描述"
          iconStyle={{ color: '#fd830a' }}
          showIcon >
          <Button>提示</Button>
        </Popover>
        {split}
        <Popover
          trigger="click"
          content="这是一段文字描述"
          iconStyle={{ color: '#e74949' }}
          showIcon >
          <Button>高危提醒</Button>
        </Popover>
        {split}
        <Popover
          trigger="click"
          content="这是一段文字描述"
          iconType="shop-line"
          iconStyle={{ color: 'rgba(0,0,0,.65)' }}
          showIcon >
          <Button>自定义图标</Button>
        </Popover>
      </div>
	);
}
```
