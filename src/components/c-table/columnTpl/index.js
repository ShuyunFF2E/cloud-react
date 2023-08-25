import React from 'react';
import PropTypes from 'prop-types';
import NumberTpl from './number';
import TimeTpl from './time';
import { isVoid } from '../util';
import { NUMBER, TIME } from '../constant';

const components = {
  [NUMBER]: NumberTpl,
  [TIME]: TimeTpl,
};

export default function ColumnTpl({ value, type, typeConfig = {} }) {
  const Com = components[type];
  if (Com) {
    return <Com value={value} {...typeConfig} />;
  }
  return isVoid(value) ? '-' : value;
}

ColumnTpl.propTypes = {
  numberConfig: PropTypes.object,
  timeConfig: PropTypes.object,
};

ColumnTpl.defaultProps = {
  numberConfig: {},
};
