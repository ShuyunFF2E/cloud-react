import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.less';

export default class CodeBox extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		desc: PropTypes.string,
		children: PropTypes.node
	};

	static defaultProps = {
		title: '标题',
		desc: '描述',
		children: ''
	}

	state = {
		expand: false
	}

	onToggle = () => {
		const { expand } = this.state;
		this.setState({ expand: !expand });
	}

	render() {
		const { expand } = this.state;
		const { title, desc, children } = this.props;

		return (
			<section className={classes.codeBox}>
				<div className={classes.codeBoxDemo}>
					{children}
				</div>
				<h4 className={classes.codeBoxTitle}>{title}</h4>
				<div className={classes.codeBoxDesc}>{desc}</div>
				<div className={classes.codeBoxActions}>
					<span onClick={this.onToggle} role="presentation">
						{/* &lt;/&gt; */}
						代码
					</span>
				</div>
				{
					expand &&
					<div>
						代码部分--未完善
					</div>
				}
			</section>
		);
	}
}
