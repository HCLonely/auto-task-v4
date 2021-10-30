/*
 * @Author       : HCLonely
 * @Date         : 2021-10-13 13:55:36
 * @LastEditTime : 2021-10-30 10:28:39
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/httpRequest.ts
 * @Description  : http请求函数封装
 */
import throwError from './throwError';
const httpRequest = async (options: httpRequestOptions, times = 0): Promise<httpResponse> => {
  try {
    const result = await new Promise<httpResponse>((resolve) => {
      if (options.dataType) {
        options.responseType = options.dataType;
      }
      const requestObj: httpRequestOptions = {
        ...{
          timeout: 30000,
          ontimeout(data) {
            resolve({ result: 'Error', statusText: 'Timeout', status: 601, data, options });
          },
          onabort(data) {
            resolve({ result: 'Error', statusText: 'Aborted', status: 602, data, options });
          },
          onerror(data) {
            resolve({ result: 'Error', statusText: 'Error', status: 603, data, options });
          },
          onload(data) {
            resolve({ result: 'Success', statusText: 'Load', status: 600, data, options });
          }
        }, ...options
      };
      GM_xmlhttpRequest(requestObj); // eslint-disable-line new-cap
    });
    console.log('发送请求:', result);
    if (result.status !== 600 && times < 2) {
      return await httpRequest(options, times + 1);
    }
    return result;
  } catch (error) {
    throwError(error as Error, 'httpRequest');
    console.log('发送请求:', { errorMsg: error, options });
    return { result: 'JsError', statusText: 'Error', status: 604, error: error as Error, options };
  }
};

export default httpRequest;
