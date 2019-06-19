import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

function getNormalTip(isTrimSpace) {
	return isTrimSpace ? '2.上图仅为操作预览，最终字数和计费条数以实际执行时发送为准。' : '2.上图仅为操作预览，变量无固定长度，最终字数和计费条数以实际执行时发送为准，建议先测试执行。';
}
// 短信计费规则友情提示
export default function Tips(props) {

	const { isTrimSpace, wordsLimit, multiLimit } = props;

	return (
		<div className="preview-tips">
			<p>
				1.当前通道单条短信字数限制 <span className="preview-warning">{wordsLimit}</span> 个字；超出 {wordsLimit} 个字，按 <span className="preview-warning">{multiLimit}</span> 字一条计费；
			</p>
			<span>{ getNormalTip(isTrimSpace) }</span>
		</div>
	);
}

Tips.propTypes = {
	isTrimSpace: PropTypes.bool,
	wordsLimit: PropTypes.number,
	multiLimit: PropTypes.number
};

Tips.defaultProps = {
	isTrimSpace: false,
	wordsLimit: 70,
	multiLimit: 67
};
