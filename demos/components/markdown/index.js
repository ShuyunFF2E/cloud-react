import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CodeBox from '../code-box';
import classes from './index.less';

const createElement = (className = '__empty__') => {
	const element = document.createElement('div');
	element.classList.add(className);
	return element;
}

const separateMarkdownHtml = html => {
	const container = createElement();
	const tmpWrap = createElement();
	tmpWrap.innerHTML = html;

	let markdownBody = createElement(classes.markdownBody);

	[...tmpWrap.children].forEach(element => {
		if (!element.id || element.id !== 'code-demo') {
			markdownBody.appendChild(element);
		} else {
			// append markdownBody
			container.appendChild(markdownBody);

			// append code-demo Element
			container.appendChild(element);

			// create a new markdownBody
			markdownBody = createElement(classes.markdownBody);
		}
	});

	container.appendChild(markdownBody);

	return container.innerHTML;
}

export default class MarkdownOutput extends React.Component {
	static propTypes = {
		demos: PropTypes.any,
		title: PropTypes.string,
		html: PropTypes.string,
		subtitle: PropTypes.string
	};

	static defaultProps = {
		demos: [],
		title: '',
		html: '',
		subtitle: ''
	};

	constructor(props) {
		super(props);
		this.markdownRef = React.createRef();
		this.wrapers = [];
	}

	componentDidMount() {
		const { demos } = this.props;
		this.markdownBody.parentNode.scrollTop = 0;

		demos
			.sort((p, n) => p.order - n.order)
			.filter(v => v).forEach(Demo => {
				const wrap = document.createElement('div');

				ReactDOM.render(
					<CodeBox title={Demo.title} desc={Demo.desc} code={Demo.code} css={Demo.css}>
						<Demo />
					</CodeBox>,
					wrap
				);

				this.wrapers.push(wrap);

				this.codeWrap.appendChild(wrap);
			});
	}

	componentWillUnmount() {
		this.wrapers.forEach(ReactDOM.unmountComponentAtNode);
	}

	get markdownBody() {
		return this.markdownRef.current;
	}

	get codeWrap() {
		return this.markdownBody.querySelector('#code-demo');
	}

	render() {
		const { title, html, subtitle } = this.props;

		return (
			<section ref={this.markdownRef}>
				<h1 className={classes.title}>{title} {subtitle}</h1>
				<div dangerouslySetInnerHTML={{ __html: separateMarkdownHtml(html) }} />
			</section>
		);
	}
}
