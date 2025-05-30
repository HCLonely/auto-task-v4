/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 16:41:12
 * @LastEditTime : 2022-02-12 17:59:15
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/globalOptions.ts
 * @Description  : 全局设置选项
 */

// eslint-disable-next-line
/// <reference path = "globalOptions.d.ts" />

import Swal from 'sweetalert2';
import __ from './tools/i18n';
import throwError from './tools/throwError';
import { stringToColour } from './tools/tools';
/**
 * 默认全局选项配置对象，包含各个平台的任务设置、位置、热键和其他选项。
 *
 * @constant {globalOptions} defaultGlobalOptions
 * @property {Object} doTask - 执行任务的选项。
 * @property {Object} doTask.discord - Discord 平台的任务设置。
 * @property {boolean} doTask.discord.servers - 是否执行 Discord 服务器任务。
 * @property {Object} doTask.instagram - Instagram 平台的任务设置。
 * @property {boolean} doTask.instagram.users - 是否执行 Instagram 用户任务。
 * @property {Object} doTask.twitch - Twitch 平台的任务设置。
 * @property {boolean} doTask.twitch.channels - 是否执行 Twitch 频道任务。
 * @property {Object} doTask.twitter - Twitter 平台的任务设置。
 * @property {boolean} doTask.twitter.users - 是否执行 Twitter 用户任务。
 * @property {boolean} doTask.twitter.retweets - 是否执行 Twitter 转发任务。
 * @property {Object} doTask.vk - VK 平台的任务设置。
 * @property {boolean} doTask.vk.names - 是否执行 VK 名称任务。
 * @property {Object} doTask.youtube - YouTube 平台的任务设置。
 * @property {boolean} doTask.youtube.channels - 是否执行 YouTube 频道任务。
 * @property {boolean} doTask.youtube.likes - 是否执行 YouTube 点赞任务。
 * @property {Object} doTask.reddit - Reddit 平台的任务设置。
 * @property {boolean} doTask.reddit.reddits - 是否执行 Reddit 子版块任务。
 * @property {Object} doTask.steam - Steam 平台的任务设置。
 * @property {boolean} doTask.steam.groups - 是否执行 Steam 群组任务。
 * @property {boolean} doTask.steam.officialGroups - 是否执行 Steam 官方群组任务。
 * @property {boolean} doTask.steam.wishlists - 是否执行 Steam 心愿单任务。
 * @property {boolean} doTask.steam.follows - 是否执行 Steam 关注任务。
 * @property {boolean} doTask.steam.forums - 是否执行 Steam 论坛任务。
 * @property {boolean} doTask.steam.workshops - 是否执行 Steam 工作坊任务。
 * @property {boolean} doTask.steam.curators - 是否执行 Steam 策展人任务。
 * @property {boolean} doTask.steam.workshopVotes - 是否执行 Steam 工作坊投票任务。
 * @property {boolean} doTask.steam.announcements - 是否执行 Steam 公告任务。
 * @property {boolean} doTask.steam.licenses - 是否执行 Steam 许可证任务。
 * @property {boolean} doTask.steam.playtests - 是否执行 Steam 测试版任务。
 *
 * @property {Object} undoTask - 撤销任务的选项，结构与 doTask 相同。
 *
 * @property {Object} ASF - ASF 相关设置。
 * @property {boolean} ASF.AsfEnabled - 是否启用 ASF。
 * @property {string} ASF.AsfIpcUrl - ASF IPC URL。
 * @property {string} ASF.AsfIpcPassword - ASF IPC 密码。
 * @property {string} ASF.AsfBotname - ASF 机器人名称。
 *
 * @property {Object} position - 按钮和日志的位置设置。
 * @property {string} position.buttonSideX - 按钮 X 轴位置。
 * @property {string} position.buttonSideY - 按钮 Y 轴位置。
 * @property {string} position.buttonDistance - 按钮距离。
 * @property {string} position.showButtonSideX - 显示按钮 X 轴位置。
 * @property {string} position.showButtonSideY - 显示按钮 Y 轴位置。
 * @property {string} position.showButtonDistance - 显示按钮距离。
 * @property {string} position.logSideX - 日志 X 轴位置。
 * @property {string} position.logSideY - 日志 Y 轴位置。
 * @property {string} position.logDistance - 日志距离。
 *
 * @property {Object} hotKey - 热键设置。
 * @property {string} hotKey.doTaskKey - 执行任务的热键。
 * @property {string} hotKey.undoTaskKey - 撤销任务的热键。
 * @property {string} hotKey.toggleLogKey - 切换日志的热键。
 *
 * @property {Object} other - 其他设置。
 * @property {string} other.twitterVerifyId - Twitter 验证 ID。
 * @property {string} other.youtubeVerifyChannel - YouTube 验证频道。
 * @property {string} other.autoUpdateSource - 自动更新源。
 * @property {string} other.language - 语言设置。
 * @property {boolean} other.checkLogin - 是否检查登录状态。
 * @property {boolean} other.checkLeftKey - 是否检查左键。
 * @property {boolean} other.defaultShowButton - 默认是否显示按钮。
 * @property {boolean} other.defaultShowLog - 默认是否显示日志。
 * @property {boolean} other.debug - 是否启用调试模式。
 * @property {boolean} other.receivePreview - 是否接收预览。
 */
