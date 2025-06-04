import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls, loadScript } from '@utils';
import './libs/platIconfont';
import { PLAT_MAP } from './constant';
import './index.less';

loadScript(
  'https://cloud-cdn.shuyun.com/fe-publish-asset/0.0.99/libs/cloud-react/icon/color/symbol.min.js',
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
    <use xlinkHref={`#icon-${PLAT_MAP[type] || type}`} />
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
