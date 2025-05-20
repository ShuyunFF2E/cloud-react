```jsx
/**
 * title: 主颜色
 * desc: 主色设置：数据赢家、淘域、私域赢家、互动赢家
 */
import React from 'react';
import { Message } from 'cloud-react';
import ShunyunUtils from 'shuyun-utils';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

import './color.less';

const theme = [
  {
    title: '科技蓝',
    subTitle: '数据赢家、互动赢家、私域赢家',
    children: [
      {
        name: 'blue-1',
        text: '#F0F7FF',
      },
      {
        name: 'blue-2',
        text: '#DBECFF',
      },
      {
        name: 'blue-3',
        text: '#AFCFFA',
      },
      {
        name: 'blue-4',
        text: '#0055CC',
      },
      {
        name: 'blue-5',
        text: '#0748A3',
      },
      {
        name: 'blue-6',
        text: '#123B75',
      },
      {
        name: 'blue-7',
        text: '#172D4D',
      },
    ],
  },
  // {
  //   title: '深蓝色 - 互动赢家',
  //   children: [
  //     {
  //       name: 'blue-1',
  //       text: '#E8F0FE',
  //     },
  //     {
  //       name: 'blue-2',
  //       text: '#BDD5FF',
  //     },
  //     {
  //       name: 'blue-3',
  //       text: '#77A9FF',
  //     },
  //     {
  //       name: 'blue-4',
  //       text: '#1F6CD8',
  //     },
  //     {
  //       name: 'blue-5',
  //       text: '#2F59AD',
  //     },
  //     {
  //       name: 'blue-6',
  //       text: '#1D3B78',
  //     },
  //     {
  //       name: 'blue-7',
  //       text: '#12264D',
  //     },
  //   ],
  // },
  {
    title: '神秘紫',
    subTitle: '淘域赢家',
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
    title: '蓝绿色',
    subTitle: '微信会员中心',
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
];
const getColors = () => {
  const body = document.getElementsByTagName('body')[0];
  let colors = [1, 2, 3, 4, 5, 6, 7];
  colors = colors.map((item) => {
    let color = getComputedStyle(body).getPropertyValue(`--shuyunBlue${item}`);
    return color;
  });
  return colors;
};
const active = (themes, colors) => {
  const isActive = themes.find((item, index) => {
    return (
      item.text.toLowerCase().trim() !== colors[index].toLowerCase().trim()
    );
  });
  return isActive === undefined ? true : false;
};
const blank = '\u00A0';

class ButtonDemo extends React.Component {
  state = {
    colors: getColors(),
  };
  render() {
    const onClickHandler = (evt, text) => {
      evt.stopPropagation();
      ShunyunUtils.copyText(text);
      Message.success(text + ' 已复制');
    };
    const setColor = (colors) => {
      const body = document.getElementsByTagName('body')[0];
      for (let i = 0; i < colors.length; i++) {
        body.style.setProperty(`--shuyunBlue${i + 1}`, colors[i].text);
        window.localStorage.setItem(`--shuyunBlue${i + 1}`, colors[i].text);
      }
      this.setState({
        colors: colors.map((item) => {
          return item.text;
        }),
      });
    };
    const changeHandler = (color, index) => {
      const body = document.getElementsByTagName('body')[0];
      body.style.setProperty(`--shuyunBlue${index + 1}`, color.color);
      window.localStorage.setItem(`--shuyunBlue${index + 1}`, color.color);
      const colors = [...this.state.colors];
      colors[index] = color.color;
      console.log(colors);
      this.setState({ colors });
    };
    return (
      <React.Fragment>
        <div className="main-color">
          {this.state.colors.map((item, index) => {
            return (
              <div className="main-color-item-wrap">
                <div
                  className="main-color-item"
                  style={{
                    background: item,
                    color:
                      index < 4 ? 'rgba(0, 0, 0, 0.85)' : 'rgb(255, 255, 255)',
                  }}
                  onClick={() => onClickHandler(item)}
                >
                  <span className="main-color-item-name">blue{index + 1}</span>
                  <span className="main-color-item-text">{item}</span>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <ColorPicker
                    animation="slide-up"
                    color={item}
                    onChange={(colors) => changeHandler(colors, index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="color-palettes">
          {theme.map((item, index) => {
            return (
              <div
                className={`color-palette ${
                  active(item.children, this.state.colors) ? 'active' : ''
                }`}
                onClick={() => setColor(item.children)}
              >
                <div className="color-palette-title">{item.title}</div>
                <div className="color-palette-sub-title">{item.subTitle}</div>
                <div className="main-color">
                  {item.children.map((item, index) => {
                    return (
                      <div
                        className="main-color-item"
                        style={{
                          background: item.text,
                          color:
                            index < 3
                              ? 'rgba(0, 0, 0, 0.85)'
                              : 'rgb(255, 255, 255)',
                        }}
                        onClick={(evt) => onClickHandler(evt, item.text)}
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
export default ButtonDemo
```
