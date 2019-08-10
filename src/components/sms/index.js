import React, { cloneElement, createRef, Children, Component } from 'react';
import PropTypes from 'prop-types';

import { convertContent, createTagPreview, getVariableReg, keywordTextNameConvert, parseTag, formatContent, parseHTML, getContent, escapeRegExp } from './common/utils';
import { DEFAULT_TYPE_NAME, HTML_ENTITY_CODE, KEYWORD_SIGN, REG_URL_HASH, NEW_LINE } from './common/constant';

import SmsContext from './SmsContext';

import Preview from './preview';
import Editor from './editor';

class Sms extends Component {

	static Editor = ({ ...props }) => <Editor ref = { props.editorRef } />;

	static Preview = ({ ...props }) => <Preview ref = { props.previewRef }/>;

	constructor(props) {

		super(props);

		this.tempRef = createRef();

		this.editorRef = createRef();

		this.previewRef = createRef();

		this.state = {
			editorText: '',
			previewText: '',
			smsContent: '',
			totalChars: 0,
			newLineNumber: 0,
			variableNumber: 0,
			customSignature: '',
			unsubscribeText: ''
		};

		this.getOuterData = this.getOuterData.bind(this);
	}

	static getDerivedStateFromProps(props, state) {

		const { useUnsubscribe, customSignature, unsubscribeText, gateway, content } = props;

		const _customSignature = customSignature ? `【${customSignature.replace(/</g, '&lt;')}】` : '';
		const _unsubscribeText = useUnsubscribe ? unsubscribeText : '';

		if (state.customSignature !== _customSignature || state.unsubscribeText !== _unsubscribeText || state.gateway !== gateway || state.content !== content) {
			return {
				customSignature: _customSignature,
				unsubscribeText: _unsubscribeText,
				gateway,
				content
			}
		}

		return null;
	}

	componentDidMount() {
		this.resolveContent();
	}


	componentDidUpdate(prevProps) {

		const { useUnsubscribe, customSignature, unsubscribeText, gateway } = this.props;
		const { useUnsubscribe: _useUnsubscribe, customSignature: _customSignature, unsubscribeText: _unsubscribeText, gateway: _gateway } = prevProps;

		if (_useUnsubscribe !== useUnsubscribe || _customSignature !== customSignature || _unsubscribeText !== unsubscribeText || gateway !== _gateway) {
			this.resolveContent();
		}
	}

	/**
	 * @description [对业务方暴露需要的数据]
	 * @returns
	 */
	getOuterData() {

		const { editorText, totalChars, newLineNumber, variableNumber } = this.state;

		return {
			editorText,
			totalChars,
			newLineNumber,
			variableNumber,
			previewText: this.previewRef.current.getPreviewHtml()
		};
	}

	setEditorText = text => {

		const { isTrimSpace, keywords } = this.props;
		const inputReg = getVariableReg();

		let data = text
			.replace(inputReg, (result, $1, $2) => {
				if ($1 === DEFAULT_TYPE_NAME) {
					return `${KEYWORD_SIGN}_${keywordTextNameConvert($2, true, keywords)}_${KEYWORD_SIGN}`;
				}
				return `${KEYWORD_SIGN}_[${$1}]${keywordTextNameConvert($2, true, keywords)}_${KEYWORD_SIGN}`;
			})
			.replace(/<[^>]+>/g, '')
			.replace(/(&nbsp;)|(&lt;)|(&gt;)|(&amp;)/g, result => {
				return HTML_ENTITY_CODE[result];
			});

		if (isTrimSpace) {
			data = data.trim();
		}

		this.setState({
			editorText: data
		});

		this.props.onContentChange(data);

		this.setTotalChars(data);
		this.setNewLineNumber(data);
		this.setVariableNumber(data);
	}

	setPreviewText = (text) => {

		const { isTrimSpace, keywords, gateway } = this.props;
		const { signature, gatewayType } = gateway;
		const { unsubscribeText, customSignature } = this.state;

		const inputReg = getVariableReg();

		this.tempRef.current.innerHTML = text
			.replace(inputReg, (result, $1, $2) => {
				return createTagPreview(keywords, $2, $1);
			});

		// 关键字高亮, URL, 手机及固话号码下划线
		const preview = convertContent(this.tempRef.current.textContent, isTrimSpace)
			.replace(/œ([^œ]+)œ/g, (result, $1) => {
				return `<span class="preview-content-tag">${$1.trim()}</span>`;
			})
			.replace(REG_URL_HASH, result => {
				return `<a href="javascript: void(0);">${result.slice(0, result.length - 1)}</a>#`;
			})
			.replace(/(\D|\b)(1[3-9]\d-?\d{4}-?\d{4})(\D|\b)/g, (match, p1, p2, p3) => {
				return `${p1}<a href="javascript: void(0);">${p2}</a>${p3}`;
			})
			.replace(/(\D)((?:[08][1-9]\d{1,2}-?)?[2-9]\d{6,7})(\D)/g, (match, p1, p2, p3) => {
				return `${p1}<a href="javascript: void(0);">${p2}</a>${p3}`;
			});

		const previewText = getContent({ preview, signature, gatewayType, unsubscribeText, customSignature });

		this.setState({ previewText });
	}

