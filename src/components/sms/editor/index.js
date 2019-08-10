import React, { createRef, Component } from 'react';
import classNames from 'classnames';

import { BRACKET_REG, REG_URL, REG_URL_HASH } from '../common/constant';
import { createInput, isFirefox, focusNode } from '../common/utils';
import controlFirefoxCursor from '../common/firefoxHelper';

import Keyword from './keyword';
import Tips from './tip';
import SmsContext from '../SmsContext';

import './index.less';

class Editor extends Component {

	constructor(props) {

		super(props);

		// 移除 __moz_resizing
		if(isFirefox()) {
			document.designMode = 'on';
			document.execCommand('enableObjectResizing', false, 'false');
			document.designMode = 'off';
		}

		this.smsInput = createRef();

		this.state = {
			hasUrl: false,
			hasInvalidString: false,
			invalidStringClosed: false,
			contentWidth: 200
		}

		// 对外暴露插入文本 和 变量 的方法
		this.handleInsertText = this.handleInsertText.bind(this);
		this.handleInsertKeyword = this.handleInsertKeyword.bind(this);
	}

	componentDidMount() {

		this.checkEmpty();

		this.setState({
			contentWidth: this.smsInput.current.clientWidth
		});
	}

	handlePaste = (event) => {

		const htmlContent = event.clipboardData.getData('text/html');

		if (htmlContent.indexOf('sms-keyword-inserted') > -1 || htmlContent.indexOf('data-emo-name') > -1) {
			// TODO: 后期考虑使用 <p> 标签做段落处理, 这样可以使用 br 作为行内换行
			if (isFirefox) {
				// 临时处理 删除导致换行的 html 标签
				event.preventDefault();
				document.execCommand('insertHTML', false, htmlContent.replace(/<div>/g, '').replace(/<\/div>/g, '').replace(/<br>/g, ''));
				return;
			}
			return;
		}

		event.preventDefault();

		const textContent = event.clipboardData.getData('text/plain');
		const hasError = BRACKET_REG.test(textContent);

		this.setState({
			hasInvalidString: hasError,
			invalidStringClosed: !hasError
		});

		if (isFirefox) {
			document.execCommand('insertText', false, textContent.replace(BRACKET_REG, '').replace('\n', ''));
		} else {
			document.execCommand('insertText', false, textContent.replace(BRACKET_REG, ''));
		}
	}

	/**
	 * 清除火狐下多出来的br标签
	 */
	clearMozBr = () => {

		const br = this.smsInput.current.querySelector('br[type=_moz]');

		if (br) {
			br.parentNode.removeChild(br)
		}
	}

	/**
	 * @description [处理编辑器内容发生改变的事件]
	 * @memberof Editor
	 */
	onChange = event => {

		this.clearMozBr();

		const { target } = event;
		const { nodeName } = target;

		if (event && (nodeName === 'INPUT' || nodeName === 'IMG')) {
			focusNode(target);
		}

		this.rememberFocus();

		const htmlContent = this.smsInput.current.innerHTML;

		if (BRACKET_REG.test(htmlContent)) {

			// 记录初始光标
			const nodes = [].slice.call(this.smsInput.current.childNodes);
			const node = this._range.startContainer;
			const inputContent = this._range.startContainer.textContent;

			const offset = this._range.startOffset - 1;
			let	caretNodeIndex = nodes.indexOf(node);

			if (/^[【】]/.test(inputContent)) {
				caretNodeIndex -= 1;
			}

			// 修改 HTML
			this.smsInput.current.innerHTML = htmlContent.replace(BRACKET_REG, '');

			// 恢复光标
			const selection = window.getSelection();
			const range = document.createRange();

			selection.removeAllRanges();

			const newPosNode = this.smsInput.current.childNodes[caretNodeIndex];

			if (!newPosNode) {

				// 输入位置在头部
				range.selectNode(this.smsInput.current.firstChild);
				range.collapse(true);
			} else if (newPosNode.nodeType !== 3) {
				// 变量之后
				range.selectNode(newPosNode);
				range.collapse();
			} else {
				// 文字之间
				range.setStart(newPosNode, offset);
				range.setEnd(newPosNode, offset);
			}

			selection.addRange(range);
		} else {

			const { editorText, onContentChanged } = this.context;

			onContentChanged(htmlContent);
			this.checkEmpty();

			this.setState({
				hasUrl: REG_URL.test(editorText) && !REG_URL_HASH.test(editorText)
			});
		}
	}

