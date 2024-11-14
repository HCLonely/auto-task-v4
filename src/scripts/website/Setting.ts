/*
 * @Author       : HCLonely
 * @Date         : 2021-12-25 19:00:53
 * @LastEditTime : 2022-01-08 17:18:55
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

/**
 * 表示设置页面的类。
 *
 * @class Setting
 * @description
 * 该类用于管理设置页面的功能，包括保存全局选项、同步数据、查看任务历史记录等。
 * 提供了一系列方法来处理用户输入和界面交互。
 *
 * @property {string} name - 设置页面的名称。
 * @property {Array<string>} buttons - 包含可用按钮的名称数组。
 * @property {Function} syncData - 同步数据的选项。
 *
 * @method tasksHistory - 打开任务历史记录页面。
 * @method static test - 检查当前域名和路径是否为设置页面。
 * @method before - 在执行操作之前清空页面内容并添加类。
 * @method after - 初始化页面设置并处理用户输入。
 * @method saveGlobalOptions - 保存当前的全局设置。
 * @method #getId - 获取社交媒体ID。
 * @method #environment - 展示环境信息。
 */
class Setting {
  name = 'Setting';
  buttons: Array<string> = [
    'saveGlobalOptions',
    'syncData',
    'tasksHistory'
  ];
  syncData = syncOptions;

  /**
   * 打开任务历史记录的函数
   *
   * @returns {void} 无返回值。
   *
   * @description
   * 该方法用于在新标签页中打开任务历史记录页面。
   * 用户可以通过此方法查看之前的任务记录。
   */
  tasksHistory(): void {
    GM_openInTab('https://auto-task-v4.hclonely.com/history.html', { active: true });
  }

  /**
   * 检查当前域名和路径是否为设置页面的静态方法
   *
   * @returns {boolean} 如果当前域名为 'auto-task-v4.hclonely.com' 且路径为 '/setting.html'，则返回 true；否则返回 false。
   *
   * @description
   * 该方法通过比较当前窗口的域名和路径来判断是否为设置页面。
   * 如果域名和路径匹配，则返回 true；否则返回 false。
   */
  static test(): boolean {
    return window.location.host === 'auto-task-v4.hclonely.com' && window.location.pathname === '/setting.html';
  }

  /**
   * 在执行操作之前的函数
   *
   * @returns {void} 无返回值。
   *
   * @description
   * 该方法在执行操作之前清空页面的主体内容，并为主体添加 'auto-task-options' 类。
   * 这通常用于重置页面状态，以便进行新的操作或设置。
   */
  before(): void {
    try {
      $('body').html('')
        .addClass('auto-task-options');
    } catch (error) {
      throwError(error as Error, 'Setting.before');
    }
  }

  /**
   * 页面加载后的的方法
   *
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在处理过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法用于初始化页面设置，包括环境配置和全局选项的更改。
   * 为 Twitter 和 YouTube 的验证输入框添加按钮，并绑定点击事件以获取用户ID。
   * 监听与按钮位置相关的输入框变化，根据输入的值动态调整按钮和显示区域的位置。
   * 处理热键输入，允许用户通过按键组合设置热键。
   */
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

  /**
   * 保存全局选项的方法
   *
   * @returns {void} 无返回值。
   *
   * @description
   * 该方法用于保存当前的全局设置。
   * 调用 `saveData` 函数以执行保存操作。
   */
  saveGlobalOptions(): void {
    try {
      saveData();
    } catch (error) {
      throwError(error as Error, 'Setting.saveGlobalOptions');
    }
  }

  /**
   * 获取社交媒体ID的方法
   *
   * @param {string} social - 社交媒体类型，例如 'twitterUser' 或 'youtubeChannel'。
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在获取过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法弹出一个输入框，允许用户输入社交媒体链接以获取对应的ID。
   * 根据社交媒体类型，调用相应的API获取ID并将其填入输入框中。
   * 如果输入的链接为空，则不执行任何操作。
   */
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

  /**
   * 环境信息展示的方法
   *
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在获取环境信息过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法用于获取当前用户的操作系统、浏览器及脚本管理器的信息。
   * 使用 `ua()` 函数获取用户代理信息，并构建一个包含环境信息的表单。
   * 将环境信息表单添加到页面的主体中，以便用户查看。
   */
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
