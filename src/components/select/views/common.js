import React from 'react';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import Icon from '../../icon';
import Input from '../../input';

export const selector = `${prefixCls}-select`;

export const OptionsEmpty = ({ emptyRender, ...props }) => {
	return (
		<div className={`${selector}-empty-options`} {...props}>
			{' '}
			{emptyRender}{' '}
		</div>
	);
};

export const OptionsSearch = ({ searchValue, onOptionsSearch, clearSearch, placeholder }) => {
	return (
		<div className={`${selector}-search`}>
      <Input
        value={searchValue}
        placeholder={placeholder}
        onChange={onOptionsSearch}
        suffix={searchValue ? <Icon
            type="close-fill-1"
            className={`${selector}-search-icon`}
            onClick={clearSearch}/>
          :
          <Icon type="search" className={`${selector}-search-icon`}
          />}
        className={`${selector}-search-input`}
      />

		</div>
	);
};
