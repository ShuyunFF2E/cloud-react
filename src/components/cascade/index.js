import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import Icon from '../icon';

import './index.less';

function isValid(value){
  return value || value === 0; 
}

class Cascade extends Component {

  constructor(props){
    super(props);
    let currentArr;
    currentArr = [props.data];
    // 处理回显
    if(props.value){
      const arr = props.value.includes(',') ? props.value.split(',') : [props.value];
      currentArr = this.getData(arr, JSON.parse(JSON.stringify(props.data)), []);
    }
    
    this.state = {
      currentArr,
      container: props.container
    }
  }

  getData = (arr, data, tar) => {
    if(arr.length === 0)return tar;
    const { props:{ idKey, childrenKey, pidKey } } = this;
    if(data[0] && data[0][childrenKey] && isValid(data[0][childrenKey][0][pidKey])){
      let result;
      data.find(item=>{
        const child = item[childrenKey];
        result = child.find(i => {
          if(i[idKey] === arr[0]){
            return true;
          }
          return false;
        });
        if(result){
          result.active = true;
          return true;
        }
        return false;
      });
      tar.push(data);
      return this.getData(arr.splice(1), JSON.parse(JSON.stringify(result[childrenKey] || [])), tar );
    }
      const result = data.find(item => item[idKey] === arr[0]);
      result.active = true;
      tar.push(data);
      return this.getData(arr.splice(1), JSON.parse(JSON.stringify(result[childrenKey] || [])), tar );
  }

  componentDidMount(){
    const body = document.getElementsByTagName('body')[0];
    if(this.props.onClose){body.addEventListener('click', this.onBlur);}
  }

  onBlur = (e) => {
    const container = document.getElementsByClassName(this.state.container)[0];
    if(this.props.visible && !container.contains(e.target)){
      this.props.onClose();
    }
  }

  componentWillUnmount(){
    const body = document.getElementsByTagName('body')[0];
    if(this.props.onClose){body.removeEventListener('click', this.onBlur);}
  }

  isBeenClick = (id, index, idParent) => {
    const { props:{ idKey, childrenKey } } = this;
    const { currentArr } = this.state;
    let currentItem;
    if(!isValid(idParent)){
      currentItem = currentArr[index].find(item=>item[idKey] === id && item.active);
    }else{
      currentItem = currentArr[index].find(item=>item[idKey] === idParent)[childrenKey].find(item=>item[idKey] === id && item.active);
    } 
    return currentItem;
  }

  activeItem = (id, index, idParent) => {
    const { props:{ idKey, childrenKey } } = this;
    const { currentArr } = this.state;
    // 针对非对应项恢复未激活而对应项进行激活；
    const newArr = currentArr[index].map(item => {
      const obj = { ...item };
      if(obj.active === false || obj.active === true){
        delete obj.active;
      }
      if(item[idKey] === id && !isValid(idParent)){
        obj.active = true;
      }
      if(isValid(idParent)){
        obj[childrenKey] = obj[childrenKey].map(i => {
          const x = { ...i };
          if(x.active === false || x.active === true){
            delete x.active;
          }
          if(i[idKey] === id){
            x.active = true;
          }
          return x;
        });
      }
      return obj
    });
    return newArr;
  }

  // 针对含title的子级里的数据需要进一步处理 todo
  onClickItem = (children, id, index, idParent) => {
    const { props:{ childrenKey, pidKey, onClose, onChange, isClickAndClose } } = this;
    const { currentArr } = this.state;
    const currentItem = this.isBeenClick(id, index, idParent);;
    // 点击已经选择过的选项就不走之后的逻辑了；
    if(currentItem)return;

    // 针对非对应项恢复未激活而对应项进行激活；
    const newArr = this.activeItem(id, index, idParent);
    currentArr[index] = newArr;
     
    // 点击项有子级
    if(children && children.length){
      if(index === currentArr.length - 1){
      // 点击最后一个存在子级的卡片就执行push操作
        currentArr.push(JSON.parse(JSON.stringify(children)));
      }else{
      // 非最后一个子级就要进行删减操作
      currentArr.splice(index + 1);
      currentArr.push(JSON.parse(JSON.stringify(children)));
      }
    }
    this.setState({ currentArr });
    if(!children || !children.length){
      // 点击无子级则调用父级ok事件和关闭事件
      if(onClose && isClickAndClose){onClose()};
      if(onChange){
        const arr = [];
        this.state.currentArr.forEach(item => {
          const childr = item[0][childrenKey];
          let x;
          if(childr && childr.length && isValid(childr[0][pidKey])){
            item.find(i => {
              if(i[childrenKey] && i[childrenKey].length){
                x = i[childrenKey].find(z => z.active);
                return x;
              }
              return false;
            })
          }else{
            x = item.find(i => i.active);
          }

          if(x){
            arr.push(x);
          }
        })
        onChange(...arr);
      };
    }

  } 

  renderChild(data, index){
    if(!data) return null;
    const { onClickItem, props:{ titleKey, idKey, childrenKey, pidKey, width, disabled } } = this;

    return <div key={index} className={`${disabled ? 'disabled' : ''} cascade`}>
    {data.map(item => {
      const { active } = item;
      const id = item[idKey];
      const children = item[childrenKey];
      const title = item[titleKey];
      if(isValid(id) && children && children.length && isValid(children[0][pidKey])){
        // 如果存在同层级分类则走该路线；
        return <div key={id} className="includeTitle" style={{ width }}>
          <p>{title}</p>
          <div className="content">
            {children.map(ite=>{
              const idchild = ite[idKey];
              const childrenchild = ite[childrenKey];
              const titlechild = ite[titleKey];
              return <div key={idchild} className={`${ite.active ? 'itemActive' : ''}  normal`} onClick={()=>onClickItem(childrenchild, idchild, index, id)}><span title={titlechild}>{titlechild}</span>
              {!disabled && childrenchild && childrenchild.length && <Icon type="right" style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4500)' }} />}
              </div>
            })}
          </div>
        </div>
      }

      // 如果不存在同层级分类则走该路线
      return <div key={id}  className={`${active ? 'itemActive' : ''} notTitle normal`} onClick={()=>onClickItem(children, id, index)} style={{ width }}>
          <span title={title}>{title}</span>
          {!disabled && children && children.length && <Icon type="right" style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4500)' }} />}
      </div>
    })}
  </div>
  }

  render(){
    const { props: { height, visible, data }, state: { currentArr } } = this;
    if(!data) return null;
    return  visible ? <div style={ { height, display: 'inline-flex' }} className={classnames(`${prefixCls}-cascade-wrapper`)} >
      {
        currentArr && currentArr.length ? currentArr.map((item, index) => this.renderChild(item, index)) : null
      }
    </div> : null
  }
}

Cascade.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string,
  visible: PropTypes.bool,
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
  isClickAndClose: PropTypes.bool
};

Cascade.defaultProps = {
  disabled: false,
  value: '',
  titleKey: 'title',
  height: '300px',
  visible: true,
  width: '150px',
  idKey: 'id',
  pidKey: 'pid',
  onClose: () => {},
  onChange: () => {},
  childrenKey: 'children',
  isClickAndClose: true
};

export default Cascade;
