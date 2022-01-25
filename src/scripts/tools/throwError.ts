/*
 * @Author       : HCLonely
 * @Date         : 2021-10-13 14:08:18
 * @LastEditTime : 2022-01-25 12:31:27
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/throwError.ts
 * @Description  : 错误处理函数
 */

import Swal from 'sweetalert2';
import { ua } from '@xuanmo/javascript-utils';
import __ from './i18n';
export default function throwError(error:Error, name:string):void {
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
      window.open(`https://github.com/HCLonely/auto-task-v4/issues/new?title=${encodeURIComponent(`[BUG] 脚本报错: ${name}`)}&labels=bug&template=bug_report.yml&website=${encodeURIComponent(window.location.href)}&browser=${JSON.stringify(ua(), null, 4)}&manager=${encodeURIComponent(`${GM_info.scriptHandler} ${GM_info.version}`)}&user-script=${encodeURIComponent(GM_info.script.version)}&logs=${encodeURIComponent(error.stack || 'null')}&run-logs=${$.makeArray($('#auto-task-info>li')).map((element) => element.innerText)
        .join('\n')}`, '_blank');
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
        window.open('https://keylol.com/forum.php?mod=post&action=reply&fid=319&tid=777450', '_blank');
      });
    }
  });
  console.log('%c%s', 'color:white;background:red', `${name}\n${error.stack}`);
}
