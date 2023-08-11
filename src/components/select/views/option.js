import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Checkbox from '../../checkbox';
import Icon from '../../icon';
import { selector } from './common';
import LightText from './light-text';

import '../index.less';

export default function Option(props) {
  const {
    disabled,
    isSelected,
    multiple,
    className,
    onChange,
    isSupportTitle,
    searchValue,
    supportLightText,
    lightTextColor,
    hideCheckbox,
    onUnlimitedChange,
    ...otherProps
  } = props;

  const getTitle = (arr) => {
    let title = '';
    if (isSupportTitle) {
      title = Array.isArray(arr)
        ? arr.filter((item) => typeof item === 'string').join('')
        : arr;
    }
    return title;
  };

  const getLabel = (originLabel) => {
    if (supportLightText) {
      return (
        <LightText
          keyWords={searchValue || ''}
          originText={originLabel}
          color={lightTextColor}
        />
      );
    }
    return originLabel;
  };

  const onOptionClick = () => {
    if (disabled) return;

    onChange(props);
  };
  const classNames = classnames(
    `${selector}-option`,
    { disabled, selected: isSelected },
    className,
  );

  if (multiple) {
    const { value, children } = otherProps;
    return hideCheckbox ? (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <label
        className={classnames(classNames, `${selector}-multi-option`)}
        onClick={onUnlimitedChange}
      >
        <span title={getTitle(children)}>{getLabel(children)}</span>
      </label>
    ) : (
      <label className={classnames(classNames, `${selector}-multi-option`)}>
        <Checkbox
          checked={isSelected}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
        <span title={getTitle(children)}>{getLabel(children)}</span>
      </label>
    );
  }

  const { children, ...others } = otherProps;

  return useMemo(
    () => (
      <div
        {...others}
        onClick={onOptionClick}
        className={classnames(classNames, `${selector}-multi-option`)}
      >
        <span title={getTitle(children)}>{getLabel(children)}</span>
        {isSelected && (
          <Icon type="finish" className={`${selector}-single-selected-icon`} />
        )}
      </div>
    ),
    [ isSelected, searchValue ],
  );
}

Option.propTypes = {
  disabled: PropTypes.bool,
  isSupportTitle: PropTypes.bool,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
};

Option.defaultProps = {
  disabled: false,
  isSupportTitle: false,
  value: '',
  className: '',
  onChange: noop,
};
