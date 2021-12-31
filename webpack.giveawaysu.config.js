/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 16:22:46
 * @LastEditTime : 2021-12-31 19:35:34
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/webpack.giveawaysu.config.js
 * @Description  :
 */
const fs = require('fs');
const path = require('path');
const { DefinePlugin } = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      __VERSION__: VERSION,
      __NAME__: NAME
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
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
