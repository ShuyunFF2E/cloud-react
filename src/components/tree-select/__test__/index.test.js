import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render, mount } from 'enzyme';
import { noop, prefixCls } from '@utils';
import mountTest from '@tests/shared/mountTest';
import TreeSelect from '../index';

const classSelector = `${prefixCls}-tree-select`;
const treeData = [
	{
		label: '苹果',
		value: 'apple',
		children: [
			{
				label: '荔枝',
				value: 'litchi'
			}
		]
	},
	{
		label: '草莓',
		value: 'caomei',
		children: [
			{
				label: '栗子',
				value: 'lizi'
			}
		]
	},
	{
		label: '桂圆',
		value: 'guiyuan',
		children: []
	}
];

class App extends Component {
	static propTypes = {
		onSearch: PropTypes.func
	};

	static defaultProps = {
		onSearch: noop
	};

	onSearch = value => {
		this.props.onSearch(value);
	};

	render() {
		return <TreeSelect onSearch={this.onSearch} dataSource={treeData} {...this.props} />;
	}
}

describe('TreeSelect', () => {
	mountTest(TreeSelect);

	it('renders correctly', () => {
		const wrapper = render(<App placeholder="选择一个选项" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('disabled work correctly', () => {
		const wrapper = mount(<App disabled />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('TreeSelect').state().open).toBeFalsy();
	});

	it('value work correctly', () => {
		const wrapper = mount(<App value={{ label: '荔枝', value: 'litchi' }} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('SingleTree').state().openKeys).toEqual(['apple']);
		expect(
			wrapper
				.find(`.${classSelector}-option`)
				.at(1)
				.hasClass('selected')
		).toBeTruthy();

		const data = { ...treeData[1].children[0] };
		wrapper.setProps({
			value: data,
			open: true
		});
		const states = wrapper.find('SingleTree').state();
		expect(states.openKeys).toEqual(['caomei']);
		expect(states.value).toEqual(data);
	});

	it('allowClear work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<App onChange={onChange} value={{ label: '荔枝', value: 'litchi' }} allowClear />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('mouseenter');
		expect(wrapper.find('Selected').state().clear).toBeTruthy();

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('mouseleave');
		expect(wrapper.find('Selected').state().clear).toBeFalsy();

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('mouseenter');
		wrapper
			.find(`.${classSelector}-clear-icon`)
			.at(0)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith({});
	});

	it('searchable work correctly', () => {
		const wrapper = mount(<App searchable searchPlaceholder="搜索" />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-search`)).toHaveLength(1);
		expect(wrapper.find('Input').props().placeholder).toEqual('搜索');
	});

	it('open can control options show and hidden', () => {
		const wrapper = mount(<App />);

		wrapper.setProps({
			open: true
		});
		expect(wrapper.find(`.${classSelector}-options`).length > 0).toBeTruthy();

		wrapper.setProps({
			open: false
		});
		expect(wrapper.find(`.${classSelector}-container`)).toHaveLength(0);
	});

	it('should control open invalid when set open property', () => {
		let clickHandler = {};
		document.addEventListener = jest.fn((event, handler) => {
			if (event === 'click') {
				clickHandler = handler;
			}
		});

		const wrapper = mount(<App />);
		wrapper.setProps({
			open: false
		});
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('TreeSelect').state().open).toBeFalsy();

		wrapper.setProps({
			open: true
		});
		clickHandler({
			target: document.body
		});
		expect(wrapper.find(`.${classSelector}-options`).length > 0).toBeTruthy();
	});

	it('onSearch work correctly', () => {
		const onSearch = jest.fn();
		const wrapper = mount(<App searchable onSearch={onSearch} searchPlaceholder="搜索" />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper
			.find(`.${classSelector}-search-input`)
			.at(1)
			.simulate('change', { target: { value: '荔枝' } });
		expect(wrapper.find('SingleTree').state().dataSource).toEqual([treeData[0]]);
		expect(onSearch).toHaveBeenCalledWith('荔枝');

		wrapper
			.find(`.${classSelector}-search-icon`)
			.at(0)
			.simulate('click');
		expect(onSearch).toHaveBeenCalledWith('');
	});

	it('onChange work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<App onChange={onChange} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find(`.${classSelector}-option`)
			.at(0)
			.simulate('click');
		expect(onChange).not.toHaveBeenCalled();

		wrapper
			.find(`.${classSelector}-option`)
			.at(1)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith(treeData[0].children[0]);
	});

	it('options open list render correctly', () => {
		const wrapper = mount(<App />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find(`.${classSelector}-option`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('SingleTree').state().openKeys).toEqual(['apple']);

		wrapper
			.find(`.${classSelector}-option`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('SingleTree').state().openKeys).toEqual([]);
	});

	it('dataSource empty render correctly', () => {
		const wrapper = mount(<App dataSource={[]} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-empty-options`)).toHaveLength(1);
	});

	it('should called onSelectOpen and onSelectClose when container show and hidden', () => {
		const onSelectOpen = jest.fn();
		const onSelectClose = jest.fn();
		const wrapper = mount(<App onSelectOpen={onSelectOpen} onSelectClose={onSelectClose} />);
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

	it('should work correctly when click outside component', () => {
		let clickHandler = {};
		document.addEventListener = jest.fn((event, handler) => {
			if (event === 'click') {
				clickHandler = handler;
			}
		});
		const wrapper = mount(<App />);
		clickHandler({
			target: document.body
		});
		expect(wrapper.find('TreeSelect').state().open).toBeFalsy();

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find('TreeSelect').state().open).toBeTruthy();

		clickHandler({
			target: document.body
		});
		expect(wrapper.find('TreeSelect').state().open).toBeFalsy();
	});

	it('should append to body when ', () => {
		const wrapper = mount(<App isAppendToBody />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		expect(wrapper.find('TreeSelect').state().style.position).toEqual('fixed');
	});
});
