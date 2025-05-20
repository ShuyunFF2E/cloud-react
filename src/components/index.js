/* components/index.js文件 是通过 /script/generate-index.js文件生成的 */

import './style/core/normalize.less';
import './style/mixins/animation.less';

// 检验当前运行环境
if(typeof window === 'undefined') {
	console.warn('cloud-react 仅支持在浏览器环境进行使用!');
}

const bodys = document.getElementsByTagName('body')[0];
const colors = [1,2,3,4,5,6,7];
for(let i = 0; i < colors.length; i += 1){
const color = window.localStorage.getItem(`--shuyunBlue${i + 1}`)
if(color){
bodys.style.setProperty(`--shuyunBlue${i + 1}`,color)
}
}

export const version = '2.0.5';

export { default as Avatar } from './avatar';

export { default as Badge } from './badge';

export { default as BreadCrumbs } from './bread-crumbs';

export { default as Button } from './button';

export { default as CCascader } from './c-cascader';

export { default as CDrawer } from './c-drawer';

export { default as CDropdown } from './c-dropdown';

export { default as CMenu } from './c-menu';

export { default as CPicker } from './c-picker';

export { default as CTable } from './c-table';

export { default as Card } from './card';

export { default as Cascader } from './cascader';

export { default as Checkbox } from './checkbox';

export { default as ComplexCheckbox } from './complex-checkbox';

export { default as ComplexRadio } from './complex-radio';

export { default as Datepicker } from './datepicker';

export { default as Drawer } from './drawer';

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

export { default as Mixin } from './mixin';

export { default as Modal } from './modal';

export { default as Notification } from './notification';

export { default as PageHeader } from './pageHeader';

export { default as Pagination } from './pagination';

export { default as Plaintext } from './plaintext';

export { default as Popover } from './popover';

export { default as Progress } from './progress';

export { default as Radio } from './radio';

export { default as Select } from './select';

export { default as Slider } from './slider';

export { default as Step } from './step';

export { default as Table } from './table';

export { default as TableLite } from './table-lite';

export { default as TablePagination } from './table-pagination';

export { default as Tabs } from './tabs';

export { default as Tag } from './tag';

export { default as Tips } from './tips';

export { default as Toggle } from './toggle';

export { default as Tooltip } from './tooltip';

export { default as Transfer } from './transfer';

export { default as Tree } from './tree';

export { default as TreeSelect } from './tree-select';

export { default as Upload } from './upload';


