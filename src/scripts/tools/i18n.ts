/*
 * @Author       : HCLonely
 * @Date         : 2021-11-20 15:53:43
 * @LastEditTime : 2021-12-30 18:05:16
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/i18n.ts
 * @Description  : i18n
 */

import { globalOptions } from '../globalOptions';
import zh from '../../locales/zh-CN.js';
import en from '../../locales/en-US.js';

const languages = {
  zh,
  en
};

// @ts-ignore
const language = ['zh', 'en'].includes(globalOptions.other.language) ? globalOptions.other.language : 'en';

const I18n = (key: string, ...argvs: Array<string>): string => {
  // @ts-ignore
  if (!languages[language]?.[key]) {
    return key;
  }
  // @ts-ignore
  return languages[language][key].replace(/%([\d]+)/g, (match, index) => argvs[parseInt(index, 10)]);
};

export default I18n;
