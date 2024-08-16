/*
 * @Author       : HCLonely
 * @Date         : 2021-11-04 14:02:03
 * @LastEditTime : 2022-12-05 10:55:51
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Freeanywhere.ts
 * @Description  : https://freeanywhere.net
 */

// eslint-disable-next-line
/// <reference path = "FreeAnyWhere.d.ts" />

import Swal from 'sweetalert2';
import * as Cookies from 'js-cookie';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import httpRequest from '../tools/httpRequest';
import { delay } from '../tools/tools';
import { globalOptions } from '../globalOptions';

const defaultTasksTemplate: fawSocialTasks = {
  steam: {
    groupLinks: [],
    wishlistLinks: [],
    curatorLinks: [],
    followLinks: []
  },
  vk: {
    nameLinks: []
  }
};
const defaultTasks = JSON.stringify(defaultTasksTemplate);

class FreeAnyWhere extends Website {
  name = 'FreeAnyWhere';
  tasks: Array<fawTaskInfo> = [];
  socialTasks: fawSocialTasks = JSON.parse(defaultTasks);
  undoneTasks: fawSocialTasks = JSON.parse(defaultTasks);
  buttons: Array<string> = [
    'doTask',
    'undoTask',
    'verifyTask',
    'getKey'
  ];

  static test(): boolean {
    return window.location.host === 'freeanywhere.net';
  }
  async init(): Promise<boolean> {
    try {
      const logStatus = echoLog({ text: __('initing') });
      if ($('a[href="#/login"]').length > 0) {
        window.open('/#/login', '_self');
        logStatus.warning(__('needLogin'));
        return false;
      }
      if (window.location.href.includes('/login')) {
        logStatus.warning(__('needLogin'));
        return false;
      }
      if (!/^https?:\/\/freeanywhere\.net\/#\/giveaway\/[\d]+/.test(window.location.href)) {
        const id = window.location.href.match(/https?:\/\/freeanywhere\.net\/.*?#\/giveaway\/([\d]+)/)?.[1];
        if (!id) {
          logStatus.error(__('getFailed', 'Id'));
          return false;
        }
        window.location.href = `https://freeanywhere.net/#/giveaway/${id}`;
      }
      if (!this.#getGiveawayId()) return false;

      if (!await this.#checkLeftKey()) {
        echoLog({}).warning(__('checkLeftKeyFailed'));
      }
      this.initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.init');
      return false;
    }
  }
  async classifyTask(action: string) {
    try {
      const logStatus = echoLog({ text: __('getTasksInfo') });
      if (action === 'undo') {
        this.socialTasks = GM_getValue<fawGMTasks>(`fawTasks-${this.giveawayId}`)?.tasks || JSON.parse(defaultTasks);
      }

      const { result, statusText, status, data } = await httpRequest({
        url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/?format=json`,
        method: 'GET',
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`,
          'x-csrftoken': Cookies.get('csrftoken') as string
        },
        responseType: 'json'
      });
      if (result === 'Success') {
        const tasks = data?.response?.challenges;
        if (tasks) {
          if (action === 'verify') {
            this.tasks = [];
          }
          for (const task of tasks) {
            const type = task.challenge;
            const social = task.challenge_provider;
            const taskInfo: fawTaskInfo = {
              id: task.id,
              title: task.title
            };
            if (action === 'verify' && !task.is_success) {
              this.tasks.push(taskInfo);
              continue;
            }
            switch (social) {
            case 'steam':
              taskInfo.social = 'steam';
              switch (type) {
              case 'WL':
                if (action === 'undo') this.socialTasks.steam.wishlistLinks.push(task.link);
                if (action === 'do' && !task.is_success) this.undoneTasks.steam.wishlistLinks.push(task.link);
                break;
              case 'JTG':
                if (action === 'undo') this.socialTasks.steam.groupLinks.push(task.link);
                if (action === 'do' && !task.is_success) this.undoneTasks.steam.groupLinks.push(task.link);
                break;
              case 'STC':
                if (action === 'undo') this.socialTasks.steam.curatorLinks.push(task.link);
                if (action === 'do' && !task.is_success) this.undoneTasks.steam.curatorLinks.push(task.link);
                break;
              case 'GF':
                if (action === 'undo') this.socialTasks.steam.followLinks.push(task.link);
                if (action === 'do' && !task.is_success) this.undoneTasks.steam.followLinks.push(task.link);
                break;
              }
              break;
            case 'vk-oauth2':
              if (action === 'undo') this.socialTasks.vk.nameLinks.push(task.link);
              if (action === 'do' && !task.is_success) this.undoneTasks.vk.nameLinks.push(task.link);
              break;
            case 'website':
              // todo
              break;
            default:
              echoLog({}).warning(`${__('unKnownTaskType')}: ${social}`);
              break;
            }
          }
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks) as fawSocialTasks;
          this.socialTasks = this.uniqueTasks(this.socialTasks) as fawSocialTasks;
          if (window.DEBUG) console.log('%cAuto-Task[Debug]:', 'color:blue', JSON.stringify(this));
          GM_setValue(`fawTasks-${this.giveawayId}`, { tasks: this.socialTasks, time: new Date().getTime() });
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.classifyTask');
      return false;
    }
  }
  async verifyTask(): Promise<boolean> {
    try {
      if (!this.initialized && !this.init()) {
        return false;
      }
      if (this.tasks.length === 0 && !(await this.classifyTask('verify'))) {
        return false;
      }
      const pro = [];
      for (const task of this.tasks) {
        pro.push(this.#verify(task));
        await delay(1000);
      }
      await Promise.all(pro);
      echoLog({}).success(__('allTasksComplete'));
      return !!await this.getKey(true);
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.verifyTask');
      return false;
    }
  }
  async getKey(initialized?: boolean): Promise<false | string> {
    try {
      if (!initialized && !this.initialized && !this.init()) {
        return false;
      }
      const logStatus = echoLog({ text: __('gettingKey') });
      const { result, statusText, status, data } = await httpRequest({
        url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/reward/?format=json`,
        method: 'GET',
        dataType: 'json',
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`
        }
      });
      if (result === 'Success') {
        if (data?.response?.reward) {
          logStatus.success();
          echoLog({}).success(data.response.reward);
          return data.response.reward;
        }
        if (data?.response?.completed === false) {
          logStatus.error(__('tasksNotCompleted'));
          return false;
        }
        if (data?.response?.completed === true) {
          await this.#checkLeftKey();
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'FreeAnyWhere.getGiveawayId');
      return false;
    }
  }

  #getGiveawayId() {
    try {
      const giveawayId = window.location.href.match(/\/giveaway\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({}).error(__('getFailed', 'GiveawayId'));
      return false;
    } catch (error) {
      throwError(error as Error, 'FreeAnyWhere.getGiveawayId');
    }
  }
  async #verify(task: fawTaskInfo): Promise<boolean> {
    try {
      const logStatus = echoLog({ html: `<li>${__('verifyingTask')}${task.title.trim()}...<font></font></li>` });

      const { result, statusText, status, data } = await httpRequest({
        url: `https://freeanywhere.net/api/v1/giveaway/${this.giveawayId}/challenge-status/${task.id}/?format=json`,
        method: 'GET',
        dataType: 'json',
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`,
          'x-csrftoken': Cookies.get('csrftoken') as string
        }
      });
      if (result === 'Success') {
        if (data?.response?.status) {
          logStatus.success();
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        return false;
      }
      logStatus.error(`${result}:${statusText}(${status})`);
      return false;
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.verify');
      return false;
    }
  }
  async #checkLeftKey(): Promise<boolean> {
    try {
      if (!globalOptions.other.checkLeftKey) return true;
      const { data } = await httpRequest({
        url: 'https://freeanywhere.net/api/v1/widget/?format=json',
        method: 'GET',
        dataType: 'json',
        headers: {
          authorization: `Token ${window.localStorage.getItem('token')}`
        }
      });
      if (data?.response?.giveaways.find((giveaway: any) => `${giveaway?.id}` === this.giveawayId)) {
        return true;
      }
      await Swal.fire({
        icon: 'warning',
        title: __('notice'),
        text: __('noKeysLeft'),
        confirmButtonText: __('confirm'),
        cancelButtonText: __('cancel'),
        showCancelButton: true
      }).then(({ value }) => {
        if (value) {
          window.close();
        }
      });
      return true;
    } catch (error) {
      throwError(error as Error, 'Giveawaysu.checkLeftKey');
      return false;
    }
  }
}

export default FreeAnyWhere;
