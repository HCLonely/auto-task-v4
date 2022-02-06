/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 17:21:16
 * @LastEditTime : 2022-02-06 11:05:10
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
      users: boolean
      retweets: boolean
    },
    vk: {
      names: boolean
    },
    youtube: {
      channels: boolean
      likes: boolean
    },
    reddit: {
      reddits: boolean
    },
    steam: {
      groups: boolean
      officialGroups: boolean
      wishlists: boolean
      follows: boolean
      forums: boolean
      workshops: boolean
      curators: boolean
      workshopVotes: boolean
      announcements: boolean
      licenses: true
      playtests: true
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
      users: boolean
      retweets: boolean
    },
    vk: {
      names: boolean
    },
    youtube: {
      channels: boolean
      likes: boolean
    },
    reddit: {
      reddits: boolean
    },
    steam: {
      groups: boolean
      officialGroups: boolean
      wishlists: boolean
      follows: boolean
      forums: boolean
      workshops: boolean
      curators: boolean
    }
  },
  position: {
    buttonSideX: 'right' | 'left'
    buttonSideY: 'top' | 'bottom'
    buttonDistance: string
    showButtonSideX: 'right' | 'left'
    showButtonSideY: 'top' | 'bottom'
    showButtonDistance: string
    logSideX: 'right' | 'left'
    logSideY: 'top' | 'bottom'
    logDistance: string
  },
  hotKey: {
    doTaskKey: string
    undoTaskKey: string
    toggleLogKey: string
  },
  other: {
    twitterVerifyId: string
    youtubeVerifyChannel: string
    autoUpdateSource: 'github' | 'jsdelivr' | 'standby'
    language: string
    checkLogin: boolean
    checkLeftKey: boolean
    defaultShowButton: boolean
    defaultShowLog: boolean
    debug: boolean
  }
}
