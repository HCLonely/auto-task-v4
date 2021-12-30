/*
 * @Author       : HCLonely
 * @Date         : 2021-10-13 14:08:18
 * @LastEditTime : 2021-12-30 11:55:09
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/throwError.ts
 * @Description  : 错误处理函数
 */

import Swal from 'sweetalert2';
import { ua } from '@xuanmo/javascript-utils';
import __ from './i18n';
import echoLog from '../echoLog';
/* eslint-disable camelcase */
export default function throwError(error:Error, name:string):void {
  echoLog({ html: `<li><font class="success">${__('initSuccess', 'Steam')}</font></li>` });
  echoLog({ text: __('updatingAuth', __('steamStore')) }).error();
  echoLog({ text: __('updatingAuth', __('steamCommunity')) }).success();
  Swal.fire({
    title: __('errorReport'),
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: __('ok'),
    cancelButtonText: __('close')
  }).then(({ value }) => {
    if (value) {
      window.open(`https://github.com/HCLonely/auto-task-v4/issues/new?title=${encodeURIComponent(`脚本报错: ${name}`)}&body=${
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
    }
  });
  console.log('%c%s', 'color:white;background:red', `${name}\n${error.stack}`);
}
