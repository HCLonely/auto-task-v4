/*
 * @Author       : HCLonely
 * @Date         : 2021-10-13 13:55:36
 * @LastEditTime : 2022-02-06 11:49:08
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/httpRequest.ts
 * @Description  : http请求函数封装
 */
import throwError from './throwError';
const httpRequest = async (options: httpRequestOptions, times = 0): Promise<httpResponse> => {
  if (window.TRACE) console.trace('%cAuto-Task[Debug]:', 'color:blue');
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
            if (options.responseType === 'json' && data?.response && typeof data.response !== 'object') {
              try {
                data.response = JSON.parse(data.responseText);
              } catch (error) {
                //
              }
            }
            resolve({ result: 'Success', statusText: 'Load', status: 600, data, options });
          }
        }, ...options
      };
      GM_xmlhttpRequest(requestObj);
    });
    if (window.DEBUG) console.log('%cAuto-Task[httpRequest]:', 'color:blue', JSON.stringify(result));
    if (result.status !== 600 && times < 2) {
      return await httpRequest(options, times + 1);
    }
    return result;
  } catch (error) {
    console.log('%cAuto-Task[httpRequest]:', 'color:red', JSON.stringify({ errorMsg: error, options }));
    throwError(error as Error, 'httpRequest');
    return { result: 'JsError', statusText: 'Error', status: 604, error: error as Error, options };
  }
};

export default httpRequest;
