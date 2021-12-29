/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 15:49:55
 * @LastEditTime : 2021-12-28 19:04:10
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Gleam.d.ts
 */

interface gleamSocialTasks {
  steam: {
    groupLinks: Array<string>
    wishlistLinks: Array<string>
    followLinks: Array<string>
    curatorLinks: Array<string>
    curatorLikeLinks: Array<string>
  }
  twitter: {
    userLinks: Array<string>
    retweetLinks: Array<string>
  }
  twitch: {
    channelLinks: Array<string>
  }
  discord: {
    serverLinks: Array<string>
  }
  youtube: {
    channelLinks: Array<string>
  }
  extra: {
    gleam: Array<string>
  }
}
declare interface gleamGMTasks {
  tasks: gleamSocialTasks
  time: number
}
interface options {
  vlootUsername: string
  gameroundUsername: string
}
