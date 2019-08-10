---
title: 基础用法
desc: 短信编辑器
---

````javascript
import React from 'react';
import Sms from 'ccms-components-react/sms';
import Button from 'ccms-components-react/button';

export default class SmsDemo extends React.Component {

	keywords = [
		{
			type: 'taobao',
			name: 'QZ',
			text: '前缀测试',
			defaultValue: '前缀测试'
		},
		{
			type: 'taobao',
			name: 'HZ',
			text: '后缀测试',
			defaultValue: '后缀测试'
		},
		{
			type: 'taobao',
			name: 'XMTB',
			text: '姓名淘宝',
			defaultValue: '西凉少女Ash'
		},
		{
			type: 'taobao',
			name: 'XMJDWMRZ',
			text: '姓名京东无默认值',
			disabled: true
		},
		{
			type: 'taobao',
			name: 'DDBH',
			text: '订单编号',
			defaultValue: '6666666666',
			disabled: true
		},
		{
			type: 'taobao',
			name: 'shortlink',
			text: '同城关怀_2018-08-07',
			defaultValue: 'c.tb.cn/c.0zYeW#'
		},
		{
			type: 'taobao',
			name: 'LXDH',
			text: '联系电话',
			defaultValue: '180-0000-0000'
		},
		{
			type: 'taobao',
			name: 'YBD_1',
			text: '用不到 1',
			defaultValue: '用不到 1'
		}
	];

	gateways = [{
			name: 'GatewayType 0',
			gatewayId: 0,
			wordsLimit: 70,
			multiLimit: 67,
			gatewayType: 0,
			signature: '数云食堂',
		},
		{
			gatewayId: 1,
			name: 'GatewayType 1',
			gatewayType: 1,
		},
		{
			gatewayId: 2,
			name: 'GatewayType 2',
			gatewayType: 2,
			signature: '[通道签名 2]'
		},
		{
			gatewayId: 3,
			name: 'GatewayType 3',
			gatewayType: 3,
			signature: '[通道签名 3]'
		}
	];

	constructor(props) {

		super(props);

		this.state = {
			gateway: this.gateways[0],
			keywords: this.keywords,
			content: '如果地区{选择器}要使用{{xxxx}}þ_enter_þþ_enter_þ后端数据, 请配置 ual 参数 œœ_[taobao]shortlink_œœ œœ_[taobao]XMTB_œœ 13456789876',
			useUnsubscribe: true,
			unsubscribeText: '回T退定',
			customSignature: '我是自定义的签名',
			disabled: false,
			isTrimSpace: false,
			text: '',
			outerText: ''
		}

		this.smsRef = React.createRef();
	}

	handleChange = (event) => {

		const id = event.target.value;
		const gateway = this.gateways.find(item => item.gatewayId === Number(id));

		this.setState({
			gateway: gateway
		});

	}

	handleCustomSignatureChange = () => {
		this.setState({
			customSignature: event.target.value
		});
	}

	handleUseUnsubscribeChange = () => {
		this.setState({
			useUnsubscribe: !this.state.useUnsubscribe
		});
	}

	handleUnsubscribeTextChange = (event) => {
		this.setState({
			unsubscribeText: event.target.value
		});
	}

	handleOuterTextChange = (event) => {
		this.setState({
			outerText: event.target.value
		});
	}

	handleInsertText = () => {
		this.smsRef.current.insertText(this.state.outerText);
	}

	handleInsertKeyword = () => {
		this.smsRef.current.insertKeyword({
			text: '订单短链',
			type: 'taobao'
		});
	}

	handleContentChange = (text) => {
		this.setState({
			content: text
		});
	}

	getSmsData = () => {
		console.log(this.smsRef.current.getOuterData());
	}

	render() {

		const { keywords, content, gateway, useUnsubscribe, unsubscribeText, customSignature, disabled, text, isTrimSpace, outerText } = this.state;

		return (
			<div className="wrapper">

				<Sms ref={this.smsRef}
					 disabled={disabled}
					 content={content}
					 keywords={keywords}
					 isTrimSpace={isTrimSpace}
					 gateway={gateway}
					 useUnsubscribe={useUnsubscribe}
					 unsubscribeText={unsubscribeText}
					 customSignature={customSignature}
					 onContentChange={this.handleContentChange}>

					<div className="item">
						<label>发送通道：</label>
						<select value={gateway.gatewayId} onChange={this.handleChange}>
							{
								this.gateways.map(item =>
									<option key={item.gatewayId} value={item.gatewayType}>{item.name}</option>
								)
							}
						</select>
					</div>

					<Sms.Editor />

					<div className="item">
						<label>自定义签名：</label>
						<input type="text" value={customSignature} onChange={this.handleCustomSignatureChange}/>
					</div>

					<div className="item">
						<label>退订回复：</label>
						<input type="checkbox" defaultChecked={useUnsubscribe} onChange={this.handleUseUnsubscribeChange} />
						<input type="text" value={unsubscribeText} onChange={this.handleUnsubscribeTextChange}/>
					</div>

					<div className="item">
						<label>编辑器结果：</label>
						<Button size="small" type="primary" onClick={this.getSmsData}>getSmsData</Button>
					</div>

					<div className="item">
						<label>插入文本内容：</label>
						<input type="text" value={outerText} onChange={this.handleOuterTextChange}/>&nbsp;&nbsp;&nbsp;
						<Button size="small" type="primary" onClick={this.handleInsertText}>插入文本</Button>
					</div>

					<div className="item">
						<label>插入变量：</label>
						<Button size="small" type="primary" onClick={this.handleInsertKeyword}>插入变量</Button>
					</div>

					<div className="sms-preview">
						<Sms.Preview />
					</div>
				</Sms>
			</div>
		);
	}
}
````


````less
.wrapper {
	position: relative;
	height: 500px;
}
.sms-preview {
	position: absolute;
	top: 0;
	right: 0;
}

.item {
	display: flex;
	margin-top: 15px;
}
label {
	width: 100px;
	text-align: right;
}
.text {
	display: inline-block;
	width: 550px;
}
```
