---
title: PageHeader 页头
nav:
  title: PageHeader 页头
  path: /cloud-react
group:
  order: 4
  title: 导航
  path: /nav
---

### 何时使用

### API

| 属性        | 说明                 | 类型             | 默认值     | 可选值     |
| ----------- | -------------------- | ---------------- | ---------- |---------- |
| title  | 自定义标题文字         | 	ReactNode            | -      ||
| subTitle  | 自定义的二级标题文字         | 	ReactNode            | -      ||
| onBack  | 返回按钮的点击事件         | 	function            | () => {}     ||
| breadcrumb  | 面包屑         | 	ReactNode            | -      || 
| size      | 常用页头大小             | string | default     | `large` `small` `default`| 

 ### 基础

<embed src="@components/pageHeader/demos/basic-page-header.md" /> 

### 包含返回按钮

<embed src="@components/pageHeader/demos/back-page-header.md" /> 

### 包含面包屑

<embed src="@components/pageHeader/demos/breadcrumb-page-header.md" /> 
