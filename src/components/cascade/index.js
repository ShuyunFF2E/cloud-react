import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import shuyunUtils from 'shuyun-utils';
import Message from '../message';
import Tooltip from '../tooltip';
import Icon from '../icon';

import './index.less';

function isValid(value) {
  return value || value === 0;
}

class Cascade extends Component {
  constructor(props) {
    super(props);
    let currentArr;
    currentArr = [props.data];
    // 处理回显
    if (props.value) {
      const arr = props.value.includes(',')
        ? props.value.split(',')
        : [props.value];
      currentArr = this.getData(
        arr,
        JSON.parse(JSON.stringify(props.data)),
        [],
      );
    }

    this.state = {
      currentArr,
      container: props.container,
    };
  }

  getData = (arr, data, tar) => {
    if (arr.length === 0) return tar;
    const {
      props: { idKey, childrenKey, pidKey },
    } = this;
    if (
      data[0] &&
      data[0][childrenKey] &&
      isValid(data[0][childrenKey][0][pidKey])
    ) {
      let result;
      for (let index = 0; index < data.length; index += 1) {
        const item = data[index];
        const child = item[childrenKey];
        result = child.find((i) => {
          if (i[idKey] === arr[0]) {
            return true;
          }
          return false;
        });
        if (result) {
          result.active = true;
          break;
        }
      }
      tar.push(data);
      return this.getData(
        arr.splice(1),
        JSON.parse(JSON.stringify(result[childrenKey] || [])),
        tar,
      );
    }
    const result = data.find((item) => item[idKey] === arr[0]);
    result.active = true;
    tar.push(data);
    return this.getData(
      arr.splice(1),
      JSON.parse(JSON.stringify(result[childrenKey] || [])),
      tar,
    );
  };

  componentDidMount() {
    const body = document.getElementsByTagName('body')[0];
    if (this.props.onClose) {
      body.addEventListener('click', this.onBlur);
    }
  }

  onBlur = (e) => {
    const container = document.getElementsByClassName(this.state.container)[0];
    if (this.props.visible && !container.contains(e.target)) {
      this.props.onClose();
    }
  };

  componentWillUnmount() {
    const body = document.getElementsByTagName('body')[0];
    if (this.props.onClose) {
      body.removeEventListener('click', this.onBlur);
    }
  }

  isBeenClick = (id, index, idParent) => {
    const {
      props: { idKey, childrenKey },
    } = this;
    const { currentArr } = this.state;
    let currentItem;
    if (!isValid(idParent)) {
      currentItem = currentArr[index].find(
        (item) => item[idKey] === id && item.active,
      );
    } else {
      currentItem = currentArr[index]
        .find((item) => item[idKey] === idParent)
        [childrenKey].find((item) => item[idKey] === id && item.active);
    }
    return currentItem;
  };

  activeItem = (id, index, idParent) => {
    const {
      props: { idKey, childrenKey },
    } = this;
    const { currentArr } = this.state;
    // 针对非对应项恢复未激活而对应项进行激活；
    const newArr = currentArr[index].map((item) => {
      const obj = { ...item };
      if (obj.active === false || obj.active === true) {
        delete obj.active;
      }
      if (item[idKey] === id && !isValid(idParent)) {
        obj.active = true;
      }
      if (isValid(idParent)) {
        obj[childrenKey] = obj[childrenKey].map((i) => {
          const x = { ...i };
          if (x.active === false || x.active === true) {
            delete x.active;
          }
          if (i[idKey] === id) {
            x.active = true;
          }
          return x;
        });
      }
      return obj;
    });
    return newArr;
  };

  // 针对含title的子级里的数据需要进一步处理 todo
  onClickItem = (children, id, index, idParent) => {
    const {
      props: { childrenKey, pidKey, onChange, isOnlyShow },
    } = this;
    const { currentArr } = this.state;
    const currentItem = this.isBeenClick(id, index, idParent);
    // 点击已经选择过的选项就不走之后的逻辑了；
    if (currentItem) return;

    // 针对非对应项恢复未激活而对应项进行激活；
    const newArr = this.activeItem(id, index, idParent);
    currentArr[index] = newArr;

    // 点击项有子级
    if (children && children.length) {
      if (index === currentArr.length - 1) {
        // 点击最后一个存在子级的卡片就执行push操作
        currentArr.push(JSON.parse(JSON.stringify(children)));
      } else {
        // 非最后一个子级就要进行删减操作
        currentArr.splice(index + 1);
        currentArr.push(JSON.parse(JSON.stringify(children)));
      }
      this.setState({ currentArr });
    }
    if (!children || !children.length) {
      // 点击无子级则根据是否纯展示来控制调用父级change事件且更新当前currentArr
      currentArr.splice(index + 1);
      this.setState({ currentArr });
      //
      if (!isOnlyShow && onChange) {
        const arr = [];
        this.state.currentArr.forEach((item) => {
          const childr = item[0][childrenKey];
          let x;
          if (childr && childr.length && isValid(childr[0][pidKey])) {
            for (let itemIndex = 0; itemIndex < item.length; itemIndex += 1) {
              const i = item[itemIndex];
              if (i[childrenKey] && i[childrenKey].length) {
                x = i[childrenKey].find((z) => z.active);
                break;
              }
            }
          } else {
            x = item.find((i) => i.active);
          }

          if (x) {
            arr.push(x);
          }
        });
        onChange(...arr);
      }
    }
  };

