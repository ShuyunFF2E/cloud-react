import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../icon';
import { selector } from './const';

import './index.less';

const getLables = dataSource => {
	const source = Array.isArray(dataSource) ? dataSource : [dataSource];
	return source.map(item => item.name || item.label).join(',');
};

export default class Selected extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();

		const labels = getLables(props.dataSource);
		this.state = {
			selectStr: labels || '',
			clear: false,
			prevProps: this.props
		};
	}

	static getDerivedStateFromProps(props, prevState) {
		const { prevProps } = prevState;
		if (props.dataSource !== prevProps.dataSource) {
			const labels = getLables(props.dataSource);
			return {
				selectStr: labels || '',
				prevProps: props
			};
		}
		return null;
	}

	onMouseEnter = () => {
		if (this.props.allowClear) {
			this.setState({
				clear: true
			});
		}
	};

	onMouseLeave = () => {
		if (this.props.allowClear) {
			this.setState({
				clear: false
			});
		}
	};

	render() {
		const {
			props: { disabled, placeholder, open, onClear, onClick },
			state: { selectStr, clear },
			onMouseEnter,
			onMouseLeave
		} = this;

		const classNames = classnames(`${selector}-wrapper`, { disabled, empty: !selectStr });
		const iconClasses = classnames(`${selector}-select-icon`, {
			open,
			close: !open,
			hidden: clear && selectStr && !disabled
		});
		const clearClasses = classnames(`${selector}-select-icon ${selector}-clear-icon`, {
			show: clear && selectStr && !disabled
		});

		return (
			<div ref={this.ref} className={classNames} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				<span className={`${selector}-selected`}>{selectStr || placeholder}</span>
				<Icon type="close-circle-solid" className={clearClasses} onClick={onClear} />
				<Icon type="down-solid" className={iconClasses} />
			</div>
		);
	}
}

Selected.propTypes = {
	disabled: PropTypes.bool,
	allowClear: PropTypes.bool,
	open: PropTypes.bool,
	dataSource: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	placeholder: PropTypes.string,
	onClick: PropTypes.func,
	onClear: PropTypes.func
};

Selected.defaultProps = {
	disabled: false,
	allowClear: false,
	open: false,
	dataSource: [],
	placeholder: '',
	onClick: () => {},
	onClear: () => {}
};
