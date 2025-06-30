import React, {
  Children,
  cloneElement,
  useMemo,
  useState,
  useEffect,
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@utils';

import { OptionsEmpty, selector } from '../common';
import { filterOptions } from '../../utils';

import '../../index.less';

const scrollIntoView = (index) => {
  const els = document.getElementsByClassName(`${selector}-single-options`)[0];
  if (els) {
    els.scrollTop = index * 30;
  }
};

export default function SingleSelect(props) {
  const {
    dataSource,
    value,
    emptyRender,
    onChange,
    className,
    searchValue = '',
    labelKey,
    onHoverChange = noop,
    dropdownConfig,
    selectInfoKey,
    open,
  } = props;
  const [ options, setOptions ] = useState(dataSource);
  const [hoveredOption, setHoveredOption] = useState(null);
  const classNames = classnames(`${selector}-select-options`, className);
  let selectIndex = 0;

  useEffect(() => {
    scrollIntoView(selectIndex);
  }, []);

  useEffect(() => {
    setHoveredOption(null);
    onHoverChange(null);
  }, [open]);

  const handleOptionHover = (item) => {
    setHoveredOption(item);
    onHoverChange(item);
  };

  const views = useMemo(
    () => Children.map(options, (child, index) => {
      const childValue = child.props.value;
      if (value === childValue) {
        selectIndex = index;
      }

      return cloneElement(child, {
        ...child.props,
        isSelected: value === childValue,
        onChange,
        onHover: (item) => item && handleOptionHover(item, index),
        item: child.props.item,
      });
    }),
    [ options, value ],
  );

  useEffect(() => {
    const result = filterOptions(dataSource, searchValue, labelKey);
    setOptions(result);
  }, [ searchValue ]);

  return (
    <div className={`${selector}-select-panel-container`}>
      <div
        className={classNames}
        style={hoveredOption?.[selectInfoKey] ? { display: 'flex', flex: 1, position: 'relative' } : {}}
      >
        <div
          className={`${selector}-single-options`}
          style={
            dropdownConfig?.width
              ? { width: dropdownConfig.leftWidth, minWidth: dropdownConfig.leftWidth }
              : {}
          }
        >
          {views}
          {!views.length && <OptionsEmpty emptyRender={emptyRender} />}
        </div>
        {hoveredOption?.[selectInfoKey] && (
          <div
            className={`${selector}-info-panel`}
            style={{ top: 0 }}
          >
            <div className={`${selector}-info-panel-title`}>{hoveredOption.label || hoveredOption.value}</div>
            <div className={`${selector}-info-panel-content`}>{hoveredOption?.[selectInfoKey]}</div>
          </div>
        )}
      </div>
    </div>
  );
}

SingleSelect.propTypes = {
  dataSource: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
};

SingleSelect.defaultProps = {
  dataSource: [],
  value: '',
  className: '',
  onChange: noop,
};
