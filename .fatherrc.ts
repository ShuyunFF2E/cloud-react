import NodePath from 'path';
import alias from '@rollup/plugin-alias';
import { eslint } from 'rollup-plugin-eslint';
import copy from 'rollup-plugin-copy';
// import url from '@rollup/plugin-url';

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

export default {
  // esm: 'rollup',
  file: 'cloud-react',
  // cjs: {
  //   type: 'rollup',
  //   minify: !argv.dev,
  // },
  umd: {
    name: 'CloudReact',
    file: 'cloud-react',
    minFile:!argv.dev,
  },
  entry: 'src/components/index.js',
  extraExternals: [
    'react',
    'react-dom',
  ],
  extractCSS: !argv.dev,
  // extraPostCSSPlugins: [
  //   require('postcss-font-base64')({
  //         //future options will be handled here
  //       })
  // ],
  extraRollupPlugins: [
    eslint({
      throwOnError: true,
      include: [NodePath.resolve('src/components')],
      /* your options */
    }),
    // url({
    //   include: ['**/*.woff', '**/*.woff2'],
    //   limit: Infinity,
    // }),
    // postcss({
    //   plugins: [require('postcss-font-base64')({
    //     //future options will be handled here
    //   })]
    // }),
    copy({
      targets: [
        { src: 'package.json', dest: 'dist' },
      ]
    }),
    alias({
      entries: [
        {
          find: '@utils',
          replacement: NodePath.resolve(
            NodePath.resolve(__dirname),
            'src/utils',
          ),
          // OR place `customResolver` here. See explanation below.
        },
        {
          find: '@contexts',
          replacement: NodePath.resolve(
            NodePath.resolve(__dirname),
            'src/contexts',
          ),
          // OR place `customResolver` here. See explanation below.
        },
        {
          find: '@tests',
          replacement: NodePath.resolve(NodePath.resolve(__dirname), 'tests'),
          // OR place `customResolver` here. See explanation below.
        },
      ],
    }),
  ],
};
