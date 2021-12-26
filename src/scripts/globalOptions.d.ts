/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 17:21:16
 * @LastEditTime : 2021-12-26 20:14:59
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/globalOptions.d.ts
 */

interface globalOptions {
  doTask: {
    discord: {
      servers: boolean
    },
    instagram: {
      users: boolean
    },
    twitch: {
      channels: boolean
    },
    twitter: {
      users: boolean,
      retweets: boolean
    },
    vk: {
      names: boolean
    },
    youtube: {
      channels: boolean,
      likes: boolean
    },
    reddit: {
      reddits: boolean
    },
    steam: {
      groups: boolean,
      wishlists: boolean,
      follows: boolean,
      forums: boolean,
      workshops: boolean,
      curators: boolean,
      workshopVotes: boolean,
      announcements: boolean
    }
  },
  undoTask: {
    discord: {
      servers: boolean
    },
    instagram: {
      users: boolean
    },
    twitch: {
      channels: boolean
    },
    twitter: {
      users: boolean,
      retweets: boolean
    },
    vk: {
      names: boolean
    },
    youtube: {
      channels: boolean,
      likes: boolean
    },
    reddit: {
      reddits: boolean
    },
    steam: {
      groups: boolean,
      wishlists: boolean,
      follows: boolean,
      forums: boolean,
      workshops: boolean,
      curators: boolean
    }
  },
  other: {
    twitterVerifyId: string,
    youtubeVerifyChannel: string,
    checkLogin: boolean,
    checkLeftKey: boolean,
    defaultShowButton: boolean
  }
}
