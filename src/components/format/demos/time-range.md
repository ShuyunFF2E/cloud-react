---
order: 4
title: 时间范围格式化
desc: 时间范围格式化模板，支持开始和结束时间的格式化
---

```jsx
/**
 * title: 时间范围格式化
 * desc: 时间范围格式化模板，支持开始和结束时间的格式化
 */
import React from 'react';
import { Format } from 'cloud-react';

class TimeRangeDemo extends React.Component {
  render() {
    const mockRow = {
      startTime: '2023-12-01',
      endTime: '2023-12-31',
      createTime: '2023-11-01',
      updateTime: '2023-12-25'
    };

    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>基础时间范围格式化：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeRangeTpl 
              row={mockRow}
              startKey="startTime"
              endKey="endTime"
            />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>自定义格式：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeRangeTpl 
              row={mockRow}
              startKey="startTime"
              endKey="endTime"
              format="YYYY年MM月DD日"
            />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>使用自定义值：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeRangeTpl 
              row={mockRow}
              startKey="startTime"
              endKey="endTime"
              startValue="2023-01-01"
              endValue="2023-12-31"
              format="YYYY-MM-DD"
            />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>只有开始时间：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeRangeTpl 
              row={{ startTime: '2023-12-01' }}
              startKey="startTime"
              endKey="endTime"
            />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>只有结束时间：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeRangeTpl 
              row={{ endTime: '2023-12-31' }}
              startKey="startTime"
              endKey="endTime"
            />
          </div>
        </div>
        
        <div>
          <h5>空值处理：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeRangeTpl 
              row={{}}
              startKey="startTime"
              endKey="endTime"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TimeRangeDemo;
``` 