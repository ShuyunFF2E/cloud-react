import React from 'react';
import Modal from '../index';

const { createModal } = Modal;

function modalEntity(props) {
	const handleOk = () => {
		props.onOk('你关闭了一个函数式组件');
	};

	const handleClose = () => {
		props.onClose();
	};

	const handleCancel = () => {
		props.onCancel();
	};

	return (
		<Modal visible title="打开一个嵌套的函数组件" onOk={handleOk} onClose={handleClose} onCancel={handleCancel}>
			这是一个modal组件
		</Modal>
	);
}

describe('Modal.createModal triggers callbacks correctly', () => {
	it('clickOk', () => {
		const openPromise = createModal(modalEntity).open({ ID: 111 });
		jest.useFakeTimers(); //  开启模拟定时器

		document.querySelector('.cloud-modal-confirm-btn').click();

		jest.runAllTimers(); // 加速，让所有的定时器都执行完毕

		return openPromise.then(res => {
			expect(res).toBe('你关闭了一个函数式组件');
		});
	});

	it('clickCancel', () => {
		createModal(modalEntity).open();

		jest.useFakeTimers();
		document.querySelectorAll('button')[1].click();
		jest.runAllTimers();

		expect(document.querySelector('.cloud-modal-container')).toBe(null);
	});

	it('clickClose', () => {
		createModal(modalEntity).open({ ID: 222 });

		jest.useFakeTimers();
		document.querySelector('.cloud-icon-close').click();
		jest.runAllTimers();

		expect(document.querySelector('.cloud-modal-container')).toBe(null);
	});

	it('onClose', () => {
		const modal = createModal(modalEntity);

		modal.open({ ID: 222 });

		jest.useFakeTimers(); //  开启模拟定时器
		modal.close();
		jest.runAllTimers(); // 加速，让所有的定时器都执行完毕
		expect(document.querySelector('.cloud-modal-container')).toBe(null);
	});
});
