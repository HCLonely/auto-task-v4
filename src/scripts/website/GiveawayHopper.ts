/*
 * @Author       : HCLonely
 * @Date         : 2021-11-19 14:42:43
 * @LastEditTime : 2024-09-06 16:40:01
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-v4/src/scripts/website/GiveawayHopper.ts
 * @Description  : https://giveawayhopper.com/
 */

/* eslint-disable @typescript-eslint/no-empty-function */
// eslint-disable-next-line
/// <reference path = "GiveawayHopper.d.ts" />

import Swal from 'sweetalert2';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import httpRequest from '../tools/httpRequest';
import { delay, getRedirectLink } from '../tools/tools';
import { globalOptions } from '../globalOptions';

const defaultTasksTemplate: giveawayHopperSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    followLinks: [],
    curatorLinks: [],
    curatorLikeLinks: []
  },
  twitter: {
    userLinks: [],
    retweetLinks: []
  },
  twitch: {
    channelLinks: []
  },
  discord: {
    serverLinks: []
  },
  youtube: {
    channelLinks: []
  },
  extra: {
    giveawayHopper: []
  }
};
const defaultTasks = JSON.stringify(defaultTasksTemplate);

/**
 * 表示 GiveawayHopper 网站的任务处理类。
 *
 * @class GiveawayHopper
 * @extends Website
 *
 * @property {string} name - 网站名称，默认为 'GiveawayHopper'。
 * @property {giveawayHopperSocialTasks} undoneTasks - 社交任务列表。
 * @property {giveawayHopperSocialTasks} socialTasks - 存储已完成的社交任务。
 * @property {Array<string>} buttons - 可用的操作按钮数组，包括 'doTask'、'undoTask' 和 'verifyTask'。
 *
 * @static
 * @method test - 检查当前域名是否为 GiveawayHopper 网站。
 * @returns {boolean} 如果当前域名为 'giveawayHopper.io'，则返回 true；否则返回 false。
 *
 * @method before - 在执行操作之前重写全局的确认、警告和提示对话框。
 * @returns {void} 无返回值。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @method after - 页面加载后的异步方法，执行后续操作。
 * @returns {Promise<void>} 无返回值。
 * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
 *
 * @method init - 初始化方法，尝试初始化抽奖功能。
 * @returns {boolean} 如果初始化成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
 *
 * @method classifyTask - 分类任务的异步方法。
 * @param {'do' | 'undo'} action - 要执行的操作类型。
 * @returns {Promise<boolean>} 如果任务分类成功，则返回 true；否则返回 false。
 * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
 *
 * @method extraDoTask - 执行额外任务的异步方法。
 * @param {Object} params - 方法参数对象。
 * @param {Array<string>} params.giveawayHopper - 包含要执行的GiveawayHopper任务链接的数组。
 * @returns {Promise<boolean>} 如果所有任务成功执行，则返回 true；否则返回 false。
 * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
 *
 * @method verifyTask - 验证任务的异步方法。
 * @returns {Promise<boolean>} 如果所有任务成功验证，则返回 true；否则返回 false。
 * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
 *
 * @private
 * @method #checkSync - 检查同步状态的私有异步方法。
 * @returns {Promise<boolean>} 如果同步完成，则返回 true；如果发生错误，则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #doGiveawayHopperTask - 执行GiveawayHopper任务的私有异步方法。
 * @param {string} link - 要执行的GiveawayHopper任务链接。
 * @returns {Promise<boolean>} 如果任务成功执行，则返回 true；否则返回 false。
 * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
 *
 * @private
 * @method #getGiveawayId - 获取抽奖ID的方法。
 * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 *
 * @private
 * @method #checkLeftKey - 检查剩余密钥的私有异步方法。
 * @returns {Promise<boolean>} 如果检查成功，则返回 true；如果发生错误，则返回 false。
 * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
 */
