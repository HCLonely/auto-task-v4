/*
 * @Author       : HCLonely
 * @Date         : 2021-12-30 14:20:30
 * @LastEditTime : 2022-01-03 14:06:03
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
    const checkUrl = `${updateLink}/package.json`;
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
    if (packageData && version !== currentVersion) {
      echoLog({ html: `<li><font>${__('newVersionNotice', version, `${updateLink}dist/${GM_info.script.name}.user.js`)}</font></li>` });
      echoLog({ html: `<li>${__('updateText', version)}</li><ol class="update-text">${
        packageData.change.map((change) => `<li>${change}</li>`).join('')}</ol>` });
    }
  } catch (error) {
    throwError(error as Error, 'updateChecker');
  }
};

export default updateChecker;
