/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 14:58:11
 * @LastEditTime : 2022-02-06 11:42:57
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/tools.ts
 * @Description  : 其他工具函数
 */
import throwError from './throwError';
import httpRequest from './httpRequest';
import echoLog from '../echoLog';

/**
 * 从给定的数组中返回唯一值的数组。
 *
 * @param {Array<any>} array - 输入的数组，可以包含任意类型的元素。
 *
 * @returns {Array<any>} 返回一个包含唯一值的新数组。如果发生错误，则返回空数组。
 *
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 */
const unique = (array: Array<any>): Array<any> => {
  try {
    return [...new Set(array)];
  } catch (error) {
    throwError(error as Error, 'unique');
    return [];
  }
};

/**
 * 创建一个延迟的 Promise
 *
 * @param {number} [time=1000] - 延迟的时间（以毫秒为单位），默认为 1000 毫秒。
 *
 * @returns {Promise<true>} 返回一个 Promise
 */
const delay = (time = 1000): Promise<true> => new Promise((resolve) => {
  setTimeout(() => { resolve(true); }, time);
});

interface redirectLinksCache {
  [link:string]: string
}

/**
 * 获取重定向链接。
 *
 * @param {string | undefined} link - 要重定向的链接，如果未提供则返回 null。
 *
 * @returns {Promise<string | null>} 返回一个 Promise，解析为重定向后的链接，如果没有重定向则返回 null。
 *
 * @throws {Error} 如果在获取重定向链接的过程中发生错误，将抛出错误。
 */
const getRedirectLink = async (link: string | undefined): Promise<string | null> => {
  try {
    if (!link) return null;
    const redirectLinksCache = GM_getValue<redirectLinksCache>('redirectLinks') || {};
    if (redirectLinksCache[link]) redirectLinksCache[link];
    return await httpRequest({
      url: link,
      method: 'GET'
    }).then(({ data }) => {
      if (data?.finalUrl) {
        redirectLinksCache[link] = data.finalUrl;
        GM_setValue('redirectLinks', redirectLinksCache);
        return data.finalUrl;
      }
      return null;
    });
  } catch (error) {
    throwError(error as Error, 'getRedirectLink');
    return null;
  }
};

/**
 * 访问指定的链接并返回访问结果。
 *
 * @param {string} link - 要访问的链接。
 * @param {MonkeyXhrDetails} [options] - 可选的请求配置选项。
 *
 * @returns {Promise<boolean>} 返回一个 Promise，解析为访问结果，成功时为 `true`，失败时为 `false`。
 *
 * @throws {Error} 如果在访问过程中发生错误，将抛出错误。
 */
const visitLink = async (link: string, options?: MonkeyXhrDetails): Promise<boolean> => {
  try {
    const logStatus = echoLog({ type: 'visitLink', text: link });
    return await httpRequest({
      url: link,
      method: 'GET',
      ...options
    }).then(({ result, statusText, status }) => {
      if (result === 'Success') {
        logStatus.success();
        return true;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    });
  } catch (error) {
    throwError(error as Error, 'visitLink');
    return false;
  }
};

interface urlQuery {
  [name: string]: string
}

// todo: 使用URl实例优化
const getUrlQuery = (url?: string): urlQuery => {
  try {
    const query: urlQuery = {};
    if (url) {
      if (url.includes('?')) {
        url.split('?')[1].replace(/([^?&=]+)=([^&]+)/g, (str, key, value) => { query[key] = value; return str; });
      }
    } else {
      window.location.search.replace(/([^?&=]+)=([^&]+)/g, (str, key, value) => { query[key] = value; return str; });
    }
    return query;
  } catch (error) {
    throwError(error as Error, 'getUrlQuery');
    return {};
  }
};

/**
 * 生成一个唯一的 UUID 字符串。
 *
 * @returns {string} 返回生成的 UUID 字符串。
 */
const getUuid = (): string => {
  const uuidUrl = URL.createObjectURL(new Blob()).toString();
  return uuidUrl.slice(uuidUrl.lastIndexOf('/') + 1);
};

/**
 * 将给定字符串转换为颜色代码。
 *
 * @param {string} str - 要转换的字符串。
 *
 * @returns {string} 返回生成的颜色代码，格式为十六进制字符串（例如：#RRGGBB）。
 *
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 */
const stringToColour = (str: string): string => {
  try {
    let hash = 0;
    for (let i = 0; i < str.length; i++) { // eslint-disable-line
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) { // eslint-disable-line
      const value = (hash >> (i * 8)) & 0xFF;
      colour += (`00${value.toString(16)}`).slice(-2);
    }
    return colour;
  } catch (error) {
    throwError(error as Error, 'stringToColour');
    return '#fff';
  }
};

const debug = (log: string, data?: any) => {
  if (!window.DEBUG) return;
  console.log('%c%s', 'color:#a7a7a7', `Auto-Task[Debug]: ${log}`);
  if (data) console.log('%c%s', 'color:#a7a7a7', 'Auto-Task[Debug]: ', data);
};
export { unique, delay, getRedirectLink, getUrlQuery, visitLink, getUuid, stringToColour, debug };
