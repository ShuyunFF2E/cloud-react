---
order: 1
title: 级联选择器
desc: 全选
---

```jsx

/**
   * title: 多选
   * desc: 多选 + 全选功能；全选文案为“全选”；
*/

import React, { useState } from 'react';
import { CCascader } from 'cloud-react';

const style = {
  width: '328px',
  fontSize: '12px',
  display: 'block',
  border: '1px solid #e8e8e8',
  lineHeight: '18px',
  padding: '6px 12px',
  cursor: 'pointer',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  height: '32px',
  boxSizing: 'border-box',
};
const LABEL_ENUM = {
	fj: '贵州 - 黔西南布依族苗族自治州',
	fuzhou: '福州',
	mawei: '马尾',
	mawei1: '马尾1',
	quanzhou: '泉州',
	zj: '浙江',
	hangzhou: '杭州',
	yuhang: '余杭',
	bj: '北京',
	chaoyang: '朝阳区',
	haidian: '海淀区'
}

const addressOptions = [{
  label: '贵州 - 黔西南布依族苗族自治州',
  value: 'fj',
  children: [{
    label: '福州',
    value: 'fuzhou',
    children: [{
      label: '马尾',
      value: 'mawei',
    },{
      label: '马尾1',
      value: 'mawei1',
    }],
  }, {
    label: '泉州',
    value: 'quanzhou',
  }],
}, {
  label: '浙江',
  value: 'zj',
  children: [{
    label: '杭州',
    value: 'hangzhou',
    children: [{
      label: '余杭',
      value: 'yuhang',
    }],
  }],
}, {
  label: '北京',
  value: 'bj',
  children: [{
    label: '朝阳区',
    value: 'chaoyang',
  }, {
    label: '海淀区',
    value: 'haidian',
  }],
}];

export default function Demo() {
	const [ value, setValue ] = useState([['zj']]);
	const [ inputValue, setInputValue] =useState('浙江');

	const onChange = (value, selectedOptions, isSelectedAll) => {
		setValue(value);
		setInputValue(isSelectedAll ? '全部' : value.map(x => x[x.length - 1]).map(x => LABEL_ENUM[x]).join(','));
	}

	const filter = (inputValue, path) => {
		return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	}

	return (
		<div>
			<div style={{ marginBottom: 24 }}>多选级联组件</div>
			<CCascader
            hasSelectAll
            options={addressOptions}
            onChange={onChange}
            placeholder="Please select"
            value={value}
            multiple
            allowClear
            showSearch={{ filter: filter }}>
            <span
                placeholder={'请选择'}
                style={{...style}}
                >{inputValue}</span>
        </CCascader>
		</div>
    );
}
```
