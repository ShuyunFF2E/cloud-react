import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render, mount } from 'enzyme';
import { noop, prefixCls } from '@utils';
import mountTest from '@tests/shared/mountTest';
import TreeSelect from '../index';

const classSelector = `${prefixCls}-tree-select`;
const treeData = [
	{
		id: 11,
		name: '禁止删除节点',
		pId: 1,
		disableRemove: true,
		children: [
			{
				id: 113,
				name: '删除三个',
				pId: 11,
				children: [
					{
						id: 1131,
						name: '禁止删除节点31',
						pId: 113,
						children: []
					},
					{
						id: 1132,
						name: '禁止删除节点32',
						pId: 113,
						children: [
							{
								id: 11321,
								name: '禁止删除节点321',
								pId: 1132,
								children: []
							}
						]
					}
				]
			},
			{
				id: 114,
				name: '禁止删除节点4',
				pId: 11,
				children: []
			}
		]
	},
	{
		id: 14,
		name: '未分类',
		pId: 1,
		disableRemove: true,
		disableAdd: true,
		disableRename: true,
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

	state = {
		source: [...treeData]
	};

	onChange = (node, selectedNodes) => {
		const { pId, id } = node;
		const nodes = selectedNodes.map(v => ({
			id: v.id,
			pId: v.pId
		}));
		this.props.onChange({ pId, id }, nodes);
	};

	onOk = (node, selectedNodes) => {
		const { pId, id } = node;
		const nodes = selectedNodes.map(v => ({
			id: v.id,
			pId: v.pId
		}));
		this.props.onOk({ pId, id }, nodes);
	};

	onSearch = value => {
		this.props.onSearch(value);
	};

	render() {
		return <TreeSelect {...this.props} onOk={this.onOk} onChange={this.onChange} onSearch={this.onSearch} dataSource={this.state.source} />;
	}
}

describe('Multilayer TreeSelect', () => {
	beforeEach(() => {
		// eslint-disable-next-line no-undef
		jest.spyOn(Element.prototype, 'clientWidth', 'get')
			.mockImplementation(() => 210);
	});

	mountTest(TreeSelect);

	it('single tree renders correctly', () => {
		const wrapper = mount(<App type="single" open placeholder="选择一个选项" />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper).toMatchSnapshot();
	});

	it('multiple tree renders correctly', () => {
		const wrapper = render(<App type="multiple" placeholder="选择一个选项" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('older single tree renders correctly', () => {
		const wrapper = render(<App single />);
		expect(wrapper).toMatchSnapshot();
	});

	it('older multiple tree renders correctly', () => {
		const wrapper = render(<App multiple />);
		expect(wrapper).toMatchSnapshot();
	});

	it('single tree should word correctly when value is null or defaultValue is null', () => {
		const wrapper = render(<App type="single" value={null} defaultValue={null} />);
		expect(wrapper).toMatchSnapshot();

		const wrapper1 = render(<App value={null} />);
		expect(wrapper1).toMatchSnapshot();
	});

	it('tree should word correctly when datasource is an empty array', () => {
		const wrapper = render(<TreeSelect type="single" dataSource={[]} emptyRender="暂无数据" defaultOpen />);
		expect(wrapper).toMatchSnapshot();
	});

	it('single tree basic work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<App type="single" onChange={onChange} isUnfold />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.node-item')
			.at(2)
			.simulate('click');
		const { id, pId } = treeData[0].children[0].children[0];
		expect(onChange).toHaveBeenCalledWith({ id, pId }, [{ id, pId }]);
	});

	it('multiple tree basic work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<App type="multiple" onChange={onChange} isUnfold />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-checkbox-input')
			.at(1)
			.simulate('change');
		const { id, pId } = treeData[0].children[0];
		expect(onChange).toHaveBeenCalledWith({ id, pId }, [
			{ id: 1131, pId: 113 },
			{ id: 11321, pId: 1132 }
		]);

		wrapper
			.find('.cloud-checkbox-input')
			.at(1)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith({ id, pId }, []);
	});

	it('containParentNode work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<App type="multiple" containParentNode onChange={onChange} isUnfold />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-checkbox-input')
			.at(3)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith({ id: 1132, pId: 113 }, [
			{ id: 11321, pId: 1132 }
		]);
	});

	it('allowClear work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<App type="multiple" onChange={onChange} value={[{ id: 114, name: '禁止删除节点4', pId: 11 }]} allowClear />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('mouseenter');
		wrapper
			.find(`.${classSelector}-clear-icon`)
			.at(0)
			.simulate('click');
		expect(onChange).toHaveBeenCalledWith({}, []);
	});

	it('footerTypes work correctly', () => {
		const wrapper = mount(<App type="multiple" hasConfirmButton footerTypes={['ok', 'cancel', 'reset']} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper.find(`.${classSelector}-operate-btn`).children()).toHaveLength(3);
	});

	it('footerTypes callback work correctly', () => {
		const onOk = jest.fn();
		const onCancel = jest.fn();
		const onReset = jest.fn();
		const wrapper = mount(
			<App isUnfold type="multiple" hasConfirmButton footerTypes={['ok', 'cancel', 'reset']} onOk={onOk} onCancel={onCancel} onReset={onReset} />
		);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-checkbox-input')
			.at(2)
			.simulate('change');

		wrapper
			.find('.cloud-button')
			.at(0)
			.simulate('click');
		const { id, pId } = treeData[0].children[0].children[0];
		expect(onOk).toHaveBeenCalledWith({ id, pId }, [{ id, pId }]);

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(1)
			.simulate('click');
		expect(onCancel).toHaveBeenCalled();
		expect(wrapper.find('TreeSelect').state().open).toBeFalsy();

		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-button')
			.at(2)
			.simulate('click');
		expect(onReset).toHaveBeenCalled();
		expect(wrapper.find('TreeSelect').state().value).toEqual([]);
	});

	it('should work correctly when click outside component', () => {
		const wrapper = mount(
			<TreeSelect dataSource={treeData} isUnfold hasConfirmButton type="multiple" value={[{ id: 114, name: '禁止删除节点4', pId: 11 }]} />
		);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper.instance().handleClick({ target: document.body });
		expect(wrapper.state().node).toEqual({});
	});
});
