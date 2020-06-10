---
order: 7
title: 嵌套使用
desc: modal弹框里面使用datepicker自适应位置
---

```javascript
import React from 'react';
import { Button, Datepicker, Modal } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	onInpChange = value => console.log(value);

	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};

		this.ref = React.createRef();
	}

	openBasicModal = () => {
		this.setState({
			visible: true
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.openBasicModal}>
					基本弹出框
				</Button>

				<Modal className="test" title="basic title" visible={this.state.visible} showMask onCancel={this.handleCancel}>
					<Datepicker
						maxYear={2023}
						position="auto"
						showTimePicker={true}
						onChange={this.onInpChange}
						maxDate={new Date('2024/5/1')}
						placeholder="yyyy/MM/dd hh:mm:ss"
					/>

					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />

					<Datepicker
						maxYear={2023}
						showTimePicker={true}
						onChange={this.onInpChange}
						maxDate={new Date('2024/5/1')}
						placeholder="yyyy/MM/dd hh:mm:ss"
					/>

					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />

					<Datepicker
						containerEleClass="cloud-modal-body"
						maxYear={2023}
						showTimePicker={true}
						onChange={this.onInpChange}
						maxDate={new Date('2024/5/1')}
						placeholder="yyyy/MM/dd hh:mm:ss"
					/>
				</Modal>
			</div>
		);
	}
}
```
