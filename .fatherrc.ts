import NodePath from 'path';
import alias from '@rollup/plugin-alias';
import { eslint } from 'rollup-plugin-eslint';
import copy from 'rollup-plugin-copy';
// import url from '@rollup/plugin-url';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import {
  name,
  version,
  description,
  main,
  dependencies,
  devDependencies,
  module,
  scripts,
  dumiAssets,
  jest,
  source,
} from './package.json';
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const isBuild = !(argv.dev || argv.watch);

const externals = [
  'react',
  'react-dom',
  ...(isBuild ? [] : ['gridmanager-react', 'prop-types', 'classnames']),
];

export default isBuild ? [{
  esm: isBuild ? false : 'rollup',
  file: 'cloud-react',
  // cjs: {
  //   type: 'rollup',
  //   minify: !argv.dev,
  // },
	replace: {
    CloudPrefixCls: JSON.stringify('cloud'),
  },
  umd: isBuild
    ? {
        name: 'CloudReact',
        file: 'cloud-react',
        minFile: true,
        globals: {
          'react': 'window.React',
          'react-dom': 'window.ReactDOM',
        },
      }
    : false,
  entry: 'src/components/index.js',
  extraExternals: externals,
  extractCSS: isBuild,
	lessInRollupMode: {
    globalVars: {
      '@cloud': 'cloud',
    },
  },
  extraRollupPlugins: [
		generatePackageJson({
      outputFolder: 'dist',
      baseContents: (pkg) =>
        isBuild
          ? {
              name,
              version,
              description,
              main,
              dependencies,
              devDependencies,
            }
          : {
              name,
              version,
              description,
              scripts,
              dumiAssets,
              main,
              module,
              source,
              jest,
              dependencies,
              devDependencies,
            },
      additionalDependencies: {
				"classnames": "^2.3.1",
				"gray-matter": "^4.0.3",
				"gridmanager-react": "1.10.2-0",
				"less": "^3.13.1",
				"moment": "^2.29.1",
				"prop-types": "^15.7.2",
				"rc-cascader": "^3.4.2",
				"rc-color-picker": "^1.2.6",
				"rc-drawer": "^6.0.1",
				"rc-dropdown": "~4.0.1",
				"rc-menu": "^9.0.12",
				"rc-picker": "^2.5.19",
				"rc-table": "7.28.1",
				"rc-tooltip": "~5.2.0",
				"rc-trigger": "^5.2.10",
				"rc-util": "^5.21.5",
				"react-drag-listview": "^0.2.0",
				"react-resizable": "^3.0.4",
				"react-transition-group": "^4.4.2",
				"rollup-plugin-copy": "^3.4.0",
				"rollup-plugin-eslint": "^7.0.0",
				"rollup-plugin-generate-package-json": "^3.2.0",
				"shuyun-utils": "0.0.3"
      },
    }),
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
},{
  esm: isBuild ? false : 'rollup',
  file: 'cloud-react',
  // cjs: {
  //   type: 'rollup',
  //   minify: !argv.dev,
  // },
  replace: {
    CloudPrefixCls: JSON.stringify('newCloud'),
  },
  umd: isBuild
    ? {
        name: 'NewCloudReact',
        file: 'new-cloud-react',
        minFile: true,
        globals: {
          'react': 'window.React',
          'react-dom': 'window.ReactDOM',
        },
      }
    : false,
  entry: 'src/components/index.js',
  extraExternals: externals,
  extractCSS: isBuild,
  lessInRollupMode: {
    globalVars: {
      '@cloud': 'newCloud',
    },
  },
  extraRollupPlugins: [
    generatePackageJson({
      outputFolder: 'dist',
      baseContents: (pkg) =>
        isBuild
          ? {
              name,
              version,
              description,
              main:'new-cloud-react.js',
              dependencies,
              devDependencies,
            }
          : {
              name,
              version,
              description,
              scripts,
              dumiAssets,
              main,
              module,
              source,
              jest,
              dependencies,
              devDependencies,
            },
      additionalDependencies: {
				"classnames": "^2.3.1",
				"gray-matter": "^4.0.3",
				"gridmanager-react": "1.10.2-0",
				"less": "^3.13.1",
				"moment": "^2.29.1",
				"prop-types": "^15.7.2",
				"rc-cascader": "^3.4.2",
				"rc-color-picker": "^1.2.6",
				"rc-drawer": "^6.0.1",
				"rc-dropdown": "~4.0.1",
				"rc-menu": "^9.0.12",
				"rc-picker": "^2.5.19",
				"rc-table": "7.28.1",
				"rc-tooltip": "~5.2.0",
				"rc-trigger": "^5.2.10",
				"rc-util": "^5.21.5",
				"react-drag-listview": "^0.2.0",
				"react-resizable": "^3.0.4",
				"react-transition-group": "^4.4.2",
				"rollup-plugin-copy": "^3.4.0",
				"rollup-plugin-eslint": "^7.0.0",
				"rollup-plugin-generate-package-json": "^3.2.0",
				"shuyun-utils": "0.0.3"
      },
    }),
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
        // { src: 'package.json', dest: 'dist' },
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
}] : {
  esm: isBuild ? false : 'rollup',
  file: 'cloud-react',
	replace: {
    CloudPrefixCls: JSON.stringify('cloud'),
  },
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
	lessInRollupMode: {
    globalVars: {
      '@cloud': 'cloud',
    },
  },
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
