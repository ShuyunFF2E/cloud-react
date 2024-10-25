import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from '@utils';

import Explain from './explain';
import FormContext from './context';
import { DATA_FIELD } from './constants';

export default class RenderChildren extends Component {
	static contextType = FormContext;

	static propTypes = {
		children: PropTypes.any
	};

	static defaultProps = {
		children: null
	};

	get field() {
		return this.context.field;
	}

	renderChildren(children) {
		if (['object', 'string', 'array'].indexOf(typeof children) === -1) {
			return children;
		}

		return Children.map(children, (child, key) => {
			if (!child) return null;

			const { props } = child;

			if (!props || child?.type?.name === 'FormItem') return child;

			if (props && props[DATA_FIELD]) {
				const { getState = noop, getError = noop } = this.field;

				const state = getState.call(this.field, props[DATA_FIELD]);
				const error = getError.call(this.field, props[DATA_FIELD]);

				return (
					<div
						key={key.toString()}
						className={classnames('contents', {
							'has-error': state === 'error',
							'has-success': state === 'success'
						})}>
						{cloneElement(child, { ...(child.props || {}), formSize: this.context.size })}
						{error ? <Explain className="error">{error}</Explain> : null}
					</div>
				);
			}

			let items = props.children;

			if (props.children && Children.count(props.children) && !props[DATA_FIELD]) {
				items = this.renderChildren(props.children);
			}

			return cloneElement(child, { key, ...child.props, children: items, formSize: this.context.size });
		});
	}

	render() {
		const { children } = this.props;

		return this.renderChildren(children);
	}
}
