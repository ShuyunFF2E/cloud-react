/**
 * index.js
 * wangbo
 * 2019-06-20
 */

import { Component } from 'react';
import './index.less';
import ModalMethod from "./Modal";

class Modal extends Component{
	render() {
		return null;
	}
}

Modal.modal = ModalMethod.Modal;
Modal.confirm = ModalMethod.Confirm;
Modal.info = ModalMethod.Info;

export default Modal;
