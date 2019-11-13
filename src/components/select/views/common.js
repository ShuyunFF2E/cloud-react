import React from 'react';
import classnames from 'classnames';
import { prefixCls } from '@utils/config';
import Icon from '../../icon';

export const selector = `${prefixCls}-select`;

export const OptionsEmpty = ({ emptyRender, ...props }) => {
    return <div className={`${selector}-empty-options`} {...props}> { emptyRender } </div>;
}

export const OptionsSearch = ({ searchValue, onOptionsSearch, clearSearch }) => {
    return (
        <div className={`${selector}-search`}>
            <input
                value={searchValue}
                onChange={onOptionsSearch}
                className={`${selector}-search-input`} />
            <Icon
                type="close-circle-solid"
                className={classnames(`${selector}-search-icon`, {
                    show: searchValue
                })}
                onClick={clearSearch} />
        </div>
    )
}
