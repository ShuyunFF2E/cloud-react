import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils';
import Icon from '../icon';

import './index.less';

const IconTypes = {
  normal: 'info-circle1',
  warning: 'close-fill-1',
  major: 'info_2',
  success: 'success-fill',
};

class Tips extends Component {
  render() {
    const { msg, type, style, className, isShowIcon } = this.props;

    return (
      <div
        className={`${type} ${prefixCls}-tips-container ${className} ${
          isShowIcon ? 'has-icon' : ''
        }`}
        style={style}
      >
        {isShowIcon && <Icon type={IconTypes[type]} className="tip-icon" />}
        {msg}
      </div>
    );
  }
}

Tips.defaultProps = {
  type: 'normal',
  style: {},
  className: '',
  isShowIcon: false,
};

Tips.propTypes = {
  msg: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  type: PropTypes.oneOf(['normal', 'warning', 'major', 'success']),
  style: PropTypes.object,
  className: PropTypes.string,
  isShowIcon: PropTypes.bool,
};

export default Tips;
