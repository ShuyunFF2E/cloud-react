import React from 'react';
import './index.less';

export default function LinkTip(props) {

	const { hasInvalidString, invalidStringClosed, onHandleCloseInvalidString } = props;

    return (
		(hasInvalidString && !invalidStringClosed)
		&&  <div className="url-tips">
				您输入的短信内容中含非法字符，已进行过滤。
				<span className="url-tips-close" onClick={onHandleCloseInvalidString}></span>
			</div>
	)
}
