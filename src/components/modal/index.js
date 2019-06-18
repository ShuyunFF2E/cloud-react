/**
 * index.js
 * wangbo
 * 2019-06-18
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import classes from './index.less';

class Modal extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const {show, title, onCancel, onOk} = this.props;

		const mask = classNames([classes.modal_mask]);
		const modalContainer = classNames([classes.modal_container]);
		const modalBody = classNames([classes.modal_body]);
		const modalFooter = classNames([classes.modal_footer]);
		const modalTitle = classNames([classes.modal_title]);
		const cancelBtn = classNames([classes.modalCancelBtn]);
		const confirmBtn = classNames([classes.modalConfirmBtn]);

		if (!show) {
			return null;
		}
		return (
			<div>
				<div className={mask}/>
				<div className={modalContainer}>
					<div className={modalFooter}>
						<div className={modalTitle}>{title}</div>
					</div>
					<div className={modalBody}>
						这将会是内容区域
					</div>
					<div className={modalFooter}>
						 <button type="button" className={cancelBtn} onClick={onCancel}>取消</button>
						 <button type="button" className={confirmBtn} onClick={onOk}>确认</button>
					</div>
				</div>
			</div>
		);
	}
}

Modal.defaultProps = {
	title: '标题',
	show: false,
};
Modal.propTypes = {
	title: PropTypes.string,
	show: PropTypes.bool
};

export default Modal;
