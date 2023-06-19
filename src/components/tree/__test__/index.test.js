import React, { Component } from 'react';
import { mount, render } from 'enzyme';
import mountTest from '../../../../tests/shared/mountTest';
import Tree from '../index';

const treeData = [
  {
    id: 0,
    name: '根节点',
    pId: null,
    disableRename: true,
    children: [
      {
        id: 11,
        name: '一级节点1',
        pId: 0,
        disableAdd: true,
        children: [],
      },
      {
        id: 12,
        name: '一级节点2',
        pId: 0,
        disableRemove: true,
        children: [
          {
            id: 121,
            name: '一级节点21',
            pId: 12,
            disableRename: true,
            children: [
              {
                id: 1211,
                name: '一级节点211',
                pId: 121,
              },
              {
                id: 1212,
                name: '节点212',
                pId: 121,
                children: [
                  {
                    id: 12121,
                    name: '节点2121',
                    pId: 1212,
                  },
                ],
              },
            ],
          },
          {
            id: 122,
            name: '节点22',
            disableSelected: true,
            pId: 12,
          },
        ],
      },
      {
        id: 13,
        name: '一级节点3',
        pId: 0,
      },
    ],
  },
];

describe('Tree', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    jest.spyOn(Element.prototype, 'clientWidth', 'get')
      .mockImplementation(() => 500);
  });
  mountTest(Tree);

  it('renders correctly', () => {
    const wrapper = render(<Tree treeData={treeData} showIcon supportTooltip iconColor />);
    expect(wrapper).toMatchSnapshot();
  });

  it('onSearch work correctly', () => {
    const wrapper = mount(<Tree treeData={treeData} supportImmediatelySearch supportSearch supportCheckbox searchPlaceholder="搜索" />);
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '一级节点3' } });
    wrapper
      .find('.cloud-icon.icon-search')
      .simulate('click');
    expect(wrapper.find('.cloud-tree-list').at(1).text()).toEqual('一级节点3');
  });

  it('onSelect work correctly', () => {
    const onSelectedNode = jest.fn();
    const onDoubleClick = jest.fn();
    const wrapper = mount(<Tree treeData={treeData} isUnfold supportCheckbox breakCheckbox onSelectedNode={onSelectedNode} onDoubleClick={onDoubleClick} />);
    wrapper
      .find('.cloud-checkbox-input')
      .at(0)
      .simulate('change');
    expect(onSelectedNode).toHaveBeenCalled();
    // expect(wrapper.find('.cloud-checkbox-input').at(0).checked).toBeTruthy();
  });

  it('show menu work correctly', () => {
    const onDoubleClick = jest.fn();
    const stopImmediatePropagation = jest.fn();
    const wrapper = mount(<Tree treeData={treeData} isUnfold supportMenu supportCheckbox breakCheckbox onDoubleClick={onDoubleClick} />);
    wrapper
      .find('.checkbox-label-text')
      .at(0)
      .simulate('dblclick');
    wrapper
      .find('.node-item-container')
      .at(0)
      .simulate('contextmenu', { nativeEvent: { stopImmediatePropagation } });
    expect(onDoubleClick).toHaveBeenCalled();
    expect(wrapper.find('.cloud-tree-menu')).toHaveLength(1);
  });

  it('show menu dialog work correctly', () => {
    const stopImmediatePropagation = jest.fn();
    const onAddNode = jest.fn().mockImplementation(() => Promise.resolve({ data: 2898 }));
    const wrapper = mount(<Tree treeData={treeData} supportMenu menuType="dialogMenu" onAddNode={onAddNode} />);
    wrapper
      .find('.edit-icon')
      .at(2)
      .simulate('click', { nativeEvent: { stopImmediatePropagation } });
    wrapper
      .find('.cloud-tree-menu')
      .children()
      .at(0)
      .simulate('click');
    wrapper
      .find('.cloud-input')
      .simulate('change', { target: { value: '新增节点222' } });
    document.querySelector('.cloud-modal-confirm-btn').click();
    expect(onAddNode).toHaveBeenCalled();
  });

  it('add node work correctly', () => {
    const stopImmediatePropagation = jest.fn();
    const onAddNode = jest.fn().mockImplementation(() => Promise.resolve());
    const wrapper = mount(<Tree treeData={treeData} supportMenu onAddNode={onAddNode} />);
    wrapper
      .find('.node-item-container')
      .at(0)
      .simulate('contextmenu', { nativeEvent: { stopImmediatePropagation } });
    wrapper
      .find('.cloud-tree-menu')
      .children()
      .at(0)
      .simulate('click');
    wrapper
      .find('.node-input')
      .at(0)
      .simulate('change', { target: { value: '新增节点' } });
    wrapper
      .find('.node-input')
      .at(0)
      .simulate('keydown', { keyCode: 13 });
    // cancel save node
    wrapper
      .find('.node-item-container')
      .at(0)
      .simulate('contextmenu', { nativeEvent: { stopImmediatePropagation } });
    wrapper
      .find('.cloud-tree-menu')
      .children()
      .at(0)
      .simulate('click');
    wrapper
      .find('.node-input')
      .at(0)
      .simulate('change', { target: { value: '新增节点' } });
    wrapper
      .find('.cancel-icon')
      .at(0)
      .simulate('click');
    // DISABLED NODE
    wrapper
      .find('.node-item-container')
      .at(1)
      .simulate('contextmenu', { nativeEvent: { stopImmediatePropagation } });
    wrapper
      .find('.cloud-tree-menu')
      .children()
      .at(0)
      .simulate('click');
    expect(onAddNode).toHaveBeenCalled();
  });
  it('rename node work correctly', () => {
    const stopImmediatePropagation = jest.fn();
    const onRenameNode = jest.fn().mockImplementation(() => Promise.resolve());
    const wrapper = mount(<Tree treeData={treeData} supportMenu onRenameNode={onRenameNode} />);
    // DISABLED NODE
    wrapper
      .find('.node-item-container')
      .at(1)
      .simulate('contextmenu', { nativeEvent: { stopImmediatePropagation } });
    wrapper
      .find('.cloud-tree-menu')
      .children()
      .at(1)
      .simulate('click');

    wrapper
      .find('.node-item-container')
      .at(0)
      .simulate('contextmenu', { nativeEvent: { stopImmediatePropagation } });
    wrapper
      .find('.cloud-tree-menu')
      .children()
      .at(1)
      .simulate('click');
    wrapper
      .find('.node-input')
      .at(0)
      .simulate('change', { target: { value: '修改节点' } });
    wrapper
      .find('.node-input')
      .at(0)
      .simulate('keydown', { keyCode: 13 });
    expect(onRenameNode).toHaveBeenCalled();
  });
  // @TODO
  // it('delete node work correctly', () => {
  //   const stopImmediatePropagation = jest.fn();
  //   const onRemoveNode = jest.fn().mockImplementation(() => Promise.resolve());
  //   const wrapper = mount(<Tree treeData={treeData} supportMenu onRemoveNode={onRemoveNode} />);
  //   // DISABLED NODE
  //   wrapper
  //     .find('.node-item-container')
  //     .at(0)
  //     .simulate('contextmenu', { nativeEvent: { stopImmediatePropagation } });
  //   wrapper
  //     .find('.cloud-tree-menu')
  //     .children()
  //     .at(2)
  //     .simulate('click');
  //   wrapper
  //     .find('.node-item-container')
  //     .at(3)
  //     .simulate('contextmenu', { nativeEvent: { stopImmediatePropagation } });
  //   wrapper
  //     .find('.cloud-tree-menu')
  //     .children()
  //     .at(2)
  //     .simulate('click');

  //   document.querySelector('.cloud-modal-confirm-btn')?.click();
  //   expect(onRemoveNode).toHaveBeenCalled();
  // });
  it('drag node work correctly', () => {
    let called = '';
    const onDragBefore = jest.fn(() => { called = 'dragstart'; });
    const onDragMoving = jest.fn(() => { called = 'drag'; });
    const onDragAfter = jest.fn(() => { called = 'dragend'; });
    const wrapper = mount(<Tree treeData={treeData} onDragBefore={onDragBefore} onDragMoving={onDragMoving} onDragAfter={onDragAfter} supportDrag />);
    wrapper.find('.node-item-container').at(1).simulate('dragstart');
    expect(called === 'dragstart').toBeTruthy();
    wrapper.find('.node-item-container').at(1).simulate('drag');
    expect(called === 'drag').toBeTruthy();
    wrapper.find('.node-item-container').at(1).simulate('dragend');
    wrapper.find('.node-item-container').at(1).simulate('dragover');
    wrapper.find('.node-item-container').at(1).simulate('dragleave');
    expect(called === 'dragend').toBeTruthy();
  });
});
