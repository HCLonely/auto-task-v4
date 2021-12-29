/*
 * @Author       : HCLonely
 * @Date         : 2021-12-28 18:53:41
 * @LastEditTime : 2021-12-29 17:44:57
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/History.ts
 * @Description  : 任务历史页面
 */

import __ from '../tools/i18n';
import throwError from '../tools/throwError';
import Swal from 'sweetalert2';
import Keylol from './Keylol';
import * as dayjs from 'dayjs';

class History extends Keylol {
  name = 'History'
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'selectAll',
    'selectNone',
    'invertSelect',
    'clearHistory'
  ]

  static test(): boolean {
    return window.location.host === 'auto-task-test.hclonely.com' && window.location.pathname === '/setting.html';
  }
  before(): void {
    try {
      $('body').html('<div class="container"></div>')
        .addClass('auto-task-history');
      const data = GM_listValues() || []; // eslint-disable-line new-cap
      const tasksHistory = data.map((value) => (/^[\w]+?Tasks-/.test(value) ? value : null)).filter((value) => value) as Array<string>;
      for (const item of tasksHistory) {
        this.#addItem(item);
      }
    } catch (error) {
      throwError(error as Error, 'History.before');
    }
  }
  clearHistory(): void {
    try {
      const data = GM_listValues() || []; // eslint-disable-line new-cap
      const tasksHistory = data.map((value) => (/^[\w]+?Tasks-/.test(value) ? value : null)).filter((value) => value) as Array<string>;
      for (const item of tasksHistory) {
        GM_deleteValue(item); // eslint-disable-line new-cap
      }
      Swal.fire({
        title: __('clearHistoryFinished'),
        icon: 'success'
      });
    } catch (error) {
      throwError(error as Error, 'History.after');
    }
  }
  #addItem(item: string) {
    try {
      const tasksData = GM_getValue<fawGMTasks | gasGMTasks | gkGMTasks | khGMTasks | prysGMTasks>(item); // eslint-disable-line new-cap
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
            html += `<li>${social}.${__(type.replace('Link', ''))}: <a href="${task}" target="_blank">${
              task.length > 60 ? `${task.slice(0, 60)
              }...` : task}</a></li>`;
          }
        }
      }
      // eslint-disable-next-line max-len
      $('.container').append(`<div class="card"><div class="title"><a href="${link}" target="_blank">${title}</a><span class="delete-task" data-name="${item}" title="${__('deleteTask')}"><svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2734" width="32" height="32"><path d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z" p-id="2735" fill="#d81e06"></path><path d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z" p-id="2736" fill="#d81e06"></path><path d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z" p-id="2737" fill="#d81e06"></path><path d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z" p-id="2738" fill="#d81e06"></path></svg></span></div><ul>${html}</ul><span class="time">${__('lastChangeTime')}: ${dayjs(tasksData.time).format('YYYY-MM-DD HH:mm:ss')}</span></div>`);
      $('span.delete-task').on('click', function () {
        const itemName = $(this).attr('data-name');
        if (itemName) {
          GM_deleteValue(itemName); // eslint-disable-line new-cap
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
