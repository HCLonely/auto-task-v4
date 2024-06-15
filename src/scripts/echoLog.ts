/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:03:26
 * @LastEditTime : 2022-11-29 09:18:54
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/echoLog.ts
 * @Description  :
 */
import throwError from './tools/throwError';
import __ from './tools/i18n';

const echoLog = ({ type, text, html, id }: { type?: string, text?: string, html?: string, id?: string }): logStatus => {
  const emptyStatus = {
    success: () => emptyStatus,
    error: () => emptyStatus,
    warning: () => emptyStatus,
    info: () => emptyStatus,
    view: () => emptyStatus
  };
  try {
    let ele: JQuery;
    if (type) {
      switch (type) {
      case 'joiningSteamGroup':
      case 'leavingSteamGroup':
      case 'gettingSteamGroupId':
        ele = $(`<li>${__(type)}[<a href="https://steamcommunity.com/groups/${text}" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'joiningSteamOfficialGroup':
      case 'leavingSteamOfficialGroup':
      case 'gettingSteamOfficialGroupId':
        ele = $(`<li>${__(type)}[<a href="https://steamcommunity.com/games/${text}" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'subscribingForum':
      case 'unsubscribingForum':
      case 'gettingForumId':
        ele = $(`<li>${__(type)}[<a href="https://steamcommunity.com/app/${text}/discussions/" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'followingCurator':
      case 'unfollowingCurator':
      case 'gettingCuratorId':
        ele = $(`<li>${__(type)}[<a href="https://store.steampowered.com/${
          text?.includes('/') ? text : `curator/${text}`
        }" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'addingToWishlist':
      case 'removingFromWishlist':
      case 'followingGame':
      case 'unfollowingGame':
      case 'gettingSubid':
      case 'addingFreeLicense':
      case 'requestingPlayTestAccess':
        ele = $(`<li>${__(type)}[<a href="https://store.steampowered.com/app/${text}" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'addingFreeLicenseSubid':
        ele = $(`<li>${__('addingFreeLicense')}[<a href="https://steamdb.info/sub/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'favoritingWorkshop':
      case 'unfavoritingWorkshop':
      case 'gettingWorkshopAppId':
      case 'votingUpWorkshop':
        ele = $(`<li>${__(type)}[<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=${text}" target="_blank">
      ${text}</a>]...<font></font></li>`);
        break;
      case 'gettingAnnouncementParams':
      case 'likingAnnouncement':
        ele = $(`<li>${__(type)}[<a href="https://store.steampowered.com/news/app/${text}/view/${id}" target="_blank">
      ${id}</a>]...<font></font></li>`);
        break;
      case 'joiningDiscordServer':
      case 'gettingDiscordGuild':
        ele = $(`<li>${__(type)}[<a href="https://discord.com/invite/${text}" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'leavingDiscordServer':
        ele = $(`<li>${__(type)}[<a href="https://discord.com/channels/@me/${text}" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'updateDiscordAuth':
        ele = $(`<li style="color:red;">${__('updateDiscordAuth')}</li>`);
        break;
      case 'followingTwitchChannel':
      case 'unfollowingTwitchChannel':
      case 'gettingTwitchChannelId':
        ele = $(`<li>${__(type)}[<a href="https://www.twitch.tv/${text}" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'gettingInsUserId':
      case 'followingIns':
      case 'unfollowingIns':
        ele = $(`<li>${__(type)}[<a href="https://www.instagram.com/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'gettingTwitterUserId':
      case 'followingTwitterUser':
      case 'unfollowingTwitterUser':
        ele = $(`<li>${__(type)}[<a href="https://x.com/${text}" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'retweetting':
      case 'unretweetting':
        ele = $(`<li>${__(type)}${text}...<font></font></li>`);
        break;
      case 'joiningReddit':
      case 'leavingReddit':
        ele = $(`<li>${__(type)}[<a href="https://www.reddit.com/r/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'followingRedditUser':
      case 'unfollowingRedditUser':
        ele = $(`<li>${__(type)}[<a href="https://www.reddit.com/user/${text?.replace('u_', '')}" target="_blank">
      ${text?.replace('u_', '')}</a>]...<font></font></li>`);
        break;
      case 'followingYtbChannel':
      case 'unfollowingYtbChannel':
        ele = $(`<li>${__(type)}[<a href="https://www.youtube.com/channel/${text}" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'likingYtbVideo':
      case 'unlikingYtbVideo':
        ele = $(`<li>${__(type)}[<a href="https://www.youtube.com/watch?v=${text}" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'gettingVkId':
      case 'joiningVkGroup':
      case 'leavingVkGroup':
      case 'joiningVkPublic':
      case 'leavingVkPublic':
      case 'sendingVkWall':
      case 'deletingVkWall':
        ele = $(`<li>${__(type)}[<a href="https://vk.com/${text}/" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'visitingLink':
        ele = $(`<li>${__('visitingLink')}[<a href="${text}" target="_blank">${text}</a>]...<font></font></li>`);
        break;
      case 'verifyingInsAuth':
      case 'text':
        ele = $(`<li>${__(text as string)}<font></font></li>`);
        break;
      case 'html':
        ele = $(text || html as string);
        break;
      case 'whiteList':
        ele = $(`<li><font class="warning">${__('skipTask')}[${text}(${id})](${__('whiteList')})</font></li>`);
        break;
      case 'globalOptionsSkip':
        ele = $(`<li>${__('skipTaskOption')}<font class="warning">${text}</font></li>`);
        break;
      default:
        ele = $(`<li>${__('unKnown')}:${type}(${text})...<font></font></li>`);
        break;
      }
    } else if (text) {
      ele = $(`<li>${__(text as string)}<font></font></li>`);
    } else if (html) {
      ele = $(html as string);
    } else {
      ele = $('<li><font></font></li>');
    }
    ele.addClass('card-text');
    $('#auto-task-info').append(ele);
    ele[0]?.scrollIntoView();
    const font: JQuery = ele.find('font');
    const status: logStatus = {
      font,
      success(text = 'Success', html = false) {
        this.font?.attr('class', '').addClass('success');
        html ? this.font?.html(text) : this.font?.text(text);
        return this;
      },
      error(text = 'Error', html = false) {
        this.font?.attr('class', '').addClass('error');
        html ? this.font?.html(text) : this.font?.text(text);
        return this;
      },
      warning(text = 'Warning', html = false) {
        this.font?.attr('class', '').addClass('warning');
        html ? this.font?.html(text) : this.font?.text(text);
        return this;
      },
      info(text = 'Info', html = false) {
        this.font?.attr('class', '').addClass('info');
        html ? this.font?.html(text) : this.font?.text(text);
        return this;
      },
      view() {
        this.font?.[0].scrollIntoView();
        return this;
      }
    };
    return status;
  } catch (error) {
    throwError(error as Error, 'echoLog');
    return emptyStatus;
  }
};

export default echoLog;
