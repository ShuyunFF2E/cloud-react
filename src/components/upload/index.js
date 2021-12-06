import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ShuyunUtils from 'shuyun-utils';
import { noop } from '@utils';
import Message from '../message';
import Icon from '../icon';
import Button from '../button';
import Modal from '../modal';
import UploadList from './list';
import getUuid from './utils';
import defaultHttp from './http';
import { TYPE, PREFIX } from './constant';

import './index.less';

const Text = props => {
	const { isShowIcon, labelText, disabled, options } = props;
	return (
		<Button type="primary" disabled={disabled} {...options}>
			{isShowIcon && <Icon type="upload" style={{ fontSize: '14px', marginRight: '8px' }} />}
			<span>{labelText}</span>
		</Button>
	);
};

const Picture = props => {
	const { labelText } = props;
	return (
		<div>
			<Icon type="plus" style={{ fontSize: '12px' }} />
			<div className={`${PREFIX}-text`}>{labelText}</div>
		</div>
	);
};

class Upload extends Component {
	requests = {};

	defaultFileList = [];

	constructor(props) {
		super(props);

		this.ref = createRef();

		const list = props.fileList || this.defaultFileList;
		this.state = {
			fileList: [...list],
			selectPic: {},
			isShowPreview: false,
			prevFileList: [...list],
		};
	}

	static getDerivedStateFromProps(props, prevState) {
		const { fileList } = props;
		if (props.fileList && !ShuyunUtils.equal(fileList, prevState.prevFileList)) {
			return {
				fileList: [...fileList],
				prevFileList: [...fileList] 
			};
		}
		return null;
	}

	componentWillUnmount() {
		this.abort();
	}

	onClick = e => {
		const element = this.ref.current;
		if (!element || e?.target === element) return;
		const { onClick, showBeforeConfirm, beforeConfirmBody } = this.props;

		onClick().then(() => {
			if (!showBeforeConfirm) {
				element.click();
				return;
			}
			Modal.confirm({
				body: beforeConfirmBody,
				onOk: () => {
					element.click();
				}
			});
		});
	};

	getFileList() {
		return this.ref.current.files;
	}

	handlePreview = (item = {}) => {
		this.setState({
			selectPic: item,
			isShowPreview: !!item.url
		});
	}

	handleChange = () => {
		// 已选择文件数量校验，如果没有选择文件的时候不允许点击上传按钮
		const number = this.getFileList().length;
		const { limit } = this.props;

		if (number === 0) return;

		if (limit && limit !== 1 && this.state.fileList.length + number > limit) {
			Message.error(`最多上传${limit}个`);
			return;
		}

		this.handleUpload();
	};

	handleUpload = () => {
		const fileList = this.getFileList();

		const newFileList = [...Array.from(fileList)].map(file => {
			// file 为是一个特殊上传 File 对象，此处无法使用结构的方式来处理
			const item = file;
			item.id = getUuid();
			return item;
		});
		this.upload(newFileList);
	};

	handleReUpload = item => {
		this.setState({
			selectPic: item
		});

		this.onClick();
	}

	handleRemove = file => {
		const { onRemove } = this.props;

		onRemove({
			file,
			fileList: [...this.state.fileList]
		});
	};

	handleProgress = (event, file) => {
		const { onProgress } = this.props;
		const newFile = this.getStatusFile(file, 'uploading', event.percent);

		onProgress({
			file: newFile,
			fileList: [...this.state.fileList],
			percent: event.percent
		});
	};

	getStatusFile = (file, status, percent) => {
		const { selectPic } = this.state;
		const newFile = [...Array.from([file])].map(file => {
			const item = file;
			item.status = status;
			if (percent) {
				item.percent = percent;
			}
			if (selectPic.url) {
				item.index = selectPic.index;
			}
			return item;
		});
		return newFile[0];
	}

	handleSuccess = (response, file) => {
		try {
			if (typeof response === 'string') {
				// eslint-disable-next-line
				response = JSON.parse(response);
			}
		} catch (e) {
			console.warn(e);
		}

		const { onSuccess, onReUpload } = this.props;
		const { selectPic } = this.state;
		this.ref.current.value = '';
		const newFile = this.getStatusFile(file, 'done');
		if (selectPic.url) {
			onReUpload({
				file: newFile,
				fileList: [...this.state.fileList],
				response
			});
			this.setState({
				selectPic: {}
			});
			return;
		}
		onSuccess({
			file: newFile,
			fileList: [...this.state.fileList],
			response
		});
	};

	handleError = (error, file) => {
		const { onError } = this.props;
		this.ref.current.value = '';
		const newFile = this.getStatusFile(file, 'error');
		if (this.state.selectPic.url) {
			this.setState({
				selectPic: {}
			});
		}
		onError({
			file: newFile,
			fileList: [...this.state.fileList],
			error
		});
	};

	/**
	 * 文件上传之前校验大小是否符合
	 */
	handleBeforeUpload(file) {
		const { size } = this.props;

		const isSizeInvalidate = file.size / 1024 / 1024 > size;

		if (isSizeInvalidate) {
			Message.error(`文件过大，最大支持 ${size} M 的文件上传！`);
			this.ref.current.value = '';
			return false;
		}

		return this.props.onBeforeUpload(file);
	}

