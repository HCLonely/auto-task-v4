/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 11:47:59
 * @LastEditTime : 2021-10-30 12:35:57
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/Vk.ts
 * @Description  : Vk 加入/退出群组，关注/取关用户，转发动态
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
}
class Vk extends Social {
  tasks: vkTasks;
  whiteList: vkTasks;

  // TODO: 任务识别
  constructor(id: string) {
    super();
    this.tasks = GM_getValue<vkTasks>(`Vk-${id}`) || { groups: [], publics: [], walls: [] }; // eslint-disable-line new-cap
    this.whiteList = GM_getValue<whiteList>('whiteList')?.vk || { groups: [], publics: [], walls: [] }; // eslint-disable-line new-cap
    this.auth = GM_getValue<auth>('vkAuth') || {}; // eslint-disable-line new-cap
  }

  // 通用化,log
  async init(): Promise<boolean> {
    try {
      const isVerified: boolean = await this.verifyToken(); // TODO
      if (isVerified) {
        echoLog({ text: 'Init vk success!' });
        return true;
      }
      echoLog({ text: 'Init vk failed!' });
      return false;
    } catch (error) {
      throwError(error as Error, 'Vk.init');
      return false;
    }
  }

  async verifyToken(): Promise<boolean> {
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
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Vk.verifyToken');
      return false;
    }
  }

  async toggleGroup(name: string, dataParam: dataParams, doTask = true): Promise<boolean> {
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
          if (doTask) this.tasks.groups = unique([...this.tasks.groups, name]);
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

  async togglePublic(name: string, dataParam: dataParams, doTask = true): Promise<boolean> {
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
          if (doTask) this.tasks.publics = unique([...this.tasks.publics, name]);
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

  async toggleWall(name: string, doTask: boolean): Promise<boolean> {
    if (!doTask) return false;
    try {
      const logStatus = echoLog({ type: 'repostVkWall', text: name });
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
                  if (doTask) this.tasks.walls = unique([...this.tasks.walls, name]);
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
      throwError(error as Error, 'Vk.toggleWall');
      return false;
    }
  }

  async getId(name: string): Promise<dataParams | false> {
    try {
      if (/^wall-/.test(name)) return { type: 'wall' };
      const logStatus = echoLog({ type: 'getVkId', text: name });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://vk.com/${name}`,
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
          } else if (data.responseText.includes('Wall.sendPost')) {
            logStatus.success();
            return { type: 'wall' };
          }
          logStatus.error('Error: Parameter "id" not found!');
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

  async toggleVk({ name, doTask = true }: { name: string, doTask: boolean }): Promise<boolean> {
    try {
      if (!doTask && [...this.whiteList.groups, ...this.whiteList.publics, ...this.whiteList.walls].includes(name)) {
        // TODO: 直接echo
        echoLog({ type: 'whiteList', text: name });
        return true;
      }
      const formatName: string = name.replace(/\/$/, '');
      const data = await this.getId(formatName);
      if (!data) return false;
      switch (data.type) {
      case 'group':
        return await this.toggleGroup(formatName, data, doTask);
      case 'public':
        return await this.togglePublic(formatName, data, doTask);
      case 'wall':
        return await this.toggleWall(formatName, doTask);
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
      const prom = [];
      const realNames = this.getRealParams('names', names, nameLinks, doTask, (link) => link.match(/https:\/\/vk\.com\/([^/]+)/)?.[1]);
      if (realNames.length > 0) {
        for (const name of realNames) {
          prom.push(this.toggleVk({ name, doTask }));
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
}

export default Vk;
/*

async function toggleVk(name, join = true) {
  try {
    if (whiteList.enable && !join && whiteList.vk.vk.includes(name)) {
      return { result: 'Skiped', statusText: 'OK', status: 605 }
    }
    name = name.replace(/\/$/, '')
    const data = await getVkId(name)
    if (!data) return
    switch (data.type) {
      case 'group':
        await toggleVkGroup(name, data, join)
        break
      case 'public':
        await toggleVkPublic(name, data, join)
        break
      case 'wall':
        await toggleVkWall(name, join)
        break
    }
  } catch (e) {
    throwError(e, 'toggleVk')
  }
}

async function toggleVkActions({ website, type, elements, action, toFinalUrl = {} }) {
  try {
    const isLogin = await verifyVkLogin()
    if (!isLogin) return
    for (const element of unique(elements)) {
      let name = element
      if (website === 'giveawaysu' && toFinalUrl[element]) {
        const toFinalUrlElement = toFinalUrl[element] || ''
        name = toFinalUrlElement.match(/https:\/\/vk\.com\/([^/]+)/)?.[1]
      }
      if (name) {
        await toggleVk(name, action === 'fuck')
      }
    }
  } catch (e) {
    throwError(e, 'toggleVkActions')
  }
}
export { toggleVkActions }
*/
