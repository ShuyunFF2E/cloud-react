import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import Icon from '../icon';
import './index.less';

const classSelector = `${prefixCls}-badge`;

export default function Badge(props) {
  const {
    className,
    style,
    mode,
    type,
    number,
    text,
    isSquare,
    color,
    onClick,
  } = props;

  const handleBadgeClick = () => {
    onClick();
  };

  return (
    <span
      className={classnames(
        classSelector,
        `${classSelector}-${mode}`,
        `${classSelector}-${type}`,
        className,
      )}
      style={style}
      onClick={handleBadgeClick}
    >
      {mode === 'message' && <Icon type="remark" className="remark" />}
      {mode === 'number' && (
        <span
          className={`number-container ${isSquare && 'square'}`}
          style={color ? { background: color } : {}}
        >
          {number}
        </span>
      )}
      {mode === 'dot' && <span className="text">{text}</span>}
      {mode === 'custom-dot' && (
        <span className="custom-dot-text">
          <span
            className="custom-dot"
            style={color ? { background: color } : {}}
          />
          <span>{text}</span>
        </span>
      )}
    </span>
  );
}

Badge.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  mode: PropTypes.oneOf([ 'message', 'number', 'dot', 'custom-dot' ]),
  type: PropTypes.oneOf([ 'default', 'success', 'warn', 'fail', 'finish' ]),
  number: PropTypes.number,
  text: PropTypes.string,
  isSquare: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Badge.defaultProps = {
  style: {},
  className: '',
  mode: 'message',
  type: 'default',
  number: 0,
  text: '',
  isSquare: false,
  color: '',
  onClick: () => {},
};
