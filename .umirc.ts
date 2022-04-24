import { defineConfig } from 'dumi';
import path from 'path';
const ESLintPlugin = require('eslint-webpack-plugin');

// const resolve = dir => path.resolve(__dirname, dir);

export default defineConfig({
  mode: 'site',
  title: ' ',
  favicon: 'https://www.shuyun.com/favicon.ico',
  logo: 'https://brand-guide.shuyun.com/IAM/77c28a6547cd.png',
  locales: [['zh-CN', '中文']],
  outputPath: 'cloud-react-site',
  publicPath: '/v1/',
  base: '/v1/',
  hash: true,
  resolve: {
    includes: ['docs', 'src/components'],
  },
  // history: {
  //   type: 'hash'
  // },
  // mfsu: {},
  navs: [
    {
      title: '指南',
      path: '/guide',
    },
    {
      title: '组件(v0版)',
      path: 'https://cloud-react.shuyun.com/cloud-react',
    },
    {
      title: '组件(v1版)',
      path: '/cloud-react',
    },
    {
      title: '图表库',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      path: 'https://qa-charts.shuyun.com/',
    },
    {
      title: '千牛UI',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      path: 'https://ui.shuyun.com/',
    },
    {
      title: 'utils工具库',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      path: 'https://github.com/ShuyunFF2E/shuyun-utils',
    },
    {
      title: '主题',
      path: '/theme',
    },
  ],
  alias: {
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@contexts': path.resolve(__dirname, 'src/contexts'),
    '@components': path.resolve(__dirname, 'src/components'),
  },
  // chainWebpack: function(config, { webpack }) {
  //   config
  //     .plugin('lint')
  //     .use(new ESLintPlugin, [{
  //       files: ['src'],
  //       extensions: ['jsx', 'js'],
  //     }])
  //     .end()
  // },
  // chainWebpack: function(memo, { env, webpack, createCSSRule }) {
  // memo.module
  //   .rule('markdown')
  //     .test(/\.md$/)
  //     .pre()
  //     .include
  //       .add(path.resolve('src/components/bread-crumbs'))
  //       .end()
  //     .use('markdown')
  //       .loader(path.resolve('loader/index.js'))
  //       .options({
  //         pattern: /#{1,6}\s+API/,
  //         insert: {
  //           before: true,
  //           value: '### 代码演示\n123'
  //         }
  //       })
  // },
  styles: [
    ` .__dumi-default-layout-hero { height: 420px; box-sizing: border-box; padding: 120px 0 100px !important; background: url(https://brand-guide.shuyun.com/IAM/2487d4cef63a.jpg) 100% !important; }
    .__dumi-default-navbar-logo { transform: scale(1.5) }
    .__dumi-default-layout-hero img { margin-top: -50px }
    .__dumi-default-layout-hero h1 { color: white !important }
    .__dumi-default-layout-hero .markdown { color: white !important }
    `,
  ],
});
