/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 14:58:11
 * @LastEditTime : 2021-11-08 15:16:28
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/tools.ts
 * @Description  :
 */
import throwError from './throwError';
import httpRequest from './httpRequest';
const unique = (array:Array<any>):Array<any> => {
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
    const redirectLinksCache = GM_getValue<redirectLinksCache>('redirectLinks') || {}; // eslint-disable-line new-cap
    if (redirectLinksCache[link]) redirectLinksCache[link];
    return await httpRequest({
      url: link,
      method: 'GET'
    }).then(({ data }) => {
      if (data?.finalUrl) {
        redirectLinksCache[link] = data.finalUrl;
        GM_setValue('redirectLinks', redirectLinksCache); // eslint-disable-line new-cap
        return data.finalUrl;
      }
      return null;
    });
  } catch (error) {
    throwError(error as Error, 'getRedirectLink');
    return null;
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

export { unique, delay, getRedirectLink, getUrlQuery };
