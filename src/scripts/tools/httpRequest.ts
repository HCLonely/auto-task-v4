/*
 * @Author       : HCLonely
 * @Date         : 2021-10-13 13:55:36
 * @LastEditTime : 2022-02-06 11:49:08
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/httpRequest.ts
 * @Description  : http请求函数封装
 */
import throwError from './throwError';

/**
 * 发送 HTTP 请求并返回响应结果。
 *
 * @param {httpRequestOptions} options - 请求的配置选项，包括请求方法、URL、数据类型等。
 * @param {number} [times=0] - 当前重试次数，默认为 0。
 *
 * @returns {Promise<httpResponse>} 返回一个 Promise，解析为 HTTP 响应对象。
 *
 * @throws {Error} 如果请求过程中发生错误，将抛出错误。
 */
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
            const headers: {[name: string]: any} = {};
            data.responseHeaders?.split('\n').forEach((header: string) => {
              const headerArr = header.trim().split(':');
              const name = headerArr.shift()?.trim() || '';
              const value = headerArr.join(':').trim();
              if (name && value) {
                if (headers[name]) {
                  if (Array.isArray(headers[name])) {
                    headers[name].push(value);
                  } else {
                    headers[name] = [headers[name], value];
                  }
                } else {
                  headers[name] = value;
                }
              }
            });

            if (headers['set-cookie'] && !Array.isArray(headers['set-cookie'])) {
              headers['set-cookie'] = [headers['set-cookie']];
            }
            data.responseHeadersText = data.responseHeaders;
            data.responseHeaders = headers;
            data.finalUrl = data.responseHeaders?.location || data.finalUrl;
            if (options.responseType === 'json' && data?.response && typeof data.response !== 'object') {
              try {
                data.response = JSON.parse(data.responseText);
              } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
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
