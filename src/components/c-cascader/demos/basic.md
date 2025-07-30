---
order: 1
title: 级联选择器
desc: 默认样式
---

```jsx
import React, { useState, useEffect } from "react";
import { CCascader } from "cloud-react";
const addressOptions = [
  {
    value: "zhejiang",
    label: "Zhejiang",

    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
          {
            value: "xiasha",
            label: "Xia Sha",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua men",
          },
        ],
      },
    ],
  },
];

const key = "tmp_area_data";
export default function Demo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStorageData = () => {
    try {
      const resultStr = localStorage.getItem(key);
      return JSON.parse(resultStr);
    } catch (error) {
      return null; // 异常时需要重新获取数据
    }
  };

  /**
   * 保存数据到缓存
   */
  const setStorageData = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  useEffect(() => {
    // fetcher
    async function fetchData(url) {
      const res = await window.fetch(url, {
        credentials: "include",
        method: "GET",
        mode: "cors",
      });

      if (!res.ok) {
        return null;
      }
      const resData = await res.json();
      if (!Array.isArray(resData)) {
        return null;
      }

      return resData;
    }

    setLoading(true);
    const platform = "unification";
    const server = "https://qa-ual.shuyun.com/shuyun-searchapi/1.0/area";
    // 使用全渠道的数据后面要增加showall参数
    const unificationInterface =
      platform === "unification" ? "&showall=true" : "";
    const url = `${server}?platform=${platform}${unificationInterface}`;
    const dataSource = getStorageData();
    if (dataSource) {
      setData(dataSource);
      setLoading(false);
    } else {
      fetchData(url).then((res) => {
        if (!res) return;
        setData(res);
        setLoading(false);
        setStorageData(res);
      });
    }
  }, []);

  const onChange = (value) => {
    console.log(value);
  };

  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>仅叶子选项支持选择</div>
      <CCascader
        options={addressOptions}
        onChange={onChange}
        placeholder="Please select"
        style={{ width: 328 }}
      />
      <div style={{ marginBottom: 24, marginTop: 40 }}>任意选项支持选择</div>
      <CCascader
        options={addressOptions}
        onChange={onChange}
        placeholder="Please select"
        showSearch={{ filter: filter }}
        style={{ width: 328 }}
        changeOnSelect
      />
      <div style={{ marginBottom: 24, marginTop: 40 }}>用级联组件展示地址</div>
      {!loading && (
        <CCascader
          options={data}
          onChange={onChange}
          fieldNames={{ label: "name", value: "id", children: "children" }}
          placeholder="Please select"
          style={{ width: 328 }}
          changeOnSelect
        />
      )}
    </div>
  );
}
```
