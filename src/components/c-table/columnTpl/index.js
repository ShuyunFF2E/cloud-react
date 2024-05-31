import React from 'react';
import PropTypes from 'prop-types';
import NumberTpl from './number';
import TimeTpl from './time';
import { isVoid } from '../util';
import TimeRangeTpl from './timeRange';
import TextTpl from './text';
import LinkTpl from './link';
import MultiTextTpl from './multiText';
import MultiLinkTpl from './multiLink';
import TagTpl from './tag';
import {
  LINK,
  MULTI_LINK,
  MULTI_TEXT,
  NUMBER,
  TAG,
  TEXT,
  TIME,
  TIME_RANGE,
} from '../constant';

const components = {
  [NUMBER]: NumberTpl,
  [TIME]: TimeTpl,
  [TIME_RANGE]: TimeRangeTpl,
  [TEXT]: TextTpl,
  [MULTI_TEXT]: MultiTextTpl, // 废弃
  [LINK]: LinkTpl,
  [MULTI_LINK]: MultiLinkTpl, // 废弃
  [TAG]: TagTpl,
};

export default function ColumnTpl({
  title,
  value,
  row,
  type,
  typeConfig = {},
}) {
  const Com = components[type];
  if (Com) {
    return <Com value={value} row={row} {...typeConfig} />;
  }
  if (isVoid(value)) {
    return title ? '-' : '';
  }
  return value;
}

ColumnTpl.propTypes = {
  numberConfig: PropTypes.object,
  timeConfig: PropTypes.object,
};

ColumnTpl.defaultProps = {
  numberConfig: {},
};
