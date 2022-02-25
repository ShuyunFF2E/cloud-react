import React from 'react';
import { Resizable } from 'react-resizable';
import { tablePrefixCls } from './constant';

export default function ResizableTitle(props) {
  const { onResize, width, ...resetProps } = props;
  return (
    <Resizable
      width={width || 60}
      height={0}
      className={`${tablePrefixCls}-resizeable`}
      onResize={onResize}
    >
      <th {...resetProps} />
    </Resizable>
  );
}
