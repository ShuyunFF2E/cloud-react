import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls } from '@utils';
import './libs/symbol.min.js';
import './index.less';

const Icon = ({
  type, style, className, ...restProps
}) => (
  <i
    className={classNames(className, `${prefixCls}-icon icon-${type}`)}
    style={style}
    {...restProps}
  />
);

const ColorIcon = ({
  type, style, className, ...restProps
}) => (
  <svg
    aria-hidden="true"
    className={classNames(className, `${prefixCls}-color-icon`)}
    style={style}
    {...restProps}
  >
    <use xlinkHref={`#icon-${type}`} />
  </svg>
);

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Icon.defaultProps = {
  style: {},
};

Icon.ColorIcon = ColorIcon;

export default Icon;
