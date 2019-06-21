import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CodeBox from '../code-box';
import classes from './index.less';

export default class MarkdownOutput extends React.Component {
	static propTypes = {
		demos: PropTypes.any,
		title: PropTypes.string,
		html: PropTypes.string,
		subtitle: PropTypes.string,
		className: PropTypes.string
	};

	static defaultProps = {
		demos: [],
		title: '',
		html: '',
		subtitle: '',
		className: ''
	};

	constructor(props) {
		super(props);
		this.markdownRef = React.createRef();
	}

	componentDidMount() {
		const { demos } = this.props;
		this.markdownBody.parentNode.scrollTop = 0;

		demos.filter(v => v).forEach(Demo => {
			const wrap = document.createElement('div');

			ReactDOM.render(
				<CodeBox title={Demo.title} desc={Demo.desc} code={Demo.code}>
					<Demo />
				</CodeBox>,
				wrap
			);

			this.codeWrap.appendChild(wrap);
		});
	}

	get markdownBody() {
		return this.markdownRef.current;
	}

	get codeWrap() {
		return this.markdownBody.querySelector('#code-demo');
	}

	render() {
		const { title, html, subtitle, className, ...props } = this.props;

		return (
			<section ref={this.markdownRef} {...props}>
				<h1 className={classes.title}>{title} {subtitle}</h1>
				<div
					className={classes.markdownBody}
					dangerouslySetInnerHTML={{ __html: html }} />
			</section>
		);
	}
}
