/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 16:22:46
 * @LastEditTime : 2022-01-16 19:53:59
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/webpack.giveawaysu.config.js
 */
const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');
const VERSION = JSON.parse(fs.readFileSync('package.json')).version;
const NAME = 'auto-task-v4-for-giveawaysu';

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  devtool: false,
  mode: 'production',
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  entry: {
    index: './src/for_giveawaysu/index.ts'
  },
  output: {
    filename: `${NAME}.user.js`,
    path: path.resolve(__dirname, 'dist'),
    clean: false,
    environment: {
      arrowFunction: false
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, './.compatibility.babelrc.json')
            }
          }, {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, './tsconfig.json')
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              exportType: 'string'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env'
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new WebpackBar(),
    new DefinePlugin({
      __VERSION__: VERSION,
      __NAME__: NAME
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      minify: TerserPlugin.uglifyJsMinify,
      terserOptions: {
        sourceMap: false,
        output: {
          preamble: fs.readFileSync('./src/for_giveawaysu/header.js').toString()
            .replace(/__VERSION__/g, VERSION)
            .replace(/__NAME__/g, NAME)
            .replace(/__UPDATE_URL__/g, `https://github.com/HCLonely/auto-task-new/raw/main/dist/${NAME}.user.js`)
        }
      }
    })]
  },
  externals: {
    sweetalert2: 'Swal',
    'js-cookie': 'Cookies'
  }
};
