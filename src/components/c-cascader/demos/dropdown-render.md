---
order: 1
title: 级联选择器
desc: 扩展菜单
---

```jsx

import React, { useState } from 'react';
import { CCascader, Checkbox } from 'cloud-react';

const style = {
  width: '170px',
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
  boxSizing: 'border-box'
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
	const [ checked, setChecked] = useState(false);
    const [ value, setValue ] = useState([['zj']]);
	const [ inputValue, setInputValue] =useState('浙江');

	const onChange = (value, selectedOptions, isSelectedAll) => {
		setValue(value);
    setChecked(!!isSelectedAll);
		setInputValue(value.map(x => x[x.length - 1]).map(x => LABEL_ENUM[x]).join(','));
	}

	const filter = (inputValue, path) => {
		return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	}

    const handleALlChange = value => {
        setChecked(value);
        if (value) {
            const _v = [['zj'], ['fj'], ['bj']];
            setValue(_v);
            setInputValue(_v.flat().map(x => LABEL_ENUM[x]).join(','));
            return;
        }
        setValue([]);
        setInputValue('');
    }
	return (
		<div>
			<div style={{ marginBottom: 24 }}>多选级联组件</div>
			<CCascader
				options={addressOptions}
				onChange={onChange}
				placeholder="Please select"
				value={value}
				multiple
                allowClear
				showSearch={{ filter: filter }}
                dropdownRender={menus => (
                    <div>
                        <Checkbox checked={checked} onChange={handleALlChange} style={{ padding: '8px 12px', width: '90%', borderBottom: '1px solid #e8e8e8' }}>
                            全选
                        </Checkbox>
                        {menus}
                    </div>
                )}>
                  <span
                    placeholder={'请选择'}
                    style={{...style}}
                    title={inputValue}
                    >{inputValue}</span>
            </CCascader>
		</div>
    );
}
```
