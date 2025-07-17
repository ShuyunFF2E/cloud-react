---
title: 组件(v1版)更新日志
nav:
  title: 指南
  path: /guide
group:
  title: 组件(v1版)更新日志
  path: /log
  order: 3
---

## 2.0.13 (2025-07-17)

### Features

- feat: [CTable] 表格添加 configPanelMaxHeight 参数，支持设置配置列面板的最大高度 ([8fad87e](https://github.com/ShuyunFF2E/cloud-react/commit/8fad87e))
- feat: [CTable] 多选表格，支持外部调用函数回显已选数据 this.tableRef.current.init(this.state.checkedGoodsData) ([b81e91f](https://github.com/ShuyunFF2E/cloud-react/commit/b81e91f))
- feat: [CTable] defaultShowColumns 支持传递对象数组类型 ([c654a62](https://github.com/ShuyunFF2E/cloud-react/commit/c654a62))
- feat: [CTable] 表格列文本和链接组件添加 tooltipValue 参数 ([899dd85](https://github.com/ShuyunFF2E/cloud-react/commit/899dd85))
- feat: [Drawer] 抽屉支持全屏 ([5bd07a1](https://github.com/ShuyunFF2E/cloud-react/commit/5bd07a1))
- feat: [Icon] 添加各个平台图标 ([7e7d7de](https://github.com/ShuyunFF2E/cloud-react/commit/7e7d7de))
- feat: [SearchBox] 新增搜索面板组件 ([5213a7c](https://github.com/ShuyunFF2E/cloud-react/commit/5213a7c))

### Bug Fixes

- fix: [Badge]解决左侧原点被压缩的问题 ([484c5fd](https://github.com/ShuyunFF2E/cloud-react/commit/484c5fd))
- fix: [Tooltip] 修改字体 ([07f39f3](https://github.com/ShuyunFF2E/cloud-react/commit/07f39f3))

## 2.0.11

### Features

- feat: [slider]增加滑动选择 ([6bcc7f2](https://github.com/ShuyunFF2E/cloud-react/commit/6bcc7f2))
- feat: [icon]添加 AI 主题图标 ([61ae9e7](https://github.com/ShuyunFF2E/cloud-react/commit/61ae9e7))

## 2.0.10

### Bug Fixes

- fix: 解决列固定阴影，偶发性不展示，滚动列才展示 ([642d9cb](https://github.com/ShuyunFF2E/cloud-react/commit/642d9cb))

## 2.0.9

### Features

- feat: [CTable]添加设置列弹窗 ([1f3f0fa](https://github.com/ShuyunFF2E/cloud-react/commit/1f3f0fa))
- feat: [CTable]设置列弹窗添加按钮反转配置 ([ebb0ca7](https://github.com/ShuyunFF2E/cloud-react/commit/ebb0ca7))
- feat: [Modal]添加新配置 outerClassName 和 isReverseBtn ([0cc30b8](https://github.com/ShuyunFF2E/cloud-react/commit/0cc30b8))
- feat: [Popover] 添加新配 isReverseBtn ([258f2ba](https://github.com/ShuyunFF2E/cloud-react/commit/258f2ba))

## 2.0.7

### Features

- feat: [inputTag] 修复赋值 ([29808d5](https://github.com/ShuyunFF2E/cloud-react/commit/29808d5))
- feat: [inputTag] 修改样式及替换 icon ([eacdc70](https://github.com/ShuyunFF2E/cloud-react/commit/eacdc70))
- feat: [CTable] 多选表格，支持外部调用函数回显已选数据 this.tableRef.current.init(this.state.checkedGoodsData) ([b81e91f](https://github.com/ShuyunFF2E/cloud-react/commit/b81e91f))

### Bug Fixes

- fix: [Tree] 解决搜索节点，若匹配到的节点有多级，应全部展示，实际上只展示了匹配到节点的下一级的问题 ([58ad498](https://github.com/ShuyunFF2E/cloud-react/commit/58ad498))
- fix: [TreeSelect] 解决树下拉样式异常的问题 ([b90efd7](https://github.com/ShuyunFF2E/cloud-react/commit/b90efd7))
- fix: [TreeSelect][Select] 多选 TreeSelect 和 多选 Select 下拉，多次点击输入框区域，输入框失焦 ([61a114f](https://github.com/ShuyunFF2E/cloud-react/commit/61a114f))

## 2.0.6

### Features

- feat: [Tooltip]新增 control 参数，结合 visible 使用，实现手动控制浮层显隐 ([83fbd34](https://github.com/ShuyunFF2E/cloud-react/commit/83fbd34))
- feat: [CTable]表格支持配置列的展示和隐藏（复杂模式，支持拖拽和重置） ([675dff7](https://github.com/ShuyunFF2E/cloud-react/commit/675dff7))
- feat: [Radio] 给 Radio 添加 radioClassName 参数,设置自定义类 ([c823a7a](https://github.com/ShuyunFF2E/cloud-react/commit/c823a7a))

### Bug Fixes

- docs: [CTable] 添加 DEMO，解决 columnData 中 render 闭包问题 ([b55532d](https://github.com/ShuyunFF2E/cloud-react/commit/b55532d))
- fix: [Radio] 解决给 ComplexRadio 设置 className 后，所有类被覆盖的问题 ([2dfc096](https://github.com/ShuyunFF2E/cloud-react/commit/2dfc096))
- fix: [Radio] 解决卡片式 radio，设置定高后，radio 按钮和文案不对齐的问题 ([054dbd1](https://github.com/ShuyunFF2E/cloud-react/commit/054dbd1))
- fix: [Radio] 解决卡片式 radio，设置定宽后，radio 按钮被右侧文本挤压的问题 ([86381c2](https://github.com/ShuyunFF2E/cloud-react/commit/86381c2))

## 2.0.5 (2024-12-09)

### Features

- [inputTag] 修改 icon 样式 ([2e1116a](https://github.com/ShuyunFF2E/cloud-react/commit/2e1116a7234a8aba2a604925cacd50b6285a6e31))
- [inputTag] 修改样式及替换 icon ([eacdc70](https://github.com/ShuyunFF2E/cloud-react/commit/eacdc703b14cda146ae2a26f42498b3e19041bd2))
- [Modal] confirm 添加外部 footer 样式属性 ([d8263a4](https://github.com/ShuyunFF2E/cloud-react/commit/d8263a4326dad2b4a866f865e7b1e55851bab44b))

## 2.0.4(2024-10-25)

### Bug Fixes

- [Tree] 解决搜索节点，若匹配到的节点有多级，应全部展示，实际上只展示了匹配到节点的下一级的问题 ([58ad498](https://github.com/ShuyunFF2E/cloud-react/commit/58ad498e5bd6cffee4c049b5294826bd11af0929))
- 【级联选择器】1、升级 rc-cascader 版本，修复搜索结果异常问题 2、输入状态下，输入框预置的文字色值改为 gray-6 ([9b837aa](https://github.com/ShuyunFF2E/cloud-react/commit/9b837aa))

### Features

- [CTable] 修改表格样式 ([0a3d685](https://github.com/ShuyunFF2E/cloud-react/commit/0a3d68523386380da86f4ae238ce248b9b465ae0))
- [CTable] 删除测试代码 ([3ad94e8](https://github.com/ShuyunFF2E/cloud-react/commit/3ad94e82cbafb86f00c267a8e572ef448fcc48f0))
- [CTable] 表格配置列添加参数：defaultConfigColumns 和 disabledSortColumns ([6c3eb12](https://github.com/ShuyunFF2E/cloud-react/commit/6c3eb123d5183170851d27d1097682d09259171a))
- 修改依赖包 ([61cea7a](https://github.com/ShuyunFF2E/cloud-react/commit/61cea7a062bc2baa7fc49f80bc27c40d5dc3d45c))
- 修改依赖包 ([a8d08cb](https://github.com/ShuyunFF2E/cloud-react/commit/a8d08cb4012e0e01d40a2bd195cadabbeaa68191))
- 添加代码提交前校验 ([850cc7a](https://github.com/ShuyunFF2E/cloud-react/commit/850cc7ae8596269d2e95e61283195381d40324bf))
- 添加代码提交前校验，便于生成日志 ([5edc635](https://github.com/ShuyunFF2E/cloud-react/commit/5edc6350a5dec986c80ec9cbf33ddd541976bbdb))
- 表格支持配置列的展示和隐藏（复杂模式，支持拖拽和重置） ([675dff7](https://github.com/ShuyunFF2E/cloud-react/commit/675dff70355af669225bf8119108807b5f6705e0))
- 表格支持配置列的展示和隐藏（复杂模式，支持拖拽和重置） ([ec35eb2](https://github.com/ShuyunFF2E/cloud-react/commit/ec35eb23741d5ab8922a5be183f48f25c03679e8))
- [tooltip]设置滚动根节点 ([a5cf0a6](https://github.com/ShuyunFF2E/cloud-react/commit/a5cf0a6))

## [v2.0.2](https://github.com/ShuyunFF2E/cloud-react/compare/v1.0.33...v2.0.2)

- :bug: [CTable] 使用标题 tooltip 功能无需配置前置条件 ([6f5734c](https://github.com/ShuyunFF2E/cloud-react/commit/6f5734c))
- :bug: [CTable] 修复表格配置 align 失效的问题 ([103f935](https://github.com/ShuyunFF2E/cloud-react/commit/103f935))
- :bug: [CTable] 解决表格禁用行配置 tooltip 内容为空，tooltip 仍然展示的问题 (#721) ([b8bc203](https://github.com/ShuyunFF2E/cloud-react/commit/b8bc203)), closes [#721](https://github.com/ShuyunFF2E/cloud-react/issues/721)
- :bug: [Drawer] 解决抽屉组件遮罩层遮盖住抽屉内容的问题 ([1116d25](https://github.com/ShuyunFF2E/cloud-react/commit/1116d25))
- :bug: [Drawer]关闭抽屉组件添加动画 ([31c12a2](https://github.com/ShuyunFF2E/cloud-react/commit/31c12a2))
- :bug: [Select]解决多选下拉框搜索功能异常的问题 ([df72775](https://github.com/ShuyunFF2E/cloud-react/commit/df72775))
- :bug:[Badge]徽标数字只有一位时，样式应该是圆形 ([0a2b288](https://github.com/ShuyunFF2E/cloud-react/commit/0a2b288))
- :bug:[CTable]修改文本超长的计算逻辑 ([f599c0f](https://github.com/ShuyunFF2E/cloud-react/commit/f599c0f))
- :bug:[CTable]解决懒加载表格，表头样式错位问题 ([27df49a](https://github.com/ShuyunFF2E/cloud-react/commit/27df49a))
- :bug:[CTable]解决自定义滚动条宽度不固定时，右侧固定列表头展示异常 ([424420c](https://github.com/ShuyunFF2E/cloud-react/commit/424420c))
- :bug:[CTable]解决表格列不传递 dataIndex 和 render 报错的问题 ([29f64a0](https://github.com/ShuyunFF2E/cloud-react/commit/29f64a0))
- :bug:[CTable]解决表格已选数据回显报错的问题 ([17fc71d](https://github.com/ShuyunFF2E/cloud-react/commit/17fc71d))
- :bug:[Dropdown]修改 dropdown 层级 ([88d4d5e](https://github.com/ShuyunFF2E/cloud-react/commit/88d4d5e))
- :bug:[Input.Textarea]解决 Textarea 组件设置 resize 为 true 时，控制宽高变化，计数器样式异常的问题 ([407c33c](https://github.com/ShuyunFF2E/cloud-react/commit/407c33c))
- :bug:[InputNumber]修改样式，解决 addAfter 设置文本后，文本折行的问题 ([05b6bb6](https://github.com/ShuyunFF2E/cloud-react/commit/05b6bb6))
- :bug:[InputNumber]设置前缀/后缀时，表单校验报错，边框不是红色 ([76beb5a](https://github.com/ShuyunFF2E/cloud-react/commit/76beb5a))
- :bug:[Modal]解决 icon 样式被污染的问题 ([6986091](https://github.com/ShuyunFF2E/cloud-react/commit/6986091))
- :bug:[Notification]消息通知组件 UI 验收问题修改 ([d5fba43](https://github.com/ShuyunFF2E/cloud-react/commit/d5fba43))
- :bug:[Popover]支持配置自定义图标和图标样式 ([696ad5b](https://github.com/ShuyunFF2E/cloud-react/commit/696ad5b))
- :bug:[Radio]修改样式 ([6d5c0de](https://github.com/ShuyunFF2E/cloud-react/commit/6d5c0de))
- :bug:[Select][TreeSelect]修改 maxTagCount 默认值 ([c239dae](https://github.com/ShuyunFF2E/cloud-react/commit/c239dae))
- :bug:[Select][TreeSelect]修改 showTag 默认值 ([ec6ffe6](https://github.com/ShuyunFF2E/cloud-react/commit/ec6ffe6))
- :bug:[Select][TreeSelect]修改搜索逻辑 ([c367ca1](https://github.com/ShuyunFF2E/cloud-react/commit/c367ca1))
- :bug:[Select][TreeSelect]修改禁用状态颜色 ([5a5bf2d](https://github.com/ShuyunFF2E/cloud-react/commit/5a5bf2d))
- :bug:[Select]下拉框内容超长显示... ([8b704bf](https://github.com/ShuyunFF2E/cloud-react/commit/8b704bf))
- :bug:[Select]修改搜索按钮样式；修改输入框 focus 行为 ([843188d](https://github.com/ShuyunFF2E/cloud-react/commit/843188d))
- :bug:[Select]多选支持不限模式，在设置 showTag 为 false 的时候，无法选择不限选项 ([839853c](https://github.com/ShuyunFF2E/cloud-react/commit/839853c))
- :bug:[Select]解决多选下拉已选标签展示异常的问题 ([576a951](https://github.com/ShuyunFF2E/cloud-react/commit/576a951))
- :bug:[Tabs]解决异步获取选项卡列表报错的问题；解决给选项卡 key 传值为 number 类型时报错的问题 ([f99eb85](https://github.com/ShuyunFF2E/cloud-react/commit/f99eb85))
- :bug:[Tooltip]修改气泡三角的样式，需继承阴影样式 ([71f892c](https://github.com/ShuyunFF2E/cloud-react/commit/71f892c))
- :bug:[TreeSelect]解决树下拉单选，使用表单校验的模式，报错的问题 ([28f4b87](https://github.com/ShuyunFF2E/cloud-react/commit/28f4b87))
- :bug:下拉框支持不限，问题修改 ([fde43a1](https://github.com/ShuyunFF2E/cloud-react/commit/fde43a1))
- :bug:修改下拉框不限样式 ([4ce9d2d](https://github.com/ShuyunFF2E/cloud-react/commit/4ce9d2d))
- :bug:修改样式 ([0cb050d](https://github.com/ShuyunFF2E/cloud-react/commit/0cb050d))
- :bug:解决依赖树中存在多个 babel 版本，导致样例代码报错的问题 ([91fc97f](https://github.com/ShuyunFF2E/cloud-react/commit/91fc97f))
- :bug:解决在 modal 中使用 showConfirmLoading，加载失败，按钮仍然 loading ，无法再次操作的问题 ([493d378](https://github.com/ShuyunFF2E/cloud-react/commit/493d378))
- :bug:解决在 modal 中使用 showConfirmLoading，加载失败，按钮仍然 loading ，无法再次操作的问题 (#742) ([683f63d](https://github.com/ShuyunFF2E/cloud-react/commit/683f63d)), closes [#742](https://github.com/ShuyunFF2E/cloud-react/issues/742)
- :fire: 删除测试代码 ([0375dab](https://github.com/ShuyunFF2E/cloud-react/commit/0375dab))
- :fire:删除测试代码 ([500620b](https://github.com/ShuyunFF2E/cloud-react/commit/500620b))
- :lipstick: [Checkbox] 基础组件能力排查 ([733938c](https://github.com/ShuyunFF2E/cloud-react/commit/733938c))
- :lipstick: [CTable] 表格标题：问号提示、排序、筛选 同时存在时，样式优化 ([b4fcd3b](https://github.com/ShuyunFF2E/cloud-react/commit/b4fcd3b))
- :lipstick: [Form] 基础组件能力排查 ([3297af6](https://github.com/ShuyunFF2E/cloud-react/commit/3297af6))
- :lipstick: [Form] 补充表单样式 ([c600b08](https://github.com/ShuyunFF2E/cloud-react/commit/c600b08))
- :lipstick: [Pagination] 基础组件能力排查 ([2ba49c0](https://github.com/ShuyunFF2E/cloud-react/commit/2ba49c0))
- :lipstick: [Radio] 基础组件能力排查 ([b33a304](https://github.com/ShuyunFF2E/cloud-react/commit/b33a304))
- :lipstick: [Tag] 基础组件能力排查 ([48220e8](https://github.com/ShuyunFF2E/cloud-react/commit/48220e8))
- :lipstick: [徽标] 基础组件能力排查 ([1ecdafa](https://github.com/ShuyunFF2E/cloud-react/commit/1ecdafa))
- :lipstick: 修改复杂单选组件和复杂多选组件的样式 ([116a3f4](https://github.com/ShuyunFF2E/cloud-react/commit/116a3f4))
- :lipstick: 表单内组件样式同意调整 ([b985e70](https://github.com/ShuyunFF2E/cloud-react/commit/b985e70))
- :lipstick:[CPicker]修改下拉圆角 ([e2dc35a](https://github.com/ShuyunFF2E/cloud-react/commit/e2dc35a))
- :lipstick:[tree]修改样式 ([f2d456f](https://github.com/ShuyunFF2E/cloud-react/commit/f2d456f))
- :loud_sound: 更新日志 ([24e7d5e](https://github.com/ShuyunFF2E/cloud-react/commit/24e7d5e))
- :loud_sound: 更新日志 ([a279dad](https://github.com/ShuyunFF2E/cloud-react/commit/a279dad))
- :package:锁定依赖包版本 ([f640ae1](https://github.com/ShuyunFF2E/cloud-react/commit/f640ae1))
- :package:锁定依赖包版本 ([7b7c3c8](https://github.com/ShuyunFF2E/cloud-react/commit/7b7c3c8))
- :sparkles: [CTable] 更新表格 Demo ([baea2d0](https://github.com/ShuyunFF2E/cloud-react/commit/baea2d0))
- :sparkles: [CTable] 添加样式 ([4c6f4d6](https://github.com/ShuyunFF2E/cloud-react/commit/4c6f4d6))
- :sparkles: [CTable] 表格提供默认列模板 ([f04e6f2](https://github.com/ShuyunFF2E/cloud-react/commit/f04e6f2))
- :sparkles: [CTable] 表格提供默认列模板 ([a52ef36](https://github.com/ShuyunFF2E/cloud-react/commit/a52ef36))
- :sparkles: [CTable]固定列支持列拉伸 ([01205a0](https://github.com/ShuyunFF2E/cloud-react/commit/01205a0))
- :sparkles: [Form] 添加禁用样例 ([e6b8369](https://github.com/ShuyunFF2E/cloud-react/commit/e6b8369))
- :sparkles: [Modal]弹窗支持配置是否可拖动 ([9241f88](https://github.com/ShuyunFF2E/cloud-react/commit/9241f88))
- :sparkles: [Modal]添加 borderRadiusSize 参数，支持配置圆角尺寸 ([2cb7395](https://github.com/ShuyunFF2E/cloud-react/commit/2cb7395))
- :sparkles: [Modal]添加样例 ([9d8a8a9](https://github.com/ShuyunFF2E/cloud-react/commit/9d8a8a9))
- :sparkles: [Tooltip]修改阴影值 ([55cfba2](https://github.com/ShuyunFF2E/cloud-react/commit/55cfba2))
- :sparkles: [Tooltip]添加过渡样式 ([e0efcb4](https://github.com/ShuyunFF2E/cloud-react/commit/e0efcb4))
- :sparkles: UI 验收问题修改 ([20c145f](https://github.com/ShuyunFF2E/cloud-react/commit/20c145f))
- :sparkles: UI 验收问题修改-修改周的悬停 及 选中状态 ([11c5be5](https://github.com/ShuyunFF2E/cloud-react/commit/11c5be5))
- :sparkles:[Button]按钮样式调整 ([79ec8f8](https://github.com/ShuyunFF2E/cloud-react/commit/79ec8f8))
- :sparkles:[CCascader]级联菜单支持配置圆角尺寸 ([0bd0bab](https://github.com/ShuyunFF2E/cloud-react/commit/0bd0bab))
- :sparkles:[CTable] rowKey 支持函数说明 ([a0fdba6](https://github.com/ShuyunFF2E/cloud-react/commit/a0fdba6))
- :sparkles:[CTable]恢复代码 ([6f7cb3d](https://github.com/ShuyunFF2E/cloud-react/commit/6f7cb3d))
- :sparkles:[CTable]更新表格 demo ([6af16c5](https://github.com/ShuyunFF2E/cloud-react/commit/6af16c5))
- :sparkles:[CTable]添加 rcTableConfig 参数，支持 rcTable API ([eb76387](https://github.com/ShuyunFF2E/cloud-react/commit/eb76387))
- :sparkles:[CTable]解决 windows 下自定义滚动条常显，mac 下自定义滚动条不常显导致的问题 ([2a15774](https://github.com/ShuyunFF2E/cloud-react/commit/2a15774))
- :sparkles:[Input.Textarea]支持 resize 属性 ([0f7f229](https://github.com/ShuyunFF2E/cloud-react/commit/0f7f229))
- :sparkles:[InputNumber]修改圆角 ([8769c63](https://github.com/ShuyunFF2E/cloud-react/commit/8769c63))
- :sparkles:[InputNumber]修改样式 ([4d0cca2](https://github.com/ShuyunFF2E/cloud-react/commit/4d0cca2))
- :sparkles:[InputNumber]支持复合型输入框 ([f33c89b](https://github.com/ShuyunFF2E/cloud-react/commit/f33c89b))
- :sparkles:[InputNumber]添加圆角 ([9682995](https://github.com/ShuyunFF2E/cloud-react/commit/9682995))
- :sparkles:[Message][Tips]提示信息 UI 修改 ([4d93245](https://github.com/ShuyunFF2E/cloud-react/commit/4d93245))
- :sparkles:[Modal.confirm]添加 className 和 hasFooter 参数 ([c8e56e8](https://github.com/ShuyunFF2E/cloud-react/commit/c8e56e8))
- :sparkles:[Notification]新增消息通知组件 ([4f8f434](https://github.com/ShuyunFF2E/cloud-react/commit/4f8f434))
- :sparkles:[Notification]新增消息通知组件 ([2603d13](https://github.com/ShuyunFF2E/cloud-react/commit/2603d13))
- :sparkles:[Select]下拉组件支持设置弹出位置 ([3fe68a5](https://github.com/ShuyunFF2E/cloud-react/commit/3fe68a5))
- :sparkles:[Select]下拉组件支持输入框内直接搜索 ([0713269](https://github.com/ShuyunFF2E/cloud-react/commit/0713269))
- :sparkles:[Select]修改 Select 最小宽 ([254c413](https://github.com/ShuyunFF2E/cloud-react/commit/254c413))
- :sparkles:[Select]单选下拉搜索中，点击输入框无需关闭下拉 ([6f0fda7](https://github.com/ShuyunFF2E/cloud-react/commit/6f0fda7))
- :sparkles:[Select]添加禁用状态样式 ([577c61e](https://github.com/ShuyunFF2E/cloud-react/commit/577c61e))
- :sparkles:[Select]解决多选下拉删除标签时，下拉框闪动的问题 ([6e07c4f](https://github.com/ShuyunFF2E/cloud-react/commit/6e07c4f))
- :sparkles:[Tips]样式调整 ([35e8105](https://github.com/ShuyunFF2E/cloud-react/commit/35e8105))
- :sparkles:[Tree][TreeSelect]修改 searchInBox 默认值为 true ([ddb9689](https://github.com/ShuyunFF2E/cloud-react/commit/ddb9689))
- :sparkles:[Tree][TreeSelect]支持线性样式 ([285076b](https://github.com/ShuyunFF2E/cloud-react/commit/285076b))
- :sparkles:[Tree]修改样式 ([a906a00](https://github.com/ShuyunFF2E/cloud-react/commit/a906a00))
- :sparkles:[Tree]支持动态加载 ([6772580](https://github.com/ShuyunFF2E/cloud-react/commit/6772580))
- :sparkles:[Tree]支持自定义节点内容 ([ae8d741](https://github.com/ShuyunFF2E/cloud-react/commit/ae8d741))
- :sparkles:[TreeSelect]支持动态加载 ([1163483](https://github.com/ShuyunFF2E/cloud-react/commit/1163483))
- :sparkles:[TreeSelect]支持在输入框内搜索 ([a104032](https://github.com/ShuyunFF2E/cloud-react/commit/a104032))
- :sparkles:[TreeSelect]支持展示选中节点的全部路径 ([bff503e](https://github.com/ShuyunFF2E/cloud-react/commit/bff503e))
- :sparkles:[TreeSelect]支持设置弹出位置 ([cf6460f](https://github.com/ShuyunFF2E/cloud-react/commit/cf6460f))
- :sparkles:[TreeSelect]添加 demo ([13dc5b3](https://github.com/ShuyunFF2E/cloud-react/commit/13dc5b3))
- :sparkles:分体式表格 ([daec253](https://github.com/ShuyunFF2E/cloud-react/commit/daec253))
- :sparkles:删除 console ([dcb0562](https://github.com/ShuyunFF2E/cloud-react/commit/dcb0562))
- :sparkles:删除 console ([d65a8f3](https://github.com/ShuyunFF2E/cloud-react/commit/d65a8f3))
- :sparkles:删除 console ([ba97009](https://github.com/ShuyunFF2E/cloud-react/commit/ba97009))
- :sparkles:升级组件库版本号 ([16b3cd8](https://github.com/ShuyunFF2E/cloud-react/commit/16b3cd8))
- :sparkles:懒加载表格样例 ([e3633c4](https://github.com/ShuyunFF2E/cloud-react/commit/e3633c4))
- :sparkles:添加 selectAllText 参数，支持配置全选文案 ([d32af1b](https://github.com/ShuyunFF2E/cloud-react/commit/d32af1b))
- :sparkles:添加 showDesc 和 descKey 参数，支持在下拉项中配置描述信息 ([2dd3398](https://github.com/ShuyunFF2E/cloud-react/commit/2dd3398))
- :sparkles:添加依赖 ([50a619f](https://github.com/ShuyunFF2E/cloud-react/commit/50a619f))
- :sparkles:点击行高亮 ([152b41e](https://github.com/ShuyunFF2E/cloud-react/commit/152b41e))
- [badge]修改间距 ([aa4b3ea](https://github.com/ShuyunFF2E/cloud-react/commit/aa4b3ea))
- [BreadCrumbs]面包蟹 UI 验收问题修改 ([4f82a3b](https://github.com/ShuyunFF2E/cloud-react/commit/4f82a3b))
- [BUTTON 第二轮 UI 验收问题] ([f567629](https://github.com/ShuyunFF2E/cloud-react/commit/f567629))
- [c-table]修改筛选 icon 高亮 ([a83d39a](https://github.com/ShuyunFF2E/cloud-react/commit/a83d39a))
- [CDropdown] UI 升级（客户视图使用） ([5ccc02e](https://github.com/ShuyunFF2E/cloud-react/commit/5ccc02e))
- [CDropdown]修改下拉菜单样式 ([534608e](https://github.com/ShuyunFF2E/cloud-react/commit/534608e))
- [CPicker] 添加样式覆盖 ([78c29c0](https://github.com/ShuyunFF2E/cloud-react/commit/78c29c0))
- [CTable] 修改 CDropdown 层级 ([75f2afe](https://github.com/ShuyunFF2E/cloud-react/commit/75f2afe))
- [CTable] 排序问题修复；新增 showCheckedAll 参数；[Select] 支持监听下拉选项 disabled 状态变化；多选下拉支持选择不限 (#719) ([a0ec627](https://github.com/ShuyunFF2E/cloud-react/commit/a0ec627)), closes [#719](https://github.com/ShuyunFF2E/cloud-react/issues/719)
- [CTable] 解决文字超长展示省略号的计算逻辑有误的问题 ([ff37cd7](https://github.com/ShuyunFF2E/cloud-react/commit/ff37cd7))
- [CTable] 解决文字超长展示省略号的计算逻辑有误的问题 ([6b897ce](https://github.com/ShuyunFF2E/cloud-react/commit/6b897ce))
- [CTable] 解决文字超长展示省略号的计算逻辑有误的问题 ([0a178a4](https://github.com/ShuyunFF2E/cloud-react/commit/0a178a4))
- [CTable]fix:表格行禁用时 tooltip 报错 ([167b768](https://github.com/ShuyunFF2E/cloud-react/commit/167b768))
- [CTable]修改复杂多选和单选的样式 ([d8fe543](https://github.com/ShuyunFF2E/cloud-react/commit/d8fe543))
- [CTable]废弃 CTable.MultiTextTpl 和 CTable.MultiLinkTpl，统一使用合并 CTable.TextTpl 和 CTable.LinkTpl，并通过传递 li ([f59ca7c](https://github.com/ShuyunFF2E/cloud-react/commit/f59ca7c))
- [CTable]恢复代码 ([e079184](https://github.com/ShuyunFF2E/cloud-react/commit/e079184))
- [CTable]排序相关功能新增和问题修复[Select]支持搜索高亮[Drawer]抽屉问题修复[CPikcer]固定 rc-picker 版本 (#715) ([7a1b427](https://github.com/ShuyunFF2E/cloud-react/commit/7a1b427)), closes [#715](https://github.com/ShuyunFF2E/cloud-react/issues/715)
- [CTable]解决时间范围列模板报错问题 ([a597947](https://github.com/ShuyunFF2E/cloud-react/commit/a597947))
- [Drawer] 设置标题字号 ([d2c5b37](https://github.com/ShuyunFF2E/cloud-react/commit/d2c5b37))
- [Drawer]抽屉样式修改 ([1b705ba](https://github.com/ShuyunFF2E/cloud-react/commit/1b705ba))
- [Drawer]抽屉问题修复 (#717) ([6975806](https://github.com/ShuyunFF2E/cloud-react/commit/6975806)), closes [#717](https://github.com/ShuyunFF2E/cloud-react/issues/717)
- [Dropdown]下拉菜单 UI 验收问题修改 ([370f586](https://github.com/ShuyunFF2E/cloud-react/commit/370f586))
- [Dropdown]下拉菜单支持选择功能 ([2f2588b](https://github.com/ShuyunFF2E/cloud-react/commit/2f2588b))
- [Form]补充表单项 ([289e000](https://github.com/ShuyunFF2E/cloud-react/commit/289e000))
- [icon]更新 icon 库和图标 ([5588961](https://github.com/ShuyunFF2E/cloud-react/commit/5588961))
- [Input]搜索时，只有 hover 到搜索 icon 时，才会变为主色 ([7ca3fa6](https://github.com/ShuyunFF2E/cloud-react/commit/7ca3fa6))
- [Input]添加 borderRadiusSize 参数，支持设置圆角 ([7050452](https://github.com/ShuyunFF2E/cloud-react/commit/7050452))
- [Input]添加组合式输入框 ([f68a7be](https://github.com/ShuyunFF2E/cloud-react/commit/f68a7be))
- [InputNumber]使用 addonBefore 和 addonAfter 时，修改布局为 inline-flex 行内布局 ([49bde5c](https://github.com/ShuyunFF2E/cloud-react/commit/49bde5c))
- [Modal] 解决异步加载数据，modal 高度变化导致位置不居中的问题 ([8609eeb](https://github.com/ShuyunFF2E/cloud-react/commit/8609eeb))
- [Modal]添加 infoText 参数 ([bc97133](https://github.com/ShuyunFF2E/cloud-react/commit/bc97133))
- [Notification]修改组件引用写法 ([d5155f3](https://github.com/ShuyunFF2E/cloud-react/commit/d5155f3))
- [PageHeader]页头 UI 验收问题修改 ([2196b5f](https://github.com/ShuyunFF2E/cloud-react/commit/2196b5f))
- [Pagination]支持配置展示数据总量 ([a7c3f63](https://github.com/ShuyunFF2E/cloud-react/commit/a7c3f63))
- [Pagination]极简分页的下拉列表替换成 Dropdown ([9436309](https://github.com/ShuyunFF2E/cloud-react/commit/9436309))
- [popover]修改样式 ([dc4cbc8](https://github.com/ShuyunFF2E/cloud-react/commit/dc4cbc8))
- [Radio] 添加 Radio 和表单项混合使用的样例 ([88cc1f2](https://github.com/ShuyunFF2E/cloud-react/commit/88cc1f2))
- [Radio] 添加 supportUnSelect 参数，支持配置反选 ([f8f2e99](https://github.com/ShuyunFF2E/cloud-react/commit/f8f2e99))
- [Select]修改 placeholder 样式 ([ca967a6](https://github.com/ShuyunFF2E/cloud-react/commit/ca967a6))
- [Select]修改下拉框最小宽度 ([539f966](https://github.com/ShuyunFF2E/cloud-react/commit/539f966))
- [Select]修改下拉框禁用样式 ([045437d](https://github.com/ShuyunFF2E/cloud-react/commit/045437d))
- [Select]带确认按钮的下拉框逻辑补充 ([78184fe](https://github.com/ShuyunFF2E/cloud-react/commit/78184fe))
- [Select]废弃 searchInbox 属性，多选组件支持配置已选数据超长展示省略号 ([69b31af](https://github.com/ShuyunFF2E/cloud-react/commit/69b31af))
- [Select]支持添加图文下拉框：新增参数：optionRender、checkboxStyle ([3bf7f27](https://github.com/ShuyunFF2E/cloud-react/commit/3bf7f27))
- [tag]修改 large 高度和 small 高度 ([848146b](https://github.com/ShuyunFF2E/cloud-react/commit/848146b))
- [tag]替换 demo 中的 icon ([07e763d](https://github.com/ShuyunFF2E/cloud-react/commit/07e763d))
- [TIP 第二轮 UI 验收问题] icon 颜色：grey-7 ([207f3d1](https://github.com/ShuyunFF2E/cloud-react/commit/207f3d1))
- [toggle]修改 large 高度和 small 高度 ([0563651](https://github.com/ShuyunFF2E/cloud-react/commit/0563651))
- [toggle]有 loading，hover 时为不可点击样式 ([312760c](https://github.com/ShuyunFF2E/cloud-react/commit/312760c))
- [tooltip 第二轮 UI 验收问题] 1. 黑色样式没有阴影 ([f7346fb](https://github.com/ShuyunFF2E/cloud-react/commit/f7346fb))
- [tooltip] 修复前缀为 newCloud,移入自动消失 ([dc89556](https://github.com/ShuyunFF2E/cloud-react/commit/dc89556))
- [Tooltip] 解决 onVisibleChange 在一次点击事件中被调用多次的问题 ([8ee7a3f](https://github.com/ShuyunFF2E/cloud-react/commit/8ee7a3f))
- [Tooltip][Popover]解决 popover 中使用 input，input 上边框被遮挡的问题 ([0e3a12b](https://github.com/ShuyunFF2E/cloud-react/commit/0e3a12b))
- [tooltip]1. 修改样式 2. 添加箭头显隐配置 ([b281944](https://github.com/ShuyunFF2E/cloud-react/commit/b281944))
- [Tooltip]feat-ui2.1 代码迁移 ([f0f3464](https://github.com/ShuyunFF2E/cloud-react/commit/f0f3464))
- [Tooltip]鼠标移入 tooltip，tooltip 不消失 ([78e169c](https://github.com/ShuyunFF2E/cloud-react/commit/78e169c))
- [Tree][TreeSelect]支持通过表单配置 size ([de5bbe1](https://github.com/ShuyunFF2E/cloud-react/commit/de5bbe1))
- [Tree][TreeSelect]新增 maxHeight 参数；解决设置 fontSize 导致选择后抖动的问题 ([f101186](https://github.com/ShuyunFF2E/cloud-react/commit/f101186))
- [TreeSelect]废弃 searchInbox 属性，多选组件支持配置已选数据超长展示省略号 ([048cc9c](https://github.com/ShuyunFF2E/cloud-react/commit/048cc9c))
- [upload]增加格式错误信息可配置 (#714) ([b6b37cc](https://github.com/ShuyunFF2E/cloud-react/commit/b6b37cc)), closes [#714](https://github.com/ShuyunFF2E/cloud-react/issues/714)
- [多选按钮 第二轮 UI 验收问题] 标题和 checkbox 没有对齐问题 ([1a143e8](https://github.com/ShuyunFF2E/cloud-react/commit/1a143e8))
- [气泡 第二轮 UI 验收问题] ([7e13264](https://github.com/ShuyunFF2E/cloud-react/commit/7e13264))
- [级连选择器 第二轮 UI 验收问题] 选中后文字颜色：grey-9 ([6a4ca04](https://github.com/ShuyunFF2E/cloud-react/commit/6a4ca04))
- 【tabs】更改 activeEle 没有时的报错 ([a5ff848](https://github.com/ShuyunFF2E/cloud-react/commit/a5ff848))
- 【tabs】更改 activeEle 没有时的报错 (#740) ([ea519e8](https://github.com/ShuyunFF2E/cloud-react/commit/ea519e8)), closes [#740](https://github.com/ShuyunFF2E/cloud-react/issues/740)
- 【下拉组件】分组功能 ([cdade7d](https://github.com/ShuyunFF2E/cloud-react/commit/cdade7d))
- 【下拉组件】分组功能 (#718) ([2ea9a0a](https://github.com/ShuyunFF2E/cloud-react/commit/2ea9a0a)), closes [#718](https://github.com/ShuyunFF2E/cloud-react/issues/718)
- 【全局提示 第二轮 UI 验收问题】1. icon24px 2. icon 和标题水平居中 3. 弹窗中 font family 调用错误 ([d214ad3](https://github.com/ShuyunFF2E/cloud-react/commit/d214ad3))
- 【全局提示 第二轮 UI 验收问题】关闭按钮颜色：grey-7 ([6d688bd](https://github.com/ShuyunFF2E/cloud-react/commit/6d688bd))
- 【数字输入框 U 第二轮 UI 验收问题】左右布局居中输入显示 ([ef5b8d4](https://github.com/ShuyunFF2E/cloud-react/commit/ef5b8d4))
- 【标签 第二轮 UI 验收问题】默认标签样式修改 ， 添加描边状态 ([90c0985](https://github.com/ShuyunFF2E/cloud-react/commit/90c0985))
- 【标签】修改标签默认圆角 ([b478f68](https://github.com/ShuyunFF2E/cloud-react/commit/b478f68))
- 【消息通知类 第二轮 UI 验收问题】添加 imgDemo ([25e657e](https://github.com/ShuyunFF2E/cloud-react/commit/25e657e))
- 【穿梭框】完善穿梭框的案例；实现极简穿梭框和单项穿梭框 ([56e05fe](https://github.com/ShuyunFF2E/cloud-react/commit/56e05fe))
- 【级联选择器】 完善级联选择器功能、样式 ([0bcee92](https://github.com/ShuyunFF2E/cloud-react/commit/0bcee92))
- 【级联选择器】popupClassName 标识为作废，改为 dropdownClassName ([399e90d](https://github.com/ShuyunFF2E/cloud-react/commit/399e90d))
- 【级联选择器】修改 prefixCls 配置 ([342493b](https://github.com/ShuyunFF2E/cloud-react/commit/342493b))
- 【级联选择器】完善全选功能的回显案例 ([34f7c03](https://github.com/ShuyunFF2E/cloud-react/commit/34f7c03))
- 【级联选择器】完善案例 ([1c7628e](https://github.com/ShuyunFF2E/cloud-react/commit/1c7628e))
- 【级联选择器】完善级联选择器 API，Demo； 【级联选择器】根据组件 2.1 交互修改样式 ([696eb7f](https://github.com/ShuyunFF2E/cloud-react/commit/696eb7f))
- 【级联选择器】搜索文字颜色需要改成主色 ([1d652b8](https://github.com/ShuyunFF2E/cloud-react/commit/1d652b8))
- 【级联选择器】搜索文字颜色需要改成主色 (#739) ([4caaea4](https://github.com/ShuyunFF2E/cloud-react/commit/4caaea4)), closes [#739](https://github.com/ShuyunFF2E/cloud-react/issues/739)
- 【级联选择器】根据组件 2.1 交互修改样式 ([2737965](https://github.com/ShuyunFF2E/cloud-react/commit/2737965))
- 【级联选择器】添加备注 ([b6af119](https://github.com/ShuyunFF2E/cloud-react/commit/b6af119))
- 【级联选择器】添加备注 ([983fa14](https://github.com/ShuyunFF2E/cloud-react/commit/983fa14))
- 【级联选择器】选中项第一个，常显，长度过长的话，...展示 ([e0c7874](https://github.com/ShuyunFF2E/cloud-react/commit/e0c7874))
- 【级连选择器】第三轮 UI 验收 ([ff6fd5a](https://github.com/ShuyunFF2E/cloud-react/commit/ff6fd5a))
- 【表格 第二轮 UI 验收问题】footer 字体大小调整 ([089d87b](https://github.com/ShuyunFF2E/cloud-react/commit/089d87b))
- 【输入框】为搜索框加载中样式，完善搜索框 Demo； a. 【输入框】多行文本支持手动编辑尺寸； ([cb09226](https://github.com/ShuyunFF2E/cloud-react/commit/cb09226))
- ✨ [CTable]支持配置列的显示和隐藏 (#737) ([ce4b08e](https://github.com/ShuyunFF2E/cloud-react/commit/ce4b08e)), closes [#737](https://github.com/ShuyunFF2E/cloud-react/issues/737)
- add husky ([8bec693](https://github.com/ShuyunFF2E/cloud-react/commit/8bec693))
- add pre-commit ([cb3d9cc](https://github.com/ShuyunFF2E/cloud-react/commit/cb3d9cc))
- cloud-react 支持 prefix class 增加抽屉和下拉菜单组件 (#700) ([37705cb](https://github.com/ShuyunFF2E/cloud-react/commit/37705cb)), closes [#700](https://github.com/ShuyunFF2E/cloud-react/issues/700)
- css 使用变量 ([e040643](https://github.com/ShuyunFF2E/cloud-react/commit/e040643))
- doc:update CHANGELOG ([44a03f0](https://github.com/ShuyunFF2E/cloud-react/commit/44a03f0))
- feat:Form 增加 preserve 属性 (#713) ([bec81bd](https://github.com/ShuyunFF2E/cloud-react/commit/bec81bd)), closes [#713](https://github.com/ShuyunFF2E/cloud-react/issues/713)
- feat【下拉菜单】添加箭头配置 ([94c2446](https://github.com/ShuyunFF2E/cloud-react/commit/94c2446))
- feat【级联选择器】完善基础组件案例， 添加滚动样式； ([05c1b41](https://github.com/ShuyunFF2E/cloud-react/commit/05c1b41))
- feat【级联选择器】添加“全选”功能 ([f9170ec](https://github.com/ShuyunFF2E/cloud-react/commit/f9170ec))
- feat【级联选择器】添加动画 ([ac43021](https://github.com/ShuyunFF2E/cloud-react/commit/ac43021))
- fix breadcrumbs button form icon input inputNumber inputTag select ([74bbb20](https://github.com/ShuyunFF2E/cloud-react/commit/74bbb20))
- fix modal ([9459fcc](https://github.com/ShuyunFF2E/cloud-react/commit/9459fcc))
- fix tabs ([f62f82e](https://github.com/ShuyunFF2E/cloud-react/commit/f62f82e))
- fix tree ([ecaf2b8](https://github.com/ShuyunFF2E/cloud-react/commit/ecaf2b8))
- fix:修复分页输入 0 异常问题 ([93bbe40](https://github.com/ShuyunFF2E/cloud-react/commit/93bbe40))
- fixed 【下拉菜单】修改样式。删除无用 rc-tooltip ([498ed57](https://github.com/ShuyunFF2E/cloud-react/commit/498ed57))
- fixed 站点部署后部分案例不显示的问题 ([1966ddb](https://github.com/ShuyunFF2E/cloud-react/commit/1966ddb))
- fixed[select] 下拉分组回显问题 ([566a829](https://github.com/ShuyunFF2E/cloud-react/commit/566a829))
- fixed【按钮】 调整按钮圆角大小 ([86eb12e](https://github.com/ShuyunFF2E/cloud-react/commit/86eb12e))
- fixed【级联选择】自定义级联 Footer 全选效果不一致 ([55d9528](https://github.com/ShuyunFF2E/cloud-react/commit/55d9528))
- fixed【级联选择器】自定义级联 Footer 全选效果不一致 ([a188185](https://github.com/ShuyunFF2E/cloud-react/commit/a188185))
- inputnumber ([da11089](https://github.com/ShuyunFF2E/cloud-react/commit/da11089))
- modal ([d9417b2](https://github.com/ShuyunFF2E/cloud-react/commit/d9417b2))
- pagination ([3259edc](https://github.com/ShuyunFF2E/cloud-react/commit/3259edc))
- table-pagination ([2882ac8](https://github.com/ShuyunFF2E/cloud-react/commit/2882ac8))
- test ([6b380b2](https://github.com/ShuyunFF2E/cloud-react/commit/6b380b2))
- tooltip ([89e6751](https://github.com/ShuyunFF2E/cloud-react/commit/89e6751))
- UI 验收问题修改 ([0ad1ba5](https://github.com/ShuyunFF2E/cloud-react/commit/0ad1ba5))
- UI 样式调整 ([4a5b78e](https://github.com/ShuyunFF2E/cloud-react/commit/4a5b78e))
- update snapshot ([b48fe88](https://github.com/ShuyunFF2E/cloud-react/commit/b48fe88))
- upload ([32828c1](https://github.com/ShuyunFF2E/cloud-react/commit/32828c1))
- upload ([51434d0](https://github.com/ShuyunFF2E/cloud-react/commit/51434d0))
- 代码格式优化 ([85a5d03](https://github.com/ShuyunFF2E/cloud-react/commit/85a5d03))
- 优化 ([c704cfb](https://github.com/ShuyunFF2E/cloud-react/commit/c704cfb))
- 修改脚本 ([ce68de6](https://github.com/ShuyunFF2E/cloud-react/commit/ce68de6))
- 修改表格 index.md ([6b34c47](https://github.com/ShuyunFF2E/cloud-react/commit/6b34c47))
- 删除 modal 里滚动条问题 ([fde0349](https://github.com/ShuyunFF2E/cloud-react/commit/fde0349))
- 删除 supports ([ae86135](https://github.com/ShuyunFF2E/cloud-react/commit/ae86135))
- 合并 Checkbox 和 ComplexCheckbox demo ([f712014](https://github.com/ShuyunFF2E/cloud-react/commit/f712014))
- 合并 Radio 和 ComplexRadio demo ([eba0ad6](https://github.com/ShuyunFF2E/cloud-react/commit/eba0ad6))
- 恢复代码 ([3417195](https://github.com/ShuyunFF2E/cloud-react/commit/3417195))
- 新增抽屉组件；CTable 和 InputNumber 组件问题修复 (#712) ([90e7c8d](https://github.com/ShuyunFF2E/cloud-react/commit/90e7c8d)), closes [#712](https://github.com/ShuyunFF2E/cloud-react/issues/712)
- 更改 modal 样式 ([e2d5808](https://github.com/ShuyunFF2E/cloud-react/commit/e2d5808))
- 更改 supports ([76b581d](https://github.com/ShuyunFF2E/cloud-react/commit/76b581d))
- 给表单样式添加 !important ，为了覆盖 ccms-components 组件库的流氓样式而写 ([97c42ff](https://github.com/ShuyunFF2E/cloud-react/commit/97c42ff))
- 统一修改下拉菜单 panel 的阴影值 ([7843191](https://github.com/ShuyunFF2E/cloud-react/commit/7843191))
- 缩进 ([0dc5109](https://github.com/ShuyunFF2E/cloud-react/commit/0dc5109))
- 缩进 ([f32fc39](https://github.com/ShuyunFF2E/cloud-react/commit/f32fc39))
- 缩进 ([5de74c1](https://github.com/ShuyunFF2E/cloud-react/commit/5de74c1))
- 解决报错 ([8f6e03e](https://github.com/ShuyunFF2E/cloud-react/commit/8f6e03e))
- 解决报错 ([940768f](https://github.com/ShuyunFF2E/cloud-react/commit/940768f))
- fix: [CPicker] 区间单侧时间禁用时，选择另一侧后直接关闭面板 ([2294f75](https://github.com/ShuyunFF2E/cloud-react/commit/2294f75))
- fix: 优化 CPicker 代码 ([5b401f6](https://github.com/ShuyunFF2E/cloud-react/commit/5b401f6))
- fix: 修复周和季度选择器问题 ([9136372](https://github.com/ShuyunFF2E/cloud-react/commit/9136372))
- fix: 开始或结束时间为空时报错 ([80a3018](https://github.com/ShuyunFF2E/cloud-react/commit/80a3018))
- feat: Add card style to ComplexChexkbox ([3adf3bd](https://github.com/ShuyunFF2E/cloud-react/commit/3adf3bd))
- feat: Add dropdown button component. (#706) ([74e7732](https://github.com/ShuyunFF2E/cloud-react/commit/74e7732)), closes [#706](https://github.com/ShuyunFF2E/cloud-react/issues/706)
- feat: 增加其他范围选择 ([98a4c07](https://github.com/ShuyunFF2E/cloud-react/commit/98a4c07))
- feat: 增加预设时间（范围）的支持 ([541da59](https://github.com/ShuyunFF2E/cloud-react/commit/541da59))
- feat: 按钮支持 async 函数 ([40eb022](https://github.com/ShuyunFF2E/cloud-react/commit/40eb022))
- feat: 添加周选择器 ([680afea](https://github.com/ShuyunFF2E/cloud-react/commit/680afea))

### [v1.0.33](https://github.com/ShuyunFF2E/cloud-react/compare/v1.0.24...v1.0.33)

- Dev select group [`#726`](https://github.com/ShuyunFF2E/cloud-react/pull/726)
- feat CTable 表格添加默认列模板；表格支持默认为空配置 [`#725`](https://github.com/ShuyunFF2E/cloud-react/pull/725)
- Zpb cpicker button [`#722`](https://github.com/ShuyunFF2E/cloud-react/pull/722)
- :bug: [CTable] 解决表格禁用行配置 tooltip 内容为空，tooltip 仍然展示的问题 [`#721`](https://github.com/ShuyunFF2E/cloud-react/pull/721)
- 【下拉组件】分组功能 [`#718`](https://github.com/ShuyunFF2E/cloud-react/pull/718)
- [CTable] 排序问题修复；新增 showCheckedAll 参数；[Select] 支持监听下拉选项 disabled 状态变化；多选下拉支持选择不限 [`#719`](https://github.com/ShuyunFF2E/cloud-react/pull/719)
- [Drawer]抽屉问题修复 [`#717`](https://github.com/ShuyunFF2E/cloud-react/pull/717)
- [CTable]排序相关功能新增和问题修复[Select]支持搜索高亮[Drawer]抽屉问题修复[CPikcer]固定 rc-picker 版本 [`#715`](https://github.com/ShuyunFF2E/cloud-react/pull/715)
- [upload]增加格式错误信息可配置 [`#714`](https://github.com/ShuyunFF2E/cloud-react/pull/714)
- 新增抽屉组件；CTable 和 InputNumber 组件问题修复 [`#712`](https://github.com/ShuyunFF2E/cloud-react/pull/712)
- feat:Form 增加 preserve 属性 [`#713`](https://github.com/ShuyunFF2E/cloud-react/pull/713)
- infra:增加单元测试 [`#711`](https://github.com/ShuyunFF2E/cloud-react/pull/711)
- cloud-react 支持 prefix class 增加抽屉和下拉菜单组件 [`#700`](https://github.com/ShuyunFF2E/cloud-react/pull/700)
- doc:update changelog.md [`#710`](https://github.com/ShuyunFF2E/cloud-react/pull/710)
- modal [`d9417b2`](https://github.com/ShuyunFF2E/cloud-react/commit/d9417b268fcf6298438e89ec1e07a37a97c73950)
- 优化 [`c704cfb`](https://github.com/ShuyunFF2E/cloud-react/commit/c704cfb74a0417791107cb50805ef5e835874250)
- fix breadcrumbs button form icon input inputNumber inputTag select [`74bbb20`](https://github.com/ShuyunFF2E/cloud-react/commit/74bbb20cf3e0d4f1031871bae3e4e9b9be5ecffb)

#### [v1.0.24](https://github.com/ShuyunFF2E/cloud-react/compare/v1.0.23...v1.0.24)

> 12 June 2023

- feat:Form 增加 preserve 属性 [`#709`](https://github.com/ShuyunFF2E/cloud-react/pull/709)
- fix: 固定范围选择器下拉框 [`#708`](https://github.com/ShuyunFF2E/cloud-react/pull/708)
- feat: Add dropdown button component. [`#706`](https://github.com/ShuyunFF2E/cloud-react/pull/706)
- fix:Icon 组件优化 [`#705`](https://github.com/ShuyunFF2E/cloud-react/pull/705)
- fix:[Icon]引入字体库时机修改 [`#704`](https://github.com/ShuyunFF2E/cloud-react/pull/704)
- feat:Tree selectUI 修改 [`#701`](https://github.com/ShuyunFF2E/cloud-react/pull/701)
- doc:update changelog [`#699`](https://github.com/ShuyunFF2E/cloud-react/pull/699)
- [TreeSelect] 下拉树 ui 修改 [`3cff1e5`](https://github.com/ShuyunFF2E/cloud-react/commit/3cff1e530547acd4d59df54e31fa5d908a04085f)
- dev [`b481891`](https://github.com/ShuyunFF2E/cloud-react/commit/b48189194190070cdba7ba6abe67fe140416f9db)

#### [v1.0.23](https://github.com/ShuyunFF2E/cloud-react/compare/v1.0.20...v1.0.23)

> 28 April 2023

- fix:Select popup 样式优化&打包问题修复 [`#698`](https://github.com/ShuyunFF2E/cloud-react/pull/698)
- [CTable]fix:功能新增&问题修复 [`#697`](https://github.com/ShuyunFF2E/cloud-react/pull/697)
- fix:Radio 文档站点点击无效 [`#685`](https://github.com/ShuyunFF2E/cloud-react/pull/685)
- fix:upload icon 优化 [`#683`](https://github.com/ShuyunFF2E/cloud-react/pull/683)
- 修复时间选择器部分属性不生效的问题 [`#682`](https://github.com/ShuyunFF2E/cloud-react/pull/682)
- fix:修复 inputicon 样式问题 [`#680`](https://github.com/ShuyunFF2E/cloud-react/pull/680)
- fix:修复打包问题 [`b75982e`](https://github.com/ShuyunFF2E/cloud-react/commit/b75982e270fc8e5ca459584c10e362c92d7ff74a)
- fix: Select popup 样式优化 [`55f3d41`](https://github.com/ShuyunFF2E/cloud-react/commit/55f3d41fdcd02c3712c64b60f55da53acd6f2253)

### [v1.0.20](https://github.com/ShuyunFF2E/cloud-react/compare/v1.0.19...v1.0.20)

> 15 February 2023

- enhance: 增加 changelog [`#677`](https://github.com/ShuyunFF2E/cloud-react/pull/677)
- [Tree] 新增参数/问题修复 [`#676`](https://github.com/ShuyunFF2E/cloud-react/pull/676)

### [v1.0.19](https://github.com/ShuyunFF2E/cloud-react/compare/v0.1.2...v1.0.19)

> 29 January 2023

- fix:RadioGroup 修复嵌套问题 [`#675`](https://github.com/ShuyunFF2E/cloud-react/pull/675)
- [Form]enhance:增加 label description 属性 [`#673`](https://github.com/ShuyunFF2E/cloud-react/pull/673)
- :bug: [Tooltip]解决在火狐浏览器和 mac 台式机上 tooltip 点击内部区域异常关闭的问题 [`#671`](https://github.com/ShuyunFF2E/cloud-react/pull/671)
- fix:inline 样式问题 [`#667`](https://github.com/ShuyunFF2E/cloud-react/pull/667)
- Ctable 功能新增；Pagination 问题修复；InputNumber 交互优化；Select 样式优化 [`#664`](https://github.com/ShuyunFF2E/cloud-react/pull/664)
- [Input & Form] UI 升级 [`#662`](https://github.com/ShuyunFF2E/cloud-react/pull/662)
- 修复并合并 Radio、ComplexRadio 和 Select 组件 [`#658`](https://github.com/ShuyunFF2E/cloud-react/pull/658)
- fix:upload 组件 unit 属性优化 [`#656`](https://github.com/ShuyunFF2E/cloud-react/pull/656)
- fix:Tree 组件 onRenameNode 方法增加第三个参数 [`#653`](https://github.com/ShuyunFF2E/cloud-react/pull/653)
- Feat/v1 avatar [`#650`](https://github.com/ShuyunFF2E/cloud-react/pull/650)
- UI 组件库核验+微信会员中心 UI 验收 [`#643`](https://github.com/ShuyunFF2E/cloud-react/pull/643)
- Feat new icons [`#641`](https://github.com/ShuyunFF2E/cloud-react/pull/641)
- feat: [CTable] 支持受控分页，多用于表格记忆功能 [`#640`](https://github.com/ShuyunFF2E/cloud-react/pull/640)
- [Upload] 普通文件上传显示类型图标/onBeforeUpload 支持异步函数/组件内部支持判断可选文件类型/ui 优化 [`#638`](https://github.com/ShuyunFF2E/cloud-react/pull/638)
- Feat v1 modal [`#630`](https://github.com/ShuyunFF2E/cloud-react/pull/630)
- [Message]最大宽度调整为 920 [`#629`](https://github.com/ShuyunFF2E/cloud-react/pull/629)
- 【CPicker】修复大尺寸下时间段选择中间的符号对齐问题 [`#624`](https://github.com/ShuyunFF2E/cloud-react/pull/624)
- fix:input blur 报错 [`#622`](https://github.com/ShuyunFF2E/cloud-react/pull/622)
- 【Button】增加面型按钮【CPicker】校对 UI [`#620`](https://github.com/ShuyunFF2E/cloud-react/pull/620)
- infra:修改发布版本号脚本 [`#615`](https://github.com/ShuyunFF2E/cloud-react/pull/615)
- 【Button、CPicker】按设计稿重新核对样式，更新文档 [`#603`](https://github.com/ShuyunFF2E/cloud-react/pull/603)
- [Message]UI 升级；[Upload]新增图标；[Menu]修复下拉菜单不展示的问题； [`#602`](https://github.com/ShuyunFF2E/cloud-react/pull/602)
- [Input]fix:oncomposition 时输入异常 [`#600`](https://github.com/ShuyunFF2E/cloud-react/pull/600)
- 【Icon 图标】新增多彩图标，更新文档 [`#598`](https://github.com/ShuyunFF2E/cloud-react/pull/598)
- Feat upload [`#595`](https://github.com/ShuyunFF2E/cloud-react/pull/595)
- Fix/table page 0513 [`#594`](https://github.com/ShuyunFF2E/cloud-react/pull/594)
- [Input]fix:bug 修复&UI 优化 [`#593`](https://github.com/ShuyunFF2E/cloud-react/pull/593)
- Feat/cRable 选中行回调添加参数；单选表格报错修改 [`#590`](https://github.com/ShuyunFF2E/cloud-react/pull/590)
- [Tree] 新增 disabled 全局禁用/新增树展开收起动画 [`#589`](https://github.com/ShuyunFF2E/cloud-react/pull/589)
- 【Radio】fix: 修复 radioGroup 组件 disabled，导致单独 radio 无法设置 disabed 问题 [`#587`](https://github.com/ShuyunFF2E/cloud-react/pull/587)
- V1 develop [`#585`](https://github.com/ShuyunFF2E/cloud-react/pull/585)
- V1 develop to V1 master [`#582`](https://github.com/ShuyunFF2E/cloud-react/pull/582)
- Fix/date picker 0910 [`#556`](https://github.com/ShuyunFF2E/cloud-react/pull/556)
- Fix/tree select 0910 [`#555`](https://github.com/ShuyunFF2E/cloud-react/pull/555)
- feat: 表单组件样式更新，增加 size 控制 [`99bb409`](https://github.com/ShuyunFF2E/cloud-react/commit/99bb409e31942c85241cedc18cf8b484e79e45a0)
- fix: 修复关闭按钮兼容问题 [`6cb3964`](https://github.com/ShuyunFF2E/cloud-react/commit/6cb3964b649a5a27cd3f0f6093ae0f2eef4bf200)
- ✨[Upload] 新增 beforeConfirmConfig 配置上传前的确认对话框/拆分 demo/ui 优化 [`e359fb2`](https://github.com/ShuyunFF2E/cloud-react/commit/e359fb2c0e2b976ae34841b967314e475081533e)

#### [v0.1.2](https://github.com/ShuyunFF2E/cloud-react/compare/v0.1.1...v0.1.2)

> 2 September 2021

- [tree-select][tree]大量数据时性能优化 [`1b68ef0`](https://github.com/ShuyunFF2E/cloud-react/commit/1b68ef082b6968e3dfe9944e4841ba469b2ec0f9)
- [Message]新增 option.className 参数 [`4505ba0`](https://github.com/ShuyunFF2E/cloud-react/commit/4505ba05aff6ded93ad3834843d1f9ee5aea9efa)

#### [v0.1.1](https://github.com/ShuyunFF2E/cloud-react/compare/v0.1.0...v0.1.1)

> 27 August 2021

- :bug: [Datepicker] 年月组件设置最大月份和最小月份不生效 [`47649e0`](https://github.com/ShuyunFF2E/cloud-react/commit/47649e0e8f2e35e8cfce11aeed6a4017c592004e)

#### [v0.1.0](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.99...v0.1.0)

> 20 August 2021

- doc 及 babelrc 调整 [`0ca9d12`](https://github.com/ShuyunFF2E/cloud-react/commit/0ca9d12082447ed27e4e4eba21ac531ada3c04d2)
- 将 react 依赖移到 dev [`9ef225a`](https://github.com/ShuyunFF2E/cloud-react/commit/9ef225a0be3b1adee768edae3da9ab8bd88f4a44)
- peerDependencies 调整 [`4a90dad`](https://github.com/ShuyunFF2E/cloud-react/commit/4a90dadd4c0ddc5b9aef6a43e0a58404bc16f5ec)

#### [v0.0.99](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.98...v0.0.99)

> 19 August 2021

- :bug: [InputNumber]blur 执行顺序修改 [`26d452e`](https://github.com/ShuyunFF2E/cloud-react/commit/26d452e97302f8a2a780e5e5bff8df3968326f1f)

#### [v0.0.98](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.97...v0.0.98)

> 29 July 2021

- [Tooltip]:处理滚动元素水平位置的偏移 [`ba615ac`](https://github.com/ShuyunFF2E/cloud-react/commit/ba615ac73f88b15ef84c7fe0e473c4a16c400cab)

#### [v0.0.97](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.96...v0.0.97)

> 13 July 2021

- :sparkles:[Tooltip]增加卡片自定义样式及增加鼠标可移入自 [`e2239bb`](https://github.com/ShuyunFF2E/cloud-react/commit/e2239bb2adb3e25e1488b6dbeedd3be89af9f510)

#### [v0.0.96](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.95...v0.0.96)

> 6 July 2021

- [TableLite]: columnData 变更后不触发 runder 问题修复 [`ed65e36`](https://github.com/ShuyunFF2E/cloud-react/commit/ed65e36a4c6173d61c9dc570e174869fff1592f3)
- confing:eslint,babelrc [`a8a75ff`](https://github.com/ShuyunFF2E/cloud-react/commit/a8a75ffae4d787378a798e52062bd715fcc1d7e8)
- [InputNumber]修改精度取值方法（整数不补零） [`cb52619`](https://github.com/ShuyunFF2E/cloud-react/commit/cb52619087e313c39b6f2b0730904aa9f00ef6b0)

#### [v0.0.95](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.94...v0.0.95)

> 9 June 2021

- [Breadcrumbs]:新增面包屑组件 [`edb3b27`](https://github.com/ShuyunFF2E/cloud-react/commit/edb3b27738e90294467e6b7918c2372f6c1e0d30)

#### [v0.0.94](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.93...v0.0.94)

> 28 May 2021

- ✨ [Upload] 支持在 FormData 中传入额外参数 [`44df19a`](https://github.com/ShuyunFF2E/cloud-react/commit/44df19a17281144710d030e3601cbe71c5e38316)
- :bug: [Input] 表单中只有一个 input 时，回车导致页面刷新 [`68ed661`](https://github.com/ShuyunFF2E/cloud-react/commit/68ed66172ecb35b81de58e0a72fd0d0ea61f1145)

#### [v0.0.93](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.92...v0.0.93)

> 27 May 2021

- :bug: [Datepicker] 输入“1/31”，时间弹窗没有自动同步时间 [`aff5e52`](https://github.com/ShuyunFF2E/cloud-react/commit/aff5e52b8f757e266a6e9f1fe16c5686011fdf23)

#### [v0.0.92](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.92-1...v0.0.92)

> 13 May 2021

- :sparkles: [tree] 增加 breakCheeckbox 属性支持复选框与文字分离 [`f8abd81`](https://github.com/ShuyunFF2E/cloud-react/commit/f8abd81868061e07a22b535527e77d4bf2e4c546)
- 1、新增 copy icon。2、gridmanager-react:1.9.2 [`d3ae68b`](https://github.com/ShuyunFF2E/cloud-react/commit/d3ae68b4d3f72d5e259b2166b1f7aac64f7a115b)

#### [v0.0.92-1](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.91...v0.0.92-1)

> 11 May 2021

- :sparkles: [Upload] 支持在 FormData 中传入额外参数 [`d74d100`](https://github.com/ShuyunFF2E/cloud-react/commit/d74d100e8de9aef0e6a8a0e8fcdd520c172ca4c3)
- merge [`b5cbb59`](https://github.com/ShuyunFF2E/cloud-react/commit/b5cbb5946105ee1539ab74fdffaa338e6aab371d)
- 面包屑功能完成 [`1a6698b`](https://github.com/ShuyunFF2E/cloud-react/commit/1a6698bf62fb16ebab4fc5866365c414dc4f41b2)

#### [v0.0.91](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.90...v0.0.91)

> 22 April 2021

#### [v0.0.90](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.89...v0.0.90)

> 22 April 2021

- [Table]:新增汇总行置底浮动功能 [`d9813aa`](https://github.com/ShuyunFF2E/cloud-react/commit/d9813aa15b92c5033813be571a958e256859e0d8)

#### [v0.0.89](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.89-0...v0.0.89)

> 9 April 2021

- :sparkles:[Modal] Modal.methods 类型组件新增`okText`,`cancelText`字段 [`f51cbf5`](https://github.com/ShuyunFF2E/cloud-react/commit/f51cbf5363968df0ee7ffba9b894562adf23dde8)

#### [v0.0.89-0](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.88-2...v0.0.89-0)

> 7 April 2021

- merge feature/modal [`60564c4`](https://github.com/ShuyunFF2E/cloud-react/commit/60564c4bb34461c92c2a64fe1b63e4e90f342bf5)
- [datepicker]支持手动输入时间 [`b7b2359`](https://github.com/ShuyunFF2E/cloud-react/commit/b7b2359a97105248f65b6844ffa1bd7f3d44a216)
- [datepicker]支持手动输入时间 [`e7f9041`](https://github.com/ShuyunFF2E/cloud-react/commit/e7f9041cd735f931f9d65e1c4130ca6d90f7969f)

#### [v0.0.88-2](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.88-1...v0.0.88-2)

> 22 March 2021

- :sparkles: [tree] 增加 breakCheeckbox 属性支持复选框与文字分离 [`b7e2823`](https://github.com/ShuyunFF2E/cloud-react/commit/b7e2823fb93e0a2d24b546e5ef03ebbb25f75500)

#### [v0.0.88-1](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.87...v0.0.88-1)

> 22 March 2021

- [datepicker]支持手动输入时间 [`6012da3`](https://github.com/ShuyunFF2E/cloud-react/commit/6012da346b3825a355b7134e271f6ceabe55c6ea)
- ✨ [Layout] 页面整体布局组件完成 [`072dc98`](https://github.com/ShuyunFF2E/cloud-react/commit/072dc981e7b919e06339f4872c65e5f24099482f)
- ✨ 移除整体布局，只保留 flex 相关 [`a9063d9`](https://github.com/ShuyunFF2E/cloud-react/commit/a9063d962d43e4ead6b111663dd30f949492dab8)

#### [v0.0.87](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.86...v0.0.87)

> 11 January 2021

- :bug: [Tree] fix bug [`a6d6e5d`](https://github.com/ShuyunFF2E/cloud-react/commit/a6d6e5da596d037a8ce5abe9c7ea3f5bb31bd5c5)

#### [v0.0.86](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.85...v0.0.86)

> 5 January 2021

- ✨ [Upload] 新增 onClick 事件 [`c91f009`](https://github.com/ShuyunFF2E/cloud-react/commit/c91f00913444cda75d6d2a2302bed49165622aa3)
- ⬆️ gridmanager-react@1.7.18 [`6139fb5`](https://github.com/ShuyunFF2E/cloud-react/commit/6139fb571478c6653d277c7050041b701d3ebdb5)

#### [v0.0.85](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.84...v0.0.85)

> 28 December 2020

- :lipstick: :bug: [tree]调整样式,修复 bug,增加 breakCheckbox 属性与 showErrMsg 属性 [`e8d2043`](https://github.com/ShuyunFF2E/cloud-react/commit/e8d20432d5ec6d6b110a2e7d429eb329a397bd26)

#### [v0.0.84](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.83...v0.0.84)

> 22 December 2020

- :bug: [table] 分页样式调整 [`0dbbedd`](https://github.com/ShuyunFF2E/cloud-react/commit/0dbbedd11901152557c161145e9d676ebbf92a49)

#### [v0.0.83](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.83-4...v0.0.83)

> 22 December 2020

- ✨ [tree] 增加多选可筛选功能 [`2f4fe52`](https://github.com/ShuyunFF2E/cloud-react/commit/2f4fe52edb8f9ad7b5a3468d06de8caf0342c9d3)
- :bug:[table-lite] 数据为空时样式调整 [`7db59ca`](https://github.com/ShuyunFF2E/cloud-react/commit/7db59ca5d2761af748df24221c0da924b8a69019)
- 🐛 [table-lite] 增加父容器不可见情况下的处理 [`1cb79a4`](https://github.com/ShuyunFF2E/cloud-react/commit/1cb79a480340196ed671076c7105e6fb4ea997d5)

#### [v0.0.83-4](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.83-3...v0.0.83-4)

> 14 December 2020

- 代码合并 [`7b28ba1`](https://github.com/ShuyunFF2E/cloud-react/commit/7b28ba13b858d526e1a8a6f15376eeabb04dbdc7)
- [tree]增加多选可筛选功能 [`b31bd2a`](https://github.com/ShuyunFF2E/cloud-react/commit/b31bd2af520b6686618dff9ebeeade688a35a021)

#### [v0.0.83-3](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.82...v0.0.83-3)

> 11 December 2020

- [tree]代码冲突合并 [`09b8447`](https://github.com/ShuyunFF2E/cloud-react/commit/09b84479a10084e3411a88174fbcb97f73a7ea00)
- 抽离皮肤文件 [`933cd52`](https://github.com/ShuyunFF2E/cloud-react/commit/933cd52ea40903ea1621cb5af2b1d2a3ac03e267)
- :lipstick: 调整 css 变量 [`4d1e722`](https://github.com/ShuyunFF2E/cloud-react/commit/4d1e72253ca134fd994fe7e0f18095367b621fb7)

#### [v0.0.82](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.81...v0.0.82)

> 23 November 2020

- :sparkles:[upload]添加多个上传统一一个上传精度参数 [`c2d3345`](https://github.com/ShuyunFF2E/cloud-react/commit/c2d3345e9c9bf2fb869ad5851c9bac7779c7ed07)
- :bug:[upload]修改上传异常时，未对原数据处理，导致不能触发 change 事件 [`e882e43`](https://github.com/ShuyunFF2E/cloud-react/commit/e882e43c5390707849f0587d263c4c0009994acd)
- ⬆️ gridmanager-react@1.7.15 [`ae6fa3d`](https://github.com/ShuyunFF2E/cloud-react/commit/ae6fa3d298215b6d01ec166128229a3f6a39a02e)

#### [v0.0.81](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.81-5...v0.0.81)

> 26 October 2020

#### [v0.0.81-5](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.81-3...v0.0.81-5)

> 20 November 2020

- :sparkles:[uploadi]添加多个上传统一一个上传精度参数 [`e97a662`](https://github.com/ShuyunFF2E/cloud-react/commit/e97a662c61face6d870b0034d3615c3dceca1b6e)
- :bug:[upload]修改上传异常时，未对原数据处理，导致不能触发 change 事件 [`152b8ac`](https://github.com/ShuyunFF2E/cloud-react/commit/152b8acdc851a5074f8007a2d2e2189601822627)
- 解决冲突 [`843986b`](https://github.com/ShuyunFF2E/cloud-react/commit/843986b2bb07dd45eb751cc4d54bdce999719d05)

#### [v0.0.81-3](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.81-2...v0.0.81-3)

> 23 October 2020

- :art: [Select] 修改选项禁用状态的字体颜色 [`1430a57`](https://github.com/ShuyunFF2E/cloud-react/commit/1430a5706b35b82d56da3c9ebee69df72261eb1e)

#### [v0.0.81-2](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.80...v0.0.81-2)

> 22 October 2020

- 🐛 [Datepicker] 修复日期选择器点击日历图标打开选择器无法关闭的问题 [`4fdd65e`](https://github.com/ShuyunFF2E/cloud-react/commit/4fdd65e5e0f3d8ee0d1466de47623dcb11f85538)
- 调整 table 依赖 [`f6aae5e`](https://github.com/ShuyunFF2E/cloud-react/commit/f6aae5e235653c8bf1a6b1ce75467e15488c3a76)
- 抽离皮肤文件 [`933cd52`](https://github.com/ShuyunFF2E/cloud-react/commit/933cd52ea40903ea1621cb5af2b1d2a3ac03e267)

#### [v0.0.80](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.80-1...v0.0.80)

> 20 October 2020

- 📌 固定 dependencies libs 版本 [`89be360`](https://github.com/ShuyunFF2E/cloud-react/commit/89be360c73a9860552e745d88bf3461b186c2697)

#### [v0.0.80-1](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.80-0...v0.0.80-1)

> 20 October 2020

- :bug: [tree][tree-select] 修复 tree 组件中数据为空时 ref 报错问题 [`a1680e5`](https://github.com/ShuyunFF2E/cloud-react/commit/a1680e58ee35531e889e441413960f48aa4c4f0a)
- :bug: [tree][tree-select] 修复 tree 组件中数据为空时 ref 报错问题 [`30b78a8`](https://github.com/ShuyunFF2E/cloud-react/commit/30b78a8380706accc703094694ab4479c5ec6038)
- :art: [Select] 鼠标 hover 显示完整内容支持配置 [`80a35b6`](https://github.com/ShuyunFF2E/cloud-react/commit/80a35b6782b287f2308c7f0496a79018192f1261)

#### [v0.0.80-0](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.79...v0.0.80-0)

> 19 October 2020

- 抽离皮肤文件 [`933cd52`](https://github.com/ShuyunFF2E/cloud-react/commit/933cd52ea40903ea1621cb5af2b1d2a3ac03e267)
- ✅ [Datepicker] 添加 DatePicker 单元测试 [`ffda1d1`](https://github.com/ShuyunFF2E/cloud-react/commit/ffda1d15666b00ccee91b7e33384fa2df4862781)
- ✅ [Datepicker] 添加 DatePicker 单元测试 [`3b4173a`](https://github.com/ShuyunFF2E/cloud-react/commit/3b4173acca62f2b9e5149883c5ecb3fa316896e6)

#### [v0.0.79](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.79-7...v0.0.79)

> 20 October 2020

- :bug: [tree][tree-select] 修复 tree 组件中数据为空时 ref 报错问题 [`a1680e5`](https://github.com/ShuyunFF2E/cloud-react/commit/a1680e58ee35531e889e441413960f48aa4c4f0a)

#### [v0.0.79-7](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.79-0...v0.0.79-7)

> 19 October 2020

- ✅ [Datepicker] 添加 DatePicker 单元测试 [`348cfde`](https://github.com/ShuyunFF2E/cloud-react/commit/348cfde10423b7f2898a796db3277e6889ce02d3)
- ✅ [Datepicker] 添加 MonthDayPicker 单元测试 [`8b26fcd`](https://github.com/ShuyunFF2E/cloud-react/commit/8b26fcdac1bd93345f758a8123b04d5d9288ebf3)
- ✅ [Datepicker] YearMonthPicker 添加单元测试 [`438d7cb`](https://github.com/ShuyunFF2E/cloud-react/commit/438d7cbbaf8c110d12262ea7fb37850230315209)

#### [v0.0.79-0](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.78...v0.0.79-0)

> 30 September 2020

- 抽离皮肤文件 [`933cd52`](https://github.com/ShuyunFF2E/cloud-react/commit/933cd52ea40903ea1621cb5af2b1d2a3ac03e267)
- :bug:[Form]修复表单项校验状态下日期组件内部的下拉框样式会受到影响 bug [`06377dd`](https://github.com/ShuyunFF2E/cloud-react/commit/06377dd72513aef15579d4bb082eaf97791ac428)
- ✅ [Datepicker] 添加 DatePicker 单元测试 [`ffda1d1`](https://github.com/ShuyunFF2E/cloud-react/commit/ffda1d15666b00ccee91b7e33384fa2df4862781)

#### [v0.0.78](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.78-6...v0.0.78)

> 28 August 2020

- :lipstick: [Tree]调整 tree 样式 [`70818b5`](https://github.com/ShuyunFF2E/cloud-react/commit/70818b509cd227c466a3b5e33648585261a5f4b4)
- :lipstick: [Tree]调整固定宽度时 tooltip 显示问题,优化样式 [`8055760`](https://github.com/ShuyunFF2E/cloud-react/commit/80557609093d979161623a055b1996b75ccf647f)
- :lipstick: 增加全局自定义滚动条样式 [`4189201`](https://github.com/ShuyunFF2E/cloud-react/commit/4189201a021e1c71816032ebca2eafaed04d7e1a)

#### [v0.0.78-6](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.78-3...v0.0.78-6)

> 27 August 2020

- :lipstick: [Tree]调整固定宽度时 tooltip 显示问题,优化样式 [`1a540af`](https://github.com/ShuyunFF2E/cloud-react/commit/1a540afde2c71e7e71f28df2086a844d67fac5ed)
- :sparkles:[toolTip]支持鼠标移入到提示内容，鼠标离开提示内容消失 [`79fcb4e`](https://github.com/ShuyunFF2E/cloud-react/commit/79fcb4e0371d104952ccf277ef7385de846b0484)
- :lipstick: 增加全局自定义滚动条样式 [`20c90db`](https://github.com/ShuyunFF2E/cloud-react/commit/20c90db75bb0622a6f454b3847ab531d907868d3)

#### [v0.0.78-3](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.78-2...v0.0.78-3)

> 21 August 2020

- :bug: [Select] 下拉带图标，图标显示异常 [`846b64b`](https://github.com/ShuyunFF2E/cloud-react/commit/846b64ba78f07b04fee066654193db23f3319410)

#### [v0.0.78-2](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.78-0...v0.0.78-2)

> 20 August 2020

- ✅ [Datepicker] 添加 DatePicker 单元测试 [`ffda1d1`](https://github.com/ShuyunFF2E/cloud-react/commit/ffda1d15666b00ccee91b7e33384fa2df4862781)
- ✅ [Datepicker] 添加 MonthDayPicker 单元测试 [`14ac4bb`](https://github.com/ShuyunFF2E/cloud-react/commit/14ac4bb1ff50f87c47e2ad8d3c4737f9de90e6c4)
- ✅ [Datepicker] YearMonthPicker 添加单元测试 [`49f74f6`](https://github.com/ShuyunFF2E/cloud-react/commit/49f74f6baf851d22fc53b461e9366f1db32bba99)

#### [v0.0.78-0](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.77...v0.0.78-0)

> 13 August 2020

- :sparkles:[Modal]弹框组件新增静态属性 ConfigProvider [`be36c35`](https://github.com/ShuyunFF2E/cloud-react/commit/be36c35b28f5a5e269fff1f80420f3939a24492e)
- ✅ [Datepicker] 添加 DatePicker 单元测试 [`3b4173a`](https://github.com/ShuyunFF2E/cloud-react/commit/3b4173acca62f2b9e5149883c5ecb3fa316896e6)
- ✅ [Datepicker] 添加 MonthDayPicker 单元测试 [`ffa3c16`](https://github.com/ShuyunFF2E/cloud-react/commit/ffa3c1639fa21c30bb6d58848220a2ea53af1c20)

#### [v0.0.77](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76...v0.0.77)

> 11 August 2020

- :sparkles: [Tree]增加拖拽功能,增加弹框形式菜单,增加双击事件 [`ab6097f`](https://github.com/ShuyunFF2E/cloud-react/commit/ab6097f080257e6225d07d5be5085250667389ea)
- ✅[Form, Field] add unit test [`8d6c7f3`](https://github.com/ShuyunFF2E/cloud-react/commit/8d6c7f39b096111f7eed1d6b7ab0d54d9c6f1717)
- :lipstick:[Site]修改组件库文档样式 [`11e01b8`](https://github.com/ShuyunFF2E/cloud-react/commit/11e01b8a746ebc5aa97e8033a212aed55fc99a74)

#### [v0.0.76](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-15...v0.0.76)

> 29 July 2020

- ✅ [TreeSelect] 添加单元测试 [`b35464c`](https://github.com/ShuyunFF2E/cloud-react/commit/b35464c30be2de630be77733da6ad48ce7b264df)
- ✅ [Modal] 添加单元测试 [`d39c2e2`](https://github.com/ShuyunFF2E/cloud-react/commit/d39c2e2baab0fc28d71d13a73fbb44b2ba903bb0)
- :art: ✅ [Modal] 修改 eslint 警告 [`df55812`](https://github.com/ShuyunFF2E/cloud-react/commit/df5581288e120eda5caa75f2d6f25f93a5ff8e43)

#### [v0.0.76-15](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-13...v0.0.76-15)

> 27 July 2020

- 解决合并冲突 [`fe5883f`](https://github.com/ShuyunFF2E/cloud-react/commit/fe5883fdfdeffbb49322de4357cd2569717b12f7)
- :sparkles: [Tree]增加拖拽功能,增加弹框形式菜单,增加双击事件 [`7ef3546`](https://github.com/ShuyunFF2E/cloud-react/commit/7ef3546f07fe78453b92903d4ce33e3cb8c41a3e)
- :sparkles: [Tree]增加拖拽功能,增加弹框形式菜单,增加双击事件 [`e6d6015`](https://github.com/ShuyunFF2E/cloud-react/commit/e6d60154ca8297bc8664cb32c3c0328527fd08d3)

#### [v0.0.76-13](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-10...v0.0.76-13)

> 22 July 2020

- table 依赖库:0.5.6-1 [`b4facf8`](https://github.com/ShuyunFF2E/cloud-react/commit/b4facf857f68e4a0ca054213693e1f88aa966280)
- 更新 table 依赖包版本 [`6892c21`](https://github.com/ShuyunFF2E/cloud-react/commit/6892c214a9ab8b78fa9fbe55fb2cbdc41a171f20)
- table 新增功能: tr tooltip, 嵌套表头、tr 折叠 [`0238bbb`](https://github.com/ShuyunFF2E/cloud-react/commit/0238bbb161716e320df7f80d68b79d03c9cd419f)

#### [v0.0.76-10](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-9...v0.0.76-10)

> 22 July 2020

- ✅ [TreeSelect] 添加单元测试 [`cd48e62`](https://github.com/ShuyunFF2E/cloud-react/commit/cd48e62c93dc5a526fd78487a6aa4f3700823988)
- ✅ [Tooltip] 添加单元测试 [`16e569d`](https://github.com/ShuyunFF2E/cloud-react/commit/16e569d1611e639a3a838671f74d9206ab957906)
- :art::fire:[Modal]移除 Modal.ConfigProvider,新增全局通用 ContextProvider 和相关说明文档 [`6810a1c`](https://github.com/ShuyunFF2E/cloud-react/commit/6810a1c3ef5a98ee982c9c4f0e7bb12d198b85c2)

#### [v0.0.76-9](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-8...v0.0.76-9)

> 21 July 2020

- :art: [Message] 修改 Message 组件淡入效果时间 [`#459`](https://github.com/ShuyunFF2E/cloud-react/pull/459)
- ✨ [Select] 普通单选树添加点击选项返回原始数据 [`76e69ec`](https://github.com/ShuyunFF2E/cloud-react/commit/76e69ec50b5a10c1eb5da7d047dfe0e85a6f46de)
- 🚑 [tooltip] 还原在 iframe 下插入到 body 的使用场景 [`7e80514`](https://github.com/ShuyunFF2E/cloud-react/commit/7e80514e83d6d7cdf3df6894d2ffb1aa2ae0d19d)
- 🐛 [tooltip] timeout 需要清空，否则会引起内存泄漏 [`73e3138`](https://github.com/ShuyunFF2E/cloud-react/commit/73e3138edcd6207f8949621ddb2e4f8da3511273)

#### [v0.0.76-8](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-7...v0.0.76-8)

> 17 July 2020

- ✅ [TreeSelect] 添加单元测试 [`5e95e36`](https://github.com/ShuyunFF2E/cloud-react/commit/5e95e365f25811dea2be60f4c7f546e6da89e732)
- ✅ [Modal] 添加单元测试 [`d709a23`](https://github.com/ShuyunFF2E/cloud-react/commit/d709a23b1b0db79b1684e1a71ffff5e20062ce9c)
- ✅ [Select] 添加单元测试 [`eeccb35`](https://github.com/ShuyunFF2E/cloud-react/commit/eeccb3554c5173de7fcc84ad3c3ca6ca2299b94e)

#### [v0.0.76-7](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-6...v0.0.76-7)

> 13 July 2020

- 解决冲突 [`b26ad66`](https://github.com/ShuyunFF2E/cloud-react/commit/b26ad664fe2892a7fa174f1d4b611f5aaf5bbaa9)
- ✅ [Select] 添加单元测试 [`0081318`](https://github.com/ShuyunFF2E/cloud-react/commit/008131842f981762f23e7bdc780b62e188132577)
- ✅ [Tabs] 添加单元测试 [`9c1effe`](https://github.com/ShuyunFF2E/cloud-react/commit/9c1effe7f48ed7f60873566878a312fe1e0bf33b)

#### [v0.0.76-6](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-5...v0.0.76-6)

> 9 July 2020

- ✅ [Pagination] 添加单元测试 [`3acac17`](https://github.com/ShuyunFF2E/cloud-react/commit/3acac17ee58ac31e17314dba0b8618a59006d5d3)
- ✅ [Pagination] 添加单元测试 [`fcdae4a`](https://github.com/ShuyunFF2E/cloud-react/commit/fcdae4a310091176ad6eb1fa2ca77c090d43d159)
- 🐛 [InputNumber] value 初始值为空问题修复 [`1f5085d`](https://github.com/ShuyunFF2E/cloud-react/commit/1f5085d2577658cd0c0c2cc97cb888ebca2a40dd)

#### [v0.0.76-5](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-3...v0.0.76-5)

> 6 July 2020

- :sparkles: [upload 组件]增加上传前提示功能，确认后开始上传 [`bf3337e`](https://github.com/ShuyunFF2E/cloud-react/commit/bf3337e47986298f71bb298a6b8a3ee4609214f8)
- :bug:[Modal]修复弹框组件在 iframe 场景下基础组件不在隔离容器内问题 [`8b0a937`](https://github.com/ShuyunFF2E/cloud-react/commit/8b0a937046a0e2c1c18d6c20f14be2aa3990b404)
- :bug:[Tooltip]修复 content 值渲染方式异常问题 [`549e747`](https://github.com/ShuyunFF2E/cloud-react/commit/549e74750c7d068697596b7353d639d6da2b9ca8)

#### [v0.0.76-3](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-2...v0.0.76-3)

> 3 July 2020

- :bug:[Tooltip]修复 content 值渲染方式异常问题 [`e1e3569`](https://github.com/ShuyunFF2E/cloud-react/commit/e1e35693804c37081cdac856e33322a7bba8531b)

#### [v0.0.76-2](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-1...v0.0.76-2)

> 3 July 2020

- 🔨 [pagination] 打包还原 [`283df84`](https://github.com/ShuyunFF2E/cloud-react/commit/283df84ea71e6c33edf42c1598efb73cd589d52a)

#### [v0.0.76-1](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.76-0...v0.0.76-1)

> 2 July 2020

- :bug:[Modal]修复弹框组件在 iframe 场景下基础组件不在隔离容器内问题 [`5e8f8f5`](https://github.com/ShuyunFF2E/cloud-react/commit/5e8f8f59b3fc9f9df2b2971ed8e5c21de36636d0)

#### [v0.0.76-0](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.75...v0.0.76-0)

> 2 July 2020

- :bug:[Modal]修复弹框组件在 iframe 场景下基础组件不在隔离容器内问题 [`ec06428`](https://github.com/ShuyunFF2E/cloud-react/commit/ec064282b8adba71d93e9db67f99f9a33abf901c)
- :bug:[Modal]修复弹框组件在 iframe 场景下基础组件不在隔离容器内问题 [`7e04fb7`](https://github.com/ShuyunFF2E/cloud-react/commit/7e04fb7058bc7c6e4984b766dffd3cef8ee13b45)

#### [v0.0.75](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.74...v0.0.75)

> 2 July 2020

- ⚡️ ✅ [TableLite] 轻量表格及单元测试完成 [`32ec6fc`](https://github.com/ShuyunFF2E/cloud-react/commit/32ec6fcb8ad021836e8eeedbd19c3471d39a9a9f)
- ✅♻️ [InputNumber] unit test done & refactor some code [`701cf1e`](https://github.com/ShuyunFF2E/cloud-react/commit/701cf1ec027bcdd04f4cc64d6c654acc5df9ce43)
- :hammer:[Tolltip]优化 Tooltip 实现方式,废弃 container 和 clear API,新增 className API,content 支持 ReactNode 和普通 HTML 方式 [`81d1047`](https://github.com/ShuyunFF2E/cloud-react/commit/81d1047e0ece928821a1ecb0c536370c503e11a1)

#### [v0.0.74](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.73...v0.0.74)

> 28 June 2020

- ✅ [Input] 添加单元测试 [`289b9ff`](https://github.com/ShuyunFF2E/cloud-react/commit/289b9ff58a55bcb4bdd06d931d65a75a25cef31a)
- ✅ [Tips] 添加单元测试 [`b3a1fc5`](https://github.com/ShuyunFF2E/cloud-react/commit/b3a1fc560a1922cf8d7cd29b50df2e42c433d980)

#### [v0.0.73](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.72...v0.0.73)

> 22 June 2020

- ✅ [Checkbox] 添加单元测试 [`0c89cbe`](https://github.com/ShuyunFF2E/cloud-react/commit/0c89cbedc79b57f64b8720f516edf35b7abf1070)
- ✅ [Button] 单元测试 done [`1d52be4`](https://github.com/ShuyunFF2E/cloud-react/commit/1d52be49be21ce9a3ef9c38526ca83a5a06bc872)
- ✅ [Toggle] unit test done [`f73ef6b`](https://github.com/ShuyunFF2E/cloud-react/commit/f73ef6b7cfba8241e5e3eaedae00d363b29cf5fd)

#### [v0.0.72](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.71...v0.0.72)

> 17 June 2020

- ✅ 单元测试基础框架添加 [`dcdf7d8`](https://github.com/ShuyunFF2E/cloud-react/commit/dcdf7d883032fbd14965f6a2b811d887f0cfe05d)
- :art: [Tree][TreeSelect] 样式和交互优化 [`e626cd7`](https://github.com/ShuyunFF2E/cloud-react/commit/e626cd78e0d481c467a6c373308795dc45e69efd)
- :sparkles: [Select] 添加 isAppendToBody/position 属性，删除 getPopupContainer [`d51451d`](https://github.com/ShuyunFF2E/cloud-react/commit/d51451d4cef6e10b8063c1a96d2aac3dc1f54a14)

#### [v0.0.71](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.70...v0.0.71)

> 9 June 2020

- ✨ [upload] 解决自定义样式不生效问题；增加 disabled 样式；完善文档 [`46a3a1a`](https://github.com/ShuyunFF2E/cloud-react/commit/46a3a1a7e472206ef259ce0aeaa6e03c4c166ed0)
- ♻️ 使用 shuyunUtils 替换 jeasy [`8a52f08`](https://github.com/ShuyunFF2E/cloud-react/commit/8a52f080a01e7e3f7860f87d6e9cb76acbad6ca8)
- 📝 组件创建 issue 模版更新 [`8e89851`](https://github.com/ShuyunFF2E/cloud-react/commit/8e89851fbea9c18632262b348046898c40b4c032)

#### [v0.0.70](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.69...v0.0.70)

> 3 June 2020

- 💄[Icon] 更新 icon 图标，增加 remark [`d3b8a5f`](https://github.com/ShuyunFF2E/cloud-react/commit/d3b8a5f8eea5cd9e2a5d35bd680567d7080aa441)
- 🐛[toolTip]修改 tooltip 定位问题，container 增加类名选择 [`eb4f7b3`](https://github.com/ShuyunFF2E/cloud-react/commit/eb4f7b3cec83b319fe1214fd349954edaa47748a)
- :bug:[Datepicker.Rangepicker] 修复 Rangepicker 在多次动态渲染的复杂场景下计算 prevProps 和 props 不准确问题; [`eed3994`](https://github.com/ShuyunFF2E/cloud-react/commit/eed3994a24060e9a19fedf637571ea9614ea5d0a)

#### [v0.0.69](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.68...v0.0.69)

> 21 May 2020

- :recycle: 【Datepicker】日历组件重构完成 [`c5231be`](https://github.com/ShuyunFF2E/cloud-react/commit/c5231be5f7801e1073e203690af7896be8939adb)
- :recycle: [Datepicker] 提取公共的 picker 外部包裹 [`b418eb2`](https://github.com/ShuyunFF2E/cloud-react/commit/b418eb2f2bfbfbf1b7ffd292bed543a9a691fb93)
- :recycle: [Datepicker] 分离 utils 工具函数与 constant 常量 [`d6d58a2`](https://github.com/ShuyunFF2E/cloud-react/commit/d6d58a2c2f1cc94a85a52eb98921593312ee380c)

#### [v0.0.68](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.67...v0.0.68)

> 15 May 2020

- :bug: [InputNumber] 修复在 form 中使用元素移除未清除校验问题 [`bd7de11`](https://github.com/ShuyunFF2E/cloud-react/commit/bd7de113d4aa8993de92e71000fd1f3bab97eea6)

#### [v0.0.67](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.66...v0.0.67)

> 7 May 2020

- 更新 icon 图片 [`d4c13ac`](https://github.com/ShuyunFF2E/cloud-react/commit/d4c13ac8dca685129d362ac187b7809c69bf5e8c)
- :art: [Tree] 提示文案调整 [`3d12f14`](https://github.com/ShuyunFF2E/cloud-react/commit/3d12f14b9d78ceb651167d6969f952c714ab52c0)

#### [v0.0.66](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.65...v0.0.66)

> 6 May 2020

- :see_no_evil: 忽略 package-lock.json 文件提交 [`1cb4e5a`](https://github.com/ShuyunFF2E/cloud-react/commit/1cb4e5a67b9be06d525e299da850189c6e209f92)
- :art: 统一格式化代码风格 [`93fc51b`](https://github.com/ShuyunFF2E/cloud-react/commit/93fc51b50fbc230b072e7f99e9fcc6ec811e8000)
- :recycle: [InputNumber] refactor to class component [`dc7e949`](https://github.com/ShuyunFF2E/cloud-react/commit/dc7e9495c157f4f2b57d4ff796fe1e9e5fa65fe0)

#### [v0.0.65](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.64...v0.0.65)

> 21 April 2020

- :bug: [Tabs] tab 设置 mode="remain" 时报错 [`9377aad`](https://github.com/ShuyunFF2E/cloud-react/commit/9377aadabcbcfc5711d161503018fb219fbc2158)

#### [v0.0.64](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.63...v0.0.64)

> 21 April 2020

- :sparkles: [Modal]新增 iframe 嵌套时且在不跨域的情况将 Modal 挂载到可访问最高层窗口的 body 节点上 [`19f7799`](https://github.com/ShuyunFF2E/cloud-react/commit/19f7799b32ed05d0e76e0d7e9d24db74505d5f05)
- :arrow_up: 升级 gridmanager-react =&gt; 0.4.4 [`2d1faaa`](https://github.com/ShuyunFF2E/cloud-react/commit/2d1faaa4b7e44fe8615ea242648dd3af1209a946)
- :sparkles: [Tabs] 添加参数 tabBarStyle(设置 tab header 样式) 和 fixed(tab 是否固定左侧) [`ca7f7a9`](https://github.com/ShuyunFF2E/cloud-react/commit/ca7f7a9352739dc4dfb17f846b2c81597783ac35)

#### [v0.0.63](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.62...v0.0.63)

> 16 April 2020

- :recycle: refactor 工具 utils 使用 [`47c5f3e`](https://github.com/ShuyunFF2E/cloud-react/commit/47c5f3ec08d7d0bc35556b9856480e678cf5917d)
- :art: 统一格式化代码 [`0c26f15`](https://github.com/ShuyunFF2E/cloud-react/commit/0c26f150f2ad4b80e34654d2298ca4ba4f9613e6)
- :lipstick: 提取公共色值 [`3a203d4`](https://github.com/ShuyunFF2E/cloud-react/commit/3a203d40f401e93703264830f8bae1b982cd3d92)

#### [v0.0.62](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.61...v0.0.62)

> 14 April 2020

- :bug: [Input] 修复 onBlur 事件失效 bug [`593429a`](https://github.com/ShuyunFF2E/cloud-react/commit/593429a72318a374cb5c57db59c59b65f8fcd5d6)

#### [v0.0.61](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.60...v0.0.61)

> 14 April 2020

- :ambulance: [Form.Item]组件新增内容销毁时同时销毁已经注册的 Field 字段 [`a290c16`](https://github.com/ShuyunFF2E/cloud-react/commit/a290c16da840f74f43f84ca5fb9ab2412b4d3e1c)
- :bug: [Datepicker] 显示 input 添加高度 [`3bbd291`](https://github.com/ShuyunFF2E/cloud-react/commit/3bbd291f8f0e799dc670409c53f3dcec700b68ec)
- 💄 [Datepicker] 1.popup 位置偏移问题 2.input 背景色继承问题 [`23511e4`](https://github.com/ShuyunFF2E/cloud-react/commit/23511e4a1eccaab4d6bb10bf5fa5b5c5c0498339)

#### [v0.0.60](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.59...v0.0.60)

> 13 April 2020

- :bug:[Input] 修复组件在设置了[hasClear,hasCounter,prefix,suffix]相关字段时输入的内容会出现跟这些字段的内容重叠问题 [`292b9b8`](https://github.com/ShuyunFF2E/cloud-react/commit/292b9b8377f5ea1fd5b3d77ad34dc460e6b53705)
- :sparkles: [Select] 完善 hover 触发的下拉框交互 [`4266117`](https://github.com/ShuyunFF2E/cloud-react/commit/426611702e437511c27145a9f2f01e6838ba27f4)

#### [v0.0.59](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.58...v0.0.59)

> 9 April 2020

- :lipstick:[Tree] 调整 icon 大小，增加禁止用户选择样式，不设置右键菜单时使用浏览器菜单，只监听 selectedValue 状态改变 [`4a011cd`](https://github.com/ShuyunFF2E/cloud-react/commit/4a011cdab27c7d8cb1da34de2b6aa7e6c23faed7)

#### [v0.0.58](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.57...v0.0.58)

> 8 April 2020

- :bug:[Tree]修复节点 id 或 pId 为 0 的时选择或回显状态错乱问题 [`572f149`](https://github.com/ShuyunFF2E/cloud-react/commit/572f149193478f5e469a933afc741248fed04e4f)

#### [v0.0.57](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.56...v0.0.57)

> 8 April 2020

- :poop:[Tree]默认不展示节点前面的图标, 兼容无数据状态 [`b62d705`](https://github.com/ShuyunFF2E/cloud-react/commit/b62d705278dae31baa6bab1849924f54a4620e6e)
- 🐛 [Datepicker] 1. TP in field 2. Datepicker 超出 [`7efefd0`](https://github.com/ShuyunFF2E/cloud-react/commit/7efefd0345805ba9be88573f801d6d5f5ecf1c1b)
- :sparkles: [TreeSelect] 添加 footer 按钮配置/添加重置按钮/添加是否所选节点包含父节点 [`e4bd067`](https://github.com/ShuyunFF2E/cloud-react/commit/e4bd06704081dfefe65a7884e7636d255b9b3ec9)

#### [v0.0.56](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.55...v0.0.56)

> 6 April 2020

- :bug:[Tree]修复搜索特殊字符报错问题，增加搜索结果为空提示 [`37c6582`](https://github.com/ShuyunFF2E/cloud-react/commit/37c6582825183b039bdace2944e9e6e6466474f2)
- :bug: [Form] 新增独立组件内部使用 Field.init 注册表单连接器 [`09df8af`](https://github.com/ShuyunFF2E/cloud-react/commit/09df8af0351f22a26a0dda9c802d9f615be3e1b5)
- 🐛 [Datepicker] fix 年份超出可选问题 [`fc5fe61`](https://github.com/ShuyunFF2E/cloud-react/commit/fc5fe6179c18e03417a46dc15276b876f1cfb73e)

#### [v0.0.55](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.54...v0.0.55)

> 3 April 2020

- :bug: [Checkbox/Select] 修复 Checkbox 样式，修复 Select 自动定位到已选 [`29f6df0`](https://github.com/ShuyunFF2E/cloud-react/commit/29f6df0cada50557f53c65a406c6cdb6bc4d39c4)

#### [v0.0.54](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.53...v0.0.54)

> 3 April 2020

- :sparkles: [Modal]增加 disabledOk 属性，用于禁止点击确认按钮 [`bb6afcc`](https://github.com/ShuyunFF2E/cloud-react/commit/bb6afcc627b3160d09b20b241cfdc9f0b14d020c)
- :art: [Select] 带确定带多选下拉组件，修改滚动样式 [`60548f7`](https://github.com/ShuyunFF2E/cloud-react/commit/60548f7c4f22f19442611a54b310babf402d50a1)
- ✨ [InputNumber] 添加取消步数器属性 [`afab7a6`](https://github.com/ShuyunFF2E/cloud-react/commit/afab7a6b0d7a35f6b178cb7c8d37953f58bcb9e8)

#### [v0.0.53](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.52...v0.0.53)

> 1 April 2020

- fix: issue: #240 样式和交互 [`b285d3f`](https://github.com/ShuyunFF2E/cloud-react/commit/b285d3f4168621c98f4c2c495a0d3911be7182a7)
- fix: inputNumber 字号继承 [`b62c22e`](https://github.com/ShuyunFF2E/cloud-react/commit/b62c22e5a104f822ad3135e2dddad6eb87f4c64c)
- fix:1.#234 initValue 没有正确初始化值 2.defaultValue 置空 [`7ec33be`](https://github.com/ShuyunFF2E/cloud-react/commit/7ec33be735b2f9538d662b8dfff245db6e9b611e)

#### [v0.0.52](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.51...v0.0.52)

> 31 March 2020

- :bug:[Tree]修复已知 bug，优化样式，增加新属性 [`cab6985`](https://github.com/ShuyunFF2E/cloud-react/commit/cab698522928081720430ac806ca508408b7c2d8)
- :sparkles: [Field] 添加 clear 清空方法 [`a5102a6`](https://github.com/ShuyunFF2E/cloud-react/commit/a5102a6eb1e69995232e4f491740d3a104ab63e4)
- :lipstick:[Tree]调整节点 UI 样式，解决位置偏移问题 [`0053a3f`](https://github.com/ShuyunFF2E/cloud-react/commit/0053a3fd942d16285bc9d80fae9776013aa3e4c8)

#### [v0.0.51](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.50...v0.0.51)

> 31 March 2020

- :sparkles: [TreeSelect] 添加 dropdownStyle 及 dropdownClassName [`e29cea2`](https://github.com/ShuyunFF2E/cloud-react/commit/e29cea22441a92d0f120b0afbd89b176ffea663f)
- :sparkles:[Modal]优化功能，修复 bug [`87ea96a`](https://github.com/ShuyunFF2E/cloud-react/commit/87ea96af4e59afcba721e2cef360f009dac94eef)
- 🐛 [InputNumber] 1. defaultValue 为 0；2.onChange 返回 str [`6b33ecf`](https://github.com/ShuyunFF2E/cloud-react/commit/6b33ecf29fdd2b37453f71565e84ed105abbadc4)

#### [v0.0.50](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.49...v0.0.50)

> 23 March 2020

- :sparkles: [Select] 多选下拉可自定义配置确认取消按钮模板 [`81a73b7`](https://github.com/ShuyunFF2E/cloud-react/commit/81a73b77577247fd60e8e9b84890c45599a53fa3)
- 🐛[Datepicker 组件] issue #206 DatePicker 样式修复 [`ee89d55`](https://github.com/ShuyunFF2E/cloud-react/commit/ee89d555e355c56cb0a644a98d2764627552f4ae)
- :sparkles: [TreeSelect] 完善下拉多选树 [`28099ba`](https://github.com/ShuyunFF2E/cloud-react/commit/28099bae65025324c34ed5df85b6bde6da7eed96)

#### [v0.0.49](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.48...v0.0.49)

> 14 March 2020

- :art: 增加 commit 的代码自动美化 [`8dbf97c`](https://github.com/ShuyunFF2E/cloud-react/commit/8dbf97c0e87f94e24e2776ad6a35edddee64d005)
- :bug: [Field] requried 验证需要剔除空格 [`c32d726`](https://github.com/ShuyunFF2E/cloud-react/commit/c32d7269f8a89a73480a80fdc15df8eaa0664ee4)
- :fire: [ccMenu] 已移植到业务组件中 [`f2291ba`](https://github.com/ShuyunFF2E/cloud-react/commit/f2291ba6c1f29328d820334a4cb55074296cde28)

#### [v0.0.48](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.47...v0.0.48)

> 12 March 2020

- :bug: [Field] requried 验证需要剔除空格 [`d7454a5`](https://github.com/ShuyunFF2E/cloud-react/commit/d7454a58f2648ceb00b19e6019eff8e15bb83070)
- :fire: [ccMenu] 已移植到业务组件中 [`108446f`](https://github.com/ShuyunFF2E/cloud-react/commit/108446f903303016629b36e14b0915711e20799d)
- 🐛 [Datepicker 组件] 修复 format 格式化默认格式 [`0f119b1`](https://github.com/ShuyunFF2E/cloud-react/commit/0f119b17cdf051d72c78160532d23fdfe5bc65d2)

#### [v0.0.47](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.46...v0.0.47)

> 11 March 2020

- :art: 增加 commit 的代码自动美化 [`fa03f77`](https://github.com/ShuyunFF2E/cloud-react/commit/fa03f7782c51d88a6fc3c708f890dcff3789a1d3)
- :recycle: 文档部分重构 [`94a8baf`](https://github.com/ShuyunFF2E/cloud-react/commit/94a8baf21af8e446124e6b9a88d34dd55ffe9032)
- :sparkles:[modal 组件]:新增 style 属性用于控制提示框样式 #203 [`a323cc1`](https://github.com/ShuyunFF2E/cloud-react/commit/a323cc1b699e6995c730efeca327a7652c74c65c)

#### [v0.0.46](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.44...v0.0.46)

> 9 March 2020

- :fire:[tree 组件]移除 radio 组件单选方式 [`72bb6ec`](https://github.com/ShuyunFF2E/cloud-react/commit/72bb6ec59c145b3f03a538226043b3214306b542)
- :sparkles: :memo: [Modal]调整 Modal.confirm 函数的 onOk 回调函数返回值的触发效果和优化 API 文档 [`81954df`](https://github.com/ShuyunFF2E/cloud-react/commit/81954dfb66bc2ed78ccbebfe54a419fe1a04dd15)
- 🐛 [Datepicker 组件] issue #177 YM & MD 增加间隔格式化 [`31c8ab5`](https://github.com/ShuyunFF2E/cloud-react/commit/31c8ab5afc2d7e4f47fcdc3d47781b2d9e79af28)

#### [v0.0.44](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.43...v0.0.44)

> 6 March 2020

- :lipstick: [table 组件] 空模板区分，更新表格分页区域背景色 [`50547d2`](https://github.com/ShuyunFF2E/cloud-react/commit/50547d23d603c4d2c624ab5ab9822db423b66bc5)
- :recycle: [Datepicker] 年份和月份下拉切换为 select 组件 [`2a28bc8`](https://github.com/ShuyunFF2E/cloud-react/commit/2a28bc883084a46b3a1216b8e7c8ee96841c9088)
- 🐛 [InputNumber 组件] 修复受控组件小数输入错误 [`65bc64a`](https://github.com/ShuyunFF2E/cloud-react/commit/65bc64a01b90fc57a9dc1ef378394637c254260f)

#### [v0.0.43](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.42...v0.0.43)

> 26 February 2020

- :lipstick: [table 组件] 空模板区分，更新表格分页区域背景色 [`b456311`](https://github.com/ShuyunFF2E/cloud-react/commit/b4563113847e89eeb2a23c2adf8908faf64561a0)
- :bug: [InputNumber 组件] 数值组件格式化默认值为数字/调整部分样式 [`f6b8e65`](https://github.com/ShuyunFF2E/cloud-react/commit/f6b8e65dc7140a24e0111b5ed3eb945258de9177)
- :sparkles: [Select 组件] 修改搜索功能为仅搜索 label/调整边距 [`f9df3d0`](https://github.com/ShuyunFF2E/cloud-react/commit/f9df3d0825c131af92345bded1cf8263492b6fce)

#### [v0.0.42](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.41...v0.0.42)

> 21 February 2020

- :lipstick: [InputNumber] UI 更新 [`a1b4a27`](https://github.com/ShuyunFF2E/cloud-react/commit/a1b4a2771e37aab789a8671c92fc577b444120fc)
- :arrow_up: 升级 gridmanager-react@0.3.11 [`fd41b2a`](https://github.com/ShuyunFF2E/cloud-react/commit/fd41b2ae18a53434e8a13109a289ed33920c4d00)
- 🐛 [Datepicker 组件] issue #174 修复显示位置错误问题 [`64f6344`](https://github.com/ShuyunFF2E/cloud-react/commit/64f63448688639f0398709ffe6588063e9ef6e29)

#### [v0.0.41](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.40...v0.0.41)

> 16 February 2020

- :bug: [ RadioGroup ] 数据更改不渲染问题 [`ab3191e`](https://github.com/ShuyunFF2E/cloud-react/commit/ab3191ec42c3405e1a05202f7670be4d74ca3b79)

#### [v0.0.40](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.39...v0.0.40)

> 16 February 2020

- :bug: [Datepciker] 时分秒组件置空错误 [`22c48da`](https://github.com/ShuyunFF2E/cloud-react/commit/22c48da830e8b341c1d46f4f8e09ad3cc6143605)

#### [v0.0.39](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.38...v0.0.39)

> 14 February 2020

- :recycle: [Datepicker] 年份和月份下拉切换为 select 组件 [`06afede`](https://github.com/ShuyunFF2E/cloud-react/commit/06afede266d8250235291bf6d41028ecaf8e08b7)
- 🐛 [InputNumber 组件] 修复受控组件小数输入错误 [`69a3bc7`](https://github.com/ShuyunFF2E/cloud-react/commit/69a3bc7fa6b6cd1062407b936d473c8fc88e322f)
- :recycle: [Datepicker] 重构 时分秒 功能代码 [`20ff6f3`](https://github.com/ShuyunFF2E/cloud-react/commit/20ff6f305f5661d885815a4cf92956b1f5ea75af)

#### [v0.0.38](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.37...v0.0.38)

> 12 February 2020

- 🐛 [InputNumber 组件] 受控组件错误 [`1c46b6b`](https://github.com/ShuyunFF2E/cloud-react/commit/1c46b6b24fa2d3c86489dffe80b68db3e5ab8200)
- :sparkles: [Select 组件] 添加搜索框默认文案/调整数据为空提示的位置 [`009ab9e`](https://github.com/ShuyunFF2E/cloud-react/commit/009ab9eaa8f5721a52973e7a6ea9c221a79c7481)
- :sparkles: [TreeSelect 组件] 搜索时关键字高亮 [`f58d4f5`](https://github.com/ShuyunFF2E/cloud-react/commit/f58d4f51dee1b5c6d26821c9cf9aefc9428b4170)

#### [v0.0.37](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.36...v0.0.37)

> 11 February 2020

- 🐛 [DatePicker 组件] 修复 minDate 当前时间&时间选择确定按钮错误问题 [`27bc72c`](https://github.com/ShuyunFF2E/cloud-react/commit/27bc72ccd26c4db52ae7429b88dde79f0538e6ff)
- :art: [radio 组件] radio 为 disabled 状态,label 颜色过灰; 统一了 checkbox 和 radio 的 label 颜色 [`bb3df06`](https://github.com/ShuyunFF2E/cloud-react/commit/bb3df065ccb4ef4e5c7a9dfe97828fa9354289f1)

#### [v0.0.36](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.35...v0.0.36)

> 10 February 2020

- :sparkles: [select 组件]添加下拉树单选 [`3c50ac2`](https://github.com/ShuyunFF2E/cloud-react/commit/3c50ac23c70b70ea5dd20b62819b9fa5d51cccb8)
- 🐛 [DatePicker 组件] 1.修复 datepicker 组件 icon 点击问题 [`1ebe2d0`](https://github.com/ShuyunFF2E/cloud-react/commit/1ebe2d0c116eba9cf517f40c1bb7caa53477243b)
- 🐛 [DatePicker 组件] 1.修复 minDate 时间问题 2;minDate 可以精确到时分秒 [`d49a037`](https://github.com/ShuyunFF2E/cloud-react/commit/d49a03769f39042a5ab70995b049c7535a0e16b2)

#### [v0.0.35](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.34...v0.0.35)

> 9 February 2020

- 0.0.34 [`#152`](https://github.com/ShuyunFF2E/cloud-react/pull/152)
- :sparkles: [select 组件]添加下拉树单选 [`3c3f7a0`](https://github.com/ShuyunFF2E/cloud-react/commit/3c3f7a07c9d2fe167629f32d9e44cf56768d4b45)
- :sparkles: [Modal 组件]提示类型 modal 增加 icon 配置 [`8cb91ea`](https://github.com/ShuyunFF2E/cloud-react/commit/8cb91eaa44dce0e3de29b34cc472131aeae1542d)
- :bug: [tooltip 组件] 销毁 dom 节点错误 [`9365873`](https://github.com/ShuyunFF2E/cloud-react/commit/93658739463f9168f20670a76811c2fb966181f3)

#### [v0.0.34](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.33...v0.0.34)

> 5 February 2020

- :sparkles:tree 组件优化 [`ee7061b`](https://github.com/ShuyunFF2E/cloud-react/commit/ee7061ba83d287e33f00a768dfb8189122ebffd8)
- :bug: [modal 组件]嵌套使用子弹框无法移动 [`b6105b4`](https://github.com/ShuyunFF2E/cloud-react/commit/b6105b4c0f988d67cc289483318c2e48edc99d70)
- :sparkles: [Modal 组件]增加是否展示提示类型的 icon 配置 [`2188277`](https://github.com/ShuyunFF2E/cloud-react/commit/2188277371e0ad1913dd1b8de21c9b9acd94c263)

#### [v0.0.33](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.32...v0.0.33)

> 20 January 2020

- :sparkles:modal 组件优化 [`b8b8a16`](https://github.com/ShuyunFF2E/cloud-react/commit/b8b8a1636d44892a08875a20c9f58eebed662565)

#### [v0.0.32](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.31...v0.0.32)

> 19 January 2020

- Dev [`#141`](https://github.com/ShuyunFF2E/cloud-react/pull/141)
- :bug: [tooltip 组件]修复不能随 DOM 删除消失的问题 [`bda3cb0`](https://github.com/ShuyunFF2E/cloud-react/commit/bda3cb0e9928faf3652cba8020decfa290e7fe0a)
- :bug: [Input] 设置 hasCounter 为 true，并且使用表格组件，计数器渲染不完整 [`6f3525c`](https://github.com/ShuyunFF2E/cloud-react/commit/6f3525c21ba539aa1424946832cc79dc5c403343)

#### [v0.0.31](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.30...v0.0.31)

> 19 January 2020

- v0.0.30 [`#136`](https://github.com/ShuyunFF2E/cloud-react/pull/136)
- :bug: [Select 组件]修复 option 中自定义 icon 问题 [`0b26288`](https://github.com/ShuyunFF2E/cloud-react/commit/0b26288f9ece8edc229a5fdefbec74e1615b555d)
- :bug: [tooltip 组件]设置 container 元素定位为 relative [`0cdd52a`](https://github.com/ShuyunFF2E/cloud-react/commit/0cdd52a0826b57fb2c64be5431f608199d2b6df4)
- :pencil: 更新 readme，添加版本号和下载数量 [`4a0ac7f`](https://github.com/ShuyunFF2E/cloud-react/commit/4a0ac7fb26091632676bfb687ebe4eef69d601c5)

#### [v0.0.30](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.29...v0.0.30)

> 16 January 2020

- 🐛 [DatePicker 组件] 解决 Datepicker onChange 复现问题 #126 [`db8bcc5`](https://github.com/ShuyunFF2E/cloud-react/commit/db8bcc5256935b8e5db404fe51402109d8dddd81)

#### [v0.0.29](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.28...v0.0.29)

> 15 January 2020

- 🐛 [DatePicker 组件] 解决 Datepicker 清空问题 #134 [`653ee52`](https://github.com/ShuyunFF2E/cloud-react/commit/653ee5219136e6232b7e19cffdc56a636092f8b4)
- 🐛 [DatePicker 组件] 修复 Datepicker 年份问题 #133 [`588b114`](https://github.com/ShuyunFF2E/cloud-react/commit/588b114a89188b9b606f7d3873d9e1f092bbb674)
- 0.0.28 版本发布 [`4fd56a9`](https://github.com/ShuyunFF2E/cloud-react/commit/4fd56a9d9f304e59bedae9244b0f4f687bd8e776)

#### [v0.0.28](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.27...v0.0.28)

> 13 January 2020

- 0.0.27 版本发布 [`#129`](https://github.com/ShuyunFF2E/cloud-react/pull/129)
- 🐛 [DatePicker 组件] 解决 Datepicker value 绑定问题 [`a938fdd`](https://github.com/ShuyunFF2E/cloud-react/commit/a938fddefff2fc7b506d0fd4056bd5e247eba715)
- :bug: [field 组件]接管 onChange 抛出当前组件所有的值 [`3593a9a`](https://github.com/ShuyunFF2E/cloud-react/commit/3593a9a2a7a4167f332269c504f9dbef68039039)
- :arrow_up: 升级 gridmanager-react 到 0.3.6 版本 [`1b7c0c3`](https://github.com/ShuyunFF2E/cloud-react/commit/1b7c0c388ac1665d5c6097d22d3923f2527d7b95)

#### [v0.0.27](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.9...v0.0.27)

> 10 January 2020

- v0.0.26 版本发布 [`#125`](https://github.com/ShuyunFF2E/cloud-react/pull/125)
- Develop [`#65`](https://github.com/ShuyunFF2E/cloud-react/pull/65)
- :see_no_evil: 取消对 package-lock.json 文件的忽略 [`8ef8106`](https://github.com/ShuyunFF2E/cloud-react/commit/8ef810686e976424d248a25dcd1549929046c7d7)
- :lipstick: :bug: [tootip 组件] less 优化，bug 处理 [`ef80679`](https://github.com/ShuyunFF2E/cloud-react/commit/ef8067913e7df32260ea12cb6ed3205d80cfe90c)
- :sparkles: [tab 组件] 超过当前行的宽度时滚动 [`f8c7230`](https://github.com/ShuyunFF2E/cloud-react/commit/f8c7230c78f37a524f90c02f91c0dba689bb554a)

#### [v0.0.9](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.8...v0.0.9)

> 17 October 2019

- 完成 form 组件和 field 表单通用工具 [`e687e8b`](https://github.com/ShuyunFF2E/cloud-react/commit/e687e8bb9510746f730d1e7462d58d18091264ad)
- :sparkles: upload component done [`80abecc`](https://github.com/ShuyunFF2E/cloud-react/commit/80abecc91f18d926f669166c4c965a4a466fc926)
- 新增 Step 组件 [`f4d5bad`](https://github.com/ShuyunFF2E/cloud-react/commit/f4d5badae8fcf663224b63d4a43eabb0d00a8af8)

#### [v0.0.8](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.7...v0.0.8)

> 10 October 2019

- 表格组件 demo 调整，版本升级 [`ab0b10c`](https://github.com/ShuyunFF2E/cloud-react/commit/ab0b10c7cf630f67cacf6a76ade7bd2904b35c61)

#### [v0.0.7](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.6...v0.0.7)

> 23 September 2019

- :sparkles: add tree component [`17cf648`](https://github.com/ShuyunFF2E/cloud-react/commit/17cf6480587911ab053e8976f49a6e05ba8b9839)
- :sparkles: 下拉多选组件完成 [`8888bdc`](https://github.com/ShuyunFF2E/cloud-react/commit/8888bdc04402471dba079d81a68066cf44cf1c58)
- message:优化 tree 组件：抽离文件,调整样式,完善文档与 demo [`a343fa6`](https://github.com/ShuyunFF2E/cloud-react/commit/a343fa61c1e0d030568bd3a18da36373352cee27)

#### [v0.0.6](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.5...v0.0.6)

> 2 September 2019

- 表格组件增加操作 state 示例 [`16d063b`](https://github.com/ShuyunFF2E/cloud-react/commit/16d063b535f41ac1b95ddc0342c8128cfcb4134e)

#### [v0.0.5](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.4...v0.0.5)

> 30 August 2019

- 增加 icon 图标,表格组件版本升级 [`90b354d`](https://github.com/ShuyunFF2E/cloud-react/commit/90b354d812a01c955e7eaa50f68d6d85c04bff3f)
- Tabs 组件添加是否保留 Panel 的属性 [`e5ea1df`](https://github.com/ShuyunFF2E/cloud-react/commit/e5ea1dfd3ed9a1e56f048df8a8c9a96e5506930b)
- :rotating_light: fix eslint space issue [`f026bb9`](https://github.com/ShuyunFF2E/cloud-react/commit/f026bb95ac581a0cee772d01b70b5cc833c0e487)

#### [v0.0.4](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.3...v0.0.4)

> 24 August 2019

- :rotating_light: change eslint rule and fix error [`1de84df`](https://github.com/ShuyunFF2E/cloud-react/commit/1de84dfad6403991df30b6ea8d008ec0ec16d014)
- 规范 tooltip 命名 [`6314e32`](https://github.com/ShuyunFF2E/cloud-react/commit/6314e327a743a355feb6146d9d99a35d362d1908)
- 表格 loading 速度调整 [`ab86cdb`](https://github.com/ShuyunFF2E/cloud-react/commit/ab86cdb7edcdd817eca9fd98818661f5e30b5fac)

#### [v0.0.3](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.2...v0.0.3)

> 21 August 2019

- 增加特殊情况不隐藏 tooltip 处理方法 [`f8536c2`](https://github.com/ShuyunFF2E/cloud-react/commit/f8536c2714352f764b8f1a0bd5b62a05676aa3f2)
- :bug: 修复 Input 的清除图标丢失问题 [`8be8775`](https://github.com/ShuyunFF2E/cloud-react/commit/8be877572267a3961c711ae109d12a4d82ba6bae)
- :ambulance: fix react is not defined issue [`03adf29`](https://github.com/ShuyunFF2E/cloud-react/commit/03adf29cc905d6471631d6d4e0c92fac478dee74)

#### [v0.0.2](https://github.com/ShuyunFF2E/cloud-react/compare/v0.0.1...v0.0.2)

> 20 August 2019

- 分页组件 [`#28`](https://github.com/ShuyunFF2E/cloud-react/pull/28)
- 修复与完善分页组件 paginations 和 table-paginations [`9afbc84`](https://github.com/ShuyunFF2E/cloud-react/commit/9afbc845e1d41af6c7a20ece1abe195c3dd03371)
- 将分页组件拆分为两个分页组件，完善并修改提出的功能点 [`d1696cb`](https://github.com/ShuyunFF2E/cloud-react/commit/d1696cbd5edda731983c76a28bb41d8550e70f41)
- 添加 menu 组件 [`97fcf71`](https://github.com/ShuyunFF2E/cloud-react/commit/97fcf71cbb5584b868c365ab266b5caa726d2ed7)

### v0.0.1

> 29 July 2019

- :sparkles::memo: 添加 Input,Input.Textarea 组件和文档 [`#17`](https://github.com/ShuyunFF2E/cloud-react/pull/17)
- merged:增加 radio 组件 [`#11`](https://github.com/ShuyunFF2E/cloud-react/pull/11)
- :bug: 修复 Button 组件 htmlType 为 type [`#12`](https://github.com/ShuyunFF2E/cloud-react/pull/12)
- table [`#6`](https://github.com/ShuyunFF2E/cloud-react/pull/6)
- 增加 icon 图标 [`#5`](https://github.com/ShuyunFF2E/cloud-react/pull/5)
- merged [`#2`](https://github.com/ShuyunFF2E/cloud-react/pull/2)
- :sparkles:add modal component [`cca66bf`](https://github.com/ShuyunFF2E/cloud-react/commit/cca66bf03b48e98b6c0841fda9924c88ca8aa499)
- :sparkles: add tooltip component [`e769294`](https://github.com/ShuyunFF2E/cloud-react/commit/e7692940347a4ace0c08dc477bf63843ed21fb4f)
- 添加 InputNumber 组件 [`e3fdf52`](https://github.com/ShuyunFF2E/cloud-react/commit/e3fdf5228b2edf57b28139494ae05e6233584bbb)
