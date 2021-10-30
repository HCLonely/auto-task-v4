/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 14:58:11
 * @LastEditTime : 2021-10-30 12:22:52
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/tools.ts
 * @Description  :
 */
import throwError from './throwError';
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

export { unique, delay };
