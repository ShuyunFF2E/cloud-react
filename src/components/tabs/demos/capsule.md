---
title: 胶囊用法
desc: 页签类型为capsule的基础Tabs
---

```jsx

        /**
         * title: 胶囊 tabs
         * desc: 页签类型为 capsule 的基础 Tabs
         */
import React, { Component } from 'react';
import { Tabs } from 'cloud-react';

export default class BasicTabsDemo extends Component {
	handleChange = key => {
		console.log('当前激活面板key值为：' + key);
	};

	render() {
		return (
            <section>
                <h4>胶囊样式一：</h4>
                <Tabs defaultActiveKey="eat" type="capsule" onChange={this.handleChange} step={500}>
                    <Tabs.Panel tab="选项normal" key="1" />
                    <Tabs.Panel tab="选项active" key="eat" />
                    <Tabs.Panel tab="选项disabled" key="aaa" disabled>
                        lalala
                    </Tabs.Panel>
                    <Tabs.Panel tab="选项normal" key="2">
                        lalala
                    </Tabs.Panel>
                </Tabs>
                <h4>胶囊样式二：</h4>
                <Tabs defaultActiveKey="eat" type="empty-capsule" onChange={this.handleChange} step={500}>
                    <Tabs.Panel tab="选项normal" key="1" />
                    <Tabs.Panel tab="选项active" key="eat" />
                    <Tabs.Panel tab="选项disabled" key="aaa" disabled>
                        lalala
                    </Tabs.Panel>
                    <Tabs.Panel tab="选项normal" key="2">
                        lalala
                    </Tabs.Panel>
                </Tabs>
                <h4>胶囊样式的大小控制：</h4>
                <h5>样式1</h5>
                <Tabs defaultActiveKey="eat" type="capsule" onChange={this.handleChange} step={500} size="small">
                    <Tabs.Panel tab="选项normal" key="1" />
                    <Tabs.Panel tab="选项active" key="eat" />
                    <Tabs.Panel tab="选项disabled" key="aaa" disabled>
                        lalala
                    </Tabs.Panel>
                    <Tabs.Panel tab="选项normal" key="2">
                        lalala
                    </Tabs.Panel>
                </Tabs>
                <h5>样式2</h5>
                <Tabs defaultActiveKey="eat" type="empty-capsule" onChange={this.handleChange} step={500} size="small">
                    <Tabs.Panel tab="选项normal" key="1" />
                    <Tabs.Panel tab="选项active" key="eat" />
                    <Tabs.Panel tab="选项disabled" key="aaa" disabled>
                        lalala
                    </Tabs.Panel>
                    <Tabs.Panel tab="选项normal" key="2">
                        lalala
                    </Tabs.Panel>
                </Tabs>
            </section>
		);
	}
}
```
