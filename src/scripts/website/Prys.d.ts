/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 15:52:25
 * @LastEditTime : 2021-12-28 19:06:58
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Prys.d.ts
 */

declare function checkClick(prarm: number): void
declare function getURLParameter(prarm: string): string
declare function showAlert(prarm1: string, prarm2: string): void
declare function captchaCheck(): void

interface prysSocialTasks {
  steam: {
    groupLinks: Array<string>
    curatorLinks: Array<string>
  }
}
declare interface prysGMTasks {
  tasks: prysSocialTasks
  time: number
}
