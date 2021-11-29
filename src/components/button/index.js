import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import Icon from '../icon';
import './index.less';

function ButtonGroup({ block, children, ...props }) {
	const classes = classnames(`${prefixCls}-button-group`);

	return (
		<div className={classes}>
			{Children.map(children, child =>
				cloneElement(child, {
					...child.props,
					...props
				})
			)}
		</div>
	);
}

class Button extends React.PureComponent {
	static propTypes = {
		type: PropTypes.string,
		size: PropTypes.string,
		href: PropTypes.string,
		block: PropTypes.bool,
		loading: PropTypes.bool,
		target: PropTypes.string,
		htmlType: PropTypes.string,
		className: PropTypes.string
	};

	static defaultProps = {
		size: 'default',
		type: 'normal',
		href: '',
		block: false,
		loading: false,
		target: '',
		className: '',
		htmlType: 'button'
	};

	static Group = ButtonGroup;

	render() {
		const {
			// a link
			href,
			target,
			// custom attr
			size,
			disabled,
			loading,
			type,
			block,
			icon,
			// html element
			children,
			className,
			htmlType,
			...others
		} = this.props;

		const ElementName = href ? 'a' : 'button';
		const classNames = classnames(
			`${prefixCls}-button`,
			{
				[type]: true,
				[size]: true,
				block
			},
			className
		);

		// 针对单按钮情况
		let content = typeof children === 'string' && children.length === 2 ? children.split('').join(' ') : children;

		// 针对按钮组情况
		if (children instanceof Array && children.length === 1 && typeof children[0] === 'string' && children[0].length === 2) {
			content = children[0].split('').join(' ');
		}

		return (
			<ElementName
				type="button"
				className={classNames}
				disabled={disabled || loading}
				{...{
					...others,
					href: href || undefined,
					type: href ? undefined : htmlType,
					target: href ? target : undefined
				}}>
				{loading && <span className={`${prefixCls}-button-loading`} />}
				{icon && <Icon type={icon} />}
				{content}
			</ElementName>
		);
	}
}

export default Button;
