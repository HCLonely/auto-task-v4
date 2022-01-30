/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 15:50:42
 * @LastEditTime : 2022-01-30 11:48:25
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Keyhub.d.ts
 */

interface khSocialTasks {
  steam: {
    groupLinks: Array<string>
    officialGroupLinks: Array<string>
    wishlistLinks: Array<string>
    curatorLinks: Array<string>
  }
  discord: {
    serverLinks: Array<string>
  }
  links: Array<string>
}
declare interface khGMTasks {
  tasks: khSocialTasks
  time: number
}

declare function VerifyTasks(value: string): void
