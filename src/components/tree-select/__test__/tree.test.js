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
	mountTest(TreeSelect);

	it('single tree renders correctly', () => {
		const wrapper = mount(<App single placeholder="选择一个选项" />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		expect(wrapper).toMatchSnapshot();
	});

	it('multiple tree renders correctly', () => {
		const wrapper = render(<App multiple placeholder="选择一个选项" />);
		expect(wrapper).toMatchSnapshot();
	});

	it('single tree basic work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<App single onChange={onChange} isUnfold />);
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
		const wrapper = mount(<App multiple onChange={onChange} isUnfold />);
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
		const wrapper = mount(<App multiple containParentNode onChange={onChange} isUnfold />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');
		wrapper
			.find('.cloud-checkbox-input')
			.at(3)
			.simulate('change');
		expect(onChange).toHaveBeenCalledWith({ id: 1132, pId: 113 }, [
			{ id: 1132, pId: 113 },
			{ id: 11321, pId: 1132 }
		]);
	});

	it('allowClear work correctly', () => {
		const onChange = jest.fn();
		const wrapper = mount(<App multiple onChange={onChange} value={[{ id: 114, name: '禁止删除节点4', pId: 11 }]} allowClear />);
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
		const wrapper = mount(<App multiple hasConfirmButton footerTypes={['ok', 'cancel', 'reset']} />);
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
			<App isUnfold multiple hasConfirmButton footerTypes={['ok', 'cancel', 'reset']} onOk={onOk} onCancel={onCancel} onReset={onReset} />
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
		const wrapper = mount(<TreeSelect dataSource={treeData} isUnfold hasConfirmButton multiple value={[{ id: 114, name: '禁止删除节点4', pId: 11 }]} />);
		wrapper
			.find(`.${classSelector}-wrapper`)
			.at(0)
			.simulate('click');

		wrapper.instance().handleClick({ target: document.body });
		expect(wrapper.state().node).toEqual({});
	});
});
