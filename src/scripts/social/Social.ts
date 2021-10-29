/* eslint-disable import/no-unresolved, import/extensions */
/*
 * @Author       : HCLonely
 * @Date         : 2021-10-15 10:48:42
 * @LastEditTime : 2021-10-28 16:33:30
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Social.ts
 * @Description  :
 */
import throwError from '../tools/throwError';
import { unique } from '../tools/tools';

class Social {
  tasks: socialTasks;
  whiteList: socialTasks;
  auth: auth;
  cache: cache;

  // 通用
  getRealParams(name: string, params: Array<string>, links: Array<string>, doTask: boolean, link2param: (link: string) => string): Array<string> {
    try {
      let realParams = [];
      if (params.length > 0) {
        realParams = [...params];
      }
      if (links.length > 0) {
        realParams = [
          ...realParams,
          ...links
            .map((link) => link2param(link))
            .filter((link) => link)
        ];
      }
      if (!doTask && this.tasks[name].length > 0) {
        realParams = [
          ...realParams,
          ...this.tasks[name]
        ];
      }
      return unique(realParams);
    } catch (error) {
      throwError(error, 'Social.getRealParams');
      return [];
    }
  }
}

export default Social;
