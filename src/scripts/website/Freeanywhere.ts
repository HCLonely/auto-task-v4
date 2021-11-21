/*
 * @Author       : HCLonely
 * @Date         : 2021-11-04 14:02:03
 * @LastEditTime : 2021-11-21 16:05:29
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Freeanywhere.ts
 * @Description  : https://freeanywhere.net
 */

// eslint-disable-next-line
/// <reference path = "FreeAnyWhere.d.ts" />

import * as Cookies from 'js-cookie';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import __ from '../tools/i18n';
import httpRequest from '../tools/httpRequest';
import { delay } from '../tools/tools';

const defaultTasks: fawSocialTasks = {
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

class FreeAnyWhere extends Website {
  tasks: Array<fawTaskInfo> = []
  socialTasks: fawSocialTasks = { ...defaultTasks }
  undoneTasks: fawSocialTasks = { ...defaultTasks }

  static test(): boolean {
    return window.location.host === 'freeanywhere.net';
  }
  init(): boolean {
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
      // todo
      this.socialTasks = GM_getValue<fawSocialTasks>(`fawTasks-${this.giveawayId}`) || { ...defaultTasks }; // eslint-disable-line new-cap

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
              title: task.title,
              done: task.is_success,
              link: task.link
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
              // todo
              break;
            }
          }
          logStatus.success();
          this.undoneTasks = this.uniqueTasks(this.undoneTasks) as fawSocialTasks;
          this.socialTasks = this.uniqueTasks(this.socialTasks) as fawSocialTasks;
          GM_setValue(`fawTasks${this.giveawayId}`, this.socialTasks); // eslint-disable-line new-cap
          return true;
        }
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
        console.error(data);
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
      echoLog({ html: `<li><font class="success">${__('allTasksComplete')}</font></li>` });
      return true;
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.verifyTask');
      return false;
    }
  }
  async getKey(): Promise<void> {
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
        echoLog({ html: `<li><font class="success">${data.response.reward}</font></li>` });
      } else {
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
      }
    } else {
      logStatus.error(`${result}:${statusText}(${status})`);
    }
  }

  #getGiveawayId() {
    try {
      const giveawayId = window.location.href.match(/\/giveaway\/([\d]+)/)?.[1];
      if (giveawayId) {
        this.giveawayId = giveawayId;
        return true;
      }
      echoLog({ html: `<li><font class="error">${__('getFailed', 'GiveawayId')}</font></li>` });
      return false;
    } catch (error) {
      throwError(error as Error, 'Keyhub.getGiveawayId');
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
}

export default FreeAnyWhere;
