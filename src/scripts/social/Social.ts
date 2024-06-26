/*
 * @Author       : HCLonely
 * @Date         : 2021-10-15 10:48:42
 * @LastEditTime : 2022-05-18 09:49:49
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Social.ts
 * @Description  : Social通用模板
 */

import throwError from '../tools/throwError';
import { unique } from '../tools/tools';

interface toggleParams {
  [name:string]:unknown
}
abstract class Social {
  tasks!: socialTasks;

  abstract init(options?: any): Promise<boolean | 'skip'>
  abstract toggle(toggleParams: toggleParams): Promise<boolean>

  protected getRealParams(
    name: taskTypes,
    // params: Array<string>,
    links: Array<string>,
    doTask: boolean,
    link2param: (link: string) => string | undefined
  ): Array<string> {
    /**
     * @internal
     * @description 将传入的链接转换为做任务需要的参数
     * @return {Array}: 参数数组
    */
    try {
      let realParams: Array<string> = [];
      /*
      if (params.length > 0) {
        realParams = [...params];
      }
      */
      if (links.length > 0) {
        realParams = [
          ...realParams,
          ...links
            .map((link) => link2param(link))
            .filter((link) => link) as Array<string>
        ];
      }
      if (!doTask && (this.tasks[name] as Array<string>).length > 0) {
        realParams = [
          ...realParams,
          ...this.tasks[name] as Array<string>
        ];
      }
      return unique(realParams);
    } catch (error) {
      throwError(error as Error, 'Social.getRealParams');
      return [];
    }
  }
}

export default Social;
