import React from 'react';
import { prefixCls } from '@utils';
import Input from '../../input/index';
import './index.less';

export default function InputInput({ inputConfig1, inputConfig2 }) {
  return (
    <div
      className={`${prefixCls}-input-input`}
    >
      <Input {...inputConfig1} className="first-input" />
      <Input {...inputConfig2} className="second-input" />
    </div>
  );
}