  onCopyItem = (evt, text) => {
    console.log('enter copy item');
    evt.stopPropagation();
    evt.preventDefault();
    shuyunUtils.copyText(text);
    Message.success('复制成功');
  };

  renderChild(data, index) {
    if (!data) return null;
    const {
      onClickItem,
      onCopyItem,
      props: {
        titleKey,
        idKey,
        childrenKey,
        pidKey,
        width,
        disabled,
        isOnlyShow,
        supportCopy,
      },
    } = this;
    console.log(supportCopy, 'support copy');
    return (
      <div key={index} className={`${disabled ? 'disabled' : ''} cascade`}>
        {data.map((item) => {
          const { active } = item;
          const id = item[idKey];
          const children = item[childrenKey];
          const title = item[titleKey];
          if (
            isValid(id) &&
            children &&
            children.length &&
            isValid(children[0][pidKey])
          ) {
            // 如果存在同层级分类则走该路线；
            return (
              <div key={id} className="includeTitle" style={{ width }}>
                <p>{title}</p>
                <div className="content">
                  {children.map((ite) => {
                    const idchild = ite[idKey];
                    const childrenchild = ite[childrenKey];
                    const titlechild = ite[titleKey];
                    return (
                      <div
                        key={idchild}
                        className={`${ite.active ? 'itemActive' : ''}  normal`}
                        onMouseEnter={
                          isOnlyShow
                            ? () =>
                                onClickItem(childrenchild, idchild, index, id)
                            : null
                        }
                        onClick={
                          !isOnlyShow
                            ? () =>
                                onClickItem(childrenchild, idchild, index, id)
                            : null
                        }
                      >
                        <span title={titlechild}>{titlechild}</span>
                        {!disabled && childrenchild && childrenchild.length && (
                          <Icon
                            type="right"
                            style={{
                              fontSize: '10px',
                              color: 'rgba(0,0,0,0.4500)',
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
          const isShowCopy = supportCopy && (!children || !children.length);
          console.log(isShowCopy, 'is show copy');
          // 如果不存在同层级分类则走该路线
          return (
            <div
              key={id}
              className={`${active ? 'itemActive' : ''} notTitle normal`}
              onMouseEnter={
                isOnlyShow ? () => onClickItem(children, id, index) : null
              }
              onClick={
                !isOnlyShow ? () => onClickItem(children, id, index) : null
              }
              style={{ width }}
            >
              {isShowCopy ? (
                <Tooltip content="双击可复制">
                  <span onDoubleClick={(evt) => onCopyItem(evt, title)}>
                    {title}
                  </span>
                </Tooltip>
              ) : (
                <Tooltip content={title}>
                  <span>{title}</span>
                </Tooltip>
              )}
              {!disabled && children && children.length && (
                <Icon
                  type="right"
                  style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4500)' }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const {
      props: { height, visible, data },
      state: { currentArr },
    } = this;
    if (!data) return null;
    return visible ? (
      <div
        style={{ height, display: 'inline-flex' }}
        className={classnames(`${prefixCls}-cascade-wrapper`)}
      >
        {currentArr && currentArr.length
          ? currentArr.map((item, index) => this.renderChild(item, index))
          : null}
      </div>
    ) : null;
  }
}

Cascade.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string,
  visible: PropTypes.bool,
  isOnlyShow: PropTypes.bool,
  disabled: PropTypes.bool,
  container: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  height: PropTypes.string,
  width: PropTypes.string,
  titleKey: PropTypes.string,
  idKey: PropTypes.string,
  pidKey: PropTypes.string,
  childrenKey: PropTypes.string,
  supportCopy: PropTypes.bool,
};

Cascade.defaultProps = {
  disabled: false,
  value: '',
  titleKey: 'title',
  height: '300px',
  isOnlyShow: false,
  visible: true,
  width: '150px',
  idKey: 'id',
  pidKey: 'pid',
  onClose: () => {},
  onChange: () => {},
  childrenKey: 'children',
  supportCopy: false,
};

export default Cascade;
