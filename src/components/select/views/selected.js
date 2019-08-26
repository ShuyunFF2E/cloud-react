import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../../icon';
import '../index.less';

const selector = 'select';
const getLables = dataSource => dataSource.map(item => item.label).join(',')

export default class Selected extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();

		const labels = getLables(this.props.dataSource);
		this.state = {
			selectStr: labels || '',
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

	onWrapperClick = () => {
		const { disabled, onClick } = this.props;
		if (disabled) return;

		onClick();
	}

	render() {
		const { dataSource, disabled, placeholder, open, ...otherProps } = this.props;
		const { selectStr } = this.state;

		const classNames = classnames(`${selector}-wrapper`, { disabled, empty: !dataSource.length });
		const iconClasses = classnames(`${selector}-select-icon`, { open, close: !open });

		return (
			<div
				ref={this.ref}
				className={classNames}
				onClick={this.onWrapperClick}
				{ ...otherProps }>
				<span className={`${selector}-selected`}>
					{ selectStr || placeholder }
				</span>
				<Icon type="down-solid" className={iconClasses} />
			</div>
		);
	}
}

Selected.propTypes = {
	disabled: PropTypes.bool,
	open: PropTypes.bool,
	dataSource: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),
	placeholder: PropTypes.string,
	onClick: PropTypes.func
}

Selected.defaultProps = {
	disabled: false,
	open: false,
	dataSource: [],
	placeholder: '',
	onClick: () => {}
}
