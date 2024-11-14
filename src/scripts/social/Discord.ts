/*
 * @Author       : HCLonely
 * @Date         : 2021-09-28 15:03:10
 * @LastEditTime : 2023-01-13 10:00:55
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Discord.ts
 * @Description  : Discord 加入&移除服务器
 */

import Social from './Social';
import httpRequest from '../tools/httpRequest';
import throwError from '../tools/throwError';
import { unique, delay } from '../tools/tools';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import { globalOptions } from '../globalOptions';
import Swal from 'sweetalert2';

/**
 * @class Discord
 * @extends Social
 * @description 处理与Discord相关的任务，包括加入和退出服务器。
 *
 * @property {discordTasks} tasks - 存储Discord相关的任务信息。
 * @property {discordTasks} whiteList - 存储白名单服务器信息。
 * @private
 * @property {auth} #auth - 存储Discord身份验证信息。
 * @private
 * @property {cache} #cache - 存储缓存的服务器信息。
 * @private
 * @property {boolean} #initialized - 指示模块是否已初始化。
 *
 * @constructor
 * @description 创建一个Discord实例，初始化任务模板和白名单。
 *
 * @async
 * @function init
 * @param {string} action - 指定的操作类型，可能的值为'do'或'undo'。
 * @returns {Promise<boolean | 'skip'>} - 返回初始化的结果。
 *
 * @async
 * @function #verifyAuth
 * @returns {Promise<boolean>} - 返回Token验证的结果。
 *
 * @async
 * @function #updateAuth
 * @returns {Promise<boolean>} - 返回更新操作的结果。
 *
 * @async
 * @function #joinServer
 * @param {string} inviteId - Discord服务器的邀请ID。
 * @returns {Promise<boolean>} - 返回加入操作的结果。
 *
 * @async
 * @function #leaveServer
 * @param {string} inviteId - Discord服务器的邀请ID。
 * @returns {Promise<boolean>} - 返回退出操作的结果。
 *
 * @async
 * @function #getGuild
 * @param {string} inviteId - Discord服务器的邀请ID。
 * @returns {Promise<false | string>} - 返回获取操作的结果。
 *
 * @async
 * @function toggle
 * @param {Object} options - 选项对象。
 * @param {boolean} [options.doTask=true] - 指示是否执行任务。
 * @param {Array<string>} [options.serverLinks=[]] - Discord服务器邀请链接数组。
 * @returns {Promise<boolean>} - 返回操作的结果。
 *
 * @function #setCache
 * @param {string} inviteId - 要缓存的Discord邀请ID。
 * @param {string} guild - 要缓存的Discord服务器ID。
 * @returns {void} - 无返回值。
 */
class Discord extends Social {
  tasks: discordTasks;
  whiteList: discordTasks;
  #auth: auth = GM_getValue<auth>('discordAuth') || {};
  #cache: cache = GM_getValue<cache>('discordCache') || {};
  #initialized = false;

  /**
   * 创建一个Discord实例。
   *
   * @constructor
   * @description
   * 此构造函数初始化Discord类的实例，设置默认任务模板和白名单。
   * 默认任务模板包含一个空的服务器数组，用于存储Discord相关的任务信息。
   * 白名单将从GM_getValue中获取，如果没有找到，则使用默认任务模板。
   */
  constructor() {
    super();
    const defaultTasksTemplate: discordTasks = {
      servers: []
    };
    this.tasks = defaultTasksTemplate;
    this.whiteList = { ...defaultTasksTemplate, ...(GM_getValue<whiteList>('whiteList')?.discord || {}) };
  }

