/*
 * @Author       : HCLonely
 * @Date         : 2021-11-20 15:53:43
 * @LastEditTime : 2021-12-21 19:28:33
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/i18n.ts
 * @Description  : i18n
 */

import zh from '../../locales/zh-CN.js';
const languages = {
  zh
};

const language = 'zh';

const I18n = (key: string, ...argvs: Array<string>): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!languages[language]?.[key]) {
    return key;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return languages[language][key].replace(/%([\d]+)/g, (match, index) => argvs[parseInt(index, 10)]);
};

export default I18n;
