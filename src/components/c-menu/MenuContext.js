import { createContext } from 'react';

const MenuContext = createContext({
  firstLevel: true,
  inlineCollapsed: false,
  mode: '',
});

export default MenuContext;
