/*
 * @Author       : HCLonely
 * @Date         : 2021-11-08 10:43:23
 * @LastEditTime : 2021-11-13 09:49:39
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Giveawaysu.d.ts
 * @Description  :
 */

declare interface gasSocialTasks {
  steam: {
    groupLinks: Array<string>
    wishlistLinks: Array<string>
    curatorLinks: Array<string>
    curatorLikeLinks: Array<string>
    followLinks: Array<string>
    forumLinks: Array<string>
    announcementLinks: Array<string>
    workshopVoteLinks: Array<string>
  },
  discord: {
    serverLinks: Array<string>
  },
  instagram: {
    userLinks: Array<string>
  },
  vk: {
    nameLinks: Array<string>
  },
  twitch: {
    channelLinks: Array<string>
  },
  reddit: {
    redditLinks: Array<string>
  },
  youtube: {
    channelLinks: Array<string>
    likeLinks: Array<string>
  }
}
declare interface gasTaskInfo {
  id: string
  title: string
  done: boolean
  link: string
  social?: string
  type?: string
}