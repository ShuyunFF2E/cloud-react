---
order: 1
title: 输入框
desc: 最基本的一个输入框
---

```jsx

import React, { createRef, useState } from 'react';
import { Mixin, Icon, Input, Radio, Checkbox } from 'cloud-react';
import './styles/basic.less'

export default function InputDemo() {
  const [disabled, setDisabled] = useState(false);
  const [size, setSize ] = useState('default');
  const [borderRadiusSize, setBorderRadiusSize] = useState('default');

  return (
      <div>
        <div style={{ marginBottom: 10 }}>
          <Checkbox checked={disabled} onChange={checked => {
            setDisabled(checked)
          }}>禁用</Checkbox>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Radio.Group value={size} onChange={setSize} horizontal>
            <Radio value="large">large</Radio>
            <Radio value="default">default</Radio>
            <Radio value="small">small</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Radio.Group value={borderRadiusSize} onChange={setBorderRadiusSize} style={{ marginBottom: 20 }}>
            <Radio value="default">圆角：default</Radio>
            <Radio value="medium">圆角：medium</Radio>
            <Radio value="large">圆角：large</Radio>
          </Radio.Group>
        </div>
        <div key={`${size}-${disabled}-${borderRadiusSize}`}>
          <div>
            <h5>两个合并输入框</h5>
            <div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Input
                  defaultValue={2312}
                  style={{ width: 70 }}
                  size={size}
                  disabled={disabled}
                  borderRadiusSize={borderRadiusSize}
                />
                <Input
                  defaultValue="内容"
                  style={{ width: 250 }}
                  placeholder="请输入"
                  size={size}
                  disabled={disabled}
                  borderRadiusSize={borderRadiusSize}
                />
              </div>
            </div>
          </div>
          <div>
            <h5>两个分离输入框</h5>
            <div>
              <Mixin.InputInput
                // 此处配置第一个输入框的属性
                inputConfig1={{
                  style: { width: 50 },
                  maxLength: 50,
                  defaultValue: "+86",
                  size,
                  disabled,
                  borderRadiusSize
                }}
                // 此处配置第二个输入框的属性
                inputConfig2={{
                  style: { width: 250 },
                  maxLength: 50,
                  placeholder: '请输入',
                  size,
                  disabled,
                  borderRadiusSize,
                  onEnter: evt => {
                    console.log(evt);
                  },
                }}
              />
            </div>
          </div>
          <div>
            <h5>分离区间</h5>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Input 
                  defaultValue={12}
                  style={{ width: 70 }}
                  size={size}
                  disabled={disabled}
                  borderRadiusSize={borderRadiusSize}
                />
                <p style={{ width: 8, height: 1, borderBottom: '1px solid rgba(0,0,0,0.65)' }}/>
                <Input
                  defaultValue={200}
                  style={{ width: 70 }}
                  size={size}
                  disabled={disabled}
                  borderRadiusSize={borderRadiusSize}
                />
              </div>
            </div>
          </div>
          <div>
            <h5>合并区间</h5>
            <div>
              <Mixin.RangeInput
                disabled={disabled}
                style={{}}
                borderRadiusSize={borderRadiusSize}
                // 此处配置第一个输入框的属性
                inputConfig1={{
                  style: { width: 100 },
                  maxLength: 50,
                  placeholder: '请输入',
                  size,
                  disabled,
                  borderRadiusSize
                }}
                // 此处配置第二个输入框的属性
                inputConfig2={{
                  style: { width: 100 },
                  maxLength: 50,
                  placeholder: '请输入',
                  size,
                  disabled,
                  borderRadiusSize
                }}
              />
            </div>
          </div>
          <div>
            <h5>下拉框+输入框</h5>
            <Mixin.SelectInput
              // 此处配置下拉框的属性
              selectConfig={{
                style: { width: 110 },
                dropdownStyle: { width: 324 },
                size,
                disabled,
                borderRadiusSize,
                dataSource: [
                  { label: '商品名称', value: 1 },
                  { label: 'sku编码', value: 2 },
                ],
                onChange: value => {
                  console.log(value);
                },
              }}
              // 此处配置输入框的属性
              inputConfig={{
                style: { width: 216 },
                maxLength: 50,
                placeholder: '请输入',
                size,
                disabled,
                borderRadiusSize,
                onEnter: evt => {
                  console.log(evt);
                },
                suffix: (
                  <Icon
                    type="search"
                    onClick={() => {
                      console.log('search');
                    }}
                  />
                ),
              }}
            />
          </div>
        </div>
      </div>
    );
}
```
