import React, { Component } from 'react';
import cls from 'classnames';
import RCSlider from 'rc-slider';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils';

import './index.less';

const Slider = ({
  className,
  ...props
}) => {
  return <RCSlider prefixCls={`${prefixCls}-slider`} {...props} />;
};

export default Slider;
