import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';

import codeIcon from './assets/code.svg';

import classes from './index.less';

hljs.registerLanguage('javascript', javascript);

const CSS_SELECTOR = /[^{}]+\{[^}]*\}/gi;
const STYLE_TYPE = 'text/css';

class CodeBox extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		desc: PropTypes.string,
		code: PropTypes.string,
		css: PropTypes.string,
		children: PropTypes.node
	};

	static defaultProps = {
		title: '标题',
		desc: '描述',
		code: '',
		css: '',
		children: ''
	}

	constructor(props) {
		super(props);

		this.codeBlock = React.createRef();

		const selectors = props.css.match(CSS_SELECTOR);

		// TODO - 如果创建过一次，下次就不应该再创建，需要优化
		if (selectors) {
			this.styleEle = document.createElement('style');
			this.styleEle.type = STYLE_TYPE;
			this.styleEle.innerText = selectors.map(v => `.${classes.codeBoxDemo} ${v}`).join('\n');

			document.head.appendChild(this.styleEle);
		}
	}

	state = {
		expand: false
	}

	componentDidMount() {
		const { current } = this.codeBlock;

		hljs.highlightBlock(current);
	}

	componentWillUnmount() {
		if (this.styleEle) {
			document.head.removeChild(this.styleEle);
		}
	}

	onToggle = () => {
		const { expand } = this.state;
		this.setState({ expand: !expand });
	}

	render() {
		const { expand } = this.state;
		const { title, desc, code, children } = this.props;

		return (
			<section className={classes.codeBox}>
				<h4 className={classes.codeBoxTitle}>
					{title}
					<span className={classes.codeBoxDesc}>{desc}</span>
				</h4>
				<div className={classes.codeBoxDemo}>{children}</div>
				<div
					className={classnames({
						[classes.codeBoxActions]: true,
						[classes.expand]: expand
					})}
					onClick={this.onToggle}
					role="presentation"
				>
					<span className={classes.icon}>
						<img src={codeIcon} alt="代码" />
						<span className={classes.iconDesc}>
							{expand ? '隐藏代码' : '显示代码'}
						</span>
					</span>
				</div>

				<pre ref={this.codeBlock} className={classnames({
					[classes.codeBlock]: true,
					[classes.hidden]: !expand
				})}>
					<code dangerouslySetInnerHTML={{ __html: code }} />
				</pre>
			</section>
		);
	}
}

export default CodeBox;
