/*
 * @Author       : HCLonely
 * @Date         : 2021-10-13 14:08:18
 * @LastEditTime : 2022-02-06 11:28:31
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/throwError.ts
 * @Description  : 错误处理函数
 */

import Swal from 'sweetalert2';
import { ua } from '@xuanmo/javascript-utils';
import __ from './i18n';

/**
 * 处理错误并显示相应的提示框，允许用户报告错误或复制错误信息。
 *
 * @param {Error} error - 要处理的错误对象。
 * @param {string} name - 错误的名称，用于描述错误类型。
 *
 * @returns {void} 无返回值。
 */
export default function throwError(error: Error, name: string): void {
  if (window.TRACE) console.trace('%cAuto-Task[Debug]:', 'color:blue');
  Swal.fire({
    title: __('errorReport'),
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: __('toGithub'),
    showDenyButton: true,
    denyButtonText: __('toKeylol'),
    cancelButtonText: __('close')
  }).then(({ isDenied, isConfirmed }) => {
    if (isConfirmed) {
      // eslint-disable-next-line max-len
      GM_openInTab(`https://github.com/HCLonely/auto-task-v4/issues/new?title=${encodeURIComponent(`[BUG] 脚本报错: ${name}`)}&labels=bug&template=bug_report.yml&website=${encodeURIComponent(window.location.href)}&browser=${encodeURIComponent(JSON.stringify(ua(), null, 4))}&manager=${encodeURIComponent(`${GM_info.scriptHandler} ${GM_info.version}`)}&user-script=${encodeURIComponent(GM_info.script.version)}&logs=${encodeURIComponent(error.stack || 'null')}&run-logs=${encodeURIComponent($.makeArray($('#auto-task-info>li')).map((element) => element.innerText)
        .join('\n'))}`, { active: true });
    } else if (isDenied) {
      const text = `错误链接: [url=${window.location.href}]${window.location.href}[/url]

环境:

[code]${JSON.stringify(ua(), null, 4)}[/code]

脚本管理器: ${GM_info.scriptHandler} ${GM_info.version}
脚本版本: ${GM_info.script.version}

报错信息:
[code]${error.stack}[/code]

执行日志:
[code]${$.makeArray($('#auto-task-info>li')).map((element) => element.innerText)
    .join('\n')}[/code]`;
      GM_setClipboard(text);
      Swal.fire({
        title: __('copySuccess'),
        icon: 'success',
        confirmButtonText: __('ok')
      }).then(() => {
        GM_openInTab('https://keylol.com/forum.php?mod=post&action=reply&fid=319&tid=777450', { active: true });
      });
    }
  });
  console.log('%c%s', 'color:white;background:red', `Auto-Task[Error]: ${name}\n${error.stack}`);
}