const defaultGlobalOptions: globalOptions = {
  doTask: {
    discord: {
      servers: true
    },
    instagram: {
      users: true
    },
    twitch: {
      channels: true
    },
    twitter: {
      users: true,
      retweets: true
    },
    vk: {
      names: true
    },
    youtube: {
      channels: true,
      likes: true
    },
    reddit: {
      reddits: true
    },
    steam: {
      groups: true,
      officialGroups: true,
      wishlists: true,
      follows: true,
      forums: true,
      workshops: true,
      curators: true,
      workshopVotes: true,
      announcements: true,
      licenses: true,
      playtests: true,
      playTime: true
    }
  },
  undoTask: {
    discord: {
      servers: true
    },
    instagram: {
      users: true
    },
    twitch: {
      channels: true
    },
    twitter: {
      users: true,
      retweets: true
    },
    vk: {
      names: true
    },
    youtube: {
      channels: true,
      likes: true
    },
    reddit: {
      reddits: true
    },
    steam: {
      groups: true,
      officialGroups: true,
      wishlists: true,
      follows: true,
      forums: true,
      workshops: true,
      curators: true,
      playTime: true
    }
  },
  ASF: {
    AsfEnabled: false,
    AsfIpcUrl: '',
    AsfIpcPassword: '',
    AsfBotname: 'asf'
  },
  position: {
    buttonSideX: 'right',
    buttonSideY: 'top',
    buttonDistance: '15,30',
    showButtonSideX: 'right',
    showButtonSideY: 'top',
    showButtonDistance: '15,30',
    logSideX: 'right',
    logSideY: 'bottom',
    logDistance: '10,10'
  },
  hotKey: {
    doTaskKey: 'alt + d',
    undoTaskKey: 'alt + u',
    toggleLogKey: 'alt + l'
  },
  other: {
    twitterVerifyId: '783214',
    youtubeVerifyChannel: 'UCrXUsMBcfTVqwAS7DKg9C0Q',
    autoUpdateSource: 'jsdelivr',
    language: 'zh',
    checkLogin: true,
    checkLeftKey: true,
    defaultShowButton: true,
    defaultShowLog: true,
    debug: false,
    receivePreview: true
  }
};

const userDefinedGlobalOptions = GM_getValue<object>('globalOptions') || {};

/**
 * 合并两个对象，返回一个新的对象。对于相同的键，如果两个对象的值都是对象，则递归合并；否则，使用第二个对象的值（如果存在）或第一个对象的值。
 *
 * @param {globalOptions} obj1 - 第一个对象，作为基础对象。
 * @param {object} obj2 - 第二个对象，用于合并到第一个对象。
 *
 * @returns {globalOptions} 返回合并后的新对象。
 *
 * @throws {Error} 如果在合并过程中发生错误，将抛出错误。
 */
const assignObject = (obj1: globalOptions, obj2: object): globalOptions => {
  try {
    const newObj = {};
    for (const [key, value] of Object.entries(obj1)) {
      // @ts-ignore
      if (Object.prototype.toString.call(value) === '[object Object]' && Object.prototype.toString.call(obj2[key]) === '[object Object]') {
        // @ts-ignore
        newObj[key] = assignObject(value, obj2[key]);
      } else {
        // @ts-ignore
        newObj[key] = obj2[key] ?? value;
      }
    }
    return newObj as globalOptions;
  } catch (error) {
    throwError(error as Error, 'assignObject');
    return defaultGlobalOptions;
  }
};

const globalOptions = assignObject(defaultGlobalOptions, userDefinedGlobalOptions);

