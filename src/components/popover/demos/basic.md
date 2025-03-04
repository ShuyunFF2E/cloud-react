---
order: 1
title: Popover
desc: 默认样式
---

```jsx
import React, { useState, useEffect } from 'react';
import { Button, Popover, Message, Checkbox, Input } from 'cloud-react';

export default function PopoverDemo() {
	const [isClick, setIsClick] = useState(true);
  const [trigger, setTrigger] = useState('hover');

  useEffect(() => {
      setTrigger(isClick ? 'click' : 'hover');
  }, [isClick]);

  const split = <p style={{ height: 10 }} />

	return (
      <div>
        <Checkbox checked={isClick} onChange={() => {
          setIsClick(!isClick);
        }}>通过 click 触发</Checkbox>
        {split}
        <Popover
          trigger={trigger}
          placement="right"
          content="这是一段文字描述">
          <Button>纯文字</Button>
        </Popover>
        {split}
        <Popover
          trigger={trigger}
          showCancelBtn
          showConfirmBtn
          content={(
            <Input placeholder="请输入" style={{ width: 200 }}/>
          )}>
          <Button>带输入框</Button>
        </Popover>
        {split}
        <Popover
          trigger={trigger}
          size="small"
          placement="right"
          content="这是一段文字描述"
          showCancelBtn
          showConfirmBtn >
          <Button>文字 + btn</Button>
        </Popover>
        {split}
        <Popover
          trigger={trigger}
          content="这是一段文字描述"
          showIcon >
          <Button>文字 + Icon</Button>
        </Popover>
        {split}
        <Popover
          trigger={trigger}
          content="这是一段文字描述"
          iconStyle={{ color: '#e74949' }}
          showIcon >
          <Button>自定义图标</Button>
        </Popover>
        {split}
        <Popover
          trigger={trigger}
          size="small"
          content="这是一段文字描述"
          showIcon
          isReverseBtn
          showCancelBtn
          showConfirmBtn>
          <Button>文字 + Icon + btn</Button>
        </Popover>
        {split}
        <Popover
          trigger={trigger}
          size="small"
          title="标题"
          content="这是一段文字描述">
          <Button>标题</Button>
        </Popover>
        {split}
        <Popover
          trigger={trigger}
          size="small"
          title="标题"
          content="这是一段文字描述"
          showIcon>
          <Button>标题 + Icon</Button>
        </Popover>
        {split}
        <Popover
          trigger={trigger}
          width={300}
          title="标题"
          content="这是一段文字描述"
          showCancelBtn
          showConfirmBtn
          onCancelClick={() => {
            console.log('cancleBtn is clicked');
          }}
          onConfirmClick={() => {
            console.log('confirmBtn is clicked');
          }}>
          <Button>标题 + btn</Button>
        </Popover>
        {split}
        <Popover
          trigger={trigger}
          title="标题"
          content="这是一段文字描述"
          showIcon
          showCancelBtn
          showConfirmBtn
          onCancelClick={() => {
            console.log('cancleBtn is clicked');
          }}
          onConfirmClick={() => {
            const a = new Array(2000).fill(1).reduce((sum, item) => {
              sum += item;
              return sum;
            }, 0);
            Message.error('校验不合法，无法关闭弹窗')
            return a >= 2000;
          }}>
          <Button>标题 + Icon + btn（click 触发）</Button>
        </Popover>
        {split}
        <Popover
          trigger={trigger}
          title="标题"
          content="正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容"
          showIcon
          showCancelBtn
          showConfirmBtn>
          <Button>超长</Button>
        </Popover>
        {split}
        <Popover
          type="remind"
          trigger={trigger}
          content="正文内容正内容正文内容正文内容正文内容正文内容正文内容正内容正文内容正文内容正文内容正文内容">
          <Button>新功能提醒</Button>
        </Popover>
      </div>
	);
}
```
