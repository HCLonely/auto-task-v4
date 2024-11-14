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

/**
 * SteamASF类提供与Steam ASF相关的功能。
 *
 * @class SteamASF
 * @description
 * 该类包含多个方法，用于与Steam ASF进行交互，包括初始化、加入/退出组、添加/移除愿望单游戏、关注/取关游戏和鉴赏家等操作。
 *
 * @property {httpRequestOptions} #asfOptions - ASF请求的选项。
 * @property {string} #botName - 机器人名称。
 * @property {Object<string, string>} #groupInfo - 存储Steam组名与ID的对应关系。
 *
 * @method init - 初始化ASF。
 * @returns {Promise<boolean>} - 返回一个Promise，表示初始化的结果。
 *
 * @method joinGroup - 加入指定的Steam组。
 * @param {string} groupName - 要加入的Steam组的名称。
 * @returns {Promise<boolean>} - 返回一个Promise，表示加入操作的结果。
 *
 * @method leaveGroup - 退出指定的Steam组。
 * @param {string} groupName - 要退出的Steam组名。
 * @returns {Promise<boolean>} - 返回一个Promise，表示退出操作的结果。
 *
 * @method #getGroupId - 获取Steam组名与ID的对应关系。
 * @returns {Promise<boolean>} - 返回一个Promise，表示获取组ID的结果。
 *
 * @method addToWishlist - 将指定的游戏添加到Steam的愿望单。
 * @param {string} gameId - Steam游戏的AppId。
 * @returns {Promise<boolean>} - 返回一个Promise，表示添加操作的结果。
 *
 * @method removeFromWishlist - 从Steam愿望单中移除指定的游戏。
 * @param {string} gameId - Steam游戏的AppId。
 * @returns {Promise<boolean>} - 返回一个Promise，表示移除操作的结果。
 *
 * @method toggleFollowGame - 关注或取关指定的Steam游戏。
 * @param {string} gameId - Steam游戏的AppId。
 * @param {boolean} doTask - 指定操作，true表示关注游戏，false表示取关游戏。
 * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
 *
 * @method toggleCurator - 关注或取关指定的Steam鉴赏家/开发商/发行商。
 * @param {string} curatorId - 鉴赏家的ID。
 * @param {boolean} [doTask=true] - 指定操作，true表示关注，false表示取关。
 * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
 *
 * @method addLicense - 添加指定的Steam许可证。
 * @param {string} id - 要添加的许可证ID，格式为'appid-<appid>'或'subid-<subid1>,<subid2>,...'。
 * @returns {Promise<boolean>} - 返回一个Promise，表示添加操作的结果。
 *
 * @method requestPlayTestAccess - 请求访问指定Steam游戏的试玩权限。
 * @param {string} id - Steam游戏的AppId。
 * @returns {Promise<boolean>} - 返回一个Promise，表示请求操作的结果。
 */
