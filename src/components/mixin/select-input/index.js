import React from 'react';
import { prefixCls } from '@utils';
import Input from '../../input/index';
import Select from '../../select/index';
import './index.less';

export default function SelectInput({ selectConfig, inputConfig }) {
  const onSelectChange = value => {
    if (selectConfig?.onChange) {
      selectConfig?.onChange(value);
    }
  };

  return (
    <div
      className={`${prefixCls}-search-input`}
    >
      <Select {...selectConfig} onChange={onSelectChange} />
      <Input {...inputConfig} />
    </div>
  );
}
