import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import mountTest from '@tests/shared/mountTest';

import Form from '../index';
import Field, { useField } from '../../field';
import Input from '../../input';
import Button from '../../button';
import Radio from '../../radio';
import Checkbox from '../../checkbox';
import InputNumber from '../../input-number';

const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

const USERNAME_REQUIRED_MESSAGE = '用户名不允许为空';

const UserName = props => {
	const { field, checkable = true } = props;

	return (
		<Form.Item label="用户名">
			<Input
				placeholder="请输入用户名"
				{...field.init('userName', {
					checkable,
					rules: [{ required: true, message: USERNAME_REQUIRED_MESSAGE }]
				})}
			/>
		</Form.Item>
	);
};

class FormTest extends Component {
	field = new Field(this);

	render() {
		return (
			<Form field={this.field}>
				<UserName field={this.field} />
			</Form>
		);
	}
}

describe('Form', () => {
	mountTest(Form);

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
		errorSpy.mockReset();
	});

	afterAll(() => {
		errorSpy.mockRestore();
	});

	it('should render correctly', () => {
		const wrapper = render(
			<Form>
				<Form.Item label="username">
					<Input placeholder="请输入用户名" />
				</Form.Item>
			</Form>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should validate rules when submit click, and clear error when reset click ', async () => {
		const wrapper = mount(<FormTest />);

		wrapper.find('input').simulate('change', { target: { value: '1' } });

		let errors = await wrapper.instance().field.validate(errs => {
			return errs;
		});
		wrapper.update();
		expect(errors).toBeNull();
		expect(wrapper.find('.has-error')).toHaveLength(0);

		wrapper.find('input').simulate('change', { target: { value: '' } });
		errors = await wrapper.instance().field.validate(errs => {
			return errs;
		});
		wrapper.update();
		expect(errors.userName).toEqual([USERNAME_REQUIRED_MESSAGE]);
		expect(wrapper.find('.has-error')).toHaveLength(1);

		wrapper.instance().field.reset();
		wrapper.update();
		expect(wrapper.find('.has-error')).toHaveLength(0);
	});

	it('return value when field exits, return undefined when field not exits', () => {
		const wrapper = mount(<FormTest />);
		wrapper.find('input').simulate('change', { target: { value: '1' } });
		expect(wrapper.instance().field.getValue('userName')).toEqual('1');

		expect(wrapper.instance().field.getValue('age')).toBeUndefined();
	});

	it('setValue and getValue to one filed, setValues to more fileds', () => {
		const wrapper = mount(<FormTest />);
		wrapper.instance().field.setValue('userName', '2');

		expect(wrapper.instance().field.getValue('userName')).toEqual('2');

		wrapper.instance().field.setValues({
			userName: '3',
			age: 17
		});

		expect(wrapper.instance().field.getValue('userName')).toEqual('3');
		expect(wrapper.instance().field.getValue('age')).toEqual(17);

		wrapper.instance().field.setValue('age', 18);
		expect(wrapper.instance().field.getValue('age')).toEqual(18);
	});

	it('setError and getError to one field, setErrors and getErrors to more fields ', () => {
		const wrapper = mount(<FormTest />);
		const { field } = wrapper.instance();

		field.setError('userName', USERNAME_REQUIRED_MESSAGE);
		wrapper.update();
		expect(wrapper.find('.has-error')).toHaveLength(1);
		expect(field.getError('userName')).toEqual([USERNAME_REQUIRED_MESSAGE]);

		field.setErrors({
			userName: USERNAME_REQUIRED_MESSAGE
		});
		wrapper.update();
		expect(wrapper.find('.has-error')).toHaveLength(1);

		const errors = field.getErrors(['userName']).userName;
		expect(errors).toEqual([USERNAME_REQUIRED_MESSAGE]);

		field.setErrors('');

		field.clear();
		wrapper.update();
		expect(wrapper.find('.has-error')).toHaveLength(0);
	});

	it('remove one filed, validate rule and value clear', () => {
		const wrapper = mount(<FormTest />);
		const { field } = wrapper.instance();

		field.setValue('userName', 'silence');
		expect(field.getValue('userName')).toEqual('silence');

		field.setError('userName', '用户名长度不能大于5');
		wrapper.update();
		expect(wrapper.find('.has-error')).toHaveLength(1);

		field.remove('userName');
		wrapper.update();
		expect(field.getValue('userName')).toBeUndefined();
		expect(wrapper.find('.has-error')).toHaveLength(0);
	});

	it('should not validate field when checkable is false', () => {
		class MyComponent extends Component {
			field = new Field(this);

			state = {
				checked: true
			};

			render() {
				const { checked } = this.state;
				return (
					<Form field={this.field}>
						<UserName field={this.field} checkable={checked} />
					</Form>
				);
			}
		}

		const wrapper = mount(<MyComponent />);
		const { field } = wrapper.instance();
		field.setValue('userName', '');
		expect(field.getState('userName')).toEqual('validating');

		wrapper.setState({ checked: false });
		wrapper.update();
		expect(field.getState('userName')).toEqual('');
	});

	it('empty Form', () => {
		class EmptyForm extends Component {
			field = new Field(this);

			render() {
				return (
					<Form field={this.field}>
						<Input placeholder="请输入用户名" />
					</Form>
				);
			}
		}

		const wrapper = mount(<EmptyForm />);
		const { field } = wrapper.instance();
		expect(field.getState('userName')).toEqual('');
		expect(field.getErrors()).toEqual({});
		expect(field.setError('userName')).toBeUndefined();
	});

	it('complex Form ', async () => {
		class ComplexForm extends Component {
			field = new Field();

			state = {
				scrollToFirstError: false
			};

			render() {
				const { init } = this.field;

				return (
					<Form field={this.field} scrollToFirstError={this.state.scrollToFirstError}>
						<Form.Item label="手机号">
							<Input
								placeholder="请输入手机号"
								{...init('phone', {
									initValue: '1234567890',
									rules: [{ pattern: /^1[3689]\d{9}$/, message: '手机号格式不正确' }, { len: 11 }]
								})}
							/>
						</Form.Item>
						<Form.Item label="中奖次数">
							<InputNumber
								placeholder="请输入中奖次数"
								{...init('number', {
									initValue: 1,
									rules: [{ required: true, message: '中奖次数不能为空' }, { min: 5 }, { max: 10 }]
								})}
							/>
						</Form.Item>
						<Form.Item label="是否开启邮箱校验">
							<Radio.Group {...init('email')}>
								<Radio value>开启</Radio>
								<Radio value={false}>禁用</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item label="所属平台" required>
							<Checkbox.Group
								{...init('platform', {
									rules: [
										{ required: true, message: '所属平台必须选择一项' },
										{
											validator: (name, value, callback) => {
												callback(value.length < 2 ? '所属平台必须选择两个以上' : '');
											}
										}
									]
								})}>
								<Checkbox value={1}>淘宝</Checkbox>
								<Checkbox value={2}>京东</Checkbox>
							</Checkbox.Group>
						</Form.Item>
					</Form>
				);
			}
		}

		const wrapper = mount(<ComplexForm />);
		const { field } = wrapper.instance();
		field.setValues({
			email: true,
			platform: [1]
		});

		await field.validate(errs => errs);

		field.setValues({
			phone: '18612345678',
			platform: [1, 2],
			number: 20
		});

		wrapper.setState({ scrollToFirstError: true });

		await field.validate(errs => errs);

		jest.runAllTimers();

		field.reset();
		field.clear();

		expect(true).toBeTruthy();
	});

	it('function component', async () => {
		const FormA = () => {
			const field = useField();
			const onReset = () => {
				field.reset();
			};

			return (
				<Form field={field}>
					<UserName field={field} />
					<Button onClick={onReset}>重置</Button>
				</Form>
			);
		};
		const wrapper = mount(<FormA />);
		wrapper.find('Button').simulate('click');

		expect(render(<FormA />)).toMatchSnapshot();
	});
});
