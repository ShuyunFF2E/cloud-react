import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Counter from './counter';
import Content from './content';
import Tips from './tips';

import './index.less';

// 预览模拟🔋等效果
const Header = () => {
	return (
		<div className="preview-header">
			<span className="preview-battery"></span>
		</div>
	);
}

class Preview extends Component {

	render() {

		const { previewText, editorText, isTrimSpace, customSignature, useUnsubscribe, unsubscribeText, gateway, classes } = this.props;

		const { gatewayType, signature, wordsLimit, multiLimit } = gateway;

		const _customSignature = customSignature ? `【${customSignature.replace(/</g, '&lt;')}】` : '';
		const _unsubscribeText = useUnsubscribe ? unsubscribeText : '';

		return (
			<div className={classNames('preview', classes)}>
				<div className="preview-mock">
					<Header />
					<Content
						customSignature={_customSignature}
						unsubscribeText={_unsubscribeText}
						preview={previewText}
						signature={signature}
						gatewayType={gatewayType}/>
				</div>

				<Counter
					text={editorText}
					customSignature={_customSignature}
					unsubscribeText={_unsubscribeText}
					signature={signature}
					gatewayType={gatewayType}/>

				<Tips isTrimSpace={isTrimSpace} wordsLimit={wordsLimit} multiLimit={multiLimit} />
			</div>
		);
	}
}

Preview.propTypes = {
	previewText: PropTypes.string,
	editorText: PropTypes.string,
	isTrimSpace: PropTypes.bool,
	customSignature: PropTypes.string,
	useUnsubscribe: PropTypes.bool,
	unsubscribeText: PropTypes.string,
	gateway: PropTypes.shape({
		gatewayType: PropTypes.number,
		multiLimit: PropTypes.number,
		wordsLimit: PropTypes.number,
		signature: PropTypes.string
	})
};

Preview.defaultProps = {
	previewText: '',
	editorText: '',
	isTrimSpace: false,
	customSignature: '',
	useUnsubscribe: false,
	unsubscribeText: '',
	gateway: {},
};


export default Preview;
