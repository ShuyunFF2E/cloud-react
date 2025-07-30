---
order: 1
title: 面包屑
desc: 可切换大小的面包屑
---

```jsx
/**
 * title: 基础
 * desc: 标准页头，适合使用在需要简单描述的场景。
 */
import React from "react";
import { PageHeader } from "cloud-react";

class AvatarDemos extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <PageHeader title="标题" subTitle="描述信息" size="small" />
          <br />
          <PageHeader title="标题" subTitle="描述信息" />
          <br />
          <PageHeader title="标题" subTitle="描述信息" size="large" />
        </div>
      </React.Fragment>
    );
  }
}

export default AvatarDemos;
```
