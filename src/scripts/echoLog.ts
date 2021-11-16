/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:03:26
 * @LastEditTime : 2021-11-16 10:08:39
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/echoLog.ts
 * @Description  :
 */
import throwError from './tools/throwError';
import getI18n from './i18n/i18n';

const echoLog = ({ type = 'text', text, url, id }: { type?: string, text?: string, url?: string, id?: string }): logStatus => {
  try {
    let ele: JQuery;
    switch (type) {
    case 'updateSteamCommunity':
      ele = $(`<li>${getI18n('updateCommunityId')}<font></font></li>`);
      break;
    case 'updateSteamStore':
      ele = $(`<li>${getI18n('updateStoreId')}<font></font></li>`);
      break;
    case 'joinSteamGroup':
    case 'leaveSteamGroup':
    case 'getSteamGroupId':
      ele = $(`<li>${getI18n(type)}<a href="https://steamcommunity.com/groups/${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'subscribeForum':
    case 'unsubscribeForum':
    case 'getForumId':
      ele = $(`<li>${getI18n(type)}<a href="https://steamcommunity.com/app/${text}/discussions/" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'followCurator':
    case 'unfollowCurator':
    case 'getCuratorId':
      ele = $(`<li>${getI18n(type)}<a href="https://store.steampowered.com/${
        text?.includes('/') ? text : `curator/${text}`
      }" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'getDeveloperId':
    case 'followDeveloper':
    case 'unfollowDeveloper':
      ele = $(`<li>${getI18n(type)}<a href="https://store.steampowered.com/developer/${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'getPublisherId':
    case 'followPublisher':
    case 'unfollowPublisher':
      ele = $(`<li>${getI18n(type)}<a href="https://store.steampowered.com/publisher/${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'getFranchiseId':
    case 'followFranchise':
    case 'unfollowFranchise':
      ele = $(`<li>${getI18n(type)}<a href="https://store.steampowered.com/franchise/${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'addWishlist':
    case 'removeWishlist':
    case 'followGame':
    case 'unfollowGame':
      ele = $(`<li>${getI18n(type)}<a href="https://store.steampowered.com/app/${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'favoriteWorkshop':
    case 'unfavoriteWorkshop':
    case 'getWorkshopAppId':
    case 'voteupWorkshop':
      ele = $(`<li>${getI18n(type)}<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=${text}" target="_blank">
      ${text}</a>...<font></font></li>`);
      break;
    case 'likeAnnouncements':
      ele = $(`<li>${getI18n('likeAnnouncements')}<a href="${url}" target="_blank">${id}</a>...<font></font></li>`);
      break;
    case 'changeCountry':
      ele = $(`<li>${getI18n('changeCountry')}${text}...<font></font></li>`);
      break;
    case 'joinDiscordServer':
    case 'leaveDiscordServer':
    case 'getDiscordGuild':
      ele = $(`<li>${getI18n(type)}<a href="https://discord.com/invite/${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'updateDiscordAuth':
      ele = $(`<li style="color:red;">${getI18n('updateDiscordAuth')}</li>`);
      break;
    case 'followTwitchChannel':
    case 'unfollowTwitchChannel':
    case 'getTwitchChannelId':
      ele = $(`<li>${getI18n(type)}<a href="https://www.twitch.tv/${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'getInsInfo':
      ele = $(`<li>${getI18n('getInsInfo')}<a href="https://www.instagram.com/${text}/" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'followIns':
    case 'unfollowIns':
      ele = $(`<li>${getI18n(type)}<a href="https://www.instagram.com/${text}/" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'getTwitterUserId':
    case 'followTwitterUser':
    case 'unfollowTwitterUser':
      ele = $(`<li>${getI18n(type)}<a href="https://twitter.com/${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'retweet':
    case 'unretweet':
      ele = $(`<li>${getI18n(type)}${text}...<font></font></li>`);
      break;
    case 'joinReddit':
    case 'leaveReddit':
      ele = $(`<li>${getI18n(type)}<a href="https://www.reddit.com/r/${text}/" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'followRedditUser':
    case 'unfollowRedditUser':
      ele = $(`<li>${getI18n(type)}<a href="https://www.reddit.com/user/${text?.replace('u_', '')}" target="_blank">
      ${text?.replace('u_', '')}</a>...<font></font></li>`);
      break;
    case 'followYtbChannel':
    case 'unfollowYtbChannel':
      ele = $(`<li>${getI18n(type)}<a href="https://www.youtube.com/channel/${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'likeYtbVideo':
    case 'unlikeYtbVideo':
      ele = $(`<li>${getI18n(type)}<a href="https://www.youtube.com/watch?v=${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'getVkId':
    case 'joinVkGroup':
    case 'leaveVkGroup':
    case 'joinVkPublic':
    case 'leaveVkPublic':
    case 'repostVkWall':
      ele = $(`<li>${getI18n(type)}<a href="https://vk.com/${text}/" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'visitLink':
      ele = $(`<li>${getI18n('visitLink')}<a href="${text}" target="_blank">${text}</a>...<font></font></li>`);
      break;
    case 'text':
      ele = $(`<li>${getI18n(text)}<font></font></li>`);
      break;
    case 'html':
    case 'custom':
      ele = $(text as string);
      break;
    default:
      ele = $(`<li>${getI18n('unknown')}:${type}(${text})...<font></font></li>`);
      break;
    }
    ele.addClass('card-text');
    $('#fuck-task-info').append(ele);
    ele[0].scrollIntoView();
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
    const status = {
      success: () => status,
      error: () => status,
      warning: () => status,
      info: () => status,
      view: () => status
    };
    return status;
  }
};

export default echoLog;
