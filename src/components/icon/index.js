import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls, loadScript } from '@utils';
import './index.less';

loadScript(
  'https://cloud-cdn.shuyun.com/cloud-fe-iconfont/0.0.2/cloud-react/color/symbol.min.js',
);

const iconPrefixCls = prefixCls === 'cloud' ? 'icon' : `${prefixCls}-icon`;
const Icon = ({
  type, style, className, ...restProps
}) => (
  <i
    className={classNames(
      className,
      `${prefixCls}-icon ${iconPrefixCls}-${type}`,
    )}
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
