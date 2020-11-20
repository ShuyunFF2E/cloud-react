import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from '@utils';

import Icon from '../icon';
import { TYPE, PREFIX } from './constant';

const prefix = `${PREFIX}-list`;

const Text = props => {
	const { list, onRemove } = props;

	return list.map(item => {
		return (
			<div key={item.name} className={`${prefix}-text`}>
				<span>{item.name}</span>
				<Icon
					type="close"
					style={{ fontSize: '14px' }}
					onClick={() => {
						onRemove(item);
					}}
				/>
			</div>
		);
	});
};

const Picture = props => {
	const { list, onRemove } = props;

	return list.map(item => {
		return (
			<div key={item.id} className={`${prefix}-pic`}>
				<img src={item.url} alt={item.name} />
				<Icon
					type="delete"
					style={{ fontSize: '14px' }}
					onClick={() => {
						onRemove(item);
					}}
				/>
			</div>
		);
	});
};

class UploadList extends Component {
	render() {
		const { fileList, type, onRemove } = this.props;

		const classes = classNames(`${prefix}`, {
			[`${prefix}-${type}`]: type === TYPE.PICTURE
		});

		return (
			<div className={classes}>
				{type === TYPE.DEFAULT ? <Text list={fileList} onRemove={onRemove} /> : <Picture list={fileList} onRemove={onRemove} />}
			</div>
		);
	}
}

UploadList.propTypes = {
	fileList: PropTypes.array,
	type: PropTypes.oneOf([TYPE.PICTURE, TYPE.DEFAULT]),
	onRemove: PropTypes.func
};

UploadList.defaultProps = {
	fileList: [],
	type: TYPE.DEFAULT,
	onRemove: noop
};

export default UploadList;
