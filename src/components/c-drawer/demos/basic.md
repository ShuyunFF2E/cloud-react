---
order: 1
title: 抽屉
desc: 默认样式
---
```jsx
/**
 * title: 基础
 * desc: 头像有六种尺寸，两种形态
 */
import React from 'react';

import { Button, CDrawer } from 'cloud-react';

export default class Demo extends React.Component {
	 constructor(props) {
        super(props);
				this.state = {
						open: false,
				};
	 }
 
  showDrawer() {
    this.setState({
      open: true,
    });
  }
  onClose() {
   this.setState({
      open: false,
    });
  }
  render() {
    return (
      <div style={{position:'relative'}}>
        <Button type="primary" onClick={()=>{this.showDrawer()}}>
          Open
        </Button>
        <CDrawer
          title="Basic Drawer"
          placement="bottom"
          onClose={()=>{this.onClose()}}
          open={this.state.open}
					getContainer={false}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </CDrawer>
      </div>
    );
  }
}
```
