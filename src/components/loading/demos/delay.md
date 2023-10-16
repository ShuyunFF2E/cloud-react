---
order: 3
title: 延迟加载
desc: 延迟number(毫秒)显示加载效果，可防止闪烁；当loading状态在 `delay` 时间内结束，则不显示loading状态。
---

```jsx
/**
 * title: 延迟加载
 * desc: 延迟number(毫秒)显示加载效果，可防止闪烁；当loading状态在 `delay` 时间内结束，则不显示loading状态。
 */
import React from 'react';
import { Loading, Toggle, Tips } from 'cloud-react';

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
        Loading state(延迟1500ms)：
        <Toggle checked={loading} onChange={this.handleChange} size="small" />
        <Loading layer delay={1500} loading={loading} style={{ marginTop: 20 }}>
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
