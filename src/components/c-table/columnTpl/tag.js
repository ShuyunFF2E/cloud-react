import React from 'react';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils';
import Tooltip from '../../tooltip';
import './index.less';

export default function TagTpl({ value, formatValue, maxLength }) {
  const tagList = typeof formatValue === 'function' ? formatValue(value) : value;

  if (!tagList?.length) {
    return '-';
  }

  const max = maxLength || tagList?.length;

  return (
    <ul className={`${prefixCls}-table-column-tpl-tag`}>
      {tagList.slice(0, max)?.map((tag) => (
        <li className={`${prefixCls}-table-column-tpl-tag-item`} key={tag}>
          {tag}
        </li>
      ))}
      {tagList.slice(max).length ? (
        <Tooltip
          className={`${prefixCls}-table-column-tpl-tag-tooltip`}
          theme="light"
          content={
            <ul className={`${prefixCls}-table-column-tpl-tag`}>
              {tagList.slice(max)?.map((tag) => (
                <li
                  className={`${prefixCls}-table-column-tpl-tag-item`}
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
          }
        >
          <li className={`${prefixCls}-table-column-tpl-tag-item more`}>
            +
            {tagList.slice(max).length}
          </li>
        </Tooltip>
      ) : null}
    </ul>
  );
}

TagTpl.propTypes = {
  value: PropTypes.array.isRequired,
  formatValue: PropTypes.func,
};

TagTpl.defaultProps = {
  formatValue: undefined,
};
