/*
 * @Author       : HCLonely
 * @Date         : 2022-01-16 17:31:53
 * @LastEditTime : 2022-01-16 17:50:06
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/doc-repo-push.js
 * @Description  : 同步auto-task-doc仓库
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { spawnSync } = require('child_process');
const dayjs = require('dayjs');

spawnSync('cd', ['doc/']);
spawnSync('git', ['init']);
spawnSync('git', ['config', 'user.name', 'Doc Sync']);
spawnSync('git', ['config', 'user.email', 'h1606051253@gmail.com']);
spawnSync('git', ['add', '-A']);
spawnSync('git', ['commit', '-m', `Update at ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`]);
spawnSync('git', ['push', '-u', 'https://github.com/HCLonely/auto-task-doc', 'HEAD:gh-pages', '--force']);
