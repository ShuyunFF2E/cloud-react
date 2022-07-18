import React from 'react';
import { render, mount } from 'enzyme';
import { prefixCls, noop } from '@utils';
import mountTest from '../../../../tests/shared/mountTest';
import Select from '../index';

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

describe('single-select', () => {
	mountTest(Select);

	it('renders correctly', () => {
		const wrapper = render(
			<Select placeholder="select">
				{dataList.map(v => (
					<Select.Option value={v.value} key={v.value}>
						{v.label}
					</Select.Option>
				))}
			</Select>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders only one option correctly', () => {
		const wrapper = render(
			<Select placeholder="select">
				<Select.Option value="">不限</Select.Option>
			</Select>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('dataSource renders correctly', () => {
		const wrapper = render(<Select placeholder="select" dataSource={dataList} onChange={noop} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('dataSource empty renders correctly', () => {
		const wrapper = mount(<Select />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-option`)).toHaveLength(0);
	});

	it('assign label and value key renders correctly', () => {
		const source = dataList.map(v => ({
			name: v.label,
			key: v.value
		}));
		const wrapper = render(<Select dataSource={source} labelKey="name" valueKey="key" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should renders correctly when children update', () => {
		const wrapper = mount(<Select dataSource={dataList} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-option`)).toHaveLength(3);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper.setProps({
			children: (
				<Select.Option>
					<span>选项</span>
					option
				</Select.Option>
			)
		});
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-option`)).toHaveLength(1);
	});

	it('onChange work correctly', async () => {
		const onChange = jest.fn();
		const onBeforeChange = jest.fn().mockImplementation(() => Promise.resolve());
		const wrapper = mount(<Select dataSource={dataList} onChange={onChange} onBeforeChange={onBeforeChange} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find(`.${classSelector}-option`)
			.at(0)
			.simulate('click');
		await onBeforeChange();
		expect(onChange).toHaveBeenCalledWith('apple', null, { ...dataList[0], index: 0 });
	});

	it('should not onChange when click same value', async () => {
		const onChange = jest.fn();
		const onBeforeChange = jest.fn().mockImplementation(() => Promise.resolve());
		const wrapper = mount(<Select dataSource={dataList} value="apple" onChange={onChange} onBeforeChange={onBeforeChange} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find(`.${classSelector}-option`)
			.at(0)
			.simulate('click');
		await onBeforeChange();
		expect(onChange).not.toHaveBeenCalled();
	});

	it('defaultValue work correctly', () => {
		const wrapper = mount(<Select defaultValue="cc" dataSource={dataList} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(
			wrapper
				.find(`.${classSelector}-option`)
				.at(1)
				.hasClass('selected')
		).toBeTruthy();
	});

	it('value work correctly', () => {
		const wrapper = mount(<Select value="cc" dataSource={dataList} />);
		expect(wrapper.state().value).toEqual('cc');

		wrapper.setProps({
			value: 'apple'
		});
		expect(wrapper.state().value).toEqual('apple');
	});

	it('value work correctly when labelInValue', () => {
		const wrapper = mount(<Select value="cc" labelInValue dataSource={dataList} />);
		expect(wrapper.state().prevResult).toEqual([{ label: '草莓', value: 'cc' }]);

		wrapper.setProps({
			value: 'apple'
		});
		expect(wrapper.state().prevResult).toEqual([{ label: '苹果', value: 'apple' }]);
	});

	it('labelInValue work correctly', async () => {
		const onChange = jest.fn();
		const onBeforeChange = jest.fn().mockImplementation(() => Promise.resolve());
		const wrapper = mount(<Select labelInValue onBeforeChange={onBeforeChange} onChange={onChange} dataSource={dataList} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find(`.${classSelector}-option`)
			.at(0)
			.simulate('click');
		await onBeforeChange();
		expect(onChange).toHaveBeenCalledWith(dataList[0], [], { ...dataList[0], index: 0 });
	});

	it('allowClear property allow click delete selected', () => {
		const onChange = jest.fn();
		const wrapper = mount(<Select dataSource={dataList} onChange={onChange} allowClear value="cc" />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('mouseenter');

		wrapper
			.find(`.${classSelector}-clear-icon`)
			.at(0)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith('', 'cc');
	});

	it('when allowClear clear icon show correctly', () => {
		const wrapper = mount(<Select dataSource={dataList} allowClear value="cc" />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('mouseenter');

		expect(
			wrapper
				.find(`.${classSelector}-select-icon`)
				.at(0)
				.hasClass('show')
		).toBeTruthy();

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('mouseleave');
		expect(
			wrapper
				.find(`.${classSelector}-select-icon`)
				.at(0)
				.hasClass('show')
		).toBeFalsy();

		wrapper.setProps({
			disabled: true
		});
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('mouseenter');
		expect(
			wrapper
				.find(`.${classSelector}-select-icon`)
				.at(0)
				.hasClass('show')
		).toBeFalsy();
	});

	it('disabled work correctly', () => {
		const wrapper = mount(<Select dataSource={dataList} disabled />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-option-container`)).toHaveLength(0);

		wrapper.setProps({
			disabled: false
		});
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-option-container`)).toHaveLength(1);
	});

	it('should not change when click option disabled', async () => {
		const onChange = jest.fn();
		const onBeforeChange = jest.fn().mockImplementation(() => Promise.resolve());
		const wrapper = mount(<Select dataSource={dataList} onChange={onChange} onBeforeChange={onBeforeChange} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find(`.${classSelector}-option`)
			.at(2)
			.simulate('click');
		await onBeforeChange();
		expect(onChange).not.toHaveBeenCalled();
	});

	it('mouseenter open select when trigger hover', () => {
		const wrapper = mount(<Select dataSource={dataList} trigger="hover" className="select-trigger" />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-option-container`)).toHaveLength(0);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('mouseenter');
		expect(wrapper.find(`.${classSelector}-option-container`)).toHaveLength(1);

		const instance = wrapper.instance();
		const handleMouseLeave = jest.spyOn(instance, 'handleMouseLeave');
		handleMouseLeave();
		expect(wrapper.state().open).toBeFalsy();
	});

	it('should mouseleave invalid when trigger click', () => {
		const wrapper = mount(<Select dataSource={dataList} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		const instance = wrapper.instance();
		const handleMouseLeave = jest.spyOn(instance, 'handleMouseLeave');
		handleMouseLeave();
		expect(wrapper.state().open).toBeTruthy();
	});

	it('open can control options show and hidden', () => {
		const wrapper = mount(<Select dataSource={dataList} />);

		wrapper.setProps({
			open: true
		});
		expect(wrapper.find(`.${classSelector}-select-options`).length > 0).toBeTruthy();

		wrapper.setProps({
			open: false
		});
		expect(wrapper.find(`.${classSelector}-select-options`)).toHaveLength(0);
	});

	it('should control open invalid when set open property', () => {
		const wrapper = mount(<Select dataSource={dataList} />);
		wrapper.setProps({
			open: false
		});
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.state().open).toBeFalsy();
	});

	it('open function and close function listen', () => {
		const onSelectOpen = jest.fn();
		const onSelectClose = jest.fn();
		const wrapper = mount(<Select dataSource={dataList} onSelectClose={onSelectClose} onSelectOpen={onSelectOpen} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(onSelectOpen).toHaveBeenCalled();
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(onSelectClose).toHaveBeenCalled();
	});

	it('seachable select work correctly', () => {
		const onSearch = jest.fn();
		const wrapper = mount(<Select dataSource={dataList} searchable searchPlaceholder="单选搜索" onSearch={onSearch} />);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		expect(wrapper.find(`.${classSelector}-search`)).toHaveLength(1);

		const searchInput = wrapper.find('.cloud-select-search-input').at(0);

		expect(searchInput.props().placeholder).toEqual('单选搜索');

		searchInput.simulate('change', { target: { value: 'select' } });

		expect(onSearch).toHaveBeenCalledWith('select');

		searchInput.simulate('change', { target: { value: '苹果' } });

		expect(wrapper.find(`.${classSelector}-option`)).toHaveLength(1);
	});

	it('should position right when select children append to body', () => {
		const wrapper = mount(<Select isAppendToBody dataSource={dataList} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		expect(wrapper.state().style.position).toEqual('fixed');
	});

	it('should work correctly when click outside component', () => {
		let clickHandler = {};
		document.addEventListener = jest.fn((event, handler) => {
			if (event === 'click') {
				clickHandler = handler;
			}
		});
		const wrapper = mount(<Select dataSource={dataList} />);
		clickHandler({
			target: document.body
		});
		expect(wrapper.state().open).toBeFalsy();

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.state().open).toBeTruthy();

		clickHandler({
			target: document.body
		});
		expect(wrapper.state().open).toBeFalsy();

		wrapper.setProps({
			open: true
		});
		clickHandler({
			target: document.body
		});
		expect(wrapper.state().open).toBeTruthy();
	});
});
