/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author       : HCLonely
 * @Date         : 2021-12-12 17:39:48
 * @LastEditTime : 2021-12-28 17:36:34
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/webpack.compatibility.config.js
 * @Description  :
 */
const fs = require('fs');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    filename: 'auto-task.compatibility.user.js',
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
  plugins: [],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        output: {
          preamble: fs.readFileSync('./src/header.js').toString()
        }
      }
    })]
  },
  externals: {
    sweetalert2: 'Swal',
    'js-cookie': 'Cookies',
    keyboardjs: 'keyboardJS'
  }
};
