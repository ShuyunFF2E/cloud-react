/* components/index.js文件 是通过 /script/generate-index.js文件生成的 */

// 检验当前运行环境
if( typeof window === 'undefined' ) {
	console.warn('cloud-react@0.0.3 仅支持在浏览器环境进行使用!');
}

export { default as Button } from './button';

export { default as CcMenu } from './cc-menu';

export { default as Checkbox } from './checkbox';

export { default as Icon } from './icon';

export { default as Input } from './input';

export { default as InputNumber } from './input-number';

export { default as Loading } from './loading';

export { default as Menu } from './menu';

export { default as Message } from './message';

export { default as Modal } from './modal';

export { default as Pagination } from './pagination';

export { default as Radio } from './radio';

export { default as Select } from './select';

export { default as Table } from './table';

export { default as TablePagination } from './table-pagination';

export { default as Tabs } from './tabs';

export { default as Tips } from './tips';

export { default as Toggle } from './toggle';

export { default as ToolTip } from './tool-tip';

