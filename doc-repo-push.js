/*
 * @Author       : HCLonely
 * @Date         : 2022-01-16 17:31:53
 * @LastEditTime : 2022-01-16 18:06:52
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/doc-repo-push.js
 * @Description  : 同步auto-task-doc仓库
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { spawnSync } = require('child_process');
const dayjs = require('dayjs');

console.log(spawnSync('git', ['init'], { cwd: 'doc' }));
console.log(spawnSync('git', ['config', 'user.name', 'Doc Sync'], { cwd: 'doc' }));
console.log(spawnSync('git', ['config', 'user.email', 'h1606051253@gmail.com'], { cwd: 'doc' }));
console.log(spawnSync('git', ['add', '-A'], { cwd: 'doc' }));
console.log(spawnSync('git', ['commit', '-m', `Update at ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`], { cwd: 'doc' }));
console.log(spawnSync('git', ['push', '-u', 'https://github.com/HCLonely/auto-task-doc', 'HEAD:gh-pages', '--force'], { cwd: 'doc' }));
