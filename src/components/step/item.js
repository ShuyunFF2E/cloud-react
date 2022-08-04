/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls, noop } from '@utils';

import Icon from '../icon';

import { WAIT, FINISH, PROCESS } from './constants';

export default class StepItem extends React.Component {
  static propTypes = {
    status: PropTypes.oneOf([ WAIT, PROCESS, FINISH ]),
    title: PropTypes.any,
    content: PropTypes.any,
    index: PropTypes.number,
    onClick: PropTypes.func,
    icon: PropTypes.element,
    className: PropTypes.string,
  };

  static defaultProps = {
    status: null,
    title: null,
    content: null,
    index: null,
    className: '',
    icon: null,
    onClick: noop,
  };

  render() {
    const {
      index, status, title, content, className, onClick, icon,
    } = this.props;
    const iconNumber = index + 1;

    return (
      <div
        className={classnames(`${prefixCls}-step-item`, status, className, {
          hasContent: content,
        })}
      >
        <div
          className={classnames(
            `${prefixCls}-step-icon`,
            status,
            icon ? 'icon' : null,
          )}
          onClick={onClick}
        >
          {icon
            || (status === FINISH ? (
              <Icon type="finish" />
            ) : (
              <span>{iconNumber}</span>
            ))}
        </div>

        <div className={classnames(`${prefixCls}-step-body`)}>
          {/* title */}
          <div className={classnames(`${prefixCls}-step-title`)}>{title}</div>

          {/* content */}
          {content && (
            <div className={classnames(`${prefixCls}-step-content`)}>
              {content}
            </div>
          )}
        </div>
      </div>
    );
  }
}
