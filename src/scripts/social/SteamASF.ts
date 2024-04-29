/*
 * @Author       : HCLonely
 * @Date         : 2021-10-04 16:07:55
 * @LastEditTime : 2023-01-08 11:13:03
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/social/SteamASF.ts
 * @Description  : steam ASF相关功能
 */
// eslint-disable-next-line

import echoLog from '../echoLog';
import throwError from '../tools/throwError';
import httpRequest from '../tools/httpRequest';
import __ from '../tools/i18n';
import { globalOptions } from '../globalOptions';

class SteamASF {
  #asfOptions!: httpRequestOptions;
  #botName = 'asf';
  #groupInfo!: {
    [name: string]: string
  };

  async init(): Promise<boolean> {
    /**
     * @description 初始化ASF.
     * @return true: 初始化ASF | false: 初始化ASF
    */
    try {
      const asfCommandsUrl = new URL('/Api/Command/', globalOptions.ASF.AsfIpcUrl);
      this.#asfOptions = {
        url: asfCommandsUrl.href,
        method: 'POST',
        responseType: 'json',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Host: asfCommandsUrl.host,
          Origin: asfCommandsUrl.origin,
          Referer: asfCommandsUrl.href,
          Authentication: globalOptions.ASF.AsfIpcPassword
        }
      };
      if (globalOptions.ASF.AsfBotname) {
        this.#botName = globalOptions.ASF.AsfBotname;
      }
      const logStatus = echoLog({ text: __('initingASF') });
      const { result, statusText, status, data } = await httpRequest({
        ...this.#asfOptions,
        data: '{"Command":"!stats"}'
      });
      if (result === 'Success') {
        if (data?.response?.Success === true && data.response.Message === 'OK' && data.response.Result) {
          logStatus.success();
          return true;
        }
        if (data?.response?.Result || data?.response?.Message) {
          logStatus.error(data?.response?.Result || data.response.Message);
          return false;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'SteamASF.init');
      return false;
    }
  }

  async joinGroup(groupName: string): Promise<boolean> {
    /**
     * @description 加入Steam组
     * @param groupName Steam组名
     * @return true: 成功 | false: 失败
    */
    try {
      const logStatus = echoLog({ type: 'joiningSteamGroup', text: groupName });
      const { result, statusText, status, data } = await httpRequest({
        ...this.#asfOptions,
        data: JSON.stringify({ Command: `!JOINGROUP ${this.#botName} ${groupName}` })
      });
      if (result === 'Success') {
        if (data?.status === 200 &&
          ['已加入', '已申请', 'Joined', 'Applied', 'Присоединился', 'costs'].find((text) => (data.response?.Result?.includes(text)))
        ) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'SteamASF.joinGroup');
      return false;
    }
  }
  async leaveGroup(groupName: string): Promise<boolean> {
    /**
     * @internal
     * @description 退出Steam组
     * @param groupName Steam组名
     * @return true: 成功 | false: 失败
    */
    try {
      if (!this.#groupInfo) {
        if (!await this.#getGroupId()) {
          return false;
        }
      }
      const groupId = await this.#groupInfo[groupName];
      if (!groupId) return false;
      const logStatus = echoLog({ type: 'leavingSteamGroup', text: groupName });
      const { result, statusText, status, data } = await httpRequest({
        ...this.#asfOptions,
        data: JSON.stringify({ Command: `!LEAVEGROUP ${this.#botName} ${groupId}` })
      });
      if (result === 'Success') {
        if (data?.status === 200 &&
          ['成功', 'Success', 'Успех'].find((text) => (data.response?.Result?.includes(text)))
        ) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'SteamASF.leaveGroup');
      return false;
    }
  }
  async #getGroupId(): Promise<boolean> {
    /**
     * @internal
     * @description 获取Steam组名与id对应关系, 用于退组
     * @return true: 成功 | false: 失败
    */
    try {
      const logStatus = echoLog({ type: 'gettingSteamGroupId', text: 'All' });
      const { result, statusText, status, data } = await httpRequest({
        ...this.#asfOptions,
        data: JSON.stringify({ Command: `!GROUPLIST ${this.#botName}` })
      });
      if (result === 'Success') {
        if (data?.status === 200 && data.response?.Result?.includes('|')) {
          this.#groupInfo = Object.fromEntries(data.response.Result.split('\n').map((line: string) => {
            const [, name, id] = line.trim().split('|');
            if (name && id) {
              return [name, id];
            }
            return null;
          })
            .filter((ele: Array<string> | null) => ele) as Array<Array<string>>);
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'SteamASF.getGroupID');
      return false;
    }
  }

  async addToWishlist(gameId: string): Promise<boolean> {
    /**
     * @internal
     * @description Steam添加游戏到愿望单
     * @param gameId Steam游戏AppId
     * @return true: 成功 | false: 失败
    */
    try {
      const logStatus = echoLog({ type: 'addingToWishlist', text: gameId });
      const { result, statusText, status, data } = await httpRequest({
        ...this.#asfOptions,
        data: JSON.stringify({ Command: `!ADDWISHLIST ${this.#botName} ${gameId}` })
      });
      if (result === 'Success') {
        if (data?.status === 200 &&
          ['成功', 'Success', 'Успех'].find((text) => (data.response?.Result?.includes(text)))
        ) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'SteamASF.addToWishlist');
      return false;
    }
  }
  async removeFromWishlist(gameId: string): Promise<boolean> {
    /**
     * @internal
     * @description 从Steam愿望单移除游戏
     * @param gameId Steam游戏AppId
     * @return true: 成功 | false: 失败
    */
    try {
      const logStatus = echoLog({ type: 'removingFromWishlist', text: gameId });

      const { result, statusText, status, data } = await httpRequest({
        ...this.#asfOptions,
        data: JSON.stringify({ Command: `!REMOVEWISHLIST ${this.#botName} ${gameId}` })
      });
      if (result === 'Success') {
        if (data?.status === 200 &&
          ['成功', 'Success', 'Успех'].find((text) => (data.response?.Result?.includes(text)))
        ) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'SteamASF.removeFromWishlist');
      return false;
    }
  }

  async toggleFollowGame(gameId: string, doTask: boolean): Promise<boolean> {
    /**
     * @internal
     * @description Steam 关注取关游戏
     * @param gameId Steam游戏AppId
     * @param doTask true: 关注游戏 | false: 取关游戏
     * @return true: 成功 | false: 失败
    */
    try {
      const logStatus = echoLog({ type: `${doTask ? '' : 'un'}followingGame`, text: gameId });

      const { result, statusText, status, data } = await httpRequest({
        ...this.#asfOptions,
        data: JSON.stringify({ Command: `!${doTask ? '' : 'UN'}FOLLOWGAME ${this.#botName} ${gameId}` })
      });
      if (result === 'Success') {
        if (data?.status === 200 &&
          ['成功', 'Success', 'Успех'].find((text) => (data.response?.Result?.includes(text)))
        ) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'SteamASF.toggleFollowGame');
      return false;
    }
  }
  async toggleCurator(curatorId: string, doTask = true): Promise<boolean> {
    /**
      * @internal
      * @description 关注Steam鉴赏家/开发商/发行商
      * @param curatorId 鉴赏家id
      * @return true: 关注成功 | false: 关注失败
    */
    try {
      const logStatus = echoLog({ type: doTask ? 'followingCurator' : 'unfollowingCurator', text: curatorId });

      const { result, statusText, status, data } = await httpRequest({
        ...this.#asfOptions,
        data: JSON.stringify({ Command: `!${doTask ? '' : 'UN'}FOLLOWCURATOR ${this.#botName} ${curatorId}` })
      });
      if (result === 'Success') {
        if (data?.status === 200 &&
          ['成功', 'Success', 'Успех'].find((text) => (data.response?.Result?.includes(text)))
        ) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.toggleCurator');
      return false;
    }
  }
  async addLicense(id: string): Promise<boolean> {
    try {
      const [type, ids] = id.split('-');
      if (type === 'appid') {
        const logStatus = echoLog({ type: 'addingFreeLicense', text: ids });
        const { result, statusText, status, data } = await httpRequest({
          ...this.#asfOptions,
          data: JSON.stringify({ Command: `!addlicense ${this.#botName} app/${ids}` })
        });
        if (result === 'Success') {
          if (data?.status === 200 &&
            ['AlreadyPurchased', 'OK'].find((text) => (data.response?.Result?.includes(text)))
          ) {
            logStatus.success();
            return true;
          }
          logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      } else if (type === 'subid') {
        const idsArr = ids.split(',');

        const logStatus = echoLog({ type: 'addingFreeLicenseSubid', text: ids });
        const { result, statusText, status, data } = await httpRequest({
          ...this.#asfOptions,
          data: JSON.stringify({ Command: `!addlicense ${this.#botName} ${idsArr.map((id) => `sub/${id}`).join(',')}` })
        });
        if (result === 'Success') {
          if (data?.status === 200 && data.response?.Result) {
            const resultLines = data.response.Result.split('\n');
            idsArr.forEach((subid) => {
              const targetLine = resultLines.find((text: string) => text.includes(subid));
              if (targetLine && ['成功', 'Success', 'Успех'].find((text) => (targetLine.includes(text)))) {
                echoLog({}).success(targetLine);
              } else {
                echoLog({}).error(targetLine);
              }
            });
            return true;
          }
          logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
          return false;
        }
        logStatus.error(`${result}:${statusText}(${status})`);
        return false;
      }
      return false;
    } catch (error) {
      throwError(error as Error, 'SteamASF.addLicense');
      return false;
    }
  }
  async requestPlayTestAccess(id: string): Promise<boolean> {
    /**
      * @internal
      * @description 请求访问权限
      * @param id Steam游戏appid
      * @return true: 成功 | false: 失败
    */
    try {
      const logStatus = echoLog({ type: 'requestingPlayTestAccess', text: id });

      const { result, statusText, status, data } = await httpRequest({
        ...this.#asfOptions,
        data: JSON.stringify({ Command: `!REQUESTACCESS ${this.#botName} ${id}` })
      });
      if (result === 'Success') {
        if (data?.status === 200 &&
          ['成功', 'Success', 'Успех'].find((text) => (data.response?.Result?.includes(text)))
        ) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.response?.Result || data?.response?.Message || data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Steam.requestPlayTestAccess');
      return false;
    }
  }
}
export default SteamASF;
