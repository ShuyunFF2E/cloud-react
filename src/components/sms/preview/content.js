import React from 'react';
import PropTypes from 'prop-types';

import { NEW_LINE } from '../common/constant';
import './index.less';

function getContent({ preview, signature, gatewayType, unsubscribeText, customSignature }) {

	const content = preview.split(NEW_LINE) || [];
	const len = content.length;

	switch (gatewayType) {
		case 0:
			content[len - 1] = content[len - 1] + unsubscribeText + customSignature;
			break;
		case 1:
		case 5:
			content[len - 1] = content[len - 1] + unsubscribeText + customSignature + signature;
			break;
		case 2:
			content[0] = customSignature + content[0];
			content[len - 1] = content[len - 1] + unsubscribeText;
			break;
		case 3:
		case 4:
			content[0] = signature + customSignature + content[0];
			content[len - 1] = content[len - 1] + unsubscribeText;
			break;
		default:
	}
	return content;
}


export default function Content(props) {

	const { preview, signature, gatewayType, unsubscribeText, customSignature } = props;
	const content = getContent({ preview, signature, gatewayType, unsubscribeText, customSignature });

	return (
		<div className="preview-main">
			<div className="preview-content">
				{
					content.map(item =>
						item.length ? <div key={Math.random()} dangerouslySetInnerHTML={{ __html: item }}></div> : <div key={Math.random()}><br/></div>
					)
				}
			</div>
		</div>
	);
}


Content.propTypes = {
	customSignature: PropTypes.string,
	unsubscribeText: PropTypes.string,
	preview: PropTypes.string,
	signature: PropTypes.string,
	gatewayType: PropTypes.number
};

Content.defaultProps = {
	customSignature: '',
	unsubscribeText: '回T退',
	preview: '',
	signature: '',
	gatewayType: 0
};