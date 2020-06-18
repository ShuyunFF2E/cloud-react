import React, { Component, createElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ToolView from './toolView';
import { CONFIG_PLACE, CONFIG_THEME } from './config';
import './index.less';

const TRIGGER_MAPPING = {
	hover: 'onMouseEnter',
	click: 'onClick'
};

class Tooltip extends Component {
	target = null;

	timestamp = new Date().getTime().toString();

	state = {
		visible: false
	};

	getChildren() {
		const { children } = this.props;
		const __children = createElement('span', null, [children]);
		return __children;
	}

	getTooltipParent(element) {
		const { parentElement } = element;
		if (parentElement.getAttribute('tooltipcontainer') !== this.timestamp) {
			return this.getTooltipParent(parentElement);
		}
		return element;
	}

	showTips = ({ target }) => {
		const { mouseEnterDelay, content } = this.props;

		if (!content) {
			return;
		}

		this.target = this.getTooltipParent(target);

		setTimeout(() => {
			this.setState({ visible: true });
		}, mouseEnterDelay || 1);
	};

	closeTips = () => {
		const { mouseLeaveDelay } = this.props;

		setTimeout(() => {
			this.setState({ visible: false });
		}, mouseLeaveDelay);
	};

	renderView() {
		const { target } = this;

		return ReactDOM.createPortal(
			<ToolView
				{...{
					...this.props,
					target
				}}
			/>,
			document.body
		);
	}

	render() {
		const { visible } = this.state;
		const { children, trigger } = this.props;

		const triggerName = TRIGGER_MAPPING[trigger] || trigger;
		const props = {
			style: { display: 'contents' },
			onMouseLeave: this.closeTips,
			[triggerName]: this.showTips
		};

		return (
			<>
				<div {...props} tooltipcontainer={this.timestamp}>
					{typeof children !== 'object' ? this.getChildren(children) : children}
				</div>

				{visible && this.renderView()}
			</>
		);
	}
}

Tooltip.propTypes = {
	content: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
	mouseEnterDelay: PropTypes.number,
	mouseLeaveDelay: PropTypes.number,
	trigger: PropTypes.string,
	clear: PropTypes.bool,
	placement: PropTypes.oneOf([
		CONFIG_PLACE.auto,
		CONFIG_PLACE.top,
		`${CONFIG_PLACE.top}-${CONFIG_PLACE.left}`,
		`${CONFIG_PLACE.top}-${CONFIG_PLACE.right}`,
		CONFIG_PLACE.bottom,
		`${CONFIG_PLACE.bottom}-${CONFIG_PLACE.left}`,
		`${CONFIG_PLACE.bottom}-${CONFIG_PLACE.right}`,
		CONFIG_PLACE.left,
		`${CONFIG_PLACE.left}-${CONFIG_PLACE.top}`,
		`${CONFIG_PLACE.left}-${CONFIG_PLACE.bottom}`,
		CONFIG_PLACE.right,
		`${CONFIG_PLACE.right}-${CONFIG_PLACE.top}`,
		`${CONFIG_PLACE.right}-${CONFIG_PLACE.bottom}`
	]),
	theme: PropTypes.oneOf([CONFIG_THEME.dark, CONFIG_THEME.light, CONFIG_THEME.error]),
	className: PropTypes.string
	// container: PropTypes.func
};

Tooltip.defaultProps = {
	content: '',
	mouseEnterDelay: 1,
	mouseLeaveDelay: 1,
	trigger: 'hover',
	clear: false,
	placement: CONFIG_PLACE.auto,
	theme: CONFIG_THEME.dark,
	className: ''
	// container: () => document.body
};

export default Tooltip;