class SteamASF {
  #asfOptions!: httpRequestOptions;
  #botName = 'asf';
  #groupInfo!: {
    [name: string]: string
  };

  /**
   * 初始化ASF。
   *
   * @async
   * @function init
   * @returns {Promise<boolean>} - 返回一个Promise，表示初始化的结果。
   *                              - true: 初始化成功
   *                              - false: 初始化失败
   *
   * @description
   * 该方法构建ASF命令的URL，并设置请求选项，包括请求头和数据。
   * 发送一个POST请求以获取ASF的状态信息。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应数据。
   * 如果响应数据表明成功，则返回true；否则，记录错误信息并返回false。
   * 如果在请求过程中发生错误，将抛出错误并返回false。
   */
  async init(): Promise<boolean> {
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

  /**
   * 加入指定的Steam组。
   *
   * @async
   * @function joinGroup
   * @param {string} groupName - 要加入的Steam组的名称。
   * @returns {Promise<boolean>} - 返回一个Promise，表示加入操作的结果。
   *                              - true: 加入成功
   *                              - false: 加入失败
   *
   * @description
   * 该方法通过发送HTTP请求来加入指定的Steam组。
   * 如果请求成功且返回结果为'Success'，则进一步检查响应数据。
   * 如果响应状态为200，并且结果包含已加入或申请的状态，则返回true。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在请求过程中发生错误，将抛出错误并返回false。
   */
  async joinGroup(groupName: string): Promise<boolean> {
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

  /**
   * 退出指定的Steam组。
   *
   * @async
   * @function leaveGroup
   * @param {string} groupName - 要退出的Steam组名。
   * @returns {Promise<boolean>} - 返回一个Promise，表示退出操作的结果。
   *                              - true: 退出成功
   *                              - false: 退出失败
   *
   * @description
   * 该方法首先检查当前的组信息，如果未获取到组信息，则调用`#getGroupId`方法尝试获取。
   * 然后根据组名获取对应的组ID。如果组ID不存在，则返回false。
   * 发送HTTP请求以执行退出组的命令。如果请求成功且返回结果为'Success'，
   * 则进一步检查响应数据的状态。如果状态为200且结果包含成功信息，则返回true。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在请求过程中发生错误，将抛出错误并返回false。
   */
  async leaveGroup(groupName: string): Promise<boolean> {
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

  /**
   * @internal
   * @async
   * @function #getGroupId
   * @returns {Promise<boolean>} - 返回一个Promise，表示获取组ID的结果。
   *                               - true: 成功
   *                               - false: 失败
   *
   * @description
   * 获取Steam组名与ID的对应关系，用于退组操作。
   * 该方法发送一个HTTP请求以获取当前机器人的组列表。
   * 如果请求成功且返回的结果包含有效的组信息，则将组名和ID存储在`#groupInfo`中。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在请求过程中发生错误，将抛出错误并返回false。
   */
  async #getGroupId(): Promise<boolean> {
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

  /**
   * 将指定的游戏添加到Steam的愿望单。
   *
   * @async
   * @function addToWishlist
   * @param {string} gameId - Steam游戏的AppId。
   * @returns {Promise<boolean>} - 返回一个Promise，表示添加操作的结果。
   *                              - true: 添加成功
   *                              - false: 添加失败
   *
   * @description
   * 该方法通过发送HTTP请求将指定的游戏添加到Steam的愿望单。
   * 如果请求成功且返回结果为'Success'，并且响应状态为200且包含成功信息，则返回true。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在请求过程中发生错误，将抛出错误并返回false。
   */
  async addToWishlist(gameId: string): Promise<boolean> {
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

  /**
   * 从Steam愿望单中移除指定的游戏。
   *
   * @async
   * @function removeFromWishlist
   * @param {string} gameId - Steam游戏的AppId。
   * @returns {Promise<boolean>} - 返回一个Promise，表示移除操作的结果。
   *                              - true: 移除成功
   *                              - false: 移除失败
   *
   * @description
   * 该方法通过发送HTTP请求将指定的游戏从Steam的愿望单中移除。
   * 如果请求成功且返回结果为'Success'，并且响应状态为200且包含成功信息，则返回true。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在请求过程中发生错误，将抛出错误并返回false。
   */
  async removeFromWishlist(gameId: string): Promise<boolean> {
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

  /**
   * 关注或取关指定的Steam游戏。
   *
   * @async
   * @function toggleFollowGame
   * @param {string} gameId - Steam游戏的AppId。
   * @param {boolean} doTask - 指定操作，true表示关注游戏，false表示取关游戏。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 操作成功
   *                              - false: 操作失败
   *
   * @description
   * 该方法通过发送HTTP请求来关注或取关指定的Steam游戏。
   * 根据传入的参数`doTask`决定是关注还是取关游戏。
   * 如果请求成功且返回结果为'Success'，并且响应状态为200且包含成功信息，则返回true。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在请求过程中发生错误，将抛出错误并返回false。
   */
  async toggleFollowGame(gameId: string, doTask: boolean): Promise<boolean> {
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

  /**
   * 关注或取关指定的Steam鉴赏家/开发商/发行商。
   *
   * @async
   * @function toggleCurator
   * @param {string} curatorId - 鉴赏家的ID。
   * @param {boolean} [doTask=true] - 指定操作，true表示关注，false表示取关。
   * @returns {Promise<boolean>} - 返回一个Promise，表示操作的结果。
   *                              - true: 关注成功
   *                              - false: 关注失败
   *
   * @internal
   * @description
   * 该方法通过发送HTTP请求来关注或取关指定的Steam鉴赏家。
   * 根据传入的参数`doTask`决定是关注还是取关。
   * 如果请求成功且返回结果为'Success'，并且响应状态为200且包含成功信息，则返回true。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在请求过程中发生错误，将抛出错误并返回false。
   */
  async toggleCurator(curatorId: string, doTask = true): Promise<boolean> {
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

  /**
   * 添加指定的Steam许可证。
   *
   * @async
   * @function addLicense
   * @param {string} id - 要添加的许可证ID，格式为'appid-<appid>'或'subid-<subid1>,<subid2>,...'。
   * @returns {Promise<boolean>} - 返回一个Promise，表示添加操作的结果。
   *                              - true: 添加成功
   *                              - false: 添加失败
   *
   * @description
   * 该方法根据传入的ID类型（appid或subid）添加Steam许可证。
   * 如果ID类型为'appid'，则发送请求以添加应用程序许可证。
   * 如果ID类型为'subid'，则将多个订阅ID分割并逐个添加。
   * 在请求成功的情况下，检查返回的状态和结果，记录成功或错误信息。
   * 如果在请求过程中发生错误，将抛出错误并返回false。
   */
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

  /**
   * 请求访问指定Steam游戏的试玩权限。
   *
   * @async
   * @function requestPlayTestAccess
   * @param {string} id - Steam游戏的AppId。
   * @returns {Promise<boolean>} - 返回一个Promise，表示请求操作的结果。
   *                              - true: 请求成功
   *                              - false: 请求失败
   *
   * @description
   * 该方法通过发送HTTP请求来请求访问指定Steam游戏的试玩权限。
   * 请求的命令格式为`!REQUESTACCESS <botName> <id>`。
   * 如果请求成功且返回结果为'Success'，并且响应状态为200且包含成功信息，则返回true。
   * 如果请求失败或返回的状态不符合预期，则记录错误信息并返回false。
   * 如果在请求过程中发生错误，将抛出错误并返回false。
   */
  async requestPlayTestAccess(id: string): Promise<boolean> {
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
