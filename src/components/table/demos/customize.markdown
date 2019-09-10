---
order: 4
title: 自定义模板
desc: columnData.template使用介绍
---

````javascript
import React, { Component } from 'react';
import Table from 'cloud-react/table';

// 唯一标识符，该值不允许重复
const gridManagerName = 'customize-table';

// 组件: 操作列
function ActionInner(props) {
    const actionAlert = event => {
        alert('操作栏th是由React模板渲染的');
    };
    return <span onClick={actionAlert} style={{display: 'block', color: 'red'}}>{props.text}</span>;
}

function ActionComponents(props) {
    return <ActionInner text={props.text}/>;
}

// 组件: 标题
function TitleComponents(props) {
    return (
        <a href={'https://www.lovejavascript.com/#!zone/blog/content.html?id=' + props.row.id} target={'_black'}>{props.title}</a>
    );
}

// 组件: 编辑
function EditComponents(props) {
    const { index, row, testFn } = props;
    const editAction = event => {
        Table.updateRowData(gridManagerName, 'id', {...row, title: row.title + '(编辑于' + new Date().toLocaleDateString() +')'});
        testFn();
    };

    return (
        <span style={{color: '#1890ff', cursor: 'pointer'}} onClick={editAction} data-index={index} title={row.title}>编辑</span>
    );
}

const getColumnData = (num, testFN) => {
	return  [
        {
           key: 'pic',
           remind: 'the pic',
           width: '110px',
           text: '缩略图',
           template: (pic, row) => {
               return (
                   <img style={{width: '90px', height: '58.5px', margin: '0 auto'}} src={'https://www.lovejavascript.com' + pic} title={row.name}/>
               );
           }
        },{
           key: 'title',
           remind: 'the title',
           text: '标题',
           template: <TitleComponents/>
       },{
           key: 'readNumber',
           text: '阅读量',
           width: '150px',
           align: 'center'
       },{
           key: 'info',
           text: '简介',
       },{
           key: 'state',
           text: 'state',
           align: 'center',
           template: () => {
                return <span>{num}</span>;
           }
       },{
           key: 'username',
           remind: 'the username',
           width: '100px',
           text: '作者',
           // 使用函数返回 dom node
           template: (username, row, index) => {
               return (
                   <a href={'https://github.com/baukh789'} target={'_black'}>{username}</a>
               );
           }
       },{
            key: 'action',
            remind: 'the action',
            width: '100px',
            align: 'center',
            disableCustomize: true,
            text: <ActionComponents text={'操作' + num}/>,
            // 快捷方式，将自动向组件的props增加row、index属性
            template: <EditComponents testFn={testFN}/>
        }
   ];
}
export default class TableDemo extends Component {

    constructor() {
        super();
        this.state = {
            num: 1
        };
        const testFN = () => {
            this.setState(state => {
                this.columnData = getColumnData(state.num + 1, testFN);
                return {
                    num: state.num + 1
                };
            });
        };
        this.columnData = getColumnData(this.state.num, testFN);
    }
	render() {
		return (
			<Table
				gridManagerName={gridManagerName}
				ajaxData='https://www.lovejavascript.com/blogManager/getBlogList'
				ajaxType='POST'
				disableLine={true}
				columnData={this.columnData}
				supportAjaxPage={true}
			/>
		);
	}
}

````
