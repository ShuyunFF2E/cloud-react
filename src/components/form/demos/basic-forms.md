---
order: 4 title: 基本的表单 desc: 标签描述和控件在一条水平线上
---

```jsx

/**
 * title: 基本的表单
 * desc: 标签描述和控件在一条水平线上
 */
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  Select,
  InputNumber,
  CPicker as DatePicker,
  ComplexRadio,
  Field,
  TreeSelect
} from 'cloud-react';

const { RangePicker, TimeRangePicker } = DatePicker;

const wrapperStyle = { position: 'relative', top: 2 };

const treeData = [
  {
    id: 11,
    name: '禁止删除节点',
    pId: 1,
    disableRemove: true,
    children: [
      {
        id: 113,
        name: '删除三个',
        pId: 11,
        children: [
          {
            id: 1131,
            name: '禁止删除节点31',
            pId: 113,
            children: []
          },
          {
            id: 1132,
            name: '禁止删除节点32',
            pId: 113,
            children: [
              {
                id: 11321,
                name: '禁止删除节点321',
                pId: 1132,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 114,
        name: '禁止删除节点4',
        pId: 11,
        children: []
      }
    ]
  },
  {
    id: 14,
    name: '未分类',
    pId: 1,
    disableRemove: true,
    disableAdd: true,
    disableRename: true,
    children: []
  }
];

export default function FormHorizontalDemo() {
  const field = Field.useField();
  const [size, setSize] = useState('default');
  const [labelAlign, setLabelAlign] = useState('right');
  const [layout, setLayout] = useState('horizontal');  
  const [disabled, setDisabled] = useState(false);
  const [singleNodes, setSingleNodes] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);

  const [value, setValue] = useState();
  const radioList = [
    { label: '每天', value: 'A', content: '每天筛选前一天的订单' },
    { label: '每3天', value: 'B', content: '每 3 天执行一次，筛选近 3 天的订单' },
    { label: '每7天', value: 'C', content: '每 7 天执行一次，筛选近 7 天的订单' },
  ];

  const onComplexRadioChange = (value) => {
    console.log('AAAA', value);
    setValue(value);
  };

  return (
    <Form fixedError key={`${size}-${labelAlign}-${layout}`} field={field} size={size === 'default' ? undefined : size}
          labelAlign={labelAlign}
          layout={layout}
          labelCol={{ span: 6 }} style={{ width: 494, margin: '0 auto' }}>
      <Form.Item label="设置禁用状态" wrapperStyle={wrapperStyle}>
        <Checkbox value={disabled} checked={disabled} onChange={setDisabled}>禁用表单</Checkbox>
      </Form.Item>
      <Form.Item label="设置表单尺寸" wrapperStyle={wrapperStyle}>
        <Radio.Group value={size} onChange={setSize} horizontal>
          <Radio value="large">large</Radio>
          <Radio value="default">default</Radio>
          <Radio value="small">small</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="设置对齐方式" wrapperStyle={wrapperStyle}>
        <Radio.Group value={labelAlign} onChange={setLabelAlign} horizontal>
          <Radio value="right">right</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="设置布局方式" wrapperStyle={wrapperStyle}>
        <Radio.Group value={layout} onChange={setLayout} horizontal>
          <Radio value="horizontal">horizontal</Radio>
          <Radio value="vertical">vertical</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="活动名称" description="请输入活动名称">
        <Input
          disabled={disabled}
          placeholder="请输入活动名称"
          style={{ width: 328 }}
          {...field.init('activityName', {
            rules: [{ required: true, message: '请输入活动名称' }]
          })}
        />
      </Form.Item>

      <Form.Item label="活动描述">
        <Input.Textarea
          disabled={disabled}
          minRows={2}
          placeholder="请输入活动描述"
          style={{ width: 328, height: 84 }}
          {...field.init('desc', {
            rules: [{ required: true, message: '请输入活动描述' }]
          })}
        />
      </Form.Item>

      <Form.Item label="活动日期">
        <RangePicker
          disabled={disabled}
          minDate={new Date()}
          style={{ width: 328 }}
          {...field.init('activityDate', {
            rules: [{ required: true, message: '请输入活动日期' }]
          })}
        />
      </Form.Item>

      <Form.Item label="订单筛选类型" required wrapperStyle={wrapperStyle}>
        <Radio.Group
          horizontal
          disabled={disabled}
          {...field.init('type', {
            rules: [{ required: true, message: '请选择订单筛选类型' }]
          })}>
          <Radio value={1}>按下单时间</Radio>
          <Radio value={2}>按付款时间</Radio>
          <Radio value={3}>按交易成功事件</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="执行频率" required wrapperStyle={wrapperStyle}>
        <Radio.Group
          disabled={disabled}
          vertical
          onChange={onComplexRadioChange}
          {...field.init('frequency', {
            rules: [{ required: true, message: '请选择执行频率' }]
          })}>
          {radioList.map((item, index) => (
            <ComplexRadio
              title={item.label}
              content={item.content}
              value={item.value}
              disabled={index > 3}
            />
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item label="客户添加渠道" required wrapperStyle={wrapperStyle}>
        <Checkbox.Group
          disabled={disabled}
          {...field.init('channel', {
            rules: [{ required: true, message: '请选择客户添加渠道' }]
          })}>
          <Checkbox value={1}>淘宝</Checkbox>
          <Checkbox value={2}>京东</Checkbox>
          <Checkbox value={3}>苏宁</Checkbox>
          <Checkbox value={4}>蘑菇街</Checkbox>
          <Checkbox value={4}>拼多多</Checkbox>
          <Checkbox value={4}>线下</Checkbox>
          <Checkbox value={4}>有赞</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="金额">
        <InputNumber
          disabled={disabled}
          placeholder="请输入金额"
          {...field.init('payment', {
            rules: [{ required: true, message: '请输入金额' }]
          })}
        />
      </Form.Item>

      <Form.Item label="所在国家-单选" required>
        <Select
          allowClear
          searchable
          disabled={disabled}
          {...field.init('country', {
            rules: [{ required: true, message: '请选择所在国家' }]
          })}>
          <Select.Option value={1}>中国大陆</Select.Option>
          <Select.Option value={2}>美国</Select.Option>
          <Select.Option value={3}>日本</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="多选" required>
        <Select
          allowClear
          maxTagCount={1}
          // searchable
          multiple
          disabled={disabled}
          {...field.init('country1', {
            rules: [{ required: true, message: '请选择' }]
          })}>
          <Select.Option value={1}>A</Select.Option>
          <Select.Option value={2}>B</Select.Option>
          <Select.Option value={3}>C</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="树下拉单选" required>
        <TreeSelect
          searchable
          allowClear
          type="single"
          isUnfold
          containParentNode
          placeholder="选择一个选项"
          style={{ width: 328 }}
          dataSource={treeData}
          value={singleNodes}
          onChange={(_, selectedNodes) => setSingleNodes(selectedNodes)}
        />
      </Form.Item>

      <Form.Item label="树下拉多选" required>
        <TreeSelect
          searchable
          allowClear
          type="multiple"
          isUnfold
          containParentNode
          placeholder="选择一个选项"
          style={{ width: 328 }}
          dataSource={treeData}
          value={selectedNodes}
          onChange={(_, selectedNodes) => setSelectedNodes(selectedNodes)}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button disabled={disabled} type="primary" style={{ marginRight: 10 }} onClick={() => {
          field.validate(err => {
            console.log(err);
            if (!err) {
              console.log(field.getValues())
            }
          })
        }}>
          提交
        </Button>
        <Button disabled={disabled} onClick={() => {
          field.reset();
        }}>重置</Button>
      </Form.Item>
    </Form>
  );
}
```
