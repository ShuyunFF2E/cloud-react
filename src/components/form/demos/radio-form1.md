---
order: 4 title: 基本的表单 desc: 标签描述和控件在一条水平线上
---

```jsx

/**
 * title: radio 和表单混合使用
 * desc: 
 */
import React, { useState, useEffect } from 'react';
import { Radio, ComplexRadio, Field, Form, Select, Button, Input } from 'cloud-react';

const wrapperStyle = { position: 'relative', top: 2 };

export default function FormHorizontalDemo() {
  const field = Field.useField();

  useEffect(() => {
    field.setValue('numLimitMode', 1);
  }, [])
  
  const numLimitMode = field.getValue('numLimitMode');

  return (
    <Form fixedError field={field} labelAlign="right" layout="horizontal" labelCol={{ span: 6 }} style={{ width: 494, margin: '0 auto' }}>
      <Form.Item label="兑换次数" wrapperStyle={{ position: 'relative', top: 2 }}>
        <Radio.Group
          vertical
          {...field.init('numLimitMode')}
        >
          <ComplexRadio
            title="按标签筛选"
            content=""
            value={1}
          />
          {numLimitMode === 1 && (
            <Form.Item>
              <Select
                style={{ width: 250 }}
                {...field.init('tag', {
                  rules: [
                    {
                      validator: (name, value, callback) => {
                        if (field.getValue('numLimitMode') === 1 && !value) {
                          callback('请选择');
                        } else {
                          callback('');
                        }
                      }
                    }
                  ]
                })}
                allowClear
                dataSource={[{ label: '标签1', value: 'tag1' }, { label: '标签2', value: 'tag2' }]}
              />
            </Form.Item>
          )}
          <ComplexRadio
            title="按OpenID匹配"
            content="支持手动匹配和导入匹配"
            value={2}
          />
          {numLimitMode === 2 && (
            <div style={{
              width: 400,
              background: '#fafafa',
              padding: 20,
              marginLeft: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 15
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, }}>
                <span>每</span>
                <div>
                  <Form.Nexus>
                    <Input
                      disabled={numLimitMode !== 2}
                      {...field.init('limitCnt', {
                        rules: [
                          {
                            validator: (name, value, callback) => {
                              if (field.getValue('numLimitMode') === 2 && !value) {
                                callback('请输入');
                              } else {
                                callback('');
                              }
                            }
                          },
                        ],
                      })}
                      style={{ width: 120 }}
                      placeholder="请输入"
                    />
                  </Form.Nexus>
                </div>
                <div>
                  <Form.Nexus>
                    <Select
                      disabled={numLimitMode !== 2}
                      {...field.init('limitInterval', {
                        initialValue: 'day',
                        rules: [
                          {
                            validator: (name, value, callback) => {
                              if (field.getValue('numLimitMode') === 2 && !value) {
                                callback('请输入');
                              } else {
                                callback('');
                              }
                            }
                          },
                        ],
                      })}
                      placeholder=""
                      style={{ width: 60 }}
                      dataSource={[
                        { label: '天', value: 'Day' },
                        { label: '月', value: 'Month' },
                        { label: '年', value: 'PerYear' },
                      ]}
                    />
                  </Form.Nexus>
                </div>
                <span>可领</span>
              </div>
              <div>其他配置</div>
            </div>
          )}
          <ComplexRadio
            title="全部粉丝"
            content="说明说明说明说明说明说明说明说明说明说明"
            value={3}
          />
        </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button type="primary" style={{ marginRight: 10 }} onClick={() => {
          field.validate(err => {
            console.log(err);
            if (!err) {
              console.log(field.getValues())
            }
          })
        }}>
          提交
        </Button>
        <Button onClick={() => {
          field.reset();
        }} type="secondary">重置</Button>
      </Form.Item>
    </Form>
  );
}
```
