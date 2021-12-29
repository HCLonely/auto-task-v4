/*
 * @Author       : HCLonely
 * @Date         : 2021-11-04 17:37:43
 * @LastEditTime : 2021-12-28 19:01:13
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Freeanywhere.d.ts
 */
declare interface fawSocialTasks {
  steam: {
    groupLinks: Array<string>
    wishlistLinks: Array<string>
    curatorLinks: Array<string>
    followLinks: Array<string>
  }
  vk: {
    nameLinks: Array<string>
  }
}
declare interface fawGMTasks {
  tasks: fawSocialTasks
  time: number
}
declare interface fawTaskInfo {
  id: string
  title: string
  social?: string
  type?: string
}
