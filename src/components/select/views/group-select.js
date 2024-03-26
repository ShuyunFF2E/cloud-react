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

import { OptionsEmpty, OptionsSearch, selector } from './common';
import { filterGroupOption } from '../utils';

import '../index.less';

const scrollIntoView = (index) => {
  const els = document.getElementsByClassName(`${selector}-single-options`)[0];
  if (els) {
    els.scrollTop = index * 30;
  }
};

export default function GroupSelect(props) {
  const {
    dataSource,
    searchable,
    value,
    emptyRender,
    onChange,
    onSearch,
    searchPlaceholder,
    className,
    searchInBox,
    searchValue,
    onSearchValueChange: setSearchValue,
  } = props;
  const [ options, setOptions ] = useState(dataSource);
  const classNames = classnames(
    `${selector}-group-select-options ${selector}-select-options`,
    className,
  );
  let selectIndex = 0;

  useEffect(() => {
    scrollIntoView(selectIndex);
  }, []);

  const views = useMemo(
    () => Children.map(options, (child, index) => {
      const _children = child.props.children || [];
      const result = _children.map((c) => {
        if (Array.isArray(c)) {
          return c.map((cc) => {
            const childValue = cc.props.value;
            if (value === childValue) {
              selectIndex = index;
            }

            return cloneElement(cc, {
              ...cc.props,
              isSelected: value === childValue,
              onChange,
            });
          });
        } else {
          return cloneElement(c);
        }
      });
      return result;
    }),
    [ options, value ],
  );

  const onOptionsSearch = (e) => {
    const { value: search } = e.target;
    setSearchValue(search);
    onSearch(search);
  };

  const clearSearch = () => setSearchValue('');

  useEffect(() => {
    const result = filterGroupOption(dataSource, searchValue);
    setOptions(result);
  }, [ searchValue ]);

  return (
    <div className={classNames}>
      <div className={`${selector}-single-options`}>
        {searchable && !searchInBox && (
          <OptionsSearch
            searchValue={searchValue}
            placeholder={searchPlaceholder}
            onOptionsSearch={onOptionsSearch}
            clearSearch={clearSearch}
          />
        )}
        {views}
        {!views.length && <OptionsEmpty emptyRender={emptyRender} />}
      </div>
    </div>
  );
}

GroupSelect.propTypes = {
  dataSource: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

GroupSelect.defaultProps = {
  dataSource: [],
  searchable: false,
  searchPlaceholder: '',
  value: '',
  className: '',
  onChange: noop,
  onSearch: noop,
};
