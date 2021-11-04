/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 11:47:59
 * @LastEditTime : 2021-11-04 11:04:22
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Vk.ts
 * @Description  : Vk 加入/退出群组，关注/取关用户，转发/取消转发动态
 */

import Social from './Social';
import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import getI18n from '../i18n/i18n';
import { unique, delay } from '../tools/tools';

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
class Vk extends Social {
  tasks: vkTasks;
  whiteList: vkTasks = GM_getValue<whiteList>('whiteList')?.vk || { names: [] }; // eslint-disable-line new-cap
  #username = '';
  #cache: cache = GM_getValue<cache>('vkCache') || {}; // eslint-disable-line new-cap
  #initialized = false;

  // TODO: 任务识别
  constructor(tasks: vkTasks) {
    super();
    this.tasks = tasks || { names: [] }; // eslint-disable-line new-cap
  }

  // 通用化,log
  async init(): Promise<boolean> {
    try {
      const isVerified: boolean = await this.#verifyAuth(); // TODO
      if (isVerified) {
        echoLog({ text: 'Init vk success!' });
        this.#initialized = true;
        return true;
      }
      echoLog({ text: 'Init vk failed!' });
      return false;
    } catch (error) {
      throwError(error as Error, 'Vk.init');
      return false;
    }
  }

  async #verifyAuth(): Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'text', text: 'verifyVkLogin' });
      const { result, statusText, status, data } = await httpRequest({
        url: 'https://vk.com/im',
        method: 'GET'
      });
      if (result === 'Success') {
        if (data?.finalUrl.includes('vk.com/login')) {
          logStatus.error(`Error:${getI18n('loginVk')}`, true);
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
    try {
      const logStatus = echoLog({ type: doTask ? 'joinVkGroup' : 'leaveVkGroup', text: name });
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
    try {
      const logStatus = echoLog({ type: doTask ? 'joinVkPublic' : 'leaveVkPublic', text: name });
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
    try {
      const logStatus = echoLog({ type: 'sendVkWall', text: name });
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
                    // TODO: 优化
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
    try {
      const logStatus = echoLog({ type: 'deleteVkWall', text: name });
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
      const logStatus = echoLog({ type: 'getVkId', text: name });
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
    try {
      if (!doTask && this.whiteList.names.includes(name)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: name });
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

  async toggle({ doTask = true, names = [], nameLinks = [] }: { doTask: boolean, names: Array<string>, nameLinks: Array<string> }): Promise<boolean> {
    try {
      if (!this.#initialized) {
        echoLog({ type: 'text', text: '请先初始化' });
        return false;
      }
      const prom = [];
      const realNames = this.getRealParams('names', names, nameLinks, doTask, (link) => link.match(/https:\/\/vk\.com\/([^/]+)/)?.[1]);
      if (realNames.length > 0) {
        for (const name of realNames) {
          prom.push(this.#toggleVk({ name, doTask }));
          await delay(1000);
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
    try {
      this.#cache[name] = postId;
      GM_setValue('vkCache', this.#cache); // eslint-disable-line new-cap
    } catch (error) {
      throwError(error as Error, 'Vk.setCache');
    }
  }
}

export default Vk;
