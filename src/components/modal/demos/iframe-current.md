---
order: 11
title: iframe框架嵌套（在子窗口弹窗）
desc: 存在iframe嵌套页面且因为透传弹窗内部嵌入的用户组件不支持某些特性导致报错时使用此模式
---

```jsx

            /**
             * title: iframe框架嵌套-在子窗口弹窗
             * desc: 存在iframe嵌套页面且因为透传弹窗内部嵌入的用户组件不支持某些特性导致报错时使用此模式
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
	 return window;
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
  		
		return <iframe ref={this.iframeRef} src="/cloud-react/action/modal?showType=current" style={style} />;
	}
}
```