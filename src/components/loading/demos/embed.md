---
order: 2
title: 卡片加载中及背景
desc: 可以直接把内容内嵌到Loading中，将现有容器变为加载状态；默认无背景，`layer` 为true时有白色透明背景。
---

```jsx
/**
 * title: 卡片加载中及背景
 * desc: 可以直接把内容内嵌到Loading中，将现有容器变为加载状态；默认无背景，`layer` 为true时有白色透明背景。
 */
import React from "react";
import { Loading, Toggle, Tips } from "cloud-react";

class LoadingDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleChange = (loading) => {
    this.setState({ loading });
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        Loading state：
        <Toggle checked={loading} onChange={this.handleChange} size="small" />
        <Loading layer loading={loading} style={{ marginTop: 20 }}>
          <Tips
            isShowIcon
            msg="提醒文字 提醒文字 提醒文字"
            description="提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文字提醒文"
          />
        </Loading>
      </div>
    );
  }
}

export default LoadingDemo;
```
