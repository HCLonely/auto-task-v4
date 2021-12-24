/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 11:47:59
 * @LastEditTime : 2021-12-24 17:37:54
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Vk.ts
 * @Description  : Vk 加入/退出群组，关注/取关用户，转发/取消转发动态
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import __ from '../tools/i18n';
import { unique, delay } from '../tools/tools';
import globalOptions from '../globalOptions';

interface dataParams {
  type: string
  groupAct?: string
  groupId?: string
  groupHash?: string
  publicHash?: string
  publicPid?: string
  publicJoined?: boolean
  wallHash?: string
}
const defaultTasks: vkTasks = { names: [] };
class Vk extends Social {
  tasks = { ...defaultTasks };
  whiteList: vkTasks = GM_getValue<whiteList>('whiteList')?.vk || { ...defaultTasks }; // eslint-disable-line new-cap
  #username = '';
  #cache: cache = GM_getValue<cache>('vkCache') || {}; // eslint-disable-line new-cap
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
      const isVerified: boolean = await this.#verifyAuth();
      if (isVerified) {
        echoLog({ html: `<li><font class="success">${__('initSuccess', 'Vk')}</font></li>` });
        this.#initialized = true;
        return true;
      }
      echoLog({ html: `<li><font class="success">${__('initFailed', 'Vk')}</font></li>` });
      return false;
    } catch (error) {
      throwError(error as Error, 'Vk.init');
      return false;
    }
  }

  async #verifyAuth(): Promise<boolean> {
    /**
     * @internal
     * @description 检测Vk Token是否失效
     * @return true: Token有效 | false: Token失效
     */
    try {
      const logStatus = echoLog({ text: __('verifyAuth', 'Vk') });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://vk.com/im',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.finalUrl.includes('vk.com/login')) {
          logStatus.error(`Error:${__('loginVk')}`, true);
          return false;
        }
        if (data?.status === 200) {
          this.#username = data.responseText.match(/TopNavBtn__profileLink" href="\/(.*?)"/)?.[1] || '';
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Vk.verifyAuth');
      return false;
    }
  }

  async #toggleGroup(name: string, dataParam: dataParams, doTask = true): Promise<boolean> {
    /**
     * @internal
     * @description 处理Vk Group相关任务
     * @param name Group名
     * @param doTask true: 关注 | false: 取关
     * @param dataParam 请求参数
     * @return true: 成功 | false: 失败
     */
    try {
      const logStatus = echoLog({ type: doTask ? 'joiningVkGroup' : 'leavingVkGroup', text: name });
      if ((dataParam.groupAct === 'enter' && !doTask) || (dataParam.groupAct === 'leave' && doTask)) {
        logStatus.success();
        return true;
      }
      const reqData: {
        act: string
        al: number
        gid: string
        hash: string
        context?: string
      } = {
        act: doTask ? 'enter' : 'leave',
        al: 1,
        gid: dataParam.groupId as string,
        hash: dataParam.groupHash as string
      };
      if (doTask) reqData.context = '_';
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://vk.com/al_groups.php',
        method: 'POST',
        headers: {
          origin: 'https://vk.com',
          referer: `https://vk.com/${name}`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: $.param(reqData)
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          logStatus.success();
          if (doTask) this.tasks.names = unique([...this.tasks.names, name]);
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Vk.toggleGroup');
      return false;
    }
  }

  async #togglePublic(name: string, dataParam: dataParams, doTask = true): Promise<boolean> {
    /**
     * @internal
     * @description 处理Vk Public相关任务
     * @param name Public名
     * @param doTask true: 关注 | false: 取关
     * @param dataParam 请求参数
     * @return true: 成功 | false: 失败
     */
    try {
      const logStatus = echoLog({ type: doTask ? 'joiningVkPublic' : 'leavingVkPublic', text: name });
      if ((dataParam.publicJoined && doTask) || (!dataParam.publicJoined && !doTask)) {
        logStatus.success();
        return true;
      }
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://vk.com/al_public.php',
        method: 'POST',
        headers: {
          origin: 'https://vk.com',
          referer: `https://vk.com/${name}`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
          act: doTask ? 'a_enter' : 'a_leave',
          al: 1,
          pid: dataParam.publicPid,
          hash: dataParam.publicHash
        })
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          logStatus.success();
          if (doTask) this.tasks.names = unique([...this.tasks.names, name]);
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Vk.togglePublic');
      return false;
    }
  }

  async #sendWall(name: string): Promise<boolean> {
    /**
     * @internal
     * @description 转发Vk Wall
     * @param name Wall Id
     * @return true: 成功 | false: 失败
     */
    try {
      const logStatus = echoLog({ type: 'sendingVkWall', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://vk.com/like.php',
        method: 'POST',
        headers: {
          origin: 'https://vk.com',
          referer: `https://vk.com/${name}`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
          act: 'publish_box',
          al: 1,
          object: name
        })
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const hash = data.responseText.match(/shHash:[\s]*'(.*?)'/)?.[1];
          if (hash) {
            const { result: resultR, statusText: statusTextR, status: statusR, data: dataR } = await httpRequest({
              url: 'https://vk.com/like.php',
              method: 'POST',
              headers: {
                origin: 'https://vk.com',
                referer: `https://vk.com/${name}`,
                'content-type': 'application/x-www-form-urlencoded'
              },
              /* eslint-disable camelcase */
              data: $.param({
                Message: '',
                act: 'a_do_publish',
                al: 1,
                close_comments: 0,
                friends_only: 0,
                from: 'box',
                hash,
                list: '',
                mark_as_ads: 0,
                mute_notifications: 0,
                object: name,
                ret_data: 1,
                to: 0
              })
              /* eslint-enable camelcase */
            });
            if (resultR === 'Success') {
              if (dataR?.status === 200) {
                const jsonData = JSON.parse(dataR.responseText?.replace('<!--', '') || '{}');
                if (jsonData?.payload?.[1]?.[1]?.share_my === true) { // eslint-disable-line camelcase
                  logStatus.success();
                  const postId = String(jsonData?.payload?.[1]?.[1]?.post_id);
                  const ownerId = String(jsonData?.payload?.[1]?.[1]?.owner_id);
                  if (postId && ownerId) {
                    this.#setCache(name, `${ownerId}_${postId}`);
                  }
                  this.tasks.names = unique([...this.tasks.names, name]);
                  return true;
                }
              }
              logStatus.error(`Error:${dataR?.statusText}(${dataR?.status})`);
              return false;
            }
            logStatus.error(`${resultR}:${statusTextR}(${statusR})`);
            return false;
          }
          logStatus.error('Error: Get "hash" failed');
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Vk.sendWall');
      return false;
    }
  }

  async #deleteWall(name: string, dataParams: dataParams): Promise<boolean> {
    /**
     * @internal
     * @description 删除转发的转发Vk Wall
     * @param name Wall Id
     * @param dataParam 请求参数
     * @return true: 成功 | false: 失败
     */
    try {
      const logStatus = echoLog({ type: 'deletingVkWall', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://vk.com/al_wall.php?act=delete',
        method: 'POST',
        headers: {
          origin: 'https://vk.com',
          referer: `https://vk.com/${this.#username}?w=wall${this.#cache[name]}%2Fall`,
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
          act: 'delete',
          al: 1,
          confirm: 0,
          from: 'wkview',
          hash: dataParams.wallHash,
          post: this.#cache[name]
        })
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const jsonData = JSON.parse(data.responseText?.replace('<!--', '') || '{}');
          if (jsonData?.payload?.[1]?.[1]) {
            logStatus.success();
            return true;
          }
          logStatus.error(`Error:${data?.statusText}(${data?.status})`);
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Vk.deleteWall');
      return false;
    }
  }

  async #getId(name: string, doTask: boolean): Promise<dataParams | false> {
    /**
     * @internal
     * @description 获取请求参数
     * @param name name
     * @param doTask true: 做任务 | false: 取消任务
     * @return {dataParams}: 获取成功，返回请求参数 | false: 获取失败
     */
    try {
      let url = `https://vk.com/${name}`;
      if (/^wall-/.test(name)) {
        if (doTask) {
          return { type: 'sendWall' };
        }
        if (!this.#cache[name]) {
          return { type: 'unSupport' };
        }
        url = `https://vk.com/${this.#username}?w=wall${this.#cache[name]}`;
      }
      const logStatus = echoLog({ type: 'gettingVkId', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url,
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.status === 200) {
          const [, groupAct, groupId, groupHash] = data.responseText.match(/Groups.(enter|leave)\(.*?,.*?([\d]+?), '(.*?)'/) || [];
          const publicHash = data.responseText.match(/"enterHash":"(.*?)"/)?.[1];
          const publicPid = data.responseText.match(/"public_id":([\d]+?),/)?.[1];
          const publicJoined = !data.responseText.includes('Public.subscribe');
          if (groupAct && groupId && groupHash) {
            logStatus.success();
            return { groupAct, groupId, groupHash, type: 'group' };
          } else if (publicHash && publicPid) {
            logStatus.success();
            return { publicHash, publicPid, publicJoined, type: 'public' };
          } else if (data.responseText.includes('wall.deletePost') && !doTask) {
            const wallHash = data.responseText.match(/wall\.deletePost\(this, '.*?', '(.*?)'\)/)?.[1];
            if (wallHash) {
              logStatus.success();
              return { type: 'deleteWall', wallHash };
            }
          } else if (name.includes('wall') && doTask) {
            logStatus.success();
            return { type: 'sendWall' };
          }
          logStatus.error('Error: Parameters not found!');
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Vk.getId');
      return false;
    }
  }

  async #toggleVk({ name, doTask = true }: { name: string, doTask: boolean }): Promise<boolean> {
    /**
     * @internal
     * @description 处理Vk任务
     * @param name name
     * @param doTask true: 做任务 | false: 取消任务
     * @return true: 成功 | false: 失败
     */
    try {
      if (!doTask && this.whiteList.names.includes(name)) {
        echoLog({ type: 'whiteList', text: 'Vk.undoTask', id: name });
        return true;
      }
      const formatName: string = name.replace(/\/$/, '');
      const data = await this.#getId(formatName, doTask);
      if (!data) return false;
      switch (data.type) {
      case 'group':
        return await this.#toggleGroup(formatName, data, doTask);
      case 'public':
        return await this.#togglePublic(formatName, data, doTask);
      case 'sendWall':
        return doTask ? await this.#sendWall(formatName) : true;
      case 'deleteWall':
        return doTask ? true : await this.#deleteWall(formatName, data);
      default:
        return false;
      }
    } catch (error) {
      throwError(error as Error, 'Vk.toggleVk');
      return false;
    }
  }

  async toggle({
    doTask = true,
    nameLinks = []
  }: {
    doTask: boolean,
    nameLinks?: Array<string>
  }): Promise<boolean> {
    /**
     * @description 公有方法，统一处理Vk相关任务
     * @param {boolean} doTask true: 做任务 | false: 取消任务
     * @param {?Array} nameLinks Vk任务链接数组。
     */
    try {
      if (!this.#initialized) {
        echoLog({ text: __('needInit') });
        return false;
      }
      const prom = [];

      if (
        (doTask && !globalOptions.doTask.vk.names) ||
        (!doTask && !globalOptions.undoTask.vk.names)
      ) {
        echoLog({ type: 'globalOptionsSkip', text: 'vk.names' });
      } else {
        const realNames = this.getRealParams('names', nameLinks, doTask, (link) => link.match(/https:\/\/vk\.com\/([^/]+)/)?.[1]);
        if (realNames.length > 0) {
          for (const name of realNames) {
            prom.push(this.#toggleVk({ name, doTask }));
            await delay(1000);
          }
        }
      }
      // TODO: 返回值处理
      return Promise.all(prom).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Vk.toggle');
      return false;
    }
  }
  #setCache(name: string, postId: string): void {
    /**
     * @internal
     * @description 缓存Vk Wall Id与Post Id的对应关系
     * @return {void}
     */
    try {
      this.#cache[name] = postId;
      GM_setValue('vkCache', this.#cache); // eslint-disable-line new-cap
    } catch (error) {
      throwError(error as Error, 'Vk.setCache');
    }
  }
}

export default Vk;
