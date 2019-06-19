import React from 'react';
import PropTypes from 'prop-types';

import { KEYWORD_SIGN, NEW_LINE } from '../common/constant';
import { escapeRegExp } from '../common/utils';

import './index.less';

function getLengthByGatewayType(type, signature) {
	return type === 1 || type === 3 || type === 4 || type === 5 ? signature.length : 0;
}

// 统计固定文字的字数
const TotalChar = (props) => {

	const { text, variableReg, gatewayType, signature, customSignature, unsubscribeText } = props;

	const total = text
		.replace(variableReg, '')
		.replace(/þ_enter_þ/g, '').length +
		getLengthByGatewayType(gatewayType, signature) +
		customSignature.length +
		unsubscribeText.length;

	return (
		<>
			<span className="preview-counter-number">{ total }</span>个字（不含变量
		</>
	);
}

// 换行符统计
const NewLine = (props) => {

	const { text } = props;
	const newLineNumber = text.split(NEW_LINE).length - 1;

	return (
		newLineNumber > 0 &&
			<span>
				，含<span className="preview-counter-number">{ newLineNumber }</span>个换行符
			</span>
	);
}

// 变量统计
const Variable = (props) => {

	const { text, variableReg } = props;
	const varMatch = text.match(variableReg);
	const variables = varMatch ? varMatch.length : 0;

	return (
		<>
			<span className="preview-counter-number">{ variables }</span> 个变量
		</>
	);
}

export default function Counter(props) {

	const variableReg = RegExp(`${escapeRegExp(KEYWORD_SIGN)}_(\\[[^]]+])?(.+?)_${escapeRegExp(KEYWORD_SIGN)}`, 'g');

	return (
		<div className="preview-counter">
			<TotalChar  variableReg={variableReg} {...props} />
			<NewLine text={props.text} />
			），
			<Variable variableReg={variableReg} {...props} />
		</div>
	);
}

Counter.propTypes = {
	text: PropTypes.string,
	customSignature: PropTypes.string,
	unsubscribeText: PropTypes.string,
	signature: PropTypes.string,
	gatewayType: PropTypes.number
};

Counter.defaultProps = {
	text: '',
	customSignature: '',
	unsubscribeText: '',
	signature: '',
	gatewayType: 0
};