	upload(file) {
		const { unify } = this.props;
		if (unify) {
			const sizeValidate = file.filter(item => this.handleBeforeUpload(item));
			if (file.length === sizeValidate.length) {
				this.post(file);
			}
		} else {
			file.forEach(fileItem => {
				const before = this.handleBeforeUpload(fileItem);
				if (before) {
					this.post(fileItem);
				}
			});
		}
	}

	post = file => {
		const { action, headers, withCredentials, customRequest, unify, params } = this.props;
		const request = customRequest || defaultHttp;
		const { id } = file;
		const option = {
			action,
			params,
			filename: file.name,
			file,
			headers,
			withCredentials,
			unify,
			onProgress: event => {
				this.handleProgress(event, file);
			},
			onSuccess: (response, xhr) => {
				delete this.requests[id];
				this.handleSuccess(response, file, xhr);
			},
			onError: error => {
				delete this.requests[id];
				this.handleError(error, file);
			}
		};
		this.requests[id] = request(option);
	}

	abort() {
		Object.keys(this.requests).forEach(id => {
			const req = this.requests[id];
			if (req && req.abort) {
				req.abort();
			}

			delete this.requests[id];
		});
	}

	renderUpload() {
		const { type, labelText, accept, disabled, multiple, className, isShowIcon, btnOptions, limit } = this.props;
		const { fileList } = this.state;
		const uploadDisabled = disabled || limit && limit > 1 && limit === fileList.length;

		const classes = classNames(
			PREFIX,
			{
				[`${PREFIX}-select`]: true,
				[`${PREFIX}-select-${type}`]: true,
				[`${PREFIX}-disabled`]: uploadDisabled
			},
			className
		);

		const events = uploadDisabled
			? {}
			: {
					onClick: this.onClick
			  };

		return (
			<div className={classes}>
				<span className={PREFIX} role="button" {...events}>
					<input
						style={{ display: 'none' }}
						type="file"
						disabled={uploadDisabled}
						ref={this.ref}
						accept={accept}
						multiple={multiple}
						onChange={this.handleChange}
					/>
					{type === TYPE.DEFAULT ? (
						<Text
							options={btnOptions}
							labelText={labelText}
							disabled={uploadDisabled}
							isShowIcon={isShowIcon}
						/>
					) : (
						<Picture disabled={uploadDisabled} labelText={labelText} />
					)}
				</span>
			</div>
		);
	};

	renderPicture() {
		const { type, limit, hasPreview } = this.props;
		const { fileList, selectPic, isShowPreview } = this.state;
		const showUpload = limit === 1 ? fileList.length < 1 : true;
		const { name, url } = selectPic;

		return (
			<>
				<UploadList
					type={type}
					fileList={fileList}
					hasPreview={hasPreview}
					onRemove={this.handleRemove}
					onPreview={this.handlePreview}
					onReUpload={this.handleReUpload}
				/>
				{isShowPreview && (
					<Modal
						hasFooter={false}
						className={`${PREFIX}-pic-preview`}
						title={name}
						visible={isShowPreview}
						onClose={() => this.handlePreview()}
					>
						<img src={url} />
					</Modal>
				)}
				{showUpload && this.renderUpload()}
			</>
		)
	}

	renderNormal() {
		const { type } = this.props;
		const { fileList } = this.state;
		return (
			<>
				{this.renderUpload()}
				<UploadList type={type} fileList={fileList} onRemove={this.handleRemove} />
			</>
		)
	}

	render() {
		const { type } = this.props;


		return (
			<div className={`${PREFIX}-${type}-wrapper`}>
				{type === TYPE.PICTURE ? this.renderPicture() : this.renderNormal()}
			</div>
		);
	}
}

Upload.propTypes = {
	type: PropTypes.oneOf([TYPE.PICTURE, TYPE.DEFAULT]),
	btnOptions: PropTypes.object,
	labelText: PropTypes.string,
	accept: PropTypes.string,
	size: PropTypes.number,
	limit: PropTypes.number,
	disabled: PropTypes.bool,
	fileList: PropTypes.array,
	action: PropTypes.string,
	multiple: PropTypes.bool,
	isShowIcon: PropTypes.bool,
	hasPreview: PropTypes.bool,
	showBeforeConfirm: PropTypes.bool,
	beforeConfirmBody: PropTypes.node,
	customRequest: PropTypes.func,
	onClick: PropTypes.func,
	onBeforeUpload: PropTypes.func,
	onProgress: PropTypes.func,
	onSuccess: PropTypes.func,
	onError: PropTypes.func,
	onReUpload: PropTypes.func,
	onRemove: PropTypes.func,
	className: PropTypes.string,
	unify: PropTypes.bool,
	params: PropTypes.object
};

Upload.defaultProps = {
	type: TYPE.DEFAULT,
	btnOptions: {},
	labelText: '选择文件',
	accept: '*',
	size: 1,
	limit: null,
	disabled: false,
	fileList: undefined,
	action: '',
	multiple: false,
	isShowIcon: true,
	hasPreview: true,
	customRequest: undefined,
	showBeforeConfirm: false,
	beforeConfirmBody: '确认上传？',
	onClick: () => new Promise(resolve => resolve()),
	onBeforeUpload: noop,
	onProgress: noop,
	onSuccess: noop,
	onError: noop,
	onReUpload: noop,
	onRemove: noop,
	className: '',
	unify: false,
	params: {}
};

export default Upload;
