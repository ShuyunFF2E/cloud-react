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
import { filterGroupOption } from '../../utils';

import '../../index.less';

const scrollIntoView = (index) => {
  const els = document.getElementsByClassName(`${selector}-single-options`)[0];
  if (els) {
    els.scrollTop = index * 30;
  }
};

export default function GroupSelect(props) {
  const {
    dataSource,
    value,
    emptyRender,
    onChange,
    className,
    searchValue,
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

  useEffect(() => {
    const result = filterGroupOption(dataSource, searchValue);
    setOptions(result);
  }, [ searchValue ]);

  return (
    <div className={classNames}>
      <div className={`${selector}-single-options`}>
        {views}
        {!views.length && <OptionsEmpty emptyRender={emptyRender} />}
      </div>
    </div>
  );
}

GroupSelect.propTypes = {
  dataSource: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
};

GroupSelect.defaultProps = {
  dataSource: [],
  value: '',
  className: '',
  onChange: noop,
};
