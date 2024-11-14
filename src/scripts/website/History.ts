/*
 * @Author       : HCLonely
 * @Date         : 2021-12-28 18:53:41
 * @LastEditTime : 2022-02-11 10:35:22
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/History.ts
 * @Description  : 任务历史页面
 */

import __ from '../tools/i18n';
import throwError from '../tools/throwError';
import Swal from 'sweetalert2';
import Keylol from './Keylol';
import * as dayjs from 'dayjs';

/**
 * 表示历史记录的类，继承自 Keylol。
 *
 * @class History
 * @extends Keylol
 *
 * @property {string} name - 类的名称，默认为 'History'。
 * @property {Array<string>} buttons - 包含可用操作的按钮名称数组。
 *
 * @method static test - 检查当前域名和路径是否为历史记录页面。
 * @returns {boolean} 如果当前域名为 'auto-task-v4.hclonely.com' 且路径为 '/history.html'，则返回 true；否则返回 false。
 *
 * @method before - 在执行操作之前清空页面的主体内容并添加类。
 * @returns {void} 无返回值。
 * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
 *
 * @method clearHistory - 清除历史记录的方法。
 * @returns {void} 无返回值。
 * @throws {Error} 如果在清除过程中发生错误，将抛出错误。
 *
 * @method #addItem - 添加任务项的方法。
 * @param {string} item - 要添加的任务项名称。
 * @returns {void} 无返回值。
 * @throws {Error} 如果在添加过程中发生错误，将抛出错误。
 */
class History extends Keylol {
  name = 'History';
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'selectAll',
    'selectNone',
    'invertSelect',
    'clearHistory'
  ];

  /**
   * 检查当前域名和路径是否为历史记录页面的静态方法
   *
   * @returns {boolean} 如果当前域名为 'auto-task-v4.hclonely.com' 且路径为 '/history.html'，则返回 true；否则返回 false。
   *
   * @description
   * 该方法通过比较当前窗口的域名和路径来判断是否为历史记录页面。
   * 如果域名和路径匹配，则返回 true；否则返回 false。
   */
  static test(): boolean {
    return window.location.host === 'auto-task-v4.hclonely.com' && window.location.pathname === '/history.html';
  }

  /**
   * 在执行操作之前的函数
   *
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在执行过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法在执行操作之前清空页面的主体内容，并为主体添加 'auto-task-history' 类。
   * 然后获取存储中的所有值，并筛选出以 'Tasks-' 开头的任务历史记录。
   * 遍历每个任务历史记录，调用私有方法 `#addItem` 将其添加到页面中。
   */
  before(): void {
    try {
      $('body').html('<div class="container"></div>')
        .addClass('auto-task-history');
      const data = GM_listValues() || [];
      const tasksHistory = data.map((value) => (/^[\w]+?Tasks-/.test(value) ? value : null)).filter((value) => value) as Array<string>;
      for (const item of tasksHistory) {
        this.#addItem(item);
      }
    } catch (error) {
      throwError(error as Error, 'History.before');
    }
  }

  /**
   * 清除历史记录的方法
   *
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在清除过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法从存储中获取所有值，并筛选出以 'Tasks-' 开头的任务历史记录。
   * 遍历每个任务历史记录，调用 `GM_deleteValue` 删除对应的值。
   * 清除完成后，弹出成功提示框。
   */
  clearHistory(): void {
    try {
      const data = GM_listValues() || [];
      const tasksHistory = data.map((value) => (/^[\w]+?Tasks-/.test(value) ? value : null)).filter((value) => value) as Array<string>;
      for (const item of tasksHistory) {
        GM_deleteValue(item);
      }
      Swal.fire({
        title: __('clearHistoryFinished'),
        icon: 'success'
      });
    } catch (error) {
      throwError(error as Error, 'History.clearHistory');
    }
  }

  /**
   * 添加任务项的方法
   *
   * @param {string} item - 要添加的任务项名称。
   * @returns {void} 无返回值。
   *
   * @throws {Error} 如果在添加过程中发生错误，将抛出错误。
   *
   * @description
   * 该方法从存储中获取指定任务项的数据，并根据任务项的类型生成相应的 HTML。
   * 然后将生成的 HTML 添加到页面的容器中，以便用户查看。
   * 如果在过程中发生错误，则记录错误信息。
   */
  #addItem(item: string): void {
    try {
      const tasksData = GM_getValue<fawGMTasks | gasGMTasks | gkGMTasks | khGMTasks | prysGMTasks>(item);
      if (!tasksData?.tasks) return;
      let html = '';
      let title = '';
      let link = '';

      const [website, id] = item.split('-');
      switch (website) {
      case 'fawTasks':
        title = `Freeanywhere[${id}]`;
        link = `https://freeanywhere.net/#/giveaway/${id}`;
        break;
      case 'gasTasks':
        title = `Giveawaysu[${id}]`;
        link = `https://giveaway.su/giveaway/view/${id}`;
        break;
      case 'gcTasks':
        title = `GiveeClub[${id}]`;
        link = `https://givee.club/event/${id}`;
        break;
      case 'gkTasks':
        title = `Givekey[${id}]`;
        link = `https://givekey.ru/giveaway/${id}`;
        break;
      case 'gleamTasks':
        title = `Gleam[${id}]`;
        link = `https://gleam.io${id}`;
        break;
      case 'khTasks':
        title = `keyhub[${id}]`;
        link = `https://key-hub.eu/giveaway/${id}`;
        break;
      case 'prysTasks':
        title = `Prys[${id}]`;
        link = `https://prys.revadike.com/giveaway/?id=${id}`;
        break;
      default:
        return;
      }
      for (const [social, types] of Object.entries(tasksData.tasks)) {
        for (const [type, tasks] of Object.entries(types)) {
          for (const task of tasks as Array<string>) {
            html += `<li><font class="auto-task-capitalize">${social}.${__(type.replace('Link', ''))}: </font><a href="${task}" target="_blank">${
              task.length > 55 ? `${task.slice(0, 55)
              }...` : task}</a></li>`;
          }
        }
      }
      // eslint-disable-next-line max-len
      $('.container').append(`<div class="card" data-name="${item}"><div class="title"><a href="${link}" target="_blank">${title}</a><span class="delete-task" data-name="${item}" title="${__('deleteTask')}"><svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2734" width="32" height="32"><path d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z" p-id="2735" fill="#d81e06"></path><path d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z" p-id="2736" fill="#d81e06"></path><path d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z" p-id="2737" fill="#d81e06"></path><path d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z" p-id="2738" fill="#d81e06"></path></svg></span></div><ul>${html}</ul><span class="time">${__('lastChangeTime')}: ${dayjs(tasksData.time).format('YYYY-MM-DD HH:mm:ss')}</span></div>`);
      $('span.delete-task').on('click', function () {
        const itemName = $(this).attr('data-name');
        if (itemName) {
          GM_deleteValue(itemName);
          $(`div.card[data-name="${itemName}"]`).remove();
          Swal.fire({
            title: __('clearTaskFinished'),
            text: itemName,
            icon: 'success'
          });
        } else {
          Swal.fire({
            title: __('clearTaskFailed'),
            icon: 'error'
          });
        }
      });
    } catch (error) {
      throwError(error as Error, 'History.addItem');
    }
  }
}

export default History;
