---
order: 4 title: 基本的表单 desc: 标签描述和控件在一条水平线上
---

```jsx

/**
 * title: radio 和表单混合使用
 * desc: 
 */
import React, { useEffect, useState } from 'react';
import { Radio, Field, Form, Select, Button, Input } from 'cloud-react';

export default function FormHorizontalDemo() {
  const field = Field.useField();

  useEffect(() => {
    field.setValue('numLimitMode', 1);
  }, [])

  const numLimitMode = field.getValue('numLimitMode');

  return (
    <Form fixedError field={field} labelAlign="right" layout="horizontal" labelCol={{ span: 6 }}
          style={{ width: 494, margin: '0 auto' }}>
      <Form.Item label="兑换次数" wrapperStyle={{ position: 'relative', top: 2 }}>
        <Radio.Group
          vertical
          {...field.init('numLimitMode', {
            onChange: value => {
              if (value !== 3) {
                field.validate(['limitCnt', 'limitInterval'], () => {
                });
              }
            }
          })}
        >
          <Radio value={1}>不限次数</Radio>
          <Radio value={2}>仅限领取1次</Radio>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Radio value={3} />
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4
            }}>
              <span>每</span>
              <div>
                <Form.Nexus>
                  <Input
                    disabled={numLimitMode !== 3}
                    {...field.init('limitCnt', {
                      rules: [
                        {
                          validator: (name, value, callback) => {
                            if (field.getValue('numLimitMode') === 3 && !value) {
                              // eslint-disable-next-line node/no-callback-literal
                              callback('请输入');
                            } else {
                              // eslint-disable-next-line node/no-callback-literal
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
                    disabled={numLimitMode !== 3}
                    {...field.init('limitInterval', {
                      initialValue: 'day',
                      rules: [
                        {
                          validator: (name, value, callback) => {
                            if (field.getValue('numLimitMode') === 3 && !value) {
                              // eslint-disable-next-line node/no-callback-literal
                              callback('请输入');
                            } else {
                              // eslint-disable-next-line node/no-callback-literal
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
          </div>
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
