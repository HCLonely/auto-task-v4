/*
 * @Author       : HCLonely
 * @Date         : 2021-11-20 15:53:43
 * @LastEditTime : 2022-02-06 11:42:08
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

/**
 * 根据给定的键和参数返回国际化字符串。
 *
 * @param {string} key - 用于查找的国际化键。
 * @param {...string} argvs - 可选的参数，用于替换字符串中的占位符。
 *
 * @returns {string} 返回对应的国际化字符串，如果未找到则返回键本身。
 */
const I18n = (key: string, ...argvs: Array<string>): string => {
  // @ts-ignore
  if (!languages[language]?.[key]) {
    return key;
  }
  // @ts-ignore
  return languages[language][key].replace(/%([\d]+)/g, (match, index) => argvs[parseInt(index, 10)]);
};

export default I18n;
