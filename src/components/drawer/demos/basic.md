---
order: 1
title: Drawer
desc: 抽屉组件基础用法
---

```jsx
import React, { useState, useRef } from 'react';
import { Button, Radio, Drawer, Checkbox, InputNumber, Select } from 'cloud-react';

const placementList = [
  { label: '从左往右开', value: 'left' },
  { label: '从右往左开', value: 'right' },
  { label: '从上往下开', value: 'top' },
  { label: '从下往上开', value: 'bottom' },
];

export default function CTableDemo() {
  const [placement, setPlacement] = useState('left');
  const drawerRef = useRef();
  const [unit, setUnit] = useState('px');
  const [showMask, setShowMask] = useState(false);
  const [wrapperClosable, setWrapperClosable] = useState(false);
  const [size, setSize] = useState(400);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <Radio.Group value={placement} onChange={value => {
        setPlacement(value)
        // drawerRef.current.close();
      }}>
        {placementList.map(item => (
          <Radio value={item.value} key={item.value}>{item.label}</Radio>
        ))}
      </Radio.Group>
      
      <div style={{ display: 'flex', gap: 15 }}>
        <Checkbox checked={showMask} onChange={setShowMask}>展示遮罩层</Checkbox>
        <Checkbox checked={wrapperClosable} onChange={setWrapperClosable}>点击外 部区域/遮罩层 关闭抽屉</Checkbox>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        <span>设置尺寸：</span>
        <InputNumber
          value={size}
          onChange={value => {
            setSize(value);
            // drawerRef.current.close();
          }}
          min={unit === '%' ? 30 : 400} max={unit === '%' ? 80 : 900}
          prevision={0}
          step={unit === '%' ? 10 : 100}
        />
        <Select
          dataSource={[{ label: 'px', value: 'px' }, { label: '%', value: '%' }]}
          value={unit}
          onChange={value => {
            setUnit(value);
            setSize(value === '%' ? 30 : 400);
          }}
        />
      </div>

      <div>
        <Button type="primary" onClick={() => {
          drawerRef.current.open();
        }}>点我打开</Button>

        <Button style={{ marginLeft: 15 }} className="do-not-close-drawer">
          点我不会关闭
        </Button>
      </div>
      
      <div>
        <Drawer
          style={{ padding: 16 }}
          ref={drawerRef}
          placement={placement}
          title="这里是标题"
          excludeClassList={['do-not-close-drawer']}
          size={unit === '%' ? `${size}%` : `${size}px`}
          showMask={showMask}
          wrapperClosable={wrapperClosable}
          onCloseAfter={() => {
            console.log('关闭了');
          }}>
          <div>
            <p style={{ height: 2000 }}>这里是内容</p>
            <p>结尾</p>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
```
