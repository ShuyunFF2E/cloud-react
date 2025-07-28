import { createContext } from 'react';
import { sandboxSelector } from '@utils';

/**
 * 你的组件在同时满足以下两个条件时需要使用contextProvider配置来修正 window、document和 document.body（getContext)
 * 1. 会在弹框组件下使用（Modal组件）
 * 2. 使用到`ReactDOM.createPortal`API或者动态指定父级、动态创建组件
 *
 * rootWindow	：当前页面 window，有 iframe 嵌套场景则有可能是 window.top
 * rootDocument ：当前页面 document，如果有 iframe 嵌套则有可能是 window.top.doucment
 * getContext	：获取 body 或者隔离容器，只有在iframe场景且你的组件在Modal组件中使用时才会获取到隔离容器，不满足其中之一获取到的就是 rootDocument.body
 */
export default createContext({
  rootWindow: window,
  rootDocument: document,
  getContext() {
    return document.querySelector(`.${sandboxSelector}`) || document.body;
  },
});
