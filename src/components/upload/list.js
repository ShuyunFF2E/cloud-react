import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from '@utils';

import Icon from '../icon';
import Tooltip from '../tooltip';
import { TYPE, PREFIX } from './constant';

const prefix = `${PREFIX}-list`;

const Text = props => {
	const { list, onRemove } = props;

	return list.map(item => {
		return (
			<div key={item.name} className={`${prefix}-text`}>
				<span>{item.name}</span>
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

const Picture = props => {
	const { list, hasPreview, onRemove, onPreview, onReUpload } = props;

	return list.map((item, index) => {
		const classes = classNames(`${prefix}-pic`, {
			[`${prefix}-pic-${item.status}`]: true
		});
		if (item.status === 'error') {
			return (
				<Tooltip content="上传失败" key={item.id}>
					<div className={classes}>
						<img src={item.url} alt={item.name} />
						<div className={`${prefix}-pic-icons`}>
							<div className={`${prefix}-pic-delete`}>
								<Icon
									type="close"
									style={{ fontSize: '14px' }}
									onClick={() => {
										onRemove(item);
									}}
								/>
							</div>
						</div>
					</div>
				</Tooltip>
			)
		}
		return (
			<div key={item.id} className={classes}>
				<img src={item.url} alt={item.name} />
				<div className={`${prefix}-pic-icons`}>
					{hasPreview && (
						<Icon
							type="view"
							style={{ fontSize: '17px', marginRight: 18 }}
							onClick={() => {
								onPreview(item);
							}}
						/>
					)}
					<Icon
						type="edit"
						style={{ fontSize: '14px' }}
						onClick={() => {
							onReUpload({...item, index});
						}}
					/>
					<div className={`${prefix}-pic-delete`}>
						<Icon
							type="close"
							style={{ fontSize: '14px' }}
							onClick={() => {
								onRemove(item);
							}}
						/>
					</div>
				</div>
			</div>
		);
	});
};

class UploadList extends Component {
	render() {
		const { fileList, type, hasPreview, onRemove, onPreview, onReUpload } = this.props;

		const classes = classNames(`${prefix}`, {
			[`${prefix}-${type}`]: type === TYPE.PICTURE
		});

		return (
			<div className={classes}>
				{type === TYPE.DEFAULT ? (
					<Text list={fileList} onRemove={onRemove} />
				) : (
					<Picture
						list={fileList}
						hasPreview={hasPreview}
						onRemove={onRemove}
						onPreview={onPreview}
						onReUpload={onReUpload}
					/>
				)}
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
