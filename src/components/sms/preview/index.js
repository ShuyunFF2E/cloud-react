import React, { createRef, Component, useContext } from 'react';
import classNames from 'classnames';
import SmsContext from '../SmsContext';
import './index.less';

// 预览模拟🔋等效果
const Header = () => {
	return (
		<div className="preview-header">
			<span className="preview-battery"></span>
		</div>
	);
}

// 预览短信字数统计
const Counter = () => {

	const option = useContext(SmsContext);
	const { totalChars, newLineNumber, variableNumber } = option;

    return (
        <div className="preview-counter">
            <span className="preview-counter-number">{ totalChars }</span>个字（不含变量
			{
				newLineNumber > 0 &&
				<span>
					，含<span className="preview-counter-number">{ newLineNumber }</span>个换行符
				</span>
			}
			），
			<span className="preview-counter-number">{ variableNumber }</span> 个变量
        </div>
    );
}

// 预览tips提示信息
const Tips = () => {

	const option = useContext(SmsContext);
	const { gateway: { wordsLimit = 70, multiLimit = 67 }, isTrimSpace } = option;

	return (
		<div className="preview-tips">
			<p>
				1.当前通道单条短信字数限制 <span className="preview-warning">{ wordsLimit }</span> 个字；超出 { wordsLimit } 个字，按 <span className="preview-warning">{ multiLimit }</span> 字一条计费；
			</p>
			<span>
				{
					isTrimSpace ? '2.上图仅为操作预览，最终字数和计费条数以实际执行时发送为准。' : '2.上图仅为操作预览，变量无固定长度，最终字数和计费条数以实际执行时发送为准，建议先测试执行。'
				}
			</span>
		</div>
	);
}

class Preview extends Component {

	constructor(props) {

		super(props);

		this.ref = createRef();

		this.getPreviewHtml = this.getPreviewHtml.bind(this);
	}

	getPreviewHtml() {
		return this.ref.current.innerText;
	}

	render() {
		return (
			<div className={classNames('preview', this.props.classes)}>
				<div className="preview-mock">
					<Header />
					<SmsContext.Consumer>
						{
							({ previewText }) => (
								<div className="preview-main">
									<div className="preview-content" ref={this.ref}>
										{
											Array.isArray(previewText) && previewText.map(item =>
												item.length ? <div key={Math.random()} dangerouslySetInnerHTML={{ __html: item }}></div> : <div key={Math.random()}><br/></div>
											)
										}
									</div>
								</div>
                            )
						}
					</SmsContext.Consumer>
				</div>
				<Counter />
				<Tips />
			</div>
		)
	}
}

Preview.contextType = SmsContext;



export default Preview;
