---
order: 2
title: 按钮尺寸
desc: 按钮三种尺寸：large、default、small
---

```jsx

            /**
             * title: 按钮尺寸
             * desc: 按钮三种尺寸：large、default、small
             */
import React from 'react';
import { Button, Icon } from 'cloud-react';

const blank = '\u00A0';

class ButtonDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			size: 'default',
          borderRadiusSize: 'default'
		};
	}

	onChangeSize(size) {
		this.setState({ size });
	}

	onChangeBorderRadius(borderRadiusSize) {
		this.setState({ borderRadiusSize });
	}

	render() {
		const { size, borderRadiusSize } = this.state;

		return (
			<React.Fragment>
				<Button type="primary" size={size} borderRadiusSize={borderRadiusSize}>主要</Button>
				<h4>切换尺寸</h4>
				<div style={{ marginBottom: 10 }}>
					<Button onClick={() => this.onChangeSize('large')}>大尺寸</Button>
					{blank}
					<Button onClick={() => this.onChangeSize('default')}>中尺寸</Button>
					{blank}
					<Button onClick={() => this.onChangeSize('small')}>小尺寸</Button>
					{blank}
					<Button type="link" disabled>
						current: {size}
					</Button>
				</div>

              <h4>切换圆角</h4>
              <div style={{ marginBottom: 10 }}>
                <Button onClick={() => this.onChangeBorderRadius('default')}>默认-3px</Button>
                {blank}
                <Button onClick={() => this.onChangeBorderRadius('medium')}>medium-6px</Button>
                {blank}
                <Button onClick={() => this.onChangeBorderRadius('large')}>large-12px</Button>
                {blank}
                <Button onClick={() => this.onChangeBorderRadius('circle')}>circle-50%</Button>
              </div>

				<h4>无图标</h4>
				<div>
                  <Button type="primary" size={size} borderRadiusSize={borderRadiusSize}>主要</Button>
                  {blank}
					<Button type="normal" size={size} borderRadiusSize={borderRadiusSize}>描边</Button>
					{blank}
					<Button type="secondary" size={size} borderRadiusSize={borderRadiusSize}>次要</Button>
					{blank}
					<Button type="dashed" size={size} borderRadiusSize={borderRadiusSize}>幽灵</Button>
					{blank}
					<Button type="link" size={size} borderRadiusSize={borderRadiusSize}>链接</Button>
					{blank}
					<Button type="text" size={size} borderRadiusSize={borderRadiusSize}>文字</Button>
				</div>
                <h4>有图标</h4>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Button type="primary" icon={size === 'small' ? undefined : "plus-solid"} size={size} borderRadiusSize={borderRadiusSize}>主要</Button>
					{blank}
					<Button type="normal" icon={size === 'small' ? undefined : "plus-solid"} size={size} borderRadiusSize={borderRadiusSize}>描边</Button>
					{blank}
					<Button type="secondary" icon={size === 'small' ? undefined : "plus-solid"} size={size} borderRadiusSize={borderRadiusSize}>次要</Button>
					{blank}
					<Button type="dashed" icon={size === 'small' ? undefined : "plus-solid"} size={size} borderRadiusSize={borderRadiusSize}>幽灵</Button>
					{blank}
					<Button type="link" icon={size === 'small' ? undefined : "plus-solid"} size={size} borderRadiusSize={borderRadiusSize}>链接</Button>
					{blank}
					<Button type="text" icon={size === 'small' ? undefined : "plus-solid"} size={size} borderRadiusSize={borderRadiusSize}>文字</Button>
				</div>
                  <h4>只有图标：</h4>
                  <Button type="primary" size={size} borderRadiusSize={borderRadiusSize} shape="square">
                    <Icon style={{ lineHeight: '16px' }} type="plus-solid" />
                  </Button>
                  {blank}
                  <Button type="normal" size={size} borderRadiusSize={borderRadiusSize} shape="square">
                    <Icon style={{ lineHeight: '16px' }} type="plus-solid" />
                  </Button>
                  {blank}
                  <Button type="secondary" size={size} borderRadiusSize={borderRadiusSize} shape="square">
                    <Icon style={{ lineHeight: '16px' }} type="plus-solid" />
                  </Button>
                  {blank}
                  <Button type="link" size={size} borderRadiusSize={borderRadiusSize} shape="square">
                    <Icon style={{ lineHeight: '16px' }} type="plus-solid" />
                  </Button>
                  {blank}
                  <Button type="text" size={size} borderRadiusSize={borderRadiusSize} shape="square">
                    <Icon style={{ lineHeight: '16px' }} type="plus-solid" />
                  </Button>
			</React.Fragment>
		);
	}
}
export default ButtonDemo;
```
