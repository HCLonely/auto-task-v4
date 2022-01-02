/*
 * @Author       : HCLonely
 * @Date         : 2021-11-05 10:51:36
 * @LastEditTime : 2022-01-02 10:35:36
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Youtube.d.ts
 */
declare interface youtubeInfo {
  params?: {
    apiKey: string
    client: {
      visitorData: string
    }
    request: {
      sessionId: string
    }
    videoId?: string
    likeParams?: string
    channelId?: string
  }
  needLogin?: boolean
}
declare interface likeVideoData {
  context: {
    client: {
      visitorData: string
    },
    request: {
      sessionId: string
      internalExperimentFlags: Array<unknown>
      consistencyTokenJars: Array<unknown>
    },
    user: object
  },
  target: {
    videoId: string
  },
  params?: string
}
