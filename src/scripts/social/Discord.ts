/*
 * @Author       : HCLonely
 * @Date         : 2021-09-28 15:03:10
 * @LastEditTime : 2022-01-30 11:58:03
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

const defaultTasksTemplate: discordTasks = { servers: [] };
const defaultTasks = JSON.stringify(defaultTasksTemplate);

class Discord extends Social {
  tasks: discordTasks = JSON.parse(defaultTasks);
  whiteList: discordTasks = { ...JSON.parse(defaultTasks), ...GM_getValue<whiteList>('whiteList')?.discord };
  #auth: auth = GM_getValue<auth>('discordAuth') || {};
  #cache: cache = GM_getValue<cache>('discordCache') || {};
  #initialized = false;

  async init(): Promise<boolean> {
    /**
     * @description: 验证及获取Auth
     * @return true: 初始化完成 | false: 初始化失败，toggle方法不可用
     */
    try {
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

  async #verifyAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 检测Discord Token是否失效
     * @return true: Token有效 | false: Token失效
     */
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

  async #updateAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 通过打开Discord网站更新Token.
     * @return true: 更新Token成功 | false: 更新Token失败
     */
    try {
      const logStatus = echoLog({ text: __('updatingAuth', 'Discord') });
      return await new Promise((resolve) => {
        const newTab = GM_openInTab('https://discord.com/channels/@me#auth',
          { active: true, insert: true, setParent: true });
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

  async #joinServer(inviteId: string): Promise<boolean> {
    /**
     * @internal
     * @description 加入Discord服务器
     * @param inviteId: 邀请id
     * @return true: 加入成功 | false: 加入失败
     */
    try {
      const logStatus = echoLog({ type: 'joiningDiscordServer', text: inviteId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://discord.com/api/v9/invites/${inviteId}`,
        method: 'POST',
        dataType: 'json',
        headers: { authorization: this.#auth.auth as string }
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

  async #leaveServer(inviteId: string): Promise<boolean> {
    /**
     * @internal
     * @description 退出Discord服务器
     * @param inviteId: 邀请id
     * @return true: 退出成功 | false: 退出失败
     */
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

  async #getGuild(inviteId: string): Promise<false | string> {
    /**
     * @internal
     * @description 通过{inviteId}获取{guild}, {guild}用于退出服务器
     * @param inviteId: 邀请id
     * @return {string}: 获取成功，返回{guild} | false: 获取失败
     */
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

  async toggle({
    doTask = true,
    serverLinks = []
  }: {
    doTask: boolean,
    serverLinks?: Array<string>
  }): Promise<boolean> {
    /**
     * @description 公有方法，统一处理Discord相关任务
     * @param {boolean} doTask true: 做任务 | false: 取消任务
     * @param {?Array} serverLinks Discord服务器邀请链接数组。注意: 不接受邀请id数组
     */
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

  #setCache(inviteId: string, guild: string): void {
    /**
     * @internal
     * @description 缓存{inviteId}与{guild}的对应关系
     * @return {void}
     */
    try {
      this.#cache[inviteId] = guild;
      GM_setValue('discordCache', this.#cache);
    } catch (error) {
      throwError(error as Error, 'Discord.setCache');
    }
  }
}
unsafeWindow.Discord = Discord;
export default Discord;
