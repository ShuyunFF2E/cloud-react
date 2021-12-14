import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Checkbox from '../../checkbox';
import Icon from '../../icon';
import { selector } from './common';

import '../index.less';

export default function Option(props) {
  const { disabled, isSelected, multiple, className, onChange, isSupportTitle, ...otherProps } = props;

  const getTitle = arr => {
    let title = '';
    if (isSupportTitle) {
      title = Array.isArray(arr) ? arr.filter(item => typeof item === 'string').join('') : arr;
    }
    return title;
  };

  const onOptionClick = () => {
    if (disabled) return;

    onChange(props);
  };
  const classNames = classnames(`${selector}-option`, { disabled, selected: isSelected }, className);

  if (multiple) {
    const { value, showText, children } = otherProps;
    const childrenType = typeof children === 'string';
    return (
      <label className={classnames(classNames, `${selector}-multi-option`)}>
        <Checkbox checked={isSelected} disabled={disabled} value={value} onChange={onChange}/>
        {
          childrenType ? <span title={getTitle(children)} dangerouslySetInnerHTML={{ __html: showText }}/> :
            <span title={getTitle(children)}>{children}</span>
        }
      </label>
    );
  }

  const { children, showText, ...others } = otherProps;
  const childrenType = typeof children === 'string';
  return useMemo(
    () => (
      <div {...others} onClick={onOptionClick} className={classnames(classNames, `${selector}-option-single`)}>
        {
          childrenType ?
            <span className={`${selector}-option-single-text`} title={getTitle(children)}
                  dangerouslySetInnerHTML={{ __html: showText }}/> :
            <span className={`${selector}-option-single-text`} title={getTitle(children)}>{children}</span>
        }
        {isSelected && <Icon type="finish" className={`${selector}-single-selected-icon`}/>}
      </div>
    ),
    [isSelected, showText]
  );
}

Option.propTypes = {
  disabled: PropTypes.bool,
  isSupportTitle: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onChange: PropTypes.func
};

Option.defaultProps = {
  disabled: false,
  isSupportTitle: false,
  value: '',
  className: '',
  onChange: noop
};
