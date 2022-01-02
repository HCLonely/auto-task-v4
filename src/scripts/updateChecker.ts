/*
 * @Author       : HCLonely
 * @Date         : 2021-12-30 14:20:30
 * @LastEditTime : 2022-01-02 12:56:15
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/updateChecker.ts
 * @Description  : 更新检测
 */

import httpRequest from './tools/httpRequest';
import { globalOptions } from './globalOptions';
import throwError from './tools/throwError';
import echoLog from './echoLog';
import __ from './tools/i18n';

const checkUpdate = async (source: 'github' | 'jsdelivr', auto: boolean): Promise<false | string> => {
  try {
    const checkUrl = source === 'github' ?
      'https://raw.githubusercontent.com/HCLonely/auto-task-v4/main/package.json' :
      'https://cdn.jsdelivr.net/gh/HCLonely/auto-task-v4@main/package.json';
    const { result, statusText, status, data } = await httpRequest({
      url: checkUrl,
      responseType: 'json',
      method: 'GET',
      timeout: 30000
    });

    if (result === 'Success') {
      if (data?.response?.version) {
        return data.response.version;
      }
      if (!auto) {
        echoLog({}).error(`${__('checkUpdateFailed')}[${data?.statusText}(${data?.status})]`);
      }
      return false;
    }
    if (!auto) {
      echoLog({}).error(`${__('checkUpdateFailed')}[${result}:${statusText}(${status})]`);
    }
    return false;
  } catch (error) {
    throwError(error as Error, 'checkUpdate');
    return false;
  }
};
const updateChecker = async () => {
  try {
    const currentVersion = GM_info.script.version;
    const updateSource = globalOptions.other.autoUpdateSource || 'auto';
    const githubUpdateLink =
      `https://github.com/HCLonely/auto-task-new/raw/main/dist/${GM_info.script.name}.user.js`;
    const jsdelivrUpdateLink =
      `https://cdn.jsdelivr.net/gh/HCLonely/auto-task-v4@main/dist/${GM_info.script.name}.user.js`;
    let version: string;
    let updateLink = '';

    if (updateSource === 'github') {
      version = await checkUpdate('github', false) || currentVersion;
      updateLink = githubUpdateLink;
    } else if (updateSource === 'jsdelivr') {
      version = await checkUpdate('jsdelivr', false) || currentVersion;
      updateLink = jsdelivrUpdateLink;
    } else {
      const githubVersion = await checkUpdate('github', true);
      if (githubVersion) {
        version = githubVersion;
        updateLink = githubUpdateLink;
      } else {
        const jsdelivrVersion = await checkUpdate('jsdelivr', true);
        if (jsdelivrVersion) {
          version = jsdelivrVersion;
          updateLink = jsdelivrUpdateLink;
        } else {
          version = currentVersion;
          echoLog({}).error(__('checkUpdateFailed'));
        }
      }
    }
    if (version !== currentVersion) {
      echoLog({}).warning(__('newVersionNotice', version, updateLink));
    }
  } catch (error) {
    throwError(error as Error, 'updateChecker');
  }
};

export default updateChecker;
