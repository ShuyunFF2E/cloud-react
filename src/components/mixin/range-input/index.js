import React from 'react';
import { prefixCls } from '@utils';
import Input from '../../input/index';
import './index.less';

export default function RangeInput({ inputConfig1, inputConfig2, disabled, style, borderRadiusSize }) {
  return (
    <div
      style={style || {}}
      className={`${prefixCls}-range-input ${disabled && 'disabled'} ${borderRadiusSize && `border-radius-${borderRadiusSize}`}`}
    >
      <Input {...inputConfig1} className="first-input" />
      <p className="split" />
      <Input {...inputConfig2} className="second-input" />
    </div>
  );
}
