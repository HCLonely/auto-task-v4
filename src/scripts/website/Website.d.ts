/*
 * @Author       : HCLonely
 * @Date         : 2021-11-05 11:32:20
 * @LastEditTime : 2022-01-30 11:31:39
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Website.d.ts
 * @Description  :
 */

declare interface discordWebTasks {
  serverLinks?: Array<string>
}
declare interface instagramWebTasks {
  userLinks?: Array<string>
}
declare interface redditWebTasks {
  redditLinks?: Array<string>
}
declare interface steamWebTasks {
  groupLinks?: Array<string>
  officialGroupLinks?: Array<string>
  wishlistLinks?: Array<string>
  followLinks?: Array<string>
  forumLinks?: Array<string>
  workshopLinks?: Array<string>
  curatorLinks?: Array<string>
  workshopVoteLinks?: Array<string>
  curatorLikeLinks?: Array<string>
  announcementLinks?: Array<string>
  licenseLinks?: Array<string>
}
declare interface twitchWebTasks {
  channelLinks?: Array<string>
}
declare interface twitterWebTasks {
  userLinks?: Array<string>
  retweetLinks?: Array<string>
  likeLinks?: Array<string>
}
declare interface vkWebTasks {
  nameLinks?: Array<string>
}
declare interface youtubeWebTasks {
  channelLinks?: Array<string>
  likeLinks?: Array<string>
}
declare interface extraTasks {
  [name: string]: Array<string>
}
declare interface webSocialTasks {
  discord?: discordWebTasks
  instagram?: instagramWebTasks
  twitch?: twitchWebTasks
  twitter?: twitterWebTasks
  vk?: vkWebTasks
  youtube?: youtubeWebTasks
  reddit?: redditWebTasks
  steam?: steamWebTasks
  links?: Array<string>
  extra?: extraTasks
}
declare interface bindReturn {
  name: string
  result: boolean
}

declare function initFunction():Promise<boolean>
