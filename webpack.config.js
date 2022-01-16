/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 16:22:46
 * @LastEditTime : 2022-01-16 19:53:54
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/webpack.config.js
 */
const fs = require('fs');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');
const WebpackBar = require('webpackbar');
const VERSION = JSON.parse(fs.readFileSync('package.json')).version;
const NAME = 'auto-task-v4';

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
    index: './src/index.ts'
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
              configFile: path.resolve(__dirname, './.babelrc.json')
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
                  [
                    'postcss-preset-env',
                    {
                      browsers: '> 1%, not dead'
                    }
                  ]
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
      __NAME__: NAME,
      __UPDATE_URL__: `https://github.com/HCLonely/auto-task-new/raw/main/dist/${NAME}.user.js`
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      minify: TerserPlugin.uglifyJsMinify,
      terserOptions: {
        sourceMap: false,
        compress: false,
        mangle: false,
        output: {
          beautify: true,
          indent_level: 2, // eslint-disable-line camelcase
          braces: true,
          quote_style: 1, // eslint-disable-line camelcase
          preamble: fs.readFileSync('./src/header.js').toString()
            .replace(/__VERSION__/g, VERSION)
            .replace(/__NAME__/g, NAME)
            .replace(/__UPDATE_URL__/g, `https://github.com/HCLonely/auto-task-new/raw/main/dist/${NAME}.user.js`)
        }
      }
    })]
  },
  externals: {
    sweetalert2: 'Swal',
    'js-cookie': 'Cookies',
    keyboardjs: 'keyboardJS',
    dayjs: 'dayjs'
  }
};
