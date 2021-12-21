import { createContext } from 'react';

export type MenuTheme = 'light' | 'dark';

const MenuContext = createContext({
  prefixCls: '',
  firstLevel: true,
  inlineCollapsed: false,
});

export default MenuContext;
