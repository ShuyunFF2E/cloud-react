---
order: 13
title: 自定义样式
desc: 使用style属性自定义modal组件样式，禁用确定按钮
---

```jsx

            /**
             * title: 自定义样式
             * desc: 使用style属性自定义modal组件样式，禁用确定按钮
             */
import React from 'react';
import { Button, Modal, Message } from 'cloud-react';

class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	// 打开弹出框
	openBasicModal = () => {
		this.setState({
			visible: true
		});
	};

	// 确认按钮回调函数
	handleOk = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		const modalStyle = {
			width: '600px'
		};
		const headerStyle = {
			// background: 'linear-gradient(to right, #feac5e,#c779d0,#4bc0c8)',
			// borderColor: '#af7e7e'
		};
		const bodyStyle = {
			// width: 'auto',
			// fontSize: '20px',
			// color: '#bd5b21',
			// height: '100px',
			// background: 'linear-gradient(to top left, rgb(211 178 149), rgb(191, 230, 186), rgb(209 198 199), rgb(191, 230, 186))',
			// overflow: 'auto'
		};
		const footerStyle = {
			// background: 'linear-gradient(to right, #d3959b,#cdb275)',
			// borderColor: '#af7e7e'
		};

		return (
			<div>
				<Button type="normal" onClick={this.openBasicModal}>
					自定义样式弹出框
				</Button>
				<Modal
					title="自定义样式弹窗"
					size="medium"
					headerStyle={headerStyle}
					bodyStyle={bodyStyle}
					footerStyle={footerStyle}
					className="test"
					modalStyle={modalStyle}
					disabledOk={true}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleOk}
					onClose={this.handleOk}>
          杭州数云信息技术有限公司是国内领先的全域消费者增长解决方案提供商，通过整合软件产品和专业服务的一体化解决方案，支持品牌零售企业建立全域消费者运营体系，驱动全域消费者增长。<br />
          <br />

数云针对不同企业的业务规模、业务形态和发展阶段等差异化需求特点，提供面向中大型企业的消费者运营CRM数云麒麟，面向电商、中小企业的敏捷型消费者运营CRM数云赢家，并结合数云消费者运营服务能力，实现以消费者为中心的全渠道、全触点、全链路、全场景的数字化管理和资产化运营。目前服务国内外企业超过7,000家，业务涵盖服装、美妆、母婴、食品、3C电子、家居等各行业。<br />
<br />

公司总部在上海、杭州，并在西安、北京、广州、深圳等地均有本地化服务团队，依靠丰富的行业经验和专业的产品服务，数云正在成为零售企业首选的全域消费者运营合作伙伴。<br />
				</Modal>
			</div>
		);
	}
}

export default ModalDemo;
```
