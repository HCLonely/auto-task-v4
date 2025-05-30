/* eslint-disable no-irregular-whitespace */
/*
 * @Author       : HCLonely
 * @Date         : 2021-10-26 15:44:54
 * @LastEditTime : 2025-05-30 12:33:39
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-v4/src/index.ts
 * @Description  : 入口文件
 */

import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import style from './style/auto-task.scss';
import { Websites, WebsiteType } from './scripts/website/index';
// import whiteListOptions from './scripts/social/whiteList';
import websiteOptions from './scripts/website/options';
import __ from './scripts/tools/i18n';
import { globalOptions, changeGlobalOptions } from './scripts/globalOptions';
import keyboardJS from 'keyboardjs';
// import syncOptions from './scripts/dataSync';
import updateChecker from './scripts/updateChecker';
import echoLog from './scripts/echoLog';
import SteamASF from './scripts/social/SteamASF';

window.STYLE = GM_addStyle(style + GM_getResourceText('style'));
window.DEBUG = !!globalOptions.other?.debug;
window.TRACE = !!globalOptions.other?.debug && typeof console.trace === 'function';

declare const commonOptions: {
  headers?: {
    'Client-ID': string
    'Device-ID': string
  }
};
// eslint-disable-next-line no-underscore-dangle
declare const __twilightBuildID: string;

