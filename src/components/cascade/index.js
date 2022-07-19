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
    this.state = {
      // 该数据用于记录当前展开的多层级数据；回显的数据需要在此进行处理 todo
      currentArr: props.data ? [props.data] : [],
      container: props.container
    }
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

  onClickItem = (children, id, index) => {
    const { props:{ titleKey, idKey, childrenKey, pidKey, onClose, onChange } } = this;
    const { currentArr } = this.state;
    const currentItem = currentArr[index].find(item=>item[idKey] === id && item.active);
    // 点击已经选择过的选项就不走之后的逻辑了；
    if(currentItem)return;

    // 针对非对应项恢复未激活而对应项进行激活；
    const newArr = currentArr[index].map(item => {
      const obj = { [idKey]: item[idKey], [titleKey]: item[titleKey], [pidKey]: item[pidKey], [childrenKey]: item[childrenKey], ...item, active: false };
      if(item[idKey] === id){
        obj.active = true;
      }
      return obj
    })
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
      if(onClose){onClose()};
      if(onChange){
        const arr = [];
        this.state.currentArr.forEach(item => {
          const x = item.find(i => i.active);
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
              return <div key={idchild} className={`${active ? 'itemActive' : ''}  normal`} onClick={()=>onClickItem(childrenchild, idchild, index)}><span title={titlechild}>{titlechild}</span>
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
  childrenKey: PropTypes.string
};

Cascade.defaultProps = {
  disabled: false,
  titleKey: 'title',
  height: '300px',
  visible: true,
  width: '150px',
  idKey: 'id',
  pidKey: 'pid',
  onClose: () => {},
  onChange: () => {},
  childrenKey: 'children',
};

export default Cascade;
