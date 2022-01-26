/*
 * @Author       : HCLonely
 * @Date         : 2021-12-29 19:53:51
 * @LastEditTime : 2022-01-26 12:43:09
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/dataSync.ts
 * @Description  : 数据同步
 */

import throwError from './tools/throwError';
import __ from './tools/i18n';
import httpRequest from './tools/httpRequest';
import Swal from 'sweetalert2';
import echoLog from './echoLog';

const setGistData = async (token: string, gistId: string, fileName: string, content: commonObject): Promise<boolean> => {
  try {
    const logStatus = echoLog({ text: __('settingData') });
    const contentData = JSON.stringify({
      files: {
        [fileName]: {
          content: JSON.stringify(content)
        }
      }
    });
    const { result, statusText, status, data } = await httpRequest({
      url: `https://api.github.com/gists/${gistId}`,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`
      },
      data: contentData,
      responseType: 'json',
      method: 'POST',
      timeout: 30000
    });

    if (result === 'Success') {
      if (data?.status === 200 && data.response.files?.[fileName]?.content === JSON.stringify(content)) {
        logStatus.success();
        return true;
      }
      logStatus.error(`Error:${data?.statusText}(${data?.status})`);
      return false;
    }
    logStatus.error(`${result}:${statusText}(${status})`);
    return false;
  } catch (error) {
    throwError(error as Error, 'setGistData');
    return false;
  }
};
const getGistData = async (token: string, gistId: string, fileName: string, test = false): Promise<boolean | globalOptions> => {
  try {
    const logStatus = echoLog({ text: __('gettingData') });
    const { result, statusText, status, data } = await httpRequest({
      url: `https://api.github.com/gists/${gistId}`,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`
      },
      responseType: 'json',
      method: 'GET',
      timeout: 30000
    });

    if (result === 'Success') {
      if (data?.status === 200) {
        const content = data.response?.files?.[fileName]?.content;
        let formatedContent: globalOptions;
        if (!content) {
          logStatus.error(`Error:${__('noRemoteData')}`);
          return false;
        }
        if (test) {
          logStatus.success();
          return true;
        }
        try {
          formatedContent = JSON.parse(content);
        } catch (error) {
          logStatus.error(`Error:${__('errorRemoteDataFormat')}`);
          return false;
        }
        logStatus.success();
        return formatedContent;
      }
      logStatus.error(`Error:${data?.statusText}(${data?.status})`);
      return false;
    }
    logStatus.error(`${result}:${statusText}(${status})`);
    return false;
  } catch (error) {
    throwError(error as Error, 'getGistData');
    return false;
  }
};

const syncOptions = (): void => {
  try {
    const {
      TOKEN,
      GIST_ID,
      FILE_NAME,
      SYNC_HISTORY
    } = GM_getValue('gistOptions') || { TOKEN: '', GIST_ID: '', FILE_NAME: '', SYNC_HISTORY: true };

    Swal.fire({
      title: __('gistOptions'),
      html:
      `<p>Github Token<input id="github-token" class="swal2-input" placeholder="Github Token" value="${TOKEN}"></p>` +
      `<p>Gist ID<input id="gist-id" class="swal2-input" placeholder="Gist ID" value="${GIST_ID}"></p>` +
      `<p>${__('fileName')}<input id="file-name" class="swal2-input" placeholder="${__('fileName')}" value="${FILE_NAME}"></p>` +
      '<p><label for="sync-history" class="swal2-checkbox-custom" style="display: flex;">' +
      `<input id="sync-history" type="checkbox"${SYNC_HISTORY ? ' checked="checked"' : ''}/>` +
      `<span class="swal2-label">${__('syncHistory')}</span></label></p>` +
      `<p><button id="upload-data" type="button" class="swal2-confirm swal2-styled" style="display: inline-block;">
      ${__('upload2gist')}</button>` +
      `<button id="download-data" type="button" class="swal2-confirm swal2-styled" style="display: inline-block;">
      ${__('downloadFromGist')}</button></p>`,
      focusConfirm: false,
      showLoaderOnConfirm: true,
      footer: `<a href="https://auto-task-doc.js.org/guide/#%E6%95%B0%E6%8D%AE%E5%90%8C%E6%AD%A5" target="_blank">${__('help')}</a>`,
      preConfirm: async () => {
        const token = $('#github-token').val() as string;
        const gistId = $('#gist-id').val() as string;
        const fileName = $('#file-name').val() as string;
        const syncHistory = $('#sync-history').prop('checked');
        GM_setValue('gistOptions', { TOKEN: token, GIST_ID: gistId, FILE_NAME: fileName, SYNC_HISTORY: syncHistory });
        return await getGistData(token, gistId, fileName, true);
      },
      allowOutsideClick: () => !Swal.isLoading(),
      confirmButtonText: __('saveAndTest'),
      showCancelButton: true,
      cancelButtonText: __('close')
    }).then(({ value }) => {
      if (value) {
        Swal.fire({
          icon: 'success',
          title: __('testSuccess')
        }).then(syncOptions);
      } else if (value !== undefined) {
        Swal.fire({
          icon: 'error',
          title: __('testFailed')
        }).then(syncOptions);
      }
    });
    $('#upload-data').on('click', async () => {
      const { TOKEN, GIST_ID, FILE_NAME } = GM_getValue('gistOptions') || {};
      if (!(TOKEN && GIST_ID && FILE_NAME)) {
        return Swal.fire({
          icon: 'error',
          title: __('saveAndTestNotice')
        }).then(syncOptions);
      }
      Swal.fire({
        icon: 'info',
        title: __('processingData')
      });
      const data: commonObject = {};
      const names = GM_listValues();
      const SYNC_HISTORY = $('#sync-history').prop('checked');
      for (const name of names) {
        if (name === 'gistOptions' || /^[\w]+?Auth$/.test(name)) continue;
        if (!SYNC_HISTORY && /^[\w]+?Tasks-/.test(name)) continue;
        data[name] = GM_getValue(name);
      }
      Swal.update({
        icon: 'info',
        title: __('updatingData')
      });
      if (await setGistData(TOKEN, GIST_ID, FILE_NAME, data)) {
        Swal.fire({
          icon: 'success',
          title: __('syncDataSuccess')
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: __('syncDataFailed')
        });
      }
    });
    $('#download-data').on('click', async () => {
      const { TOKEN, GIST_ID, FILE_NAME } = GM_getValue('gistOptions') || {};
      if (!(TOKEN && GIST_ID && FILE_NAME)) {
        return Swal.fire({
          icon: 'error',
          title: __('saveAndTestNotice')
        }).then(syncOptions);
      }
      Swal.fire({
        icon: 'info',
        title: __('downloadingData')
      });
      const data = await getGistData(TOKEN, GIST_ID, FILE_NAME);
      if (!data) {
        return Swal.fire({
          icon: 'error',
          title: __('checkedNoData')
        }).then(syncOptions);
      }
      Swal.update({
        icon: 'info',
        title: __('savingData')
      });
      const SYNC_HISTORY = $('#sync-history').prop('checked');
      for (const [name, value] of Object.entries(data)) {
        if (!SYNC_HISTORY && /^[\w]+?Tasks-/.test(name)) continue;
        GM_setValue(name, value);
      }
      Swal.fire({
        icon: 'success',
        title: __('syncDataSuccess')
      });
    });
  } catch (error) {
    throwError(error as Error, 'syncOptions');
  }
};

export default syncOptions;
