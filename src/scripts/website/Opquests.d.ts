/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 15:51:41
 * @LastEditTime : 2022-12-18 21:37:08
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Opquests.d.ts
 */

interface oqSocialTasks {
  steam: {
    groupLinks: Array<string>
    wishlistLinks: Array<string>
    followLinks: Array<string>
    curatorLikeLinks: Array<string>
  }
}
interface qpqTaskInfo {
  token: string
  taskId: string
  title: string
}
