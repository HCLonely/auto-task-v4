/*
 * @Author       : HCLonely
 * @Date         : 2021-09-28 15:03:10
 * @LastEditTime : 2021-10-31 13:00:38
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Discord.ts
 * @Description  : Discord 加入&移除服务器
 ! 白名单处理
 */

import Social from './Social';
import httpRequest from '../tools/httpRequest';
import throwError from '../tools/throwError';
import { unique, delay } from '../tools/tools';
import echoLog from '../echoLog';

class Discord extends Social {
  tasks: discordTasks;
  whiteList: discordTasks;
  #auth: auth;
  #cache: cache;
  #initialized = false;

  // TODO: 任务识别
  constructor(id: string) {
    super();
    this.tasks = GM_getValue<discordTasks>(`Discord-${id}`) || { servers: [] }; // eslint-disable-line new-cap
    this.whiteList = GM_getValue<whiteList>('whiteList')?.discord || { servers: [] }; // eslint-disable-line new-cap
    this.#cache = GM_getValue<cache>('discordCache') || {}; // eslint-disable-line new-cap
    this.#auth = GM_getValue<auth>('discordAuth') || {}; // eslint-disable-line new-cap
  }
  // TODO:优化
  async init(): Promise<boolean> {
    try {
      if (!this.#auth.auth) {
        echoLog({ type: 'updateDiscordAuth' });
        if (await this.#updateAuth()) {
          this.#initialized = true;
          return true;
        }
        return false;
      }
      const isVerified: boolean = await this.#verifyAuth();
      if (isVerified) {
        echoLog({ text: 'Init discord success!' });
        this.#initialized = true;
        return true;
      }
      GM_setValue('discordAuth', { auth: null }); // eslint-disable-line new-cap
      if (await this.#updateAuth()) {
        echoLog({ text: 'Init discord success!' });
        this.#initialized = true;
        return true;
      }
      echoLog({ text: 'Init discord failed!' });
      return false;
    } catch (error) {
      throwError(error as Error, 'Discord.init');
      return false;
    }
  }

  // 验证discord凭证是否失效
  async #verifyAuth(): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'text', text: 'verifyDiscordAuth' });
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
    try {
      const logStatus = echoLog({ type: 'text', text: 'updateDiscordAuth' });
      return await new Promise((resolve) => {
        const newTab = GM_openInTab('https://discord.com/channels/@me#auth', // eslint-disable-line new-cap
          { active: true, insert: true, setParent: true });
        newTab.onclose = async () => {
          const auth = GM_getValue<auth>('discordAuth')?.auth; // eslint-disable-line new-cap
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
    try {
      const logStatus = echoLog({ type: 'joinDiscordServer', text: inviteId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://discord.com/api/v6/invites/${inviteId}`,
        method: 'POST',
        dataType: 'json',
        headers: { authorization: this.#auth.auth as string }
      });
      if (result === 'Success' && data?.status === 200) {
        logStatus.success();
        const guild = String(data.response?.guild?.id);
        if (guild) {
          // TODO: 优化
          this.#addId(inviteId, guild);
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
    try {
      if (this.whiteList.servers.includes(inviteId)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: inviteId });
        return true;
      }
      const guild = await this.#getGuild(inviteId);
      if (!guild) {
        return false;
      }
      const logStatus = echoLog({ type: 'leaveDiscordServer', text: inviteId });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://discord.com/api/v6/users/@me/guilds/${guild}`,
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

  async #getGuild(inviteId: string): Promise<boolean | string> {
    try {
      const logStatus = echoLog({ type: 'getDiscordGuild', text: inviteId });
      const guild = this.#cache[inviteId];
      if (guild) {
        logStatus.success();
        return guild;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: `https://discord.com/invite/${inviteId}`,
        method: 'GET'
      });
      if (result === 'Success' && data?.status === 200) {
        const guild = data.responseText.match(/https?:\/\/cdn\.discordapp\.com\/icons\/([\d]+?)\//)?.[1];
        if (guild) {
          logStatus.success();
          this.#addId(inviteId, guild);
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

  // TODO:返回类型定义
  async toggle({
    doTask = true,
    servers = [],
    serverLinks = []
  }: {
    doTask: boolean,
    servers: Array<string>,
    serverLinks: Array<string>
  }): Promise<boolean> {
    try {
      if (!this.#initialized) {
        echoLog({ type: 'text', text: '请先初始化' });
        return false;
      }
      const prom = [];
      const realServers = this.getRealParams('servers', servers, serverLinks, doTask, (link: string) => link.match(/invite\/(.+)/)?.[1]);
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
      // TODO: 返回值处理
      return await Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Discord.toggleServers');
      return false;
    }
  }

  #addId(inviteId: string, guild: string): void {
    this.#cache[inviteId] = guild;
    GM_setValue('discordCache', this.#cache); // eslint-disable-line new-cap
  }

  // TODO: id转换
}

export default Discord;
