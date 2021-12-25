/*
 * @Author       : HCLonely
 * @Date         : 2021-12-24 16:41:12
 * @LastEditTime : 2021-12-25 20:27:09
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
      wishlists: true,
      follows: true,
      forums: true,
      workshops: true,
      curators: true,
      workshopVotes: true,
      announcements: true
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
      wishlists: true,
      follows: true,
      forums: true,
      workshops: true,
      curators: true
    }
  },
  other: {
    twitterVerifyId: '783214',
    youtubeVerifyChannel: 'UCrXUsMBcfTVqwAS7DKg9C0Q',
    checkLogin: true,
    checkLeftKey: true
  }
};

const userDefinedGlobalOptions = GM_getValue<object>('globalOptions') || {}; // eslint-disable-line new-cap
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
      globalOptions[keys[0]][keys[1]][keys[2]] = data[name] ? (data[name] === 'on' ? true : data[name]) : false; // eslint-disable-line
      } else if (keys.length === 2) {
      // @ts-ignore
      globalOptions[keys[0]][keys[1]] = data[name] ? (data[name] === 'on' ? true : data[name]) : false; // eslint-disable-line
      }
      return element;
    });

    GM_setValue('globalOptions', globalOptions); // eslint-disable-line new-cap
    Swal.fire({
      title: __('changeGlobalOptionsSuccess'),
      icon: 'success'
    });
  } catch (error) {
    throwError(error as Error, 'saveData');
  }
};
const changeGlobalOptions = (showType: 'page' | 'swal') => {
  try {
    let globalOptionsForm = `<form id="globalOptionsForm" class="auto-task-form">
  <table class="auto-task-table"><thead><tr><td>${__('type')}</td><td>${__('option')}</td><td>${__('value')}</td></tr></thead><tbody>`;
    for (const [type, data1] of Object.entries(globalOptions)) {
      for (const [option, data2] of Object.entries(data1)) {
        if (type === 'other') {
          if (typeof data2 === 'boolean') {
            globalOptionsForm +=
            `<tr>${
              Object.keys(data1).indexOf(option) === 0 ?
                `<th rowspan="${Object.keys(data1).length}" style="background-color: ${stringToColour(type)}66">${__(type)}</th>` :
                ''
            }<td>${__(option)}</td><td><input type="checkbox" name="${type}.${option}"${
              data2 ? ' checked="checked"' : ''
            }/></td></tr>`;
          } else {
            globalOptionsForm +=
            `<tr>${
              Object.keys(data1).indexOf(option) === 0 ?
                `<th rowspan="${Object.keys(data1).length}" style="background-color: ${stringToColour(type)}66">${__(type)}</th>` :
                ''
            }<td>${__(option)}</td><td><input class="editOption" type="text" name="${type}.${option}" value="${data2}"/></td></tr>`;
          }
        } else {
        // @ts-ignore
          for (const [socialType, data3] of Object.entries(data2)) {
            globalOptionsForm +=
            `<tr style="background-color: ${stringToColour(option)}66">${
              Object.keys(data1).indexOf(option) === 0 ?
                `<th rowspan="${Object.keys(data1).map((key) => Object.keys(data1[key]).length)
                  .reduce((acr, cur) => acr + cur)}" style="background-color: ${stringToColour(type)}66">${__(type)}</th>` :
                ''
            }<td>${option}.${__(socialType)}</td><td><input type="checkbox" name="${type}.${option}.${socialType}"${
              data3 ? ' checked="checked"' : ''
            }/></td></tr>`;
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
