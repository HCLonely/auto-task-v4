/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 14:58:11
 * @LastEditTime : 2021-10-26 15:01:18
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/mini.ts
 * @Description  :
 */
import throwError from "./throwError";
function unique(array:Array<any>):Array<any> {
  try {
    return [...new Set(array)];
  } catch (e) {
    throwError(e, 'unique');
    return [];
  }
}

function delay(time:number = 1000):Promise<true> {
  return new Promise(resolve => {
    setTimeout(() => { resolve(true) }, time)
  })
}

export { unique, delay }