	handleCloseInvalidString = () => {

		const { invalidStringClosed } = this.state;

		this.setState({
			invalidStringClosed: !invalidStringClosed
		});
	};

	handleKeyDown = event => {
		if(isFirefox()) {
			controlFirefoxCursor(event);
		}
	};

	/**
	 * 重新定位光标
	 * - 如果记忆了光标位置, 返回
	 * - 如果之前没有操作过, 则定位到文本框最后
	 */
	reFocus = () => {

		if (this._range) {

			const selection = window.getSelection();

			selection.removeAllRanges();

			if (this._range.commonAncestorContainer.parentNode.nodeName === 'A') {

				const range = document.createRange();

				range.selectNodeContents(this.smsInput.current);
				range.collapse(false);
				selection.removeAllRanges();
				selection.addRange(range);

			} else {
				selection.addRange(this._range);
			}
		} else {

			this.smsInput.current.focus();

			const range = document.createRange();

			range.selectNodeContents(this.smsInput.current);
			range.collapse(false);

			const selection = window.getSelection();

			selection.removeAllRanges();
			selection.addRange(range);
		}
	};

	/**
	 * 往短信编辑器中插入文本
	 * @param {string} text - 文本
	 */
	handleInsertText(text) {

		this.reFocus();
		// 此处不能使用insertText，会出现focus焦点错误
		document.execCommand('insertHTML', false, text);

		this.handleInsertAfter();
	}

	/**
	 * 往短信编辑器中插入标签
	 * @param {string} text - 标签名
	 * @param {string} type - 标签类型
	 */
	handleInsertKeyword({ text, type }) {

		this.reFocus();

		document.execCommand('insertHTML', false, createInput(text, type));

		this.handleInsertAfter();

	}

	/**
	 * 处理插入文本 和 变量后的公共事件
	 */
	handleInsertAfter() {

		this.clearMozBr();

		this.context.onContentChanged(this.smsInput.current.innerHTML);

		this.checkEmpty();

		if (this._range) {

			const { startContainer, startOffset } = this._range;
			const { nodeType, childNodes, nextSibling } = startContainer;

			if (nodeType === 1) {
				this._range = focusNode(childNodes[startOffset]);
			} else if (nodeType === 3 && (startContainer.length === startOffset && nextSibling)) {
				this._range = focusNode(nextSibling);
			}
		}
	}

	/**
	 * 如果文本编辑器为空, 为其添加 empty 样式
	 */
	checkEmpty() {

		const currentElement = this.smsInput.current;

		if (currentElement.innerHTML === '<br>') {
			currentElement.innerHTML = '';
		}

		currentElement.parentNode.classList[currentElement.innerHTML.length ? 'remove' : 'add']('empty');
	}

	/**
	*  记录光标在编辑器中的位置
	*/
	rememberFocus() {

		const selection = window.getSelection();

		if (selection.rangeCount) {
			this._range = selection.getRangeAt(0);
		}
	 }

	render() {

        const { hasInvalidString, invalidStringClosed, hasUrl, contentWidth } = this.state;

        const classes = classNames('editor-content', {
            'empty': this.context.smsContent.length === 0
        });

		return (
			<div className="editor">

				<Keyword contentWidth={contentWidth} onInsertKeyword={this.handleInsertKeyword} />

				<div className={classes}>

					<SmsContext.Consumer>
                        {
                            ({ disabled, smsContent }) => (
                                <div className="editor-content-main"
                                    ref={this.smsInput}
                                    contentEditable={!disabled}
                                    dangerouslySetInnerHTML={{ __html: smsContent }}
                                    onKeyDown={this.handleKeyDown}
                                    onKeyUp={this.onChange}
                                    onMouseUp={this.onChange}
                                    onPaste={this.handlePaste}>
                                </div>
                            )
                        }
                    </SmsContext.Consumer>

                    <Tips
                        hasUrl={hasUrl}
                        hasInvalidString={hasInvalidString}
						invalidStringClosed={invalidStringClosed}
						onHandleCloseInvalidString={this.handleCloseInvalidString} />

				</div>
			</div>
		);
	}
}

Editor.contextType = SmsContext;

export default Editor;
