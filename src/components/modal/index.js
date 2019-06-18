/**
 * index.js
 * wangbo
 * 2019-06-18
 */

import React, { Component } from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import classes from './style/index.less';

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			visible,
			isConfirm,
			title,
			// style,
			hasFooter,
			body,
			header,
			footer,
			// uid,
			__body,
			// locals,
			// bindings,
			onCancel,
			onClose,
			onOk
		} = this.props;

		const mask = classNames([classes.modalMask]);
		const modalContainer = classNames([classes.modalContainer], {
			[classes.modalBody]: classes.modalBody,
			[classes.modalFooter]: classes.modalFooter,
			[classes.hideContent]: classes.hideContent,
			[classes.modalHeader]: classes.modalHeader,
			[classes.modalTitle]: classes.modalTitle,
			[classes.modalClose]: classes.modalClose,
			[classes.btn]: classes.btn,
			[classes.modalCancelBtn]: classes.modalCancelBtn,
			[classes.modalCancelBtn]: classes.modalCancelBtn,
		});

		if (!visible) {
			return null;
		}

		return (
			<div>
				<div className={mask}/>
				<div className={modalContainer}>
					<div className={isConfirm || header ? classes.hideContent : classes.modalHeader}>
						<div className={classes.modalTitle}>{title}</div>
						<button type="button" className={classes.modalClose} onClick={onClose}>X</button>
					</div>
					<div className={header && !isConfirm ? classes.modalHeader : classes.hideContent}>
						<div dangerouslySetInnerHTML={{__html: header}}></div>
					</div>

					{/* <div className={classes.modalBody} dangerouslySetInnerHTML = {{__html: body || __body}}></div> */}
					<div className={classes.modalBody}>
						{body || __body || <div dangerouslySetInnerHTML = {{__html: body || __body}}></div>}
					</div>

					<div className={hasFooter && !footer ? classes.modalFooter : classes.hideContent}>
						<button type="button" className={`${classes.btn} ${classes.modalConfirmBtn}`} onClick={onOk}>确认</button>
						<button type="button" className={`${classes.btn} ${classes.modalCancelBtn}`} onClick={onCancel}>取消</button>
					</div>
					<div className={hasFooter && footer ? classes.modalFooter : classes.hideContent}>
						<div dangerouslySetInnerHTML={{__html: footer}}></div>
					</div>
				</div>
			</div>
		);
	}
}
//
// Modal.propTypes = {
// 	title: PropTypes.string,
// 	visible: PropTypes.bool
// };

export default Modal;
