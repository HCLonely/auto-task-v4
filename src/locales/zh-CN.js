/*
 * @Author       : HCLonely
 * @Date         : 2021-11-20 19:38:41
 * @LastEditTime : 2021-12-14 09:51:44
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/locales/zh-CN.js
 * @Description  :
 */
const data = {
  // 通用任务
  website: '网站',
  type: '类型',
  edit: '编辑',
  whiteList: '白名单',
  skipTask: '跳过取消做任务',
  whiteListOptions: '白名单设置',
  changeWhiteListOption: '设置白名单(%0)',
  whiteListNotFound: '找不到此项白名单: %0',
  changeWhiteListSuccess: '白名单修改成功，刷新生效！',
  save: '保存',
  close: '关闭',
  return: '返回',
  option: '选项',
  value: '值',
  websiteOptions: '当前网站设置',
  changeWebsiteOptionsSuccess: '更改当前网站设置成功，刷新生效！',
  needLogin: '请先登录！',
  getTasksInfo: '正在获取并处理任务信息',
  gettingKey: '正在获取Key...',
  verifyingTask: '正在验证任务',
  notice: '自动任务脚本提醒',
  noKeysLeft: '此页面已经没有剩余key了，是否关闭？',
  confirm: '确定',
  cancel: '取消',
  unKnown: '未知',
  unKnownTaskType: '未识别的任务',
  doing: '正在做任务',
  allTasksComplete: '所有任务已完成！',
  getTaskIdFailed: '获取任务Id失败！',
  initSuccess: '%0 初始化成功！',
  initFailed: '%0 初始化失败！',
  errorLink: '链接错误: %0',
  needInit: '请先初始化',
  verifyingAuth: '正在验证%0凭证...',
  updatingAuth: '正在更新%0凭证...',
  initing: '正在初始化...',
  getFailed: '获取%0失败！',
  checkLoginFailed: '检测登录状态失败！',
  checkLeftKeyFailed: '检测剩余Key失败！',
  userId: '用户Id',
  giveKeyNotice: '如果没有key, 请在<a href="https://givekey.ru/profile" target="_blank">https://givekey.ru/profile</a>查看',
  joiningGiveaway: '正在加入赠Key',
  needJoinGiveaway: '需要先加入赠Key',
  cannotUndo: '此网站不支持取消任务',
  verifyAuth: '正在验证 %0 凭证...',

  // Steam
  steamCommunity: 'Steam社区',
  steamStore: 'Steam商店',
  needLoginSteamStore: '请先<a href="https://store.steampowered.com/login/" target="_blank">登录Steam商店</a>',
  needLoginSteamCommunity: '请先<a href="https://steamcommunity.com/login/home/" target="_blank">登录Steam社区</a>',
  joiningSteamGroup: '正在加入Steam组',
  leavingSteamGroup: '正在退出Steam组',
  gettingSteamGroupId: '正在获取Steam组Id',
  subscribingForum: '正在订阅Steam论坛',
  unsubscribingForum: '正在取消订阅Steam论坛',
  gettingForumId: '正在获取Steam论坛Id',
  followingCurator: '正在关注Steam鉴赏家',
  unfollowingCurator: '正在取关Steam鉴赏家',
  addingToWishlist: '正在添加游戏到Steam愿望单',
  removingFromWishlist: '正在从Steam愿望单移除游戏',
  followingGame: '正在关注Steam游戏',
  unfollowingGame: '正在取关Steam游戏',
  favoritingWorkshop: '正在收藏Steam创意工坊物品',
  unfavoritingWorkshop: '正在取消收藏Steam创意工坊物品',
  gettingWorkshopAppId: '正在获取Steam创意工坊物品Id',
  votingUpWorkshop: '正在点赞Steam创意工坊物品',
  gettingAnnouncementParams: '正在获取Steam通知信息',
  likingAnnouncement: '正在点赞Steam通知',
  changingArea: '正在更换Steam地区: %0...',
  notNeededChangeArea: '当前地区不需要更换',
  noAnotherArea: '请检测是否开启正确开启代理',
  gettingAreaInfo: '正在获取Steam地区信息...',

  // Discord
  joiningDiscordServer: '正在加入Discord服务器',
  leavingDiscordServer: '正在退出Discord服务器',
  gettingDiscordGuild: '正在获取Discord服务器Id',

  // Instagram
  loginIns: '请先<a href="https://www.instagram.com/accounts/login/" target="_blank">登录Instagram</a>',
  insBanned: '您的Instagram账户已被封禁',
  verifyingInsAuth: '正在验证Instagram凭证...',
  gettingInsUserId: '正在获取Instagram用户Id',
  followingIns: '正在关注Instagram用户',
  unfollowingIns: '正在取关Instagram用户',

  // Reddit
  loginReddit: '请先<a href="https://www.reddit.com/login/" target="_blank">登录Reddit</a>',
  changingRedditVersion: '正在切换Reddit为新版页面...',
  joiningReddit: '正在加入Reddit社区',
  leavingReddit: '正在退出Reddit社区',
  followingRedditUser: '正在关注Reddit用户',
  unfollowingRedditUser: '正在取关Reddit用户',

  // Twitch
  followingTwitchChannel: '正在关注Twitch频道',
  unfollowingTwitchChannel: '正在取关Twitch频道',
  gettingTwitchChannelId: '正在获取Twitch频道Id',

  // Twitter
  followingTwitterUser: '正在关注推特用户',
  unfollowingTwitterUser: '正在取关推特用户',
  retweetting: '正在转推',
  unretweetting: '正在撤销转推',

  // Vk
  loginVk: '请先<a href="https://vk.com/login/" target="_blank">登录Vk</a>',
  gettingVkId: '正在获取Vk任务Id',
  joiningVkGroup: '正在加入Vk组',
  leavingVkGroup: '正在退出Vk组',
  joiningVkPublic: '正在加入Vk社区',
  leavingVkPublic: '正在退出Vk社区',
  sendingVkWall: '正在转发Vk动态',
  deletingVkWall: '正在撤销转发Vk动态',

  // YouTube
  loginYtb: '请先<a href="https://accounts.google.com/ServiceLogin?service=youtube" target="_blank">登录YouTube</a>',
  tryUpdateYtbAuth: '请尝试<a href="https://www.youtube.com/#auth" target="_blank">更新YouTube凭证</a>',
  gettingYtbToken: '正在获取YouTube Token...',
  followingYtbChannel: '正在订阅YouTube频道',
  unfollowingYtbChannel: '正在退订YouTube频道',
  likingYtbVideo: '正在点赞YouTube视频',
  unlikingYtbVideo: '正在取消点赞YouTube视频',

  // OpiumPulses
  noPoints: '点数不够，跳过抽奖',
  getNeedPointsFailed: '获取所需点数失败，跳过抽奖',
  joiningLottery: '正在加入抽奖',

  // gleam
  doingGleamTask: '正在做Gleam任务...',
  gettingGleamLink: '正在获取Gleam任务链接...',
  gleamTaskNotice: '如果此页面长时间未关闭，请完成任一任务后自行关闭！'
};
export default data;
