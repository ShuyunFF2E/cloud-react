import React from 'react';
import { render, mount } from 'enzyme';
import { prefixCls } from '@utils';
import Select from '../index';
import Icon from '../../icon';

const classSelector = `${prefixCls}-select`;

const dataList = [
	{
		label: '苹果',
		value: 'apple'
	},
	{
		label: '草莓',
		value: 'cc'
	},
	{
		label: '荔枝',
		value: 'litchi',
		disabled: true
	}
];

describe('multi-select', () => {
	it('renders correctly', () => {
		const wrapper = render(<Select dataSource={dataList} multiple />);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders custom option correctly', () => {
		const wrapper = render(
			<Select value={['cc']} multiple>
				{dataList.map(item => (
					<Select.Option value={item.value} disabled={item.disabled} key={item.value}>
						<Icon type="config" style={{ fontSize: 12, marginRight: 5 }} />
						{item.label}
					</Select.Option>
				))}
			</Select>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('basic function work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<Select dataSource={dataList} onChange={onChange} multiple />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith(['apple'], []);

		wrapper
			.find('.cloud-checkbox-input')
			.at(1)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith(['apple', 'cc'], ['apple']);

		wrapper
			.find('.cloud-checkbox-input')
			.at(1)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith(['apple'], ['apple', 'cc']);
	});

	it('value property work correctly', () => {
		const wrapper = mount(<Select dataSource={dataList} value={['cc']} multiple />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		expect(
			wrapper
				.find('.cloud-checkbox')
				.at(1)
				.hasClass('cloud-checkbox-checked')
		).toBeTruthy();

		wrapper.setProps({
			value: ['apple']
		});
		expect(wrapper.state().value).toEqual(['apple']);
	});

	it('labelInValue property return value should contain lable and value', () => {
		const onChange = jest.fn();
		const wrapper = mount(<Select dataSource={dataList} onChange={onChange} labelInValue multiple />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith([dataList[0]], []);
	});

	it('should return label & value object when click ok button', () => {
		const onOk = jest.fn();
		const wrapper = mount(<Select multiple labelInValue hasConfirmButton dataSource={dataList} onOk={onOk} />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');

		wrapper
			.find('.cloud-button')
			.at(0)
			.simulate('click');
		expect(onOk).toHaveBeenCalledWith([dataList[0]], []);
	});

	it('allowClear property allow click delete selected', () => {
		const onChange = jest.fn();
		const wrapper = mount(<Select multiple dataSource={dataList} onChange={onChange} allowClear value={['cc']} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('mouseenter');

		wrapper
			.find(`.${classSelector}-clear-icon`)
			.at(0)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith([], ['cc']);
	});

	it('hasSelectAll work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<Select multiple dataSource={dataList} hasSelectAll value={['litchi']} onChange={onChange} />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		expect(wrapper.find(`.${classSelector}-option-list`).children()).toHaveLength(dataList.length + 1);

		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith(['apple', 'cc', 'litchi'], ['litchi']);

		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith(['litchi'], ['apple', 'cc', 'litchi']);
	});

	it('onOk should return all data when hasSelectAll true', () => {
		const onChange = jest.fn();
		const wrapper = mount(<Select multiple hasSelectAll dataSource={dataList} onChange={onChange} />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');

		expect(onChange).toHaveBeenCalledWith(['apple', 'cc'], []);

		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');

		expect(onChange).toHaveBeenCalledWith([], ['apple', 'cc']);
	});

	it('should not change value when did not click ok button', () => {
		const onChange = jest.fn();
		const wrapper = mount(<Select dataSource={dataList} onChange={onChange} hasConfirmButton multiple />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');

		expect(onChange).not.toHaveBeenCalled();
	});

	it('okBtnText and cancelBtnText work correctly', () => {
		const wrapper = mount(<Select multiple hasConfirmButton okBtnText="ok" cancelBtnText="cancel" dataSource={dataList} />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		expect(
			wrapper
				.find('.cloud-button')
				.at(0)
				.text()
		).toEqual('ok');

		expect(
			wrapper
				.find('.cloud-button')
				.at(1)
				.text()
		).toEqual('cancel');
	});

	it('onOk work correctly', () => {
		const onOk = jest.fn();
		const wrapper = mount(<Select multiple hasConfirmButton dataSource={dataList} onOk={onOk} />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');

		wrapper
			.find('.cloud-button')
			.at(0)
			.simulate('click');

		expect(onOk).toHaveBeenCalledWith(['apple'], []);
	});

	it('onCancel work correctly', () => {
		const onCancel = jest.fn();
		const wrapper = mount(<Select multiple hasConfirmButton dataSource={dataList} onCancel={onCancel} />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');

		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');

		expect(wrapper.state().value).toEqual([]);
	});

	it('seachable select work correctly', () => {
		const onSearch = jest.fn();
		const wrapper = mount(<Select searchable multiple onSearch={onSearch} />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper
			.find('.cloud-select-search-input')
			.at(0)
			.simulate('change', { target: { value: 'multi' } });

		expect(onSearch).toHaveBeenCalledWith('multi');
	});

	it('confirmTemplate work correctly', () => {
		const onConfirm = jest.fn();
		const confirmTemplate = ({ onOk }) => (
			<div className="confirm-operate-btn">
				<button className="confirm-btn" onClick={onOk} type="button">
					自定义确认
				</button>
			</div>
		);
		const wrapper = mount(<Select confirmTemplate={confirmTemplate} dataSource={dataList} onOk={onConfirm} multiple hasConfirmButton />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		expect(wrapper.find('.confirm-operate-btn')).toHaveLength(1);

		wrapper
			.find('.confirm-btn')
			.at(0)
			.simulate('click');

		expect(onConfirm).toHaveBeenCalled();
	});

	it('should close when click outside component', () => {
		let clickHandler = {};
		document.addEventListener = jest.fn((event, handler) => {
			if (event === 'click') {
				clickHandler = handler;
			}
		});
		const wrapper = mount(<Select value={['cc']} dataSource={dataList} hasConfirmButton multiple />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper
			.find('.cloud-checkbox-input')
			.at(0)
			.simulate('change');

		clickHandler({
			target: document.body
		});
		expect(wrapper.state().value).toEqual(['cc']);
	});
});
