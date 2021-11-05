/*
 * @Author       : HCLonely
 * @Date         : 2021-11-05 10:43:43
 * @LastEditTime : 2021-11-05 10:43:44
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Steam.d.ts
 * @Description  :
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
  wishlists?: Array<string>
  follows?: Array<string>
  forums?: Array<string>
  workshops?: Array<string>
  curators?: Array<string>
  workshopVotes?: Array<string>
  curatorLikes?: Array<string>
  announcements?: Array<string>
}
