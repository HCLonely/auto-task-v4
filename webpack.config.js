/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 16:22:46
 * @LastEditTime : 2021-10-28 17:13:21
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/webpack.config.js
 * @Description  :
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  devtool: 'source-map', // 打包出的js文件是否生成map文件（方便浏览器调试）
  mode: 'production',
  entry: {
    index: './src/index.ts'
  },
  output: {
    filename: '[name].js', // 生成的fiename需要与package.json中的main一致
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
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
  plugins: [new CleanWebpackPlugin({
    verbose: true,
    dry: false
  })],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: false,
        mangle: false,
        output: {
          beautify: true
        }
      }
    })]
  }
};
