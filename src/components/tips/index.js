import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils';

import './index.less';

class Tips extends Component {
  render() {
    const { msg, type, style, className } = this.props;

    return (
      <div className={`${type} ${prefixCls}-tips-container ${className}`} style={style}>
        {msg}
      </div>
    );
  }
}

Tips.defaultProps = {
  type: 'normal',
  style: {},
  className: ''
};

Tips.propTypes = {
  msg: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  type: PropTypes.oneOf(['normal', 'warning', 'major']),
  style: PropTypes.object,
  className: PropTypes.string
};

export default Tips;
