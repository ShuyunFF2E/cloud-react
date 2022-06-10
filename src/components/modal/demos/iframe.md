---
order: 10
title: iframe框架嵌套
desc: 当iframe窗口里面的页面和父窗口不存在跨域时，弹框将默认挂载到父窗口，以此增强视觉效果
---

```jsx

            /**
             * title: iframe框架嵌套
             * desc: 当iframe窗口里面的页面和父窗口不存在跨域时，弹框将默认挂载到父窗口，以此增强视觉效果
             */
import React from 'react';

const style = {
	width: '100%',
	height: '400px',
	border: '2px solid #bad8e4'
};

export default class ModaliFrameDemo extends React.Component {
	iframeRef = React.createRef();

	get rootWindow() {
		const { current: iframe } = this.iframeRef;

		return iframe ? iframe.contentWindow : window;
	}

	componentDidMount() {
		this.rootWindow.addEventListener('load', this.setStyle);
	}

	componentWillUnmount() {
		if (this.rootWindow) {
			this.rootWindow.removeEventListener('load', this.setStyle);
		}
	}

	setStyle = () => {
		const root = this.rootWindow.document.querySelector('#root');

		const [menu, content] = root.children[0].children;

		menu.style.display = 'none';
		content.style.marginLeft = 0;
	};

	render() {
		try {
			if (window.top !== window) {
				return '子窗口不再渲染iframe示例';
			}
		} catch (err) {
			console.log(err);
		}

		return <iframe ref={this.iframeRef} src="/v1/cloud-react/action/modal" style={style} />;
	}
}
```
