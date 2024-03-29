/* components/index.js文件 是通过 /script/generate-index.js文件生成的 */

// 检验当前运行环境
if(typeof window === 'undefined') {
	console.warn('cloud-react 仅支持在浏览器环境进行使用!');
}

export const version = '0.1.4';

export { default as BreadCrumbs } from './bread-crumbs';

export { default as Button } from './button';

export { default as Checkbox } from './checkbox';

export { default as Datepicker } from './datepicker';

export { default as Field } from './field';

export { default as Form } from './form';

export { default as Icon } from './icon';

export { default as Input } from './input';

export { default as InputNumber } from './input-number';

export { default as InputTag } from './input-tag';

export { default as Layout } from './layout';

export { default as Loading } from './loading';

export { default as Menu } from './menu';

export { default as Message } from './message';

export { default as Modal } from './modal';

export { default as Pagination } from './pagination';

export { default as Plaintext } from './plaintext';

export { default as Radio } from './radio';

export { default as Select } from './select';

export { default as Step } from './step';

export { default as Table } from './table';

export { default as TableLite } from './table-lite';

export { default as TablePagination } from './table-pagination';

export { default as Tabs } from './tabs';

export { default as Tag } from './tag';

export { default as Tips } from './tips';

export { default as Toggle } from './toggle';

export { default as Tooltip } from './tooltip';

export { default as Tree } from './tree';

export { default as TreeSelect } from './tree-select';

export { default as Upload } from './upload';

export { default as Cascade } from './cascade';
