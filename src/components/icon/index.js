import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls, loadScript } from '@utils';
import './index.less';


const Icon = ({
  type, style, className, ...restProps
}) => {
  useEffect(() => {
    loadScript(
      'https://cloud-cdn.shuyun.com/fe-publish-asset/0.0.37/libs/cloud-react/icon/color/symbol.min.js',
    );
  }, []);
  return (
    <i
      className={classNames(className, `${prefixCls}-icon icon-${type}`)}
      style={style}
      {...restProps}
    />
  );
};

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
