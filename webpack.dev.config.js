/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 16:22:46
 * @LastEditTime : 2021-12-28 17:36:27
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/webpack.dev.config.js
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
    filename: 'auto-task.user.js',
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
  plugins: [],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: false,
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
  },
  externals: {
    sweetalert2: 'Swal',
    'js-cookie': 'Cookies',
    keyboardjs: 'keyboardJS'
  }
};
