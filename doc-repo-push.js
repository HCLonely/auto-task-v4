/*
 * @Author       : HCLonely
 * @Date         : 2022-01-16 17:31:53
 * @LastEditTime : 2022-01-16 18:17:07
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/doc-repo-push.js
 * @Description  : 同步auto-task-doc仓库
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { spawnSync } = require('child_process');
const dayjs = require('dayjs');

const git = (...args) => {
  const { stdout, stderr } = spawnSync('git', args, { cwd: 'doc' });
  console.log(`stdout:
  ${stdout}
stderr:
  ${stderr}`);
};
git('init');
git('config', 'user.name', 'Doc Sync');
git('config', 'user.email', 'h1606051253@gmail.com');
git('add', '-A');
git('commit', '-m', `Update at ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`);
git('push', '-u', 'https://github.com/HCLonely/auto-task-doc', 'HEAD:gh-pages', '--force');
