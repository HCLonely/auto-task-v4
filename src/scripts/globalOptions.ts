/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 16:41:12
 * @LastEditTime : 2021-12-24 17:24:14
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/globalOptions.ts
 * @Description  : 全局设置选项
 */

// eslint-disable-next-line
/// <reference path = "globalOptions.d.ts" />

const defaultGlobalOptions: globalOptions = {
  doTask: {
    discord: {
      servers: true
    },
    instagram: {
      users: true
    },
    twitch: {
      channels: true
    },
    twitter: {
      users: true,
      retweets: true,
      likes: true
    },
    vk: {
      names: true
    },
    youtube: {
      channels: true,
      likes: true
    },
    reddit: {
      reddits: true
    },
    steam: {
      groups: true,
      wishlists: true,
      follows: true,
      forums: true,
      workshops: true,
      curators: true,
      workshopVotes: true,
      curatorLikes: true,
      announcements: true
    }
  },
  undoTask: {
    discord: {
      servers: true
    },
    instagram: {
      users: true
    },
    twitch: {
      channels: true
    },
    twitter: {
      users: true,
      retweets: true,
      likes: true
    },
    vk: {
      names: true
    },
    youtube: {
      channels: true,
      likes: true
    },
    reddit: {
      reddits: true
    },
    steam: {
      groups: true,
      wishlists: true,
      follows: true,
      forums: true,
      workshops: true,
      curators: true,
      curatorLikes: true
    }
  },
  other: {
    twitterVerifyId: '783214',
    youtubeVerifyChannel: 'https://www.youtube.com/channel/UCrXUsMBcfTVqwAS7DKg9C0Q',
    checkLogin: true,
    checkLeftKey: true
  }
};

const userDefinedGlobalOptions = GM_getValue<object>('globalOptions') || {}; // eslint-disable-line new-cap
const assignObject = (obj1: globalOptions, obj2: object): globalOptions => {
  const newObj = {};
  for (const [key, value] of Object.entries(obj1)) {
    // @ts-ignore
    if (Object.prototype.toString.call(value) === '[object Object]' && Object.prototype.toString.call(obj2[key]) === '[object Object]') {
      // @ts-ignore
      newObj[key] = assignObject(value, obj2[key]);
    } else {
      // @ts-ignore
      newObj[key] = obj2[key] ?? value;
    }
  }
  return newObj as globalOptions;
};

const globalOptions = assignObject(defaultGlobalOptions, userDefinedGlobalOptions);

export default globalOptions;
