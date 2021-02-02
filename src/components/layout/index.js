import React, { Component } from 'react';
import classNames from 'classnames';
import { prefixCls } from '@utils';

import './index.less';

function generator({ suffixCls, tagName }) {
	return BasicComponent => {
		return class extends Component {
			render() {
				const classes = `${prefixCls}-${suffixCls}`;
				return <BasicComponent prefixClass={classes} tagName={tagName} {...this.props} />;
			}
		};
	};
}

const Basic = props => {
	const { prefixClass, className, children, tagName, ...rest } = props;
	const classes = classNames(prefixClass, className);
	return React.createElement(tagName, { className: classes, ...rest }, children);
};

class BasicLayout extends Component {
	render() {
		const { prefixClass, className, children, hasSider, tagName: Tag, ...others } = this.props;

		const classString = classNames(
			prefixClass,
			{
				[`${prefixClass}-has-sider`]: hasSider
			},
			className
		);

		return (
			<Tag className={classString} {...others}>
				{children}
			</Tag>
		);
	}
}

const Layout = generator({ suffixCls: 'layout', tagName: 'section' })(BasicLayout);
const Header = generator({ suffixCls: 'layout-header', tagName: 'header' })(Basic);
const Footer = generator({ suffixCls: 'layout-footer', tagName: 'footer' })(Basic);
const Content = generator({ suffixCls: 'layout-content', tagName: 'main' })(Basic);
const Sider = generator({ suffixCls: 'layout-sider', tagName: 'aside' })(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;

export default Layout;
