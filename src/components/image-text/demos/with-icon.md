---
order: 6
title: 使用图标
desc: 使用图标替代图片
---

```jsx
/**
 * title: 使用图标
 * desc: 使用图标替代图片
 */
import React from 'react';
import { ImageText, Icon } from 'cloud-react';

class WithIconDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 300 }}>
        <div style={{ marginBottom: 15 }}>
          <ImageText
            icon={
              <Icon
                type="user-fill"
                style={{ fontSize: 48, color: '#1890ff' }}
              />
            }
            label="用户管理"
            desc="管理系统用户信息"
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <ImageText
            icon={
              <Icon
                type="setting-fill"
                style={{ fontSize: 48, color: '#52c41a' }}
              />
            }
            label="系统设置"
            desc="配置系统参数"
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <ImageText
            icon={
              <Icon
                type="file-text-fill"
                style={{ fontSize: 48, color: '#faad14' }}
              />
            }
            label="文档管理"
            desc="管理系统文档"
          />
        </div>

        <div>
          <ImageText
            icon={
              <Icon
                type="mail-fill"
                style={{ fontSize: 48, color: '#f5222d' }}
              />
            }
            label="消息中心"
            desc="查看系统消息"
            disabled
          />
        </div>
      </div>
    );
  }
}

export default WithIconDemo;
```
