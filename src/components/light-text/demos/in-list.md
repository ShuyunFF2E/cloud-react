---
order: 6
title: 在列表中使用
desc: 在列表项中高亮显示搜索关键词
---

```jsx
/**
 * title: 在列表中使用
 * desc: 在列表项中高亮显示搜索关键词
 */
import React from "react";
import { LightText, Input } from "cloud-react";

class InListDemo extends React.Component {
  state = {
    searchValue: "管理",
  };

  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const { searchValue } = this.state;
    const listData = [
      { id: 1, name: "用户管理系统", desc: "管理用户信息和权限" },
      { id: 2, name: "产品管理系统", desc: "管理产品信息和库存" },
      { id: 3, name: "订单管理系统", desc: "管理订单和交易信息" },
      { id: 4, name: "财务管理系统", desc: "管理财务数据和报表" },
      { id: 5, name: "报表分析系统", desc: "生成各种分析报表" },
    ];

    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <Input
            placeholder="输入搜索关键词"
            value={searchValue}
            onChange={this.handleSearch}
          />
        </div>

        <div>
          {listData.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "12px",
                border: "1px solid #d9d9d9",
                marginBottom: "8px",
                borderRadius: "4px",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                <LightText
                  originText={item.name}
                  keyWords={searchValue}
                  color="#1890ff"
                />
              </div>
              <div style={{ color: "#666", fontSize: "12px" }}>
                <LightText
                  originText={item.desc}
                  keyWords={searchValue}
                  color="#1890ff"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default InListDemo;
```
