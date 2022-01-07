/*
 * @Author       : HCLonely
 * @Date         : 2021-12-30 14:20:30
 * @LastEditTime : 2022-01-07 09:59:57
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/updateChecker.ts
 * @Description  : 更新检测
 */

import httpRequest from './tools/httpRequest';
import { globalOptions } from './globalOptions';
import throwError from './tools/throwError';
import echoLog from './echoLog';
import __ from './tools/i18n';

interface packageJson {
  name: string
  version: string
  change: Array<string>
}
const checkUpdate = async (updateLink:string, auto: boolean): Promise<false | packageJson> => {
  try {
    const checkUrl = `${updateLink}package.json?time=${new Date().getTime()}`;
    const { result, statusText, status, data } = await httpRequest({
      url: checkUrl,
      responseType: 'json',
      method: 'GET',
      timeout: 30000
    });

    if (result === 'Success') {
      if (data?.response?.version) {
        return data.response;
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
const hasNewVersion = (currentVersion: string, remoteVersion: string): boolean => {
  try {
    const [currentRealVersion] = currentVersion.split('-');
    const [remoteRealVersion] = remoteVersion.split('-');
    const [currentVersion1, currentVersion2, currentVersion3] = currentRealVersion.split('.').map((value) => parseInt(value, 10));
    const [remoteVersion1, remoteVersion2, remoteVersion3] = remoteRealVersion.split('.').map((value) => parseInt(value, 10));
    if (remoteVersion1 > currentVersion1) {
      return true;
    }
    if (remoteVersion1 < currentVersion1) {
      return false;
    }
    if (remoteVersion2 > currentVersion2) {
      return true;
    }
    if (remoteVersion2 < currentVersion2) {
      return false;
    }
    if (remoteVersion3 > currentVersion3) {
      return true;
    }
    return false;
  } catch (error) {
    throwError(error as Error, 'compareVersion');
    return false;
  }
};
const updateChecker = async () => {
  try {
    const currentVersion = GM_info.script.version;
    const updateSource = globalOptions.other.autoUpdateSource.toLowerCase();
    const updateLinks = {
      github: 'https://github.com/HCLonely/auto-task-new/raw/main/',
      jsdelivr: 'https://cdn.jsdelivr.net/gh/HCLonely/auto-task-v4@main/',
      standby: 'https://auto-task-v4.hclonely.com/'
    };
    let version: string;
    let updateLink = '';
    let packageData: packageJson | false;

    if (['github', 'jsdelivr', 'standby'].includes(updateSource)) {
      updateLink = updateLinks[updateSource as keyof typeof updateLinks];
      packageData = await checkUpdate(updateLink, false);
    } else {
      updateLink = updateLinks.github;
      packageData = await checkUpdate(updateLink, true);
      if (!packageData) {
        updateLink = updateLinks.jsdelivr;
        packageData = await checkUpdate(updateLink, true);
        if (!packageData) {
          updateLink = updateLinks.standby;
          packageData = await checkUpdate(updateLink, true);
        }
      }
    }
    if (packageData) {
      version = packageData.version || currentVersion;
    } else {
      version = currentVersion;
      echoLog({}).error(__('checkUpdateFailed'));
    }
    if (packageData && hasNewVersion(currentVersion, version)) {
      echoLog({ html: `<li><font>${__('newVersionNotice', version, `${updateLink}dist/${GM_info.script.name}.user.js`)}</font></li>` });
      echoLog({ html: `<li>${__('updateText', version)}</li><ol class="update-text">${
        packageData.change?.map((change) => `<li>${change}</li>`).join('')}</ol>` });
    }
  } catch (error) {
    throwError(error as Error, 'updateChecker');
  }
};

export default updateChecker;
