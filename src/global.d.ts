/*
 * @Author       : HCLonely
 * @Date         : 2021-10-13 13:18:21
 * @LastEditTime : 2022-12-19 09:55:41
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/global.d.ts
 */

declare global {
  const unsafeWindow: {
    [name: string]: any
  };

  interface Array<T> {
    at(index: number): T | undefined;
  }

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
    data?: string | FormData
    binary?: boolean
    timeout?: number
    nochche?: boolean
    context?: any
    responseType?: 'arraybuffer' | 'blob' | 'json'
    overrideMimeType?: string
    anonymous?: boolean
    fetch?: boolean
    username?: string
    password?: string,
    redirect?: 'follow' | 'error' | 'manual'
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
    officialGroups?: Array<string>
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
    licenses?: Array<string>
    playtests?: Array<string>
  }
  type socialType = 'discord' | 'instagram' | 'reddit' | 'steam' | 'twitch' | 'twitter' | 'vk' | 'youtube'
  type taskTypes = 'servers' | 'users' | 'reddits' | 'channels' | 'retweets' | 'likes' | 'names' | 'groups' | 'officialGroups' | 'publics' | 'walls' |
    'wishlists' | 'follows' | 'forums' | 'workshops' | 'curators' | 'workshopVotes' | 'curatorLikes' | 'announcements' | 'licenses' | 'playtests'

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
    officialGroups: Array<string>
    wishlists: Array<string>
    follows: Array<string>
    forums: Array<string>
    workshops: Array<string>
    curators: Array<string>
    workshopVotes: Array<string>
    curatorLikes: Array<string>
    announcements: Array<string>
    licenses: Array<string>
    playtests: Array<string>
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
    deviceId?: string
    clientVersion?: string
    clientSessionId?: string
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
  type steamCacheTypes = 'group' | 'officialGroup' | 'forum' | 'workshop' | 'curator'

  interface steamCache {
    group: cache
    officialGroup: cache
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

  interface gmInfo {
    scriptHandler: string
    version: string
    script: {
      version: string
      name: string
      'run-at': string
    }
  }
  /* eslint-disable camelcase */
  const GM_info: gmInfo;
  function GM_xmlhttpRequest(details: MonkeyXhrDetails): { abort: () => void }
  function GM_addStyle(style: string): HTMLElement
  function GM_setValue(name: string, value: any): void
  function GM_getValue<T>(name: string, defaultValue?: T): undefined | T
  function GM_listValues(): Array<string>
  function GM_deleteValue(name: string): void
  function GM_registerMenuCommand(name: string, callback: () => void): void
  function GM_setClipboard(text: string, type?: string): void
  function GM_getResourceText(name: string): string
  function GM_openInTab(url: string, options?: {
    active?: boolean
    insert?: boolean
    setParent?: boolean
    incognito?: boolean
  }): {
    close: () => void
    onclose: () => void
    closed: boolean
    }
  function GM_addValueChangeListener<T>(key: string, callback: (key: string, old_value: T, new_value: T, remote: boolean) => void): number
  function GM_removeValueChangeListener(listenerId: number): void
  const GM_cookie: {
    list(details: {
      url?: string
      domain?: string
      name?: string
      path?: string
      partitionKey?: {
        topLevelSite?: string
      }
    }, callback?: (cookies: Array<{
      domain: string
      firstPartyDomain?: string
      partitionKey?: {
        topLevelSite?: string
      }
      hostOnly: boolean
      httpOnly: boolean
      name: string
      path: string
      sameSite: string
      secure: boolean
      session: boolean
      value: string
    }>, error: string | null) => void): void
  };

  /* eslint-enable camelcase */
  function sha1(value: string): string

  interface commonObject {
    [key: string]: any
  }

  interface Window {
    STYLE: HTMLElement
    DEBUG: boolean
    TRACE: boolean
  }
}

export { };
