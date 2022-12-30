/*
 * @Author       : HCLonely
 * @Date         : 2021-11-05 10:43:43
 * @LastEditTime : 2022-12-19 10:00:09
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Steam.d.ts
 */

declare interface areas {
  currentArea?: string
  areas?: Array<string>
}

declare interface followGameRequestData {
  sessionid: string
  appid: string
  unfollow?: string
}

declare interface announcementParams {
  authWgToken?: string
  clanId?: string
  gid?: string
}

declare interface steamTasksParam {
  groups?: Array<string>
  officialGroups?: Array<string>
  wishlists?: Array<string>
  follows?: Array<string>
  forums?: Array<string>
  workshops?: Array<string>
  curators?: Array<string>
  workshopVotes?: Array<string>
  curatorLikes?: Array<string>
  announcements?: Array<string>
  licenseLinks?: Array<string>
  playtestLinks?: Array<string>
}
declare interface storeTokenParam {
  steamID: string
  nonce: string
  redir: string
  auth: string
}