class GiveawayHopper extends Website {
  name = 'GiveawayHopper';
  undoneTasks: giveawayHopperSocialTasks = JSON.parse(defaultTasks);
  socialTasks: giveawayHopperSocialTasks = JSON.parse(defaultTasks);
  tasks: Array<giveawayHopperReturnTaskInfo> = [];
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'verifyTask'
  ];

  /**
   * 检查当前域名是否为 GiveawayHopper 网站的静态方法
   *
   * @returns {boolean} 如果当前域名为 'giveawayHopper.io'，则返回 true；否则返回 false。
   *
   * @description
   * 该方法通过比较当前窗口的域名来判断是否为 GiveawayHopper 网站。
   * 如果域名匹配，则返回 true；否则返回 false。
   */
  static test(): boolean {
    return window.location.host === 'giveawayhopper.com';
  }
  /**
   * 页面加载后的异步方法
   *
   * @returns {Promise<void>} 无返回值。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法在特定条件下执行后续操作。
   * 首先检查当前URL中是否包含特定的查询参数。
   * 如果包含，则设置一个定时器，检查任务是否完成。
   * 遍历页面中的每个任务，查找可点击的元素并执行点击操作。
   * 在每次点击后，等待 1 秒钟以确保操作完成。
   * 如果未找到特定查询参数，则检查剩余密钥的状态。
   * 如果检查失败，则记录相应的警告信息。
   */
  async after(): Promise<void> {
    try {
      if (!this.#checkLogin()) {
        echoLog({}).warning(__('checkLoginFailed'));
      }
      this.#getGiveawayId();
    } catch (error) {
      throwError(error as Error, 'GiveawayHopper.after');
    }
  }

  /**
   * 初始化方法
   *
   * @returns {boolean} 如果初始化成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在初始化过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法尝试初始化抽奖功能。
   * 首先记录初始化状态。如果获取抽奖ID失败，则返回 false。
   * 如果成功获取抽奖ID，则将 `initialized` 属性设置为 true，并记录成功信息。
   */
  async init(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'GiveawayHopper.init');
      return false;
    }
  }

  /**
   * 分类任务的异步方法
   *
   * @param {'do' | 'undo'} action - 要执行的操作类型，'do' 表示执行任务，'undo' 表示撤销任务。
   * @returns {Promise<boolean>} 如果任务分类成功，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在分类过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法根据传入的操作类型分类任务。
   * 如果操作为 'undo'，则从存储中获取任务信息。
   * 遍历页面中的任务，提取任务链接并根据任务类型分类到相应的社交任务列表中。
   * 处理完成后，记录成功信息并将分类后的任务存储到本地。
   */
  async classifyTask(action: 'do' | 'undo'): Promise<boolean> {
    try {
      if (!this.giveawayId) {
        await this.#getGiveawayId();
      }
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<giveawayHopperGMTasks>(`giveawayHopperTasks-${this.giveawayId}`)?.tasks || JSON.parse(defaultTasks);
      }

      const { result, statusText, status, data } = await httpRequest({
        url: `https://giveawayhopper.com/api/v1/campaigns/${this.giveawayId}/with-auth`,
        method: 'GET',
        responseType: 'json',
        fetch: true,
        headers: {
          authorization: `Bearer ${window.sessionStorage.gw_auth}`,
          'x-xsrf-token': decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] as string)
        }
      });
      if (result === 'Success') {
        if (data?.status === 200 && data?.response?.tasks) {
          this.tasks = data.response.tasks;
          for (const task of data.response.tasks) {
            if (task.isDone) continue;
            await httpRequest({
              url: `https://giveawayhopper.com/api/v1/campaigns/${this.giveawayId}/tasks/${task.id}/visited`,
              method: 'GET',
              responseType: 'json',
              fetch: true,
              headers: {
                authorization: `Bearer ${window.sessionStorage.gw_auth}`,
                'x-xsrf-token': decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] as string)
              }
            });

            if (task.category === 'Steam' && task.type === 'JoinGroup') {
              const steamGroupLink = await getRedirectLink(`https://steamcommunity.com/gid/${task.group_id}`);
              if (!steamGroupLink) continue;
              if (action === 'undo') this.socialTasks.steam.groupLinks.push(steamGroupLink);
              if (action === 'do') this.undoneTasks.steam.groupLinks.push(steamGroupLink);
              continue;
            }
            if (task.category === 'Discord' && task.type === 'JoinServer') {
              if (action === 'undo') this.socialTasks.discord.serverLinks.push(`https://discord.gg/${task.invite_code}`);
              if (action === 'do') this.undoneTasks.discord.serverLinks.push(`https://discord.gg/${task.invite_code}`);
              continue;
            }
            if (['TikTok', 'YouTube', 'General'].includes(task.category)) {
              continue;
            }
            echoLog({}).warning(`${__('unKnownTaskType')}: ${task.category}-${task.type}`);
          }
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks) as giveawayHopperSocialTasks;
          this.socialTasks = this.uniqueTasks(this.socialTasks) as giveawayHopperSocialTasks;
          if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          GM_setValue(`giveawayHopperTasks-${this.giveawayId}`, { tasks: this.socialTasks, time: new Date().getTime() });
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'GiveawayHopper.classifyTask');
      return false;
    }
  }

  /**
   * 验证任务的异步方法
   *
   * @returns {Promise<boolean>} 如果所有任务成功验证，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在验证过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法遍历页面中的所有任务，依次验证每个任务。
   * 首先记录正在验证的任务状态，并检查是否存在人机验证。
   * 如果存在人机验证，则记录相应信息并返回。
   * 对于每个任务，如果任务未完成，则点击任务信息并处理可展开的内容。
   * 如果存在可点击的按钮，则依次点击并等待相应的延迟。
   * 在输入框中填入值并触发输入事件，最后点击继续按钮以完成任务验证。
   * 如果所有任务成功完成，则记录成功信息。
   */
  async verifyTask(): Promise<any> {
    try {
      for (const task of this.tasks) {
        if (task.isDone) continue;
        const logStatus = echoLog({ text: `${__('verifyingTask')}[${task.displayName?.replace(':target', task.targetName) || task.name}]...` });
        if (!task.link) {
          if (task.category === 'YouTube' && task.type === 'FollowAccount') {
            task.link = `https://www.youtube.com/@${task.targetName}`;
          } else if (task.category === 'TikTok' && task.type === 'FollowAccount') {
            task.link = `https://www.tiktok.com/@${task.targetName}`;
          } else if (task.category === 'Steam' && task.type === 'JoinGroup') {
            task.link = '';
          } else if (task.category === 'Discord' && task.type === 'JoinServer') {
            task.link = '';
          }
        }
        if (task.link) {
          await httpRequest({
            url: `https://giveawayhopper.com/fw?url=${encodeURIComponent(task.link)}&src=campaign&src_id=${this.giveawayId}&ref=task&ref_id=${task.id}&token=${window.sessionStorage.gw_auth}`,
            method: 'GET',
            fetch: true,
            headers: {
              authorization: `Bearer ${window.sessionStorage.gw_auth}`,
              'x-xsrf-token': decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] as string)
            }
          });
        }
        await delay(1000);
        const postData: {
          taskcategory: string
          taskname: string
          username?: string
        } = { taskcategory: task.category, taskname: task.type };
        if (['YouTube', 'TikTok'].includes(task.category)) {
          postData.username = '1';
        }
        const { result, statusText, status, data } = await httpRequest({
          url: `https://giveawayhopper.com/api/v1/campaigns/${this.giveawayId}/tasks/${task.id}/complete`,
          method: 'POST',
          fetch: true,
          headers: {
            authorization: `Bearer ${window.sessionStorage.gw_auth}`,
            'x-xsrf-token': decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] as string),
            'content-type': 'application/json'
          },
          dataType: 'json',
          data: JSON.stringify(postData)
        });
        if (result === 'Success') {
          if (data?.status === 200 && data?.response?.completed) {
            logStatus.success();
            continue;
          }
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          continue;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        continue;
      }
    } catch (error) {
      throwError(error as Error, 'GiveawayHopper.verifyTask');
      return false;
    }
  }

  /**
   * 获取抽奖ID的方法
   *
   * @returns {boolean} 如果成功获取抽奖ID，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法从当前窗口的路径中提取抽奖ID。
   * 如果成功获取到抽奖ID，则将其赋值给实例属性 `giveawayId` 并返回 true。
   * 如果未能获取到抽奖ID，则记录错误信息并返回 false。
   */
  #getGiveawayId(): boolean {
    try {
      const giveawayId = window.location.pathname.split('/').at(-1);
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ text: __('getFailed', 'GiveawayId') });
      return false;
    } catch (error) {
      throwError(error as Error, 'GiveawayHopper.getGiveawayId');
      return false;
    }
  }

  /**
   * 检查用户是否已登录的私有方法
   *
   * @returns {boolean} 如果用户已登录，则返回 true；否则返回 false。
   *
   * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法检查全局选项中是否启用了登录检查功能。
   * 如果启用且页面中存在 Steam 登录链接，则重定向用户到 Steam 登录页面。
   * 如果没有找到登录链接，则返回 true，表示用户已登录或不需要登录。
   */
  #checkLogin(): boolean {
    try {
      if (!globalOptions.other.checkLogin) return true;

      if ($('div.widget-connections-edit:contains("Log in")').length > 0) {
        $('div.widget-connections-edit:contains("Log in") a')[0].click();
      }
      return true;
    } catch (error) {
      throwError(error as Error, 'GiveawayHopper.checkLogin');
      return false;
    }
  }

  /**
   * 检查剩余密钥的私有异步方法
   *
   * @returns {Promise<boolean>} 如果检查成功，则返回 true；如果发生错误，则返回 false。
   *
   * @throws {Error} 如果在检查过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法首先检查全局选项中是否启用了检查剩余密钥的功能。
   * 如果启用且当前抽奖已结束且没有剩余密钥，则弹出警告框提示用户没有剩余密钥。
   * 用户可以选择确认或取消，确认后将关闭窗口。
   * 如果没有错误发生，则返回 true。
   */
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      if ($('p.widget-single-prize span').length > 0 && parseInt($('p.widget-single-prize span').text()
        ?.match(/\d+/)?.[0] || '0', 10) > 0) {
        return true;
      }
      await Swal.fire({
        icon: 'warning',
        title: __('notice'),
        text: __('noKeysLeft'),
        confirmButtonText: __('confirm'),
        cancelButtonText: __('cancel'),
        showCancelButton: true
      }).then(({ value }) => {
        if (value) {
          window.close();
        }
      });
      return true;
    } catch (error) {
      throwError(error as Error, 'GiveawayHopper.checkLeftKey');
      return false;
    }
  }
}

export default GiveawayHopper;
