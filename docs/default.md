```jsx
/**
 * title: 颜色
 * desc: 颜色6种类型：蓝色、红色、绿色、黄色、橙色、灰色
 */
import React from 'react';
import { Message } from 'cloud-react';
import ShunyunUtils from 'shuyun-utils';

import './color.less';

const theme = [
  {
    title: '湖蓝色 - 数据赢家',
    children: [
      {
        name: 'blue-1',
        text: '#EDF6FF',
      },
      {
        name: 'blue-2',
        text: '#CCE6FF',
      },
      {
        name: 'blue-3',
        text: '#72B0ED',
      },
      {
        name: 'blue-4',
        text: '#0066CC',
      },
      {
        name: 'blue-5',
        text: '#004CA3',
      },
      {
        name: 'blue-6',
        text: '#003775',
      },
      {
        name: 'blue-7',
        text: '#002147',
      },
    ],
  },
  {
    title: '靛蓝色 - 私域赢家',
    children: [
      {
        name: 'blue-1',
        text: '#F5F8FF',
      },
      {
        name: 'blue-2',
        text: '#D4E1FF',
      },
      {
        name: 'blue-3',
        text: '#8FAFFF',
      },
      {
        name: 'blue-4',
        text: '#5280FF',
      },
      {
        name: 'blue-5',
        text: '#3352CC',
      },
      {
        name: 'blue-6',
        text: '#122999',
      },
      {
        name: 'blue-7',
        text: '#000B52',
      },
    ],
  },
  {
    title: '深蓝色 - 互动赢家',
    children: [
      {
        name: 'blue-1',
        text: '#E8F0FE',
      },
      {
        name: 'blue-2',
        text: '#BDD5FF',
      },
      {
        name: 'blue-3',
        text: '#77A9FF',
      },
      {
        name: 'blue-4',
        text: '#1F6CD8',
      },
      {
        name: 'blue-5',
        text: '#2F59AD',
      },
      {
        name: 'blue-6',
        text: '#1D3B78',
      },
      {
        name: 'blue-7',
        text: '#12264D',
      },
    ],
  },
  {
    title: '神秘紫 - 淘域赢家',
    children: [
      {
        name: 'blue-1',
        text: '#EEEFFF',
      },
      {
        name: 'blue-2',
        text: '#BCBEFF',
      },
      {
        name: 'blue-3',
        text: '#9096E5',
      },
      {
        name: 'blue-4',
        text: '#555BB3',
      },
      {
        name: 'blue-5',
        text: '#34398E',
      },
      {
        name: 'blue-6',
        text: '#111661',
      },
      {
        name: 'blue-7',
        text: '#060B48',
      },
    ],
  },
  {
    title: '蓝绿色 - 微信会员',
    children: [
      {
        name: 'blue-1',
        text: '#E5F5F9',
      },
      {
        name: 'blue-2',
        text: '#B0E9F5',
      },
      {
        name: 'blue-3',
        text: '#4FC4DB',
      },
      {
        name: 'blue-4',
        text: '#078DA8',
      },
      {
        name: 'blue-5',
        text: '#14768F',
      },
      {
        name: 'blue-6',
        text: '#0B566B',
      },
      {
        name: 'blue-7',
        text: '#063A4D',
      },
    ],
  },
  {
    title: '金红',
    children: [
      {
        name: 'red-1',
        text: '#FEF0F0',
      },
      {
        name: 'red-2',
        text: '#FAC8C8',
      },
      {
        name: 'red-3',
        text: '#F07878',
      },
      {
        name: 'red-4',
        text: '#E74949',
      },
      {
        name: 'red-5',
        text: '#BD3535',
      },
      {
        name: 'red-6',
        text: '#962424',
      },
      {
        name: 'red-7',
        text: '#731717',
      },
    ],
  },
  {
    title: '葱绿',
    children: [
      {
        name: 'blue-1',
        text: '#E5F9E7',
      },
      {
        name: 'blue-2',
        text: '#ABE6B2',
      },
      {
        name: 'blue-3',
        text: '#59CC74',
      },
      {
        name: 'blue-4',
        text: '#21BA45',
      },
      {
        name: 'blue-5',
        text: '#008F21',
      },
      {
        name: 'blue-6',
        text: '#00701E',
      },
      {
        name: 'blue-7',
        text: '#00571A',
      },
    ],
  },
  {
    title: '淡黄',
    children: [
      {
        name: 'blue-1',
        text: '#FFF9DB',
      },
      {
        name: 'blue-2',
        text: '#FFE785',
      },
      {
        name: 'blue-3',
        text: '#FFCF33',
      },
      {
        name: 'blue-4',
        text: '#FFBB00',
      },
      {
        name: 'blue-5',
        text: '#D99800',
      },
      {
        name: 'blue-6',
        text: '#B37A00',
      },
      {
        name: 'blue-7',
        text: '#8F5F00',
      },
    ],
  },
  {
    title: '柳橙',
    children: [
      {
        name: 'orange-1',
        text: '#FFF5E6',
      },
      {
        name: 'orange-2',
        text: '#FDD198',
      },
      {
        name: 'orange-3',
        text: '#FDA33D',
      },
      {
        name: 'orange-4',
        text: '#FD830A',
      },
      {
        name: 'orange-5',
        text: '#D66A04',
      },
      {
        name: 'orange-6',
        text: '#B05302',
      },
      {
        name: 'orange-7',
        text: '#8C3F00',
      },
    ],
  },
  {
    title: '中性',
    children: [
      {
        name: 'grey-1',
        text: '#FFFFFF',
      },
      {
        name: 'grey-2',
        text: '#FAFAFA',
      },
      {
        name: 'grey-3',
        text: '#F5F5F5',
      },
      {
        name: 'grey-4',
        text: '#E8E8E8',
      },
      {
        name: 'grey-5',
        text: '#D9D9D9',
      },
      {
        name: 'grey-6',
        text: 'rgba(0, 0, 0, 0.25)',
      },
      {
        name: 'grey-7',
        text: ' rgba(0, 0, 0, 0.45)',
      },
      {
        name: 'grey-8',
        text: ' rgba(0, 0, 0, 0.65)',
      },
      {
        name: 'grey-9',
        text: ' rgba(0, 0, 0, 0.85)',
      },
      {
        name: 'grey-0',
        text: ' rgb(0, 0, 0)',
      },
    ],
  },
];
const blank = '\u00A0';

export default class ButtonDemo extends React.Component {
  render() {
    const onClickHandler = (text) => {
      ShunyunUtils.copyText(text);
      Message.success(text + ' 已复制');
    };
    return (
      <React.Fragment>
        <div className="color-palettes">
          {theme.map((item, index) => {
            return (
              <div className="color-palette">
                <div className="color-palette-title">{item.title}</div>
                <div className="main-color">
                  {item.children.map((item, index) => {
                    return (
                      <div
                        className="main-color-item"
                        style={{
                          background: item.text,
                          color:
                            index < 4
                              ? 'rgba(0, 0, 0, 0.85)'
                              : 'rgb(255, 255, 255)',
                        }}
                        onClick={() => onClickHandler(item.text)}
                      >
                        <span className="main-color-item-name">
                          {item.name}
                        </span>
                        <span className="main-color-item-text">
                          {item.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
```
