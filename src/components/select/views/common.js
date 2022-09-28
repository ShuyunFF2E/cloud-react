import React from 'react';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import Icon from '../../icon';
import Input from '../../input';

export const selector = `${prefixCls}-select`;

export const OptionsEmpty = ({ emptyRender, ...props }) => (
  <div className={`${selector}-empty-options`} {...props}>
    {emptyRender || (
      <>
        <img
          src="https://brand-guide.shuyun.com/IAM/276d125f58c2.png"
          alt="缺省"
        />
        暂无数据
      </>
    )}
  </div>
);

export const OptionsSearch = ({
  searchValue,
  onOptionsSearch,
  clearSearch,
  placeholder,
}) => (
  <div className={`${selector}-search`}>
    <Input
      value={searchValue}
      placeholder={placeholder}
      onChange={onOptionsSearch}
      className={`${selector}-search-input`}
    />
    <Icon
      type="search"
      className={classnames(`${selector}-search-icon`)}
      onClick={clearSearch}
    />
  </div>
);
