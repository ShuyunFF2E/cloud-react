import NodePath from 'path';
import alias from '@rollup/plugin-alias';
import { eslint } from 'rollup-plugin-eslint';
import copy from 'rollup-plugin-copy';
// import url from '@rollup/plugin-url';

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const isBuild = !(argv.dev || argv.watch);

const externals = [
  'react',
  'react-dom',
  ...(isBuild ? [] : ['gridmanager-react', 'prop-types', 'classnames']),
];

export default {
  esm: isBuild ? false : 'rollup',
  file: 'cloud-react',
  // cjs: {
  //   type: 'rollup',
  //   minify: !argv.dev,
  // },
  umd: isBuild
    ? {
        name: 'CloudReact',
        file: 'cloud-react',
        minFile: true,
        globals: {
          "react": "window.React",
          "react-dom": "window.ReactDOM",
        },
      }
    : false,
  entry: 'src/components/index.js',
  extraExternals: externals,
  extractCSS: isBuild,
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
    copy({
      targets: [
        { src: 'package.json', dest: 'dist' },
        { src: 'src/locale', dest: 'dist' },
      ],
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