  /**
   * 初始化Discord模块，验证用户身份并获取授权。
   *
   * @async
   * @function init
   * @param {string} action - 指定的操作类型，可能的值为'do'或'undo'。
   * @returns {Promise<boolean | 'skip'>} - 返回一个Promise，表示初始化的结果。
   *                                          - true: 初始化成功
   *                                          - false: 初始化失败，toggle方法不可用
   *                                          - 'skip': 跳过初始化
   *
   * @description
   * 该方法首先检查用户是否已选择不再提醒。如果未选择，则显示警告对话框。
   * 根据用户的选择决定是否继续初始化。如果用户选择跳过，则返回'skip'。
   * 然后检查全局选项和当前操作类型，以确定是否执行初始化。
   * 如果未初始化且未授权，则调用`#updateAuth`方法获取新的授权信息。
   * 如果授权验证成功，则记录成功日志并返回true。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async init(action: string): Promise<boolean | 'skip'> {
    try {
      if (!GM_getValue('dontRemindDiscordAgain')) {
        const result = await Swal.fire({
          title: __('discordImportantNotice'),
          text: __('discordImportantNoticeText'),
          showCancelButton: true,
          showDenyButton: true,
          confirmButtonText: __('continue'),
          cancelButtonText: __('skipDiscordTask'),
          denyButtonText: __('continueAndDontRemindAgain')
        }).then(({ isConfirmed, isDenied }) => {
          if (isConfirmed) {
            return true;
          }
          if (isDenied) {
            GM_setValue('dontRemindDiscordAgain', true);
            return true;
          }
          return false;
        });
        if (!result) {
          this.#initialized = false;
          return 'skip';
        }
      }
      if (GM_getValue('dontRemindDiscordAgain') ||
        (action === 'do' && !globalOptions.doTask.discord.servers) ||
        (action === 'undo' && !globalOptions.undoTask.discord.servers)) {
        this.#initialized = false;
        return 'skip';
      }
      if (this.#initialized) {
        return true;
      }
      if (!this.#auth.auth) {
        if (await this.#updateAuth()) {
          this.#initialized = true;
          return true;
        }
        return false;
      }
      const isVerified: boolean = await this.#verifyAuth();
      if (isVerified) {
        echoLog({}).success(__('initSuccess', 'Discord'));
        this.#initialized = true;
        return true;
      }
      GM_setValue('discordAuth', { auth: null });
      if (await this.#updateAuth()) {
        echoLog({}).success(__('initSuccess', 'Discord'));
        this.#initialized = true;
        return true;
      }
      echoLog({}).error(__('initFailed', 'Discord'));
      return false;
    } catch (error) {
      throwError(error as Error, 'Discord.init');
      return false;
    }
  }

  /**
   * 验证Discord的身份验证Token是否有效。
   *
   * @async
   * @function #verifyAuth
   * @returns {Promise<boolean>} - 返回一个Promise，表示Token验证的结果。
   *                              - true: Token有效
   *                              - false: Token失效
   *
   * @description
   * 该方法通过发送HEAD请求到Discord API来验证Token的有效性。
   * 如果请求成功且返回的状态码为200，则记录成功日志并返回true。
   * 如果请求失败或返回的状态码不为200，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #verifyAuth(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('verifyingAuth', 'Discord') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://discord.com/api/v6/users/@me',
        method: 'HEAD',
        headers: { authorization: this.#auth.auth as string }
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Discord.verifyAuth');
      return false;
    }
  }

  /**
   * 更新Discord的身份验证Token。
   *
   * @async
   * @function #updateAuth
   * @returns {Promise<boolean>} - 返回一个Promise，表示更新操作的结果。
   *                              - true: 更新Token成功
   *                              - false: 更新Token失败
   *
   * @description
   * 该方法通过打开Discord网站的授权页面来更新Token。
   * 当新标签页关闭时，检查存储的身份验证信息。如果存在有效的Token，则更新内部的`#auth`属性并记录成功日志。
   * 如果Token不存在，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #updateAuth(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('updatingAuth', 'Discord') });
      return await new Promise((resolve) => {
        const newTab = GM_openInTab('https://discord.com/channels/@me',
          { active: true, insert: true, setParent: true });
        newTab.name = 'ATv4_discordAuth';
        newTab.onclose = async () => {
          const auth = GM_getValue<auth>('discordAuth')?.auth;
          if (auth) {
            this.#auth = { auth };
            logStatus.success();
            resolve(await this.#verifyAuth());
          } else {
            logStatus.error('Error: Update discord auth failed!');
            resolve(false);
          }
        };
      });
    } catch (error) {
      throwError(error as Error, 'Discord.updateAuth');
      return false;
    }
  }

  /**
   * 加入指定的Discord服务器。
   *
   * @async
   * @function #joinServer
   * @param {string} inviteId - Discord服务器的邀请ID。
   * @returns {Promise<boolean>} - 返回一个Promise，表示加入操作的结果。
   *                              - true: 加入成功
   *                              - false: 加入失败
   *
   * @description
   * 该方法通过发送POST请求到Discord API来加入服务器。
   * 请求的URL包含邀请ID，并在请求头中包含身份验证信息。
   * 如果请求成功且返回的结果为'Success'，并且状态码为200，则记录成功日志并缓存服务器信息。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #joinServer(inviteId: string): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'joiningDiscordServer', text: inviteId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://discord.com/api/v9/invites/${inviteId}`,
        method: 'POST',
        dataType: 'json',
        headers: {
          authorization: this.#auth.auth as string,
          origin: 'https://discord.com',
          referer: `https://discord.com/invite/${inviteId}`
        }
      });
      if (result === 'Success' && data?.status === 200) {
        logStatus.success();
        const guild = String(data.response?.guild?.id);
        if (guild) {
          this.#setCache(inviteId, guild);
          this.tasks.servers = unique([...this.tasks.servers, inviteId]);
        }
        return true;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Discord.joinServer');
      return false;
    }
  }

  /**
   * 退出指定的Discord服务器。
   *
   * @async
   * @function #leaveServer
   * @param {string} inviteId - Discord服务器的邀请ID。
   * @returns {Promise<boolean>} - 返回一个Promise，表示退出操作的结果。
   *                              - true: 退出成功
   *                              - false: 退出失败
   *
   * @description
   * 该方法首先检查邀请ID是否在白名单中。如果在白名单中，则直接返回true。
   * 然后通过调用`#getGuild`方法获取服务器的ID。如果获取失败，则返回false。
   * 发送DELETE请求到Discord API以退出服务器。如果请求成功且返回的状态码为204，则记录成功日志并返回true。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #leaveServer(inviteId: string): Promise<boolean> {
    try {
      if (this.whiteList.servers.includes(inviteId)) {
        echoLog({ type: 'whiteList', text: 'Discord.leaveServer', id: inviteId });
        return true;
      }
      const guild = await this.#getGuild(inviteId);
      if (!guild) {
        return false;
      }
      const logStatus = echoLog({ type: 'leavingDiscordServer', text: guild });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://discord.com/api/v9/users/@me/guilds/${guild}`,
        method: 'DELETE',
        headers: { authorization: this.#auth.auth as string }
      });
      if (result === 'Success' && data?.status === 204) {
        logStatus.success();
        return true;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Discord.leaveServer');
      return false;
    }
  }

  /**
   * 通过邀请ID获取Discord服务器的ID。
   *
   * @async
   * @function #getGuild
   * @param {string} inviteId - Discord服务器的邀请ID。
   * @returns {Promise<false | string>} - 返回一个Promise，表示获取操作的结果。
   *                                      - string: 获取成功，返回服务器的ID
   *                                      - false: 获取失败
   *
   * @description
   * 该方法首先检查缓存中是否存在对应的服务器ID。如果存在，则直接返回该ID。
   * 如果不存在，则发送GET请求到Discord API以获取服务器信息。
   * 如果请求成功且返回的状态为200，则提取服务器的ID并缓存。
   * 如果获取失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async #getGuild(inviteId: string): Promise<false | string> {
    try {
      const logStatus = echoLog({ type: 'gettingDiscordGuild', text: inviteId });
      const guild = this.#cache[inviteId];
      if (guild) {
        logStatus.success();
        return guild;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: `https://discord.com/api/v9/invites/${inviteId}`,
        responseType: 'json',
        method: 'GET'
      });
      if (result === 'Success' && data?.status === 200) {
        const guild = data.response?.guild?.id;
        if (guild) {
          logStatus.success();
          this.#setCache(inviteId, guild);
          return guild;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Discord.getGuild');
      return false;
    }
  }

  /**
   * 切换Discord相关任务的状态，关注或取关指定的服务器。
   *
   * @async
   * @function toggle
   * @param {Object} options - 选项对象。
   * @param {boolean} [options.doTask=true] - 指示是否执行任务，true表示关注服务器，false表示取关服务器。
   * @param {Array<string>} [options.serverLinks=[]] - Discord服务器邀请链接数组。注意: 不接受邀请ID数组。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   *
   * @description
   * 该方法统一处理Discord相关任务。首先检查模块是否已初始化，如果未初始化，则返回false。
   * 根据`doTask`和全局选项判断是否执行任务。如果执行任务，则获取实际的服务器参数，并逐个处理关注或取关操作。
   * 最后返回所有操作的结果，如果在执行过程中发生错误，将抛出错误并返回false。
   */
  async toggle({
    doTask = true,
    serverLinks = []
  }: {
    doTask: boolean,
    serverLinks?: Array<string>
  }): Promise<boolean> {
    try {
      if (!this.#initialized) {
        echoLog({ text: __('needInit') });
        return false;
      }
      const prom = [];
      if (
        (doTask && !globalOptions.doTask.discord.servers) ||
        (!doTask && !globalOptions.undoTask.discord.servers)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'discord.servers' });
      } else {
        const realServers = this.getRealParams('servers', serverLinks, doTask, (link: string) => link.match(/invite\/(.+)/)?.[1]);
        if (realServers.length > 0) {
          for (const server of realServers) {
            if (doTask) {
              prom.push(this.#joinServer(server));
            } else {
              prom.push(this.#leaveServer(server));
            }
            await delay(1000);
          }
        }
      }
      // TODO: 返回值处理
      return await Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Discord.toggleServers');
      return false;
    }
  }

  /**
   * 设置缓存，将指定的邀请ID与服务器ID进行关联。
   *
   * @function #setCache
   * @param {string} inviteId - 要缓存的Discord邀请ID。
   * @param {string} guild - 要缓存的Discord服务器ID。
   * @returns {void} - 无返回值。
   *
   * @description
   * 该方法将{inviteId}与{guild}的对应关系存储在缓存中，并使用`GM_setValue`将缓存保存到存储中。
   * 如果在设置缓存过程中发生错误，将抛出错误并记录错误信息。
   */
  #setCache(inviteId: string, guild: string): void {
    try {
      this.#cache[inviteId] = guild;
      GM_setValue('discordCache', this.#cache);
    } catch (error) {
      throwError(error as Error, 'Discord.setCache');
    }
  }
}

export default Discord;
