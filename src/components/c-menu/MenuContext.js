import { createContext } from 'react';

const MenuContext = createContext({
  firstLevel: true,
  inlineCollapsed: false,
});

export default MenuContext;
