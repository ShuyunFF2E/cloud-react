import React from 'react';
import Table, { $gridManager } from 'gridmanager-react';
import 'gridmanager-react/css/gm-react.css';
import Icon from '../icon';
import './index.less';

const ajaxPageTemplate = `
<div class="footer-toolbar" grid-manager-toolbar="{{vm.gridManagerName}}">
    <span class="totals-count">
        共<span totals-number-info></span>条
    </span>
	<span class="refresh-action">
        <i class="shuyunicon icon-refresh"></i>
        <span class="refresh-label">刷新</span>
    </span>
	<div class="change-size">
		{{ vm.pageSizeOptionTpl }}
	</div>

	<div class="toolbar-info checked-info"></div>
	<div class="ajax-page">
		<ul class="pagination" pagination-before>
			<li class="first-page">
				<i class="shuyunicon icon-first-solid"></i>
			</li>
			<li class="previous-page">
				<i class="shuyunicon icon-left-solid"></i>
			</li>
		</ul>

		<div class="goto-page">
			<input type="text" class="gp-input" current-page-info/>/共<span totals-page-info></span>页
		</div>
		<ul class="pagination" pagination-after>
			<li class="next-page">
				<i class="shuyunicon icon-right-solid"></i>
			</li>
			<li class="last-page">
				<i class="shuyunicon icon-last-solid"></i>
			</li>
		</ul>
	</div>
</div>`;

const voidStyle = {
	textAlign: 'center'
};

const voidIconStyle = {
	color: '#ddd',
	fontSize: '40px',
	verticalAlign: 'middle',
	marginRight: '10px'
};
const voidMsgStyle = {
	display: 'inline-block',
	fontSize: '14px',
	color: '#999',
	verticalAlign: 'middle'
};
const emptyTemplate = (
	<div style={voidStyle}>
		<Icon type="warning-circle-solid" style={voidIconStyle}/>
		<span style={voidMsgStyle}>暂无数据</span>
	</div>
);

const defaultOption = {
	skinClassName: 'cloud-react-skin', // 页样式名称
	emptyTemplate,
	ajaxPageTemplate
};

$gridManager.defaultOption = defaultOption;

export default Table;