	setTotalChars(editorText) {

		const variableReg = RegExp(`${escapeRegExp(KEYWORD_SIGN)}_(\\[[^]]+])?(.+?)_${escapeRegExp(KEYWORD_SIGN)}`, 'g');

		const { unsubscribeText, customSignature } = this.state;
		const { gateway: { gatewayType, signature } } = this.props;

		const gatewayTypes = [1, 3, 4, 5];
		const gatewayLength = gatewayTypes.indexOf(gatewayType) > 0 ? signature.length : 0;

		const totals = editorText
			.replace(variableReg, '')
			.replace(/þ_enter_þ/g, ' ').length +
			gatewayLength +
			customSignature.length +
			unsubscribeText.length;

		this.setState({ totalChars: totals });
	}

	setNewLineNumber(editorText) {

		this.setState({
			newLineNumber: editorText.split(NEW_LINE).length - 1
		});
	}

	setVariableNumber(editorText) {

		const variableReg = RegExp(`${escapeRegExp(KEYWORD_SIGN)}_(\\[[^]]+])?(.+?)_${escapeRegExp(KEYWORD_SIGN)}`, 'g');

		const varMatch= editorText.match(variableReg);
		const variableNumber = varMatch ? varMatch.length : 0;

		this.setState({
			variableNumber
		});

	}

	handleContent = content => {

		const text = parseHTML(content);

		this.setEditorText(text);
		this.setPreviewText(text);
	}

	resolveContent = () => {

		const { content, keywords, isTrimSpace } = this.props;

		let smsContent = '';

		if (content) {

			const parseTagResult = parseTag(convertContent(content, isTrimSpace), KEYWORD_SIGN, KEYWORD_SIGN, keywords);
			smsContent = formatContent(parseTagResult);

			this.setState({ smsContent });
		}

		this.handleContent(smsContent);
	}

	insertText(text) {
		this.editorRef.current.handleInsertText(text);
	}

	insertKeyword(keyword) {
		this.editorRef.current.handleInsertKeyword(keyword);
	}

	/**
	 * @description [递归渲染传递进来的节点]
	 * @param {*} children
	 * @returns
	 */
	renderChild(children) {

		return Children.map(children, child => {

			if (child.props && child.props.children) {
				return cloneElement(child, {
					...child.props,
					children: this.renderChild(child.props.children)
				});
			}

			if (child.type && child.type.prototype === Sms.Editor.prototype) {
				return cloneElement(child, {
					editorRef: this.editorRef,
					onContentChange: this.props.onContentChange
				});
			}

			if (child.type && child.type.prototype === Sms.Preview.prototype) {
				return cloneElement(child, {
					previewRef: this.previewRef
				});
			}

			return child;
		})
	}

	render() {

		const { smsContent, editorText, previewText, totalChars, newLineNumber, variableNumber } = this.state;
		const { keywords, disabled, gateway, isTrimSpace } = this.props;

		return (
			<SmsContext.Provider
				value={{
					smsContent,
					editorText,
					previewText,
					gateway,
					isTrimSpace,
					totalChars,
					newLineNumber,
					variableNumber,
					disabled,
					keywords,
					onContentChanged: this.handleContent }}>
				{
					this.renderChild(this.props.children)
				}
				<div ref={this.tempRef} style={{ display: 'none' }}></div>
			</SmsContext.Provider>
		);
	}
}

Sms.contextType = SmsContext;

export default Sms;

Sms.propTypes = {
	content: PropTypes.string,
	keywords: PropTypes.array,
	isTrimSpace: PropTypes.bool,
	disabled: PropTypes.bool,
	customSignature: PropTypes.string,
	useUnsubscribe: PropTypes.bool,
	unsubscribeText: PropTypes.string,
	gateway: PropTypes.shape({
		gatewayType: PropTypes.number,
		multiLimit: PropTypes.number,
		wordsLimit: PropTypes.number,
		signature: PropTypes.string
	}),
	onContentChange: PropTypes.func
};

Sms.defaultProps = {
	content: '',
	keywords: [],
	isTrimSpace: false,
	disabled: false,
	customSignature: '',
	useUnsubscribe: false,
	unsubscribeText: '回T退',
	gateway: {},
	onContentChange: () => {}
};
