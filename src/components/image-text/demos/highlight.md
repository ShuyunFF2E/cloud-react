---
order: 4
title: 搜索高亮
desc: 支持搜索关键词高亮显示
---

```jsx
/**
 * title: 搜索高亮
 * desc: 支持搜索关键词高亮显示
 */
import React from 'react';
import { ImageText, Input } from 'cloud-react';

class HighlightDemo extends React.Component {
  state = {
    searchValue: '产品',
  };

  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <div style={{ width: 300 }}>
        <div style={{ marginBottom: 20 }}>
          <Input
            placeholder="输入搜索关键词"
            value={searchValue}
            onChange={this.handleSearch}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <ImageText
            imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
            label="产品管理系统"
            desc="这是一个产品管理的系统"
            searchValue={searchValue}
            searchable
            supportLightText
            lightTextColor="#ff4d4f"
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <ImageText
            imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
            label="商品库存管理"
            desc="管理商品的库存信息"
            searchValue={searchValue}
            searchable
            supportLightText
            lightTextColor="#ff4d4f"
          />
        </div>
        <div>
          <ImageText
            imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
            label="用户权限管理"
            desc="管理用户的权限配置"
            searchValue={searchValue}
            searchable
            supportLightText
            lightTextColor="#ff4d4f"
          />
        </div>
      </div>
    );
  }
}

export default HighlightDemo;
```
