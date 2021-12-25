/*
 * @Author       : HCLonely
 * @Date         : 2021-12-25 19:00:53
 * @LastEditTime : 2021-12-25 19:37:46
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/src/scripts/website/Setting.ts
 * @Description  : 设置页面
 */

import { changeGlobalOptions, saveData } from '../globalOptions';
import whiteListOptions from '../social/whiteList';

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
    changeGlobalOptions('page');
    whiteListOptions('page');
  }
  saveGlobalOptions(): void {
    saveData();
  }
}

export default Setting;
