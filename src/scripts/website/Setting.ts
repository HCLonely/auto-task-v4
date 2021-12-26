/*
 * @Author       : HCLonely
 * @Date         : 2021-12-25 19:00:53
 * @LastEditTime : 2021-12-26 13:56:25
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Setting.ts
 * @Description  : 设置页面
 */

import __ from '../tools/i18n';
import { changeGlobalOptions, saveData } from '../globalOptions';
import whiteListOptions from '../social/whiteList';
import throwError from '../tools/throwError';
import { ua } from '@xuanmo/javascript-utils';
import Twitter from '../social/Twitter';
import { getInfo } from '../social/Youtube';
import Swal from 'sweetalert2';

class Setting {
  name = 'Setting'
  buttons: Array<string> = [
    'saveGlobalOptions'
  ]

  static test(): boolean {
    return window.location.host === 'auto-task.hclonely.com' && window.location.pathname === '/setting.html';
  }
  before(): void {
    $('body').html('')
      .addClass('auto-task-options');
  }
  after(): void {
    this.#environment();
    changeGlobalOptions('page');
    whiteListOptions('page');

    $('input[name="other.twitterVerifyId"]').after(`<button id="getTwitterUserId" type="button">${__('getTwitterUserId')}</button>`);
    $('#getTwitterUserId').on('click', () => { this.#getId('twitterUser'); });
    $('input[name="other.youtubeVerifyChannel"]').after(`<button id="getYoutubeChannelId" type="button">${__('getYoutubeChannelId')}</button>`);
    $('#getYoutubeChannelId').on('click', () => { this.#getId('youtubeChannel'); });
  }
  saveGlobalOptions(): void {
    saveData();
  }

  #getId(social: string): void {
    try {
      Swal.fire({
        title: __('getId', __(social)),
        html: `<input id="socialLink" class="swal2-input" placeholder="在此处输入链接获取id">
        <button id="link2id" data-type="${social}" class="swal2-confirm swal2-styled">获取id</button>`,
        showCancelButton: true,
        cancelButtonText: __('close'),
        showConfirmButton: false
      });
      $('#link2id').on('click', async function () {
        const link = $('#socialLink').val() as string;
        if (!link) return;
        const type = $(this).attr('data-type') as string;
        if (type === 'twitterUser') {
          const name = link.match(/https:\/\/twitter\.com\/(.+)/)?.[1] || link;
          $('#socialLink').val(await new Twitter().userName2id(name) || '');
        } else if (type === 'youtubeChannel') {
          const name = /^https:\/\/(www\.)?google\.com.*?\/url\?.*?url=https:\/\/www.youtube.com\/.*/.test(link) ?
            link.match(/url=(https:\/\/www.youtube.com\/.*)/)?.[1] :
            link;
          $('#socialLink').val((await getInfo(name as string, 'channel'))?.params?.channelId || '');
        }
      });
    } catch (error) {
      throwError(error as Error, 'Setting.getId');
    }
  }
  #environment(): void {
    /* eslint-disable camelcase */
    try {
      const userAgent = ua();
      const environmentForm = `<form id="environmentForm" class="auto-task-form">
        <table class="auto-task-table"><thead><tr><td>${__('type')}</td><td>${__('name')}</td><td>${__('version')}</td></tr></thead><tbody>
        <tr><td>${__('os')}</td><td>${userAgent.os}</td><td>${userAgent.osVersion}</td></tr>
        <tr><td>${__('browser')}</td><td>${userAgent.browserZH}</td><td>${userAgent.browserVersion}</td></tr>
        <tr><td>${__('scriptManager')}</td><td>${GM_info.scriptHandler}</td><td>${GM_info.version}</td></tr>
        <tr><td>${__('script')}</td><td>${GM_info.script.name}</td><td>${GM_info.script.version}</td></tr>
        </tbody></table></form>`;
      $('body').append(`<h2>${__('environment')}</h2>${environmentForm}`);
    } catch (error) {
      throwError(error as Error, 'Setting.environment');
    }
    /* eslint-enable camelcase */
  }
}

export default Setting;
