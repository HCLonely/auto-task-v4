/*
 * @Author       : HCLonely
 * @Date         : 2021-11-04 14:02:03
 * @LastEditTime : 2021-11-05 14:31:40
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/freeanywhere.ts
 * @Description  : https://freeanywhere.net
 */

// eslint-disable-next-line
/// <reference path = "Freeanywhere.d.ts" />

import * as Cookies from 'js-cookie';
import Website from './Website';
import throwError from '../tools/throwError';
import echoLog from '../echoLog';
import getI18n from '../i18n/i18n';
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

class Freeanywhere extends Website {
  tasks: Array<fawTaskInfo> = []
  socialTasks: fawSocialTasks = defaultTasks
  undoneTasks: fawSocialTasks = defaultTasks
  giveawayId!: string
  socialInitialized = false
  #initialized = false

  test() {
    return window.location.host === 'freeanywhere.net';
  }
  async doTask(): Promise<boolean> {
    try {
      if (!this.#initialized && !this.#init()) {
        return false;
      }
      if (!(await this.#classifyTask('do'))) {
        return false;
      }
      if (!this.socialInitialized && !(await this.initSocial('do'))) {
        return false;
      }
      const pro = [];
      if (this.social.steam) {
        pro.push(this.social.steam.toggle({ doTask: true, ...this.undoneTasks.steam }));
      }
      if (this.social.vk) {
        pro.push(this.social.vk.toggle({ doTask: true, ...this.undoneTasks.vk }));
      }
      return await Promise.all(pro).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.doTask');
      return false;
    }
  }
  async undoTask(): Promise<boolean> {
    try {
      if (!this.#initialized && !this.#init()) {
        return false;
      }
      if (!(await this.#classifyTask('undo'))) {
        return false;
      }
      if (!this.socialInitialized && !(await this.initSocial('undo'))) {
        return false;
      }
      const pro = [];
      if (this.social.steam) {
        pro.push(this.social.steam.toggle({ doTask: false, ...this.socialTasks.steam }));
      }
      if (this.social.vk) {
        pro.push(this.social.vk.toggle({ doTask: false, ...this.socialTasks.vk }));
      }
      return await Promise.all(pro).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.undoTask');
      return false;
    }
  }
  async verifyTask(): Promise<boolean> {
    try {
      if (!this.#initialized && !this.#init()) {
        return false;
      }
      if (!(await this.#classifyTask('verify'))) {
        return false;
      }
      const pro = [];
      for (const task of this.tasks) {
        pro.push(this.#verify(task));
        await delay(1000);
      }
      return await Promise.all(pro).then(() => true);
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.verifyTask');
      return false;
    }
  }
  async getKey(): Promise<void> {
    const logStatus = echoLog({ type: 'custom', text: `<li>${getI18n('gettingKey')}...<font></font></li>` });
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
        echoLog({ type: 'custom', text: `<li><font class="success">${data.response.reward}</font></li>` });
      } else {
        logStatus.error(`Error:${data?.statusText}(${data?.status})`);
      }
    } else {
      logStatus.error(`${result}:${statusText}(${status})`);
    }
  }

  #getGiveawayId() {
    const giveawayId = window.location.href.match(/\/giveaway\/([\d]+)/)?.[1];
    if (giveawayId) {
      this.giveawayId = giveawayId;
      return true;
    }
    echoLog({ type: 'custom', text: `<li><font class="error">${getI18n('getGiveawayIdFailed')}</font></li>` });
    return false;
  }
  #init() {
    try {
      const logStatus = echoLog({ type: 'init' });
      if ($('a[href="#/login"]').length > 0) {
        window.open('/#/login', '_self');
        logStatus.warning('请先登录');
        return false;
      }
      if (window.location.href.includes('/login')) {
        echoLog({ type: 'custom', text: `<li><font class="error">${getI18n('needLogin')}</font></li>` });
        logStatus.warning('请先登录');
        return false;
      }
      if (!/^https?:\/\/freeanywhere\.net\/#\/giveaway\/[\d]+/.test(window.location.href)) {
        const id = window.location.href.match(/https?:\/\/freeanywhere\.net\/.*?#\/giveaway\/([\d]+)/)?.[1];
        if (!id) {
          logStatus.error('获取id失败');
          return false;
        }
        window.location.href = `https://freeanywhere.net/#/giveaway/${id}`;
      }
      if (!this.#getGiveawayId()) return false;
      this.#initialized = true;
      logStatus.success();
      return true;
    } catch (error) {
      throwError(error as Error, 'Freeanywhere.init');
      return false;
    }
  }
  async #verify(task: fawTaskInfo):Promise<boolean> {
    try {
      const logStatus = echoLog({ type: 'custom', text: `<li>${getI18n('verifyingTask')}${task.title.trim()}...<font></font></li>` });

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
  async #classifyTask(action: string) {
    try {
      const logStatus = echoLog({ type: 'custom', text: `<li>${getI18n('getTasksInfo')}<font></font></li>` });
      // todo
      this.undoneTasks = GM_getValue<fawSocialTasks>(`fawTasks-${this.giveawayId}`) || defaultTasks; // eslint-disable-line new-cap

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
}

export default Freeanywhere;