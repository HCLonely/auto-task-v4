/*
 * @Author       : HCLonely
 * @Date         : 2021-10-13 14:08:18
 * @LastEditTime : 2021-10-13 14:11:51
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/tools/throwError.ts
 * @Description  : 错误处理函数
 */

export default function throwError(error:Error, name:string):void {
  console.log('%c%s', 'color:white;background:red', `${name}\n${error.stack}`);
}
