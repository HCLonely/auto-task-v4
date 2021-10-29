/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2021-10-27 14:10:32
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/index.ts
 * @Description  :
 */

import Discord from "./scripts/social/Discord";
import Instagram from "./scripts/social/Instagram";
import Reddit from "./scripts/social/Reddit";
import Twitch from "./scripts/social/Twitch";
import Twitter from "./scripts/social/Twitter";
import Vk from "./scripts/social/Vk";
import Youtube from "./scripts/social/Youtube";

if (window.location.hostname === 'discord.com' && window.location.search === '?updateDiscordAuth'){// todo: 登录
  GM_setValue('discordAuth', { auth: window.localStorage.getItem('token').replace(/^"|"$/g, '') });
  window.close();
}
window.onload = () => {
  unsafeWindow.Discord = Discord
  unsafeWindow.Instagram = Instagram
  unsafeWindow.Reddit = Reddit
  unsafeWindow.Twitch = Twitch
  unsafeWindow.Twitter = Twitter
  unsafeWindow.Vk = Vk
  unsafeWindow.Youtube = Youtube

  $('body').append(`<div id="fuck-task-info" style="position:fixed;bottom:10px;right:10px;width:300px;max-width:60%;"></div>`)
}
