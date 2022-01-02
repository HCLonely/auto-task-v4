/*
 * @Author       : HCLonely
 * @Date         : 2021-10-13 14:08:18
 * @LastEditTime : 2022-01-01 13:52:17
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
      window.open(`https://github.com/HCLonely/auto-task-v4/issues/new?title=${encodeURIComponent(`脚本报错: ${name}`)}&labels=bug&body=${
        encodeURIComponent(`错误链接: [${window.location.href}](${window.location.href})

环境:
\`\`\`
${JSON.stringify(ua(), null, 4)}
\`\`\`
脚本管理器: \`${GM_info.scriptHandler} ${GM_info.version}\`
脚本版本: \`${GM_info.script.version}\`

报错信息:
\`\`\`
${error.stack}
\`\`\`

执行日志:
\`\`\`
${$.makeArray($('#auto-task-info>li')).map((element) => element.innerText)
    .join('\n')}
\`\`\`
`)}`, '_blank');
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
      const textarea = $('<textarea>');
      $('body').append(textarea);
      textarea.val(text).trigger('select');
      if (document.execCommand('Copy')) {
        Swal.fire({
          title: __('copySuccess'),
          icon: 'success',
          confirmButtonText: __('ok')
        }).then(() => {
          window.open('https://keylol.com/forum.php?mod=post&action=reply&fid=319&tid=777450', '_blank');
        });
      } else {
        Swal.fire({
          title: __('copyFailed'),
          input: 'textarea',
          inputValue: text,
          confirmButtonText: __('ok')
        }).then(() => {
          window.open('https://keylol.com/forum.php?mod=post&action=reply&fid=319&tid=777450', '_blank');
        });
      }
      textarea.remove();
    }
  });
  console.log('%c%s', 'color:white;background:red', `${name}\n${error.stack}`);
}
