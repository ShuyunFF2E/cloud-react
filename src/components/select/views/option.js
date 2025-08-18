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
    type,
    className,
    onChange,
    isSupportTitle,
    searchValue,
    supportLightText,
    lightTextColor,
    hideCheckbox,
    onUnlimitedChange,
    scrollItem,
    searchable,
    optionRender,
    onHover = noop,
    item,
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
    if (searchable && supportLightText && !optionRender) {
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
    onHover(null);
  };
  const classNames = classnames(
    `${selector}-option ${scrollItem ? 'scroll-item' : 'overflow-ellipsis'}`,
    { disabled, selected: isSelected },
    className,
  );

  const handleMouseEnter = () => {
    if (onHover && item) {
      onHover(item);
    }
  };
  const handleMouseLeave = () => {
    if (onHover) {
      onHover(null);
    }
  };

  if (multiple) {
    const { value, children, checkboxStyle } = otherProps;
    return hideCheckbox ? (
      <label
        className={classnames(classNames, `${selector}-multi-option`)}
        onClick={onUnlimitedChange}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="option-content" title={getTitle(children)}>{getLabel(children)}</span>
      </label>
    ) : (
      <label
        className={classnames(classNames, `${selector}-multi-option`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Checkbox
          style={checkboxStyle || {}}
          checked={isSelected}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
        <span className="option-content" title={getTitle(children)}>{getLabel(children)}</span>
      </label>
    );
  }

  const renderDivider = () => <div className="divider" />;

  const { children, ...others } = otherProps;

  return useMemo(
    () => type && type === 'divider' ? (
      renderDivider()
    ) : (
      <div
        {...others}
        onClick={onOptionClick}
        className={classNames}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="option-content" title={getTitle(children)}>{getLabel(children)}</span>
        {isSelected && (
          <Icon
            type="finish"
            className={`${selector}-single-selected-icon`}
          />
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
