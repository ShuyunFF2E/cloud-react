import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Explain from './explain';

import { DATA_FIELD } from './constants';

export const noop = () => {};

export default class RenderChildren extends Component {
	static propTypes = {
		children: PropTypes.any,
		field: PropTypes.object
	};

	static defaultProps = {
		children: null,
		field: {}
	};

	renderChildren(children) {
		if (['object', 'string', 'array'].indexOf(typeof children) === -1) {
			return children;
		}

		return Children.map(children, (child, key) => {
			if (!child) return null;

			const { props } = child;

			if (!props) return child;

			if (props && props[DATA_FIELD]) {
				const { field } = this.props;
				const { getState = noop, getError = noop } = field;

				const state = getState.call(field, props[DATA_FIELD]);
				const error = getError.call(field, props[DATA_FIELD]);

				return (
					<div
						key={key.toString()}
						className={classnames('contents', {
							'has-error': state === 'error',
							'has-success': state === 'success'
						})}>
						{cloneElement(child, child.props)}
						{error ? <Explain className="error">{error}</Explain> : null}
					</div>
				);
			}

			let items = props.children;

			if (props.children && Children.count(props.children) && !props[DATA_FIELD]) {
				items = this.renderChildren(props.children);
			}

			return cloneElement(child, { key, ...child.props, children: items });
		});
	}

	render() {
		const { children } = this.props;

		return this.renderChildren(children);
	}
}
