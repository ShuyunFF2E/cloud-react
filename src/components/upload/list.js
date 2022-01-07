import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from '@utils';

import Icon from '../icon';
import Tooltip from '../tooltip';
import { TYPE, PREFIX } from './constant';

const prefix = `${PREFIX}-list`;

const Text = props => {
	const { list, disabled, onRemove } = props;

	return list.map(item => {
		const { name, status } = item;
		const content = status === 'error' ? '上传失败' : '';
		return (
			<Tooltip content={content} key={item.id}>
				<div key={name} className={`${prefix}-text`}>
					<span className={`${prefix}-text-${status}`}>{name}</span>
					{!disabled && (
						<div className={`${prefix}-text-actions`}>
							<div className={`${prefix}-delete`}>
								<Icon
									type="close"
									style={{ fontSize: '14px' }}
									onClick={() => {
										onRemove(item);
									}}
								/>
							</div>
						</div>
					)}
				</div>
			</Tooltip>
		)
	});
};

const Picture = props => {
	const { list, hasPreview, disabled, onRemove, onPreview, onReUpload } = props;

	return list.map((item, index) => {
		const classes = classNames(`${prefix}-pic`, {
			[`${prefix}-pic-${item.status}`]: true
		});
		if (item.status === 'error') {
			return (
				<Tooltip content="上传失败" key={item.id}>
					<div className={classes}>
						<img src={item.url} alt={item.name} />
						{!disabled && (
							<div className={`${prefix}-pic-icons`}>
							<div className={`${prefix}-delete`}>
								<Icon
									type="close"
									style={{ fontSize: '14px' }}
									onClick={() => {
										onRemove(item);
									}}
								/>
							</div>
						</div>
						)}
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
							style={{ fontSize: '17px', marginRight: disabled ? 0 : 18 }}
							onClick={() => {
								onPreview(item);
							}}
						/>
					)}
					{!disabled && (
						<>
							<Icon
								type="edit"
								style={{ fontSize: '14px' }}
								onClick={() => {
									onReUpload({...item, index});
								}}
							/>
							<div className={`${prefix}-delete`}>
								<Icon
									type="close"
									style={{ fontSize: '14px' }}
									onClick={() => {
										onRemove(item);
									}}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		);
	});
};

class UploadList extends Component {
	render() {
		const { fileList, type, hasPreview, disabled, onRemove, onPreview, onReUpload } = this.props;

		const classes = classNames(`${prefix}`, {
			[`${prefix}-${type}`]: type === TYPE.PICTURE
		});

		return (
			<div className={classes}>
				{type === TYPE.DEFAULT ? (
					<Text disabled={disabled} list={fileList} onRemove={onRemove} />
				) : (
					<Picture
						disabled={disabled}
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
