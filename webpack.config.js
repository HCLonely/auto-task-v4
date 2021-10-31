/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 16:22:46
 * @LastEditTime : 2021-10-31 18:23:06
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/webpack.config.js
 * @Description  :
 */
const fs = require('fs');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  devtool: false, // 打包出的js文件是否生成map文件（方便浏览器调试）
  mode: 'production',
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  entry: {
    index: './src/index.ts'
  },
  output: {
    filename: '[name].js', // 生成的fiename需要与package.json中的main一致
    path: path.resolve(__dirname, 'dist'),
    clean: true,
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
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, './tsconfig.json')
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: false,
        mangle: false,
        output: {
          beautify: true,
          indent_level: 2, // eslint-disable-line camelcase
          braces: true,
          quote_style: 1, // eslint-disable-line camelcase
          preamble: fs.readFileSync('./src/header.js').toString()
        }
      }
    })]
  }
};
