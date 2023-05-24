import React, { Component, cloneElement } from 'react';
import classNames from 'classnames';
import RcDrawer from 'rc-drawer';
import { prefixCls } from '@utils';
import Icon from '../icon';
import './index.less';

function CDrawer(props) {
  console.log('props', props);
  const {
    drawerStyle,
    children,
    title,
    closable = true,
    headerStyle,
    extra,
    footer,
    bodyStyle,
    footerStyle,
    onClose,
    ...other
  } = props;
  const closeIconNode = closable && (
    <Icon type="close" onClick={onClose} className="close-icon" />
  );
  function renderHeader() {
    if (!title && !closable) {
      return null;
    }

    return (
      <div
        className={classNames(`${prefixCls}-drawer-header`, {
          [`${prefixCls}-header-close-only`]: closable && !title && !extra,
        })}
        style={headerStyle}
      >
        <div className={`${prefixCls}-header-title`}>
          {closeIconNode}
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
        </div>
        {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
      </div>
    );
  }
  function renderFooter() {
    if (!footer) {
      return null;
    }

    const footerClassName = `${prefixCls}-drawer-footer`;
    return (
      <div className={footerClassName} style={footerStyle}>
        {footer}
      </div>
    );
  }
  return (
    <RcDrawer {...other} onClose={onClose} prefixCls={`${prefixCls}-drawer`}>
      <div
        className={`${prefixCls}-drawer-wrapper-body`}
        style={{ ...drawerStyle }}
      >
        {renderHeader()}
        <div className={`${prefixCls}-drawer-body`} style={bodyStyle}>
          {children}
        </div>
        {renderFooter()}
      </div>
    </RcDrawer>
  );
}

export default CDrawer;
