import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

const Icon = ({
  type, style, className, ...restProps
}) => (
  <i
    className={classNames(className, `cloud-icon icon-${type}`)}
    style={style}
    {...restProps}
  />
);

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Icon.defaultProps = {
  style: {},
};

export default Icon;
