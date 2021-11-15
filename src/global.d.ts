/*
 * @Author       : HCLonely
 * @Date         : 2021-10-13 13:18:21
 * @LastEditTime : 2021-11-15 14:52:58
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/global.d.ts
 */

declare global {
  const unsafeWindow: {
    [name: string]: any
  };

  interface MonkeyXhrResponse {
    finalUrl: string
    readyState: number
    status: number
    statusText: string
    responseHeaders: any
    response: any
    responseXML: Document
    responseText: string
  }
  interface MonkeyXhrBasicDetails {
    method: 'GET' | 'POST' | 'HEAD' | 'DELETE'
    url: string
    headers?: { [name: string]: string },
    data?: string
    binary?: boolean
    timeout?: number
    nochche?: boolean
    context?: any
    responseType?: 'arraybuffer' | 'blob' | 'json'
    overrideMimeType?: string
    anonymous?: boolean
    fetch?: boolean
    username?: string
    password?: string
  }
  interface MonkeyXhrDetails extends MonkeyXhrBasicDetails {
    onabort?: (response: MonkeyXhrResponse) => void
    onerror?: (response: MonkeyXhrResponse) => void
    onloadstart?: (response: MonkeyXhrResponse) => void
    onprogress?: (response: MonkeyXhrResponse) => void
    onreadystatechange?: (response: MonkeyXhrResponse) => void
    ontimeout?: (response: MonkeyXhrResponse) => void
    onload?: (response: MonkeyXhrResponse) => void
  }
  interface httpRequestOptions extends MonkeyXhrDetails {
    dataType?: 'arraybuffer' | 'blob' | 'json'
  }
  interface httpResponse {
    result: string
    statusText: string
    status: number
    options: httpRequestOptions
    data?: MonkeyXhrResponse
    error?: Error
  }
  interface socialTasks {
    servers?: Array<string>
    users?: Array<string>
    reddits?: Array<string>
    channels?: Array<string>
    retweets?: Array<string>
    likes?: Array<string>
    names?: Array<string>
    groups?: Array<string>
    publics?: Array<string>
    walls?: Array<string>
    wishlists?: Array<string>
    follows?: Array<string>
    forums?: Array<string>
    workshops?: Array<string>
    curators?: Array<string>
    workshopVotes?: Array<string>
    curatorLikes?: Array<string>
    announcements?: Array<string>
  }
  type socialType = 'discord' | 'instagram' | 'reddit' | 'steam' | 'twitch' | 'twitter' | 'vk' | 'youtube'
  type taskTypes = 'servers' | 'users' | 'reddits' | 'channels' | 'retweets' | 'likes' | 'names' | 'groups' | 'publics' | 'walls' |
    'wishlists' | 'follows' | 'forums' | 'workshops' | 'curators' | 'workshopVotes' | 'curatorLikes' | 'announcements'

  interface discordTasks {
    servers: Array<string>
  }
  interface instagramTasks {
    users: Array<string>
  }
  interface redditTasks {
    reddits: Array<string>
  }
  interface steamTasks {
    groups: Array<string>
    wishlists: Array<string>
    follows: Array<string>
    forums: Array<string>
    workshops: Array<string>
    curators: Array<string>
    workshopVotes: Array<string>
    curatorLikes: Array<string>
    announcements: Array<string>
  }
  interface twitchTasks {
    channels: Array<string>
  }
  interface twitterTasks {
    users: Array<string>
    retweets: Array<string>
    likes: Array<string>
  }
  interface vkTasks {
    names: Array<string>
  }
  interface youtubeTasks {
    channels: Array<string>
    likes: Array<string>
  }
  interface whiteList {
    discord?: discordTasks
    instagram?: instagramTasks
    twitch?: twitchTasks
    twitter?: twitterTasks
    vk?: vkTasks
    youtube?: youtubeTasks
    reddit?: redditTasks
    steam?: steamTasks
  }
  interface auth {
    token?: string
    csrftoken?: string
    hash?: string
    auth?: string
    authToken?: string
    clientId?: string
    ct0?: string
    isLogin?: boolean
    PAPISID?: string
    storeSessionID?: string
    communitySessionID?: string
    steam64Id?: string
    userName?: string
  }
  interface cache {
    [name: string]: string
  }
  type steamCacheTypes = 'group' | 'forum' | 'workshop' | 'curator'

  interface steamCache {
    group: cache
    forum: cache
    workshop: cache
    curator: cache
  }

  interface logStatus {
    font?: JQuery
    success: (text?: string, html?: boolean) => logStatus
    error: (text?: string, html?: boolean) => logStatus
    warning: (text?: string, html?: boolean) => logStatus
    info: (text?: string, html?: boolean) => logStatus
    view: (text?: string, html?: boolean) => logStatus
  }
  function GM_xmlhttpRequest(details: MonkeyXhrDetails): { abort: () => void } // eslint-disable-line camelcase
  function GM_addStyle(style: string): void // eslint-disable-line camelcase
  function GM_setValue(name: string, value: any): void // eslint-disable-line camelcase
  function GM_getValue<T>(name: string, defaultValue?: T): undefined | T // eslint-disable-line camelcase
  function GM_openInTab(url: string, options?: { // eslint-disable-line camelcase
    active?: boolean
    insert?: boolean
    setParent?: boolean
    incognito?: boolean
  }): {
    close: () => void
    onclose: () => void
    closed: boolean
  }
  function sha1(value: string): string

}
export { };
