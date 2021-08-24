import { prefixCls } from '@utils';

import Message from '../index';

const selector = `.${prefixCls}-message`;

describe('Message', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should renders correctly', () => {
		Message.success('sucess info');
		expect(document.querySelectorAll(`${selector}-success`)).toHaveLength(1);

		Message.error('error info');
		expect(document.querySelectorAll(`${selector}-error`)).toHaveLength(1);
		document.querySelectorAll(`${selector}-error`);

		jest.runAllTimers();
	});

	it('should auto close after duration', () => {
		Message.success('sucess info', { duration: 1000 });

		expect(document.querySelectorAll(`${selector}-success`)).toHaveLength(1);

		jest.runAllTimers();

		expect(document.querySelectorAll(`${selector}-success`)).toHaveLength(0);
	});

	it('指定success的className', () => {
		Message.success('sucess info', { className: 'test-name' });
		expect(document.querySelectorAll('.test-name')).toHaveLength(1);
	});

	it('should render to verb container', () => {
		const element = document.createElement('div');
		element.setAttribute('id', 'container');
		document.body.appendChild(element);

		const container = document.getElementById('container');

		Message.success('sucess info', { duration: 1000, contextContainer: container });

		expect(container.querySelectorAll(`${selector}-success`)).toHaveLength(1);

		jest.runAllTimers();
	});

	it('should destory when click close icon', () => {
		Message.success('sucess info', { duration: 0 });

		expect(document.querySelectorAll(`${selector}-success`)).toHaveLength(1);

		document.querySelectorAll('.close-icon')[0].click();

		expect(document.querySelectorAll(`${selector}-success`)).toHaveLength(0);
	});
});
