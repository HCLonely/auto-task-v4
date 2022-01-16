/*
 * @Author       : HCLonely
 * @Date         : 2022-01-16 17:31:53
 * @LastEditTime : 2022-01-16 17:55:50
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/doc-repo-push.js
 * @Description  : 同步auto-task-doc仓库
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { spawnSync } = require('child_process');
const dayjs = require('dayjs');

console.log(spawnSync('cd', ['doc/']));
console.log(spawnSync('git', ['init']));
console.log(spawnSync('git', ['config', 'user.name', 'Doc Sync']));
console.log(spawnSync('git', ['config', 'user.email', 'h1606051253@gmail.com']));
console.log(spawnSync('git', ['add', '-A']));
console.log(spawnSync('git', ['commit', '-m', `Update at ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`]));
console.log(spawnSync('git', ['push', '-u', 'https://github.com/HCLonely/auto-task-doc', 'HEAD:gh-pages', '--force']));
