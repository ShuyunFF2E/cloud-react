import React, { useState } from 'react';
import './index.less';

export default function LinkTip(props) {

	const [urlOpened, setUrlOpened] = useState(false);

	const { hasUrl } = props;

	function handleClick() {
		setUrlOpened(false);
	}

    return (
		(hasUrl && !urlOpened)
		&& <div className="url-tips">
				输入短链地址时，请在后方加上 #，以确保短链能够正常打开，如 www.shuyun.com#
				<span className="url-tips-close" onClick={handleClick}></span>
			</div>
	)
}
