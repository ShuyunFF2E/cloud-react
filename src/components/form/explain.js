import React from 'react';
import classnames from 'classnames';
import { prefixCls } from '@utils/config';

export default function Explain({ children, className }) {
	return children && <div className={classnames(`${prefixCls}-form-item-explain`, className)}>{children}</div>;
}
