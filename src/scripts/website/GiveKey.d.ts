/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 15:48:27
 * @LastEditTime : 2021-12-24 15:48:28
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/GiveKey.d.ts
 */

declare interface gkSocialTasks {
  steam: {
    groupLinks: Array<string>
    wishlistLinks: Array<string>
    curatorLinks: Array<string>
    curatorLikeLinks: Array<string>
  }
  twitter: {
    userLinks: Array<string>
  }
  vk: {
    nameLinks: Array<string>
  }
  discord: {
    serverLinks: Array<string>
  }
}