/**
 * 保存全局选项数据，将表单中的值序列化并更新 `globalOptions` 对象。
 *
 * @returns {void} 无返回值。
 *
 * @throws {Error} 如果在保存过程中发生错误，将抛出错误。
 */
const saveData = () => {
  try {
    const data = {};
    $('#globalOptionsForm').serializeArray()
      .map((value) => {
        // @ts-ignore
        data[value.name] = value.value;
        return value;
      });
    $.makeArray($('#globalOptionsForm input')).map((element) => {
      const name = $(element).attr('name') as string;
      const keys = name.split('.');
      if (keys.length === 3) {
        // @ts-ignore
        globalOptions[keys[0]][keys[1]][keys[2]] = data[name] ? (data[name] === 'on' ? true : data[name]) : (data[name] ?? false); // eslint-disable-line
      } else if (keys.length === 2) {
        // @ts-ignore
        globalOptions[keys[0]][keys[1]] = data[name] ? (data[name] === 'on' ? true : data[name]) : (data[name] ?? false); // eslint-disable-line
      }
      return element;
    });

    GM_setValue('globalOptions', globalOptions);
    Swal.fire({
      title: __('changeGlobalOptionsSuccess'),
      icon: 'success'
    });
  } catch (error) {
    throwError(error as Error, 'saveData');
  }
};

/**
 * 更改全局选项并显示相应的表单。
 *
 * @param {'page' | 'swal'} showType - 指定显示类型，支持 'page' 或 'swal'。
 *
 * @returns {void} 无返回值。
 *
 * @throws {Error} 如果在更改全局选项的过程中发生错误，将抛出错误。
 */
const changeGlobalOptions = (showType: 'page' | 'swal') => {
  try {
    let globalOptionsForm = `<form id="globalOptionsForm" class="auto-task-form">
      <table class="auto-task-table"><thead><tr><td>${__('type')}</td><td>${__('option')}</td><td>${__('value')}</td></tr></thead><tbody>`;
    for (const [type, data1] of Object.entries(globalOptions)) {
      for (const [option, data2] of Object.entries(data1)) {
        if (['other', 'position', 'hotKey', 'ASF'].includes(type)) {
          if (typeof data2 === 'boolean') {
            globalOptionsForm +=
              `<tr style="background-color: ${stringToColour(type)}44">${Object.keys(data1).indexOf(option) === 0 ?
                `<th rowspan="${Object.keys(data1).length}">${__(type)}</th>` :
                ''
              }<td>${__(option)}</td><td><label><input type="checkbox" name="${type}.${option}"${data2 ? ' checked="checked"' : ''
              }/><span><i></i></span></label></td></tr>`;
          } else {
            globalOptionsForm +=
              `<tr style="background-color: ${stringToColour(type)}44">${Object.keys(data1).indexOf(option) === 0 ?
                `<th rowspan="${Object.keys(data1).length}" style="background-color: ${stringToColour(type)}66">${__(type)}</th>` :
                ''
              }<td>${__(option)}</td><td><input class="editOption" type="text" name="${type}.${option}" value="${data2}"/></td></tr>`;
          }
        } else {
          // @ts-ignore
          for (const [socialType, data3] of Object.entries(data2)) {
            globalOptionsForm +=
              `<tr style="background-color: ${stringToColour(option)}66">${Object.keys(data1).indexOf(option) === 0 ?
                `<th rowspan="${Object.keys(data1).map((key) => Object.keys(data1[key]).length)
                  .reduce((acr, cur) => acr + cur)}" style="background-color: ${stringToColour(type)}66">${__(type)}</th>` :
                ''
              }<td>${option}.${__(socialType)}</td><td><label><input type="checkbox" name="${type}.${option}.${socialType}"${data3 ? ' checked="checked"' : ''
              }/><span><i></i></span></label></td></tr>`;
          }
        }
      }
    }
    globalOptionsForm += '</tbody></table></form>';
    if (showType === 'swal') {
      Swal.fire({
        title: __('globalOptions'),
        html: globalOptionsForm,
        showConfirmButton: true,
        confirmButtonText: __('save'),
        showCancelButton: true,
        cancelButtonText: __('close')
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          saveData();
        }
      });
    } else {
      $('body').append(`<h2>${__('globalOptions')}</h2>${globalOptionsForm}`);
    }
  } catch (error) {
    throwError(error as Error, 'changeGlobalOptions');
  }
};

export { globalOptions, changeGlobalOptions, saveData };
