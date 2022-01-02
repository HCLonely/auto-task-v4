/*
 * @Author       : HCLonely
 * @Date         : 2021-12-25 19:00:53
 * @LastEditTime : 2022-01-02 12:32:13
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
import syncOptions from '../dataSync';

class Setting {
  name = 'Setting';
  buttons: Array<string> = [
    'saveGlobalOptions',
    'syncData',
    'tasksHistory'
  ];
  dataSync = syncOptions;

  tasksHistory(): void {
    window.open('https://auto-task-v4.hclonely.com/history.html', '_blank');
  }

  static test(): boolean {
    return window.location.host === 'auto-task-v4.hclonely.com' && window.location.pathname === '/setting.html';
  }
  before(): void {
    $('body').html('')
      .addClass('auto-task-options');
  }
  after(): void {
    try {
      this.#environment();
      changeGlobalOptions('page');
      whiteListOptions('page');

      $('input[name="other.twitterVerifyId"]').after(`<button id="getTwitterUserId" type="button">${__('getTwitterUserId')}</button>`);
      $('#getTwitterUserId').on('click', () => { this.#getId('twitterUser'); });
      $('input[name="other.youtubeVerifyChannel"]').after(`<button id="getYoutubeChannelId" type="button">${__('getYoutubeChannelId')}</button>`);
      $('#getYoutubeChannelId').on('click', () => { this.#getId('youtubeChannel'); });

      $('input[name^="position"]').on('input', function () {
        const type = ($(this).attr('name') as string)
          .replace('position.', '');
        const xLabel = 'rightleft';
        const yLabel = 'topbottpm';
        switch (type) {
        case 'buttonSideX':
        case 'buttonSideY':
        case 'buttonDistance':
        {
          const distance = $('input[name="position.buttonDistance"]').val() as string;
          const sideX = $('input[name="position.buttonSideX"]').val() as string;
          const sideY = $('input[name="position.buttonSideY"]').val() as string;
          if (!['right', 'left'].includes(sideX)) break;
          if (!['top', 'bottom'].includes(sideY)) break;
          if (!/^[\d]+?,[\d]+$/.test(distance)) break;
          const distanceArr = distance.split(',');
          $('#auto-task-buttons').css(sideX, `${distanceArr[0]}px`)
            .css(sideY, `${distanceArr[1]}px`)
            .css(xLabel.replace(sideX, ''), '')
            .css(yLabel.replace(sideY, ''), '');
          break;
        }
        case 'showButtonSideX':
        case 'showButtonSideY':
        case 'showButtonDistance':
        {
          const distance = $('input[name="position.showButtonDistance"]').val() as string;
          const sideX = $('input[name="position.showButtonSideX"]').val() as string;
          const sideY = $('input[name="position.showButtonSideY"]').val() as string;
          if (!['right', 'left'].includes(sideX)) break;
          if (!['top', 'bottom'].includes(sideY)) break;
          if (!/^[\d]+?,[\d]+$/.test(distance)) break;
          const distanceArr = distance.split(',');
          $('div.show-button-div').css(sideX, `${distanceArr[0]}px`)
            .css(sideY, `${distanceArr[1]}px`)
            .css(xLabel.replace(sideX, ''), '')
            .css(yLabel.replace(sideY, ''), '');
          break;
        }
        case 'logSideX':
        case 'logSideY':
        case 'logDistance':
        {
          const distance = $('input[name="position.logDistance"]').val() as string;
          const sideX = $('input[name="position.logSideX"]').val() as string;
          const sideY = $('input[name="position.logSideY"]').val() as string;
          if (!['right', 'left'].includes(sideX)) break;
          if (!['top', 'bottom'].includes(sideY)) break;
          if (!/^[\d]+?,[\d]+$/.test(distance)) break;
          const distanceArr = distance.split(',');
          $('#auto-task-info').css(sideX, `${distanceArr[0]}px`)
            .css(sideY, `${distanceArr[1]}px`)
            .css(xLabel.replace(sideX, ''), '')
            .css(yLabel.replace(sideY, ''), '');
          break;
        }
        default:
          break;
        }
      });

      $('input[name^="hotKey"]').attr('readonly', 'readonly')
        .off('keydown')
        .on('keydown', function (event) {
          let functionKey = '';
          if (event.altKey) {
            functionKey += 'alt + ';
          } else if (event.ctrlKey) {
            functionKey += 'ctrl + ';
          } else if (event.shiftKey) {
            functionKey += 'shift + ';
          }
          $(this).val(functionKey + (event.key.length === 1 ? event.key.toLowerCase() : ''));
        });
    } catch (error) {
      throwError(error as Error, 'Setting.after');
    }
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
            link.match(/url=(https:\/\/www\.youtube\.com\/.*)/)?.[1] :
            link;
          $('#socialLink').val((await getInfo(name as string, 'channel'))?.params?.channelId || '');
        }
      });
    } catch (error) {
      throwError(error as Error, 'Setting.getId');
    }
  }
  #environment(): void {
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
  }
}

export default Setting;
