/*
 * @Author       : HCLonely
 * @Date         : 2022-01-03 14:18:53
 * @LastEditTime : 2022-01-16 15:53:19
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/copy.js
 * @Description  : 复制文件到备用源网站
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const chalk = require('chalk');

fs.copySync('./dist', './page/dist');
fs.copySync('./package.json', './page/package.json');

console.log(`Files copied ${chalk.green.bold('successfully')}!`);
