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

const unique = (array: Array<any>): Array<any> => {
  try {
    return [...new Set(array)];
  } catch (error) {
    throwError(error as Error, 'unique');
    return [];
  }
};

const delay = (time = 1000):Promise<true> => new Promise((resolve) => {
  setTimeout(() => { resolve(true); }, time);
});

interface redirectLinksCache {
  [link:string]: string
}
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

const getUuid = (): string => {
  const uuidUrl = URL.createObjectURL(new Blob()).toString();
  return uuidUrl.slice(uuidUrl.lastIndexOf('/') + 1);
};

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

export { unique, delay, getRedirectLink, getUrlQuery, visitLink, getUuid, stringToColour };