const loadScript = async () => {
  /**
   * 检查用户是否已登录到 Twitch
   *
   * @description
   * 检查当前用户是否已登录到 Twitch。
   * 如果用户已登录，则获取认证令牌和其他相关信息，并将其存储在 GM 值中。
   * 如果用户未登录，则弹出提示框要求用户登录。
   */
  if (window.name === 'ATv4_twitchAuth' && window.location.hostname === 'www.twitch.tv') {
    // 获取存储的认证令牌
    const authToken = Cookies.get('auth-token');
    // 检查用户是否已登录
    const isLogin = !!Cookies.get('login');
    if (isLogin) {
      // 如果已登录，存储认证信息
      GM_setValue('twitchAuth', {
        authToken,
        clientVersion: __twilightBuildID,
        clientId: commonOptions?.headers?.['Client-ID'],
        deviceId: commonOptions?.headers?.['Device-ID'],
        clientSessionId: window.localStorage.local_storage_app_session_id.replace(/"/g, '')
      });
      // 关闭当前窗口并显示提示信息
      window.close();
      Swal.fire('', __('closePageNotice'));
    } else {
      // 如果未登录，显示登录提示
      Swal.fire('', __('needLogin'));
    }
    return;
  }

  /**
   * 检查用户是否已登录到 Reddit
   *
   * @description
   * 检查当前用户是否已登录到 Reddit。
   * 如果存在“Beta 选项”按钮，则将 Reddit 的认证状态设置为 '#auth' 并模拟点击该按钮。
   * 如果按钮不存在，则将认证状态设置为 null，关闭当前窗口并显示提示信息。
   */
  if (window.name === 'ATv4_redditAuth' && window.location.hostname === 'www.reddit.com') {
    // 查找“Beta 选项”按钮
    const betaButton = $('#redesign-beta-optin-btn');
    if (betaButton.length > 0) {
      // 如果按钮存在，点击按钮
      return betaButton[0].click();
    }
    window.close();
    // 显示关闭页面的提示信息
    Swal.fire('', __('closePageNotice'));
    return;
  }

  // 声明一个变量用于存储当前网站的实例
  let website: WebsiteType;

  // 遍历支持的网站类型数组
  for (const Website of Websites) {
    // 检查当前网站是否匹配
    if (Website.test()) {
      // 如果匹配，则创建该网站的实例并赋值给变量
      website = new Website();
      // 退出循环
      break;
    }
  }

  // @ts-ignore
  if (!website) {
    console.log('%c%s', 'color:#ff0000', 'Auto-Task[Warning]: 脚本停止加载，当前网站不支持！');
    return;
  }

  // 如果网站实例存在并且有 before 方法，则调用该方法进行初始化操作
  // @ts-ignore
  if (website?.before) await website?.before();

  // 向页面的主体中添加自动任务信息和按钮的 HTML 结构
  $('body').append(`
    <div id="auto-task-info"
        style="display:${globalOptions.other.defaultShowLog ? 'block' : 'none'};
                ${globalOptions.position.logSideX}:${globalOptions.position.logDistance.split(',')[0]}px;
                ${globalOptions.position.logSideY}:${globalOptions.position.logDistance.split(',')[1]}px;">
    </div>
    <div id="auto-task-buttons"
        style="display:${globalOptions.other.defaultShowButton ? 'block' : 'none'};
                ${globalOptions.position.buttonSideX}:${globalOptions.position.buttonDistance.split(',')[0]}px;
                ${globalOptions.position.buttonSideY}:${globalOptions.position.buttonDistance.split(',')[1]}px;">
    </div>
    <div class="show-button-div"
        style="display:${globalOptions.other.defaultShowButton ? 'none' : 'block'};
                ${globalOptions.position.showButtonSideX}:${globalOptions.position.showButtonDistance.split(',')[0]}px;
                ${globalOptions.position.showButtonSideY}:${globalOptions.position.showButtonDistance.split(',')[1]}px;">
      <a class="auto-task-website-btn"
        href="javascript:void(0);"
        target="_self"
        title="${__('showButton')}"> </a>
    </div>
  `);

  // 当用户点击显示按钮的 div 时，执行以下操作
  $('div.show-button-div').on('click', () => {
    // 显示任务按钮的容器
    $('#auto-task-buttons').show();
    // 隐藏当前的显示按钮 div
    $('div.show-button-div').hide();
  });

  /**
   * 切换日志显示状态
   *
   * @description
   * 切换日志信息的显示和隐藏状态。
   * 根据当前状态，更新日志容器的可见性，并相应地更新按钮的文本和状态属性。
   */
  const toggleLog = () => {
    // 获取切换日志按钮的 jQuery 对象
    const $this = $('#toggle-log');
    // 获取当前按钮的状态属性
    const status = $this.attr('data-status');

    // 如果当前状态为 'show'，则隐藏日志信息
    if (status === 'show') {
      $('#auto-task-info').hide(); // 隐藏日志信息
      $this.attr('data-status', 'hide').text(__('showLog')); // 更新按钮状态和文本
    } else {
      $('#auto-task-info').show(); // 显示日志信息
      $this.attr('data-status', 'show').text(__('hideLog')); // 更新按钮状态和文本
    }
  };

  // 绑定用户自定义的热键以执行任务
  keyboardJS.bind(globalOptions.hotKey.doTaskKey, () => {
    // 如果网站实例存在并且有 doTask 方法，则调用该方法执行任务
    // @ts-ignore
    if (website.doTask) website.doTask();
  });

  // 绑定用户自定义的热键以撤销任务
  keyboardJS.bind(globalOptions.hotKey.undoTaskKey, () => {
    // 如果网站实例存在并且有 undoTask 方法，则调用该方法撤销任务
    // @ts-ignore
    if (website.undoTask) website.undoTask();
  });

  // 绑定用户自定义的热键以切换日志显示状态
  keyboardJS.bind(globalOptions.hotKey.toggleLogKey, toggleLog);

  // @ts-ignore
  if (website?.after) await website?.after();

  // 检查网站实例是否存在按钮配置，存在则添加相应的按钮
  // @ts-ignore
  if (website?.buttons && $('#auto-task-buttons').children().length === 0) {
    // 为按钮容器添加网站名称的类，以便于样式管理
    $('#auto-task-buttons').addClass(`${website.name}-buttons`);

    // 遍历网站按钮配置
    // @ts-ignore
    for (const button of website.buttons) {
      // 检查网站实例中是否存在该按钮的方法
      // @ts-ignore
      if (website[button]) {
        // 创建一个新的按钮元素，并设置其类和文本
        // @ts-ignore
        const btnElement =
                  $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self">${__(button)}</a></p>`);

        // 为按钮添加点击事件处理程序，调用相应的按钮方法
        // @ts-ignore
        btnElement.find('a.auto-task-website-btn').on('click', () => { website[button](); });

        // 将新创建的按钮元素添加到按钮容器中
        $('#auto-task-buttons').append(btnElement);
      }
    }
  }

  // 创建一个用于隐藏任务按钮的元素
  const hideButtonElement = $(`<p><a class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self">
      ${__('hideButton')}</a></p>`);

  // 为隐藏按钮添加点击事件处理程序
  hideButtonElement.find('a.auto-task-website-btn').on('click', () => {
    // 隐藏任务按钮容器
    $('#auto-task-buttons').hide();
    // 显示用于显示按钮的 div
    $('div.show-button-div').show();
  });

  // 创建一个用于切换日志显示状态的元素
  const toggleLogElement =
      $(`<p><a id="toggle-log" class="auto-task-website-btn ${website.name}-button" href="javascript:void(0);" target="_self" data-status="${
        globalOptions.other.defaultShowLog ? 'show' : 'hide'}">
        ${globalOptions.other.defaultShowLog ? __('hideLog') : __('showLog')}</a></p>`);

  // 为切换日志按钮添加点击事件处理程序
  toggleLogElement.find('a.auto-task-website-btn').on('click', toggleLog);

  // 将隐藏按钮和切换日志按钮添加到任务按钮容器中
  $('#auto-task-buttons').append(hideButtonElement)
    .append(toggleLogElement);

  // 检查网站实例是否存在选项配置
  // @ts-ignore
  if (website?.options) {
    // 注册菜单命令以更改网站选项
    // 当用户选择该菜单命令时，调用 `websiteOptions` 函数并传递网站名称和选项
    GM_registerMenuCommand(__('changeWebsiteOptions'), () => {
      // @ts-ignore
      websiteOptions(website.name, website.options);
    });
  }

  if (website.name !== 'Setting') {
    // 注册菜单命令以更改全局选项
    // 当用户选择该菜单命令时，调用 `changeGlobalOptions` 函数并传递 'swal' 作为参数
    GM_registerMenuCommand(__('changeGlobalOptions'), () => { changeGlobalOptions('swal'); });

    // 注册菜单命令以打开设置页面
    // 当用户选择该菜单命令时，打开设置页面的链接
    GM_registerMenuCommand(__('settingPage'), () => {
      GM_openInTab('https://auto-task-v4.hclonely.com/setting.html', { active: true });
      // window.open('https://auto-task-v4.hclonely.com/setting.html', '_blank');
    });
  }

  console.log('%c%s', 'color:#1bbe1a', 'Auto-Task[Load]: 脚本加载完成');

  // 检测Steam ASF挂游戏时长&提醒
  const stopPlayTime = GM_getValue<number>('stopPlayTime', 0) || 0;
  // 计算当前时间超出停止游戏时间的分钟数
  const stopPlayTimeMinutes = Math.floor((Date.now() - stopPlayTime) / 60000);
  if (stopPlayTime > 0 && stopPlayTime < Date.now()) {
    // 如果当前时间小于停止游戏时间，则弹出提示框，提醒用户停止游戏
    Swal.fire({
      title: __('stopPlayTimeTitle'),
      text: __('stopPlayTimeText', stopPlayTimeMinutes.toString()),
      icon: 'warning',
      confirmButtonText: __('confirm')
    }).then(async () => {
      // 用户点击确认后，清除停止游戏时间
      const steamASF = new SteamASF();
      if (await steamASF.init()) {
        if (await steamASF.stopPlayGames()) {
          // 打开任务连接
          GM_setValue('stopPlayTime', 0);
        }
      }
    });
  }

  // 将 GM_info.version 拆分为主版本号和次版本号
  const [v1, v2] = GM_info.version?.split('.') || [];
  // 检查主版本号是否大于等于 5 且次版本号是否大于等于 2
  if (!(parseInt(v1, 10) >= 5 && parseInt(v2, 10) >= 2)) {
    // 如果版本不匹配，则输出错误信息
    echoLog({}).error(__('versionNotMatched'));
  }
  // 检查是否存在通知的 GM 值
  if (!GM_getValue<number>('notice')) {
    // 弹出警告框，提示用户注意事项
    Swal.fire({
      title: __('swalNotice'),
      icon: 'warning'
    }).then(() => {
      // 用户确认后，打开通知链接
      GM_openInTab(__('noticeLink'), { active: true });
      // window.open(__('noticeLink'), '_blank');
      // 记录当前时间，表示用户已查看通知
      GM_setValue('notice', new Date().getTime());
    });
    // 记录警告信息，提示用户查看通知
    echoLog({ html: `<li><font class="warning">${__('echoNotice', __('noticeLink'))}</font></li>` })
      .font?.find('a').on('click', () => {
        // 用户点击链接后，记录当前时间
        GM_setValue('notice', new Date().getTime());
      });
  }
  // 调用更新检查器，检查脚本更新
  updateChecker();
};

if (window.location.hostname === 'discord.com') {
  // 获取当前窗口的 localStorage 对象
  const LocalStorage = window.localStorage;

  if (window.name === 'ATv4_discordAuth') {
    // 重写 localStorage 的 removeItem 方法，使其不执行任何操作
    window.localStorage.removeItem = () => true;

    // 从 localStorage 中获取 Discord 的认证令牌，并去除引号
    const discordAuth = LocalStorage?.getItem('token')?.replace(/^"|"$/g, '');

    // 如果获取到有效的认证令牌
    if (discordAuth && discordAuth.length > 0) {
      // 将认证信息存储到 GM 值中
      GM_setValue('discordAuth', { auth: discordAuth });
      // 关闭当前窗口
      window.close();
      // 弹出提示框，通知用户关闭页面
      Swal.fire('', __('closePageNotice'));
    } else {
      // 如果未能获取到认证令牌，弹出错误提示框
      Swal.fire({
        text: __('getDiscordAuthFailed'),
        icon: 'error'
      });
    }
  } else {
    // 如果不是认证页面，直接获取认证令牌
    const discordAuth = LocalStorage?.getItem('token')?.replace(/^"|"$/g, '');

    // 如果获取到有效的认证令牌
    if (discordAuth && discordAuth.length > 0) {
      // 将认证信息存储到 GM 值中
      GM_setValue('discordAuth', { auth: discordAuth });
    }
  }
} else if (window.location.hostname === 'opquests.com') {
  loadScript();
} else if ((window.name === 'ATv4_updateStoreAuth' || GM_getValue('ATv4_updateStoreAuth')) && window.location.host === 'store.steampowered.com') {
  // 当页面加载完成后执行以下代码
  $(() => {
    // 检查页面中是否存在数据属性为 miniprofile 的元素
    if ($('[data-miniprofile]').length === 0) {
      return; // 如果不存在，则退出函数
    }

    // 从页面的 HTML 中提取 g_sessionID
    const storeSessionID = document.body.innerHTML.match(/g_sessionID = "(.+?)";/)?.[1];

    // 如果成功获取到 sessionID
    if (storeSessionID) {
      GM_deleteValue('ATv4_updateStoreAuth');
      // 将 sessionID 存储到 GM 值中
      GM_setValue('steamStoreAuth', { storeSessionID });
      // 关闭当前窗口
      window.close();
      // 弹出提示框，通知用户关闭页面
      Swal.fire('', __('closePageNotice'));
    } else {
      // 如果未能获取到 sessionID，弹出错误提示框
      Swal.fire({
        title: 'Error: Get "sessionID" failed',
        icon: 'error'
      });
    }
  });
} else if ((window.name === 'ATv4_updateCommunityAuth' || GM_getValue('ATv4_updateCommunityAuth')) && window.location.host === 'steamcommunity.com') {
  // 当页面加载完成后执行以下代码
  $(() => {
    // 从页面的 HTML 中提取用户的 Steam64 ID
    const steam64Id = document.body.innerHTML.match(/g_steamID = "(.+?)";/)?.[1];
    // 从页面的 HTML 中提取社区会话ID
    const communitySessionID = document.body.innerHTML.match(/g_sessionID = "(.+?)";/)?.[1];

    // 如果成功获取到社区会话ID
    if (steam64Id && communitySessionID) {
      GM_deleteValue('ATv4_updateCommunityAuth');
      // 将认证信息存储到 GM 值中
      GM_setValue('steamCommunityAuth', {
        steam64Id,
        communitySessionID
      });
      // 关闭当前窗口
      window.close();
      // 弹出提示框，通知用户关闭页面
      Swal.fire('', __('closePageNotice'));
    } else {
      setTimeout(() => {
      // 如果未能获取到社区会话ID，弹出错误提示框
        Swal.fire({
          title: 'Error: Get "sessionID" failed',
          icon: 'error'
        });
      }, 3000);
    }
  });
} else {
  // 检查当前域名是否为 'key-hub.eu'
  if (window.location.hostname === 'key-hub.eu') {
    // @ts-ignore
    unsafeWindow.keyhubtracker = 1;
    // @ts-ignore
    unsafeWindow.gaData = {};
  }

  // 调用 loadScript 函数以加载相关脚本
  $(loadScript);
}
