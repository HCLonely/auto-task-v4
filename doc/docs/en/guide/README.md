---
title: Guide
lang: en-US
---

::: warning
The content of this page is translated through Google translation. If the description is incorrect, please click 'Edit this page on GitHub' at the bottom of the page to help us improve the translation.
:::

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) extension.
2. Install `auto-task-v4` script.

- [Github](https://github.com/HCLonely/auto-task-new/raw/main/dist/auto-task-v4.user.js)
- [jsDelivr](https://cdn.jsdelivr.net/gh/HCLonely/auto-task-v4@main/dist/auto-task-v4.user.js)
- [Compatible Version Github](https://github.com/HCLonely/auto-task-new/raw/main/dist/auto-task-v4.compatibility.user.js)
- [Compatible Version jsDelivr](https://cdn.jsdelivr.net/gh/HCLonely/auto-task-v4@main/dist/auto-task-v4.compatibility.user.js)
- [GS Special Edition Github](https://github.com/HCLonely/auto-task-new/raw/main/dist/auto-task-v4-for-giveawaysu.user.js)
- [GS Special Edition jsDelivr](https://cdn.jsdelivr.net/gh/HCLonely/auto-task-v4@main/dist/auto-task-v4-for-giveawaysu.user.js)

## READ ME FIRST

1. This script supports [Tampermonkey](https://www.tampermonkey.net/) and [Violentmonkey](https://violentmonkey.github.io/) extensions, not other extensions specifically;
2. Reddit related functions need to use the beta version of reddit website to use, if the script fails to switch automatically, please switch by yourself;
3. When verifying Twitter and Youtube token, it will automatically follow the official account. If you don’t want to follow the official account, you can go to [Settings Page](https://auto-task-v4.hclonely.com/setting.html)->`Global Settings`->`Others` to change;
4. The functions of `Like community announcement` and `Like workshop item` do not support cancellation, and the `Opquests` website does not support cancellation tasks;
5. If you do not log in when you update your social account token, you will be prompted that the update has failed, and you need to log in and update again;
6. It is not recommended to cancel the Ins tasks, as it may increase the chance of banning;
7. Please close this script when obtaining the Key from the `Giveawaysu` website, otherwise you will get the `0000-0000-0000`Key;
8. After doing `Discord` related tasks, you may be forced to log out and trigger human-machine verification. You can use `Discord` normally after completing the verification;
9. About the support of gleam.io website: only support '?' tasks, '+number' tasks are not supported:
  ![support](/gleam-en.png)
  ![not-support](/not-gleam-en.png)

## Usage

### Keylol Forum

1. Relevant functions will be added to the social platform links in the posts in the welfare section of the Keylol Forum;
2. Left click to select multiple tasks;
3. Then click the "DoTask" button to complete.

![Example](/keylol.gif)

### Except Keylol Forum

1. Open the giveaway page of [supported website] (#supported-sites-and-tasks);
2. After the page is loaded, the function button is displayed in the upper right corner (customizable position);
3. Click `DoTask` to complete [supported tasks] (#supported-sites-and-tasks), and click `UndoTask` to cancel the previous tasks.

> ps. The specific function and description of each button can be customized in [Settings Page](https://auto-task-v4.hclonely.com/setting.html).

### For GiveawaySu

1. The GS special edition only supports the [GiveawaySu](https://giveaway.su/) website;
2. The GS special edition only supports DoTask, and does not support UndoTask;
3. When using the GS special edition, you do not need to close the script and refresh the web page after finishing the task, but the following prerequisites are required:

- Do not enable ad blocker on this site: add `giveaway.su/giveaway/view/*` to the whitelist of ad blocker;
- Do not enable other unwanted scripts on this site: add user exclusions in the unwanted script settings `*://giveaway.su/giveaway/view/*`
![User Exclusion](https://s2.loli.net/2021/12/31/fxFyZM61YazCsE3.png)

## Supported sites and tasks

**The following functions are all enabled by default. For details, please refer to the [Settings page](https://auto-task-v4.hclonely.com/setting.html).**

### Freeanywhere

- Check if you are logged in (automatically jump to the login page if not logged in)
- Do task & Undo task
  - Steam
    - Join & Leave group
    - Follow & Unfollow curator
    - Add to & Remove from wishlist
    - Follow & Unfollow game
  - Join & Leave Vk group
  - Repost & Delete Vk wall
  - Visit Link
- Verify task
- Get key

### Giveawaysu & GiveeClub

- Check if you are logged in (automatically jump to the login page if not logged in)
- Remaining Key detection, if the donation of Key ends, a pop-up will remind you
- Do task & Undo task
  - Steam
    - Join group & Leave group
    - Follow & Unfollow curator/开发商/发行商
    - Add to & Remove from wishlist
    - Follow & Unfollow game
    - Subscribe & Unsubscribe forum
    - Like community announcement (cancellation is not supported)
    - Like workshop item (cancellation is not supported)
  - Join & Leave Discord server
  - Follow & Unfollow Instagram user
  - Follow & Unfollow Twitch Channel
  - Join & Leave Reddit
  - Join & Leave Vk group
  - Subscribe & Unsubscribe Youtube channel
  - Like & Unlike Youtube video

### Givekey

- Check if you are logged in (automatically jump to the login page if not logged in)
- Remaining Key detection, if the donation of Key ends, a pop-up will remind you
- Do task & Undo task
  - Steam
    - Join group & Leave group
    - Follow & Unfollow curator/开发商/发行商
    - Add to & Remove from wishlist
    - Follow & Unfollow game
  - Join & Leave Vk group
  - Repost & Delete Vk wall
  - Join & Leave Discord server
  - Visit Link
- Verify task

### Gleam

> It is better to use with [TimerHooker](https://timer.palerock.cn/) script!

- Remaining Key detection, if the donation of Key ends, a pop-up will remind you
- Do task & Undo task
  - Steam
    - Join group & Leave group
    - Follow & Unfollow curator/开发商/发行商
    - Add to & Remove from wishlist
    - Follow & Unfollow game
  - Follow & Unfollow Twitter user
  - Retweet & Un-Retweet
  - Join & Leave Discord server
  - Follow & Unfollow Twitch Channel
  - Subscribe & Unsubscribe Youtube channel
  - Visit Link
  - Automatically fill in the form (you need to set the corresponding content in [Website Settings](#website-settings))
- Verify task

### Indiedb

- Check if you are logged in (automatically jump to the login page if not logged in)
- Remaining Key detection, if the donation of Key ends, a pop-up will remind you
- Do task
  - Automatically join giveaway
  - Automatic completion of related tasks (except for paid subscription tasks)

### keyhub

- Check if you are logged in (automatically jump to the login page if not logged in)
- Remaining Key detection, if the donation of Key ends, a pop-up will remind you
- Do task & Undo task
  - Steam
    - Join group & Leave group
    - Follow & Unfollow curator
    - Add to & Remove from wishlist
  - Join & Leave Discord server
  - Visit Link
- Verify task

### OpiumPulses

- Check if you are logged in (automatically jump to the login page if not logged in)
- Automatically join the free giveaway
- Automatically join the point giveaway(You can set the maximum number of points for each gift Key in [Website Settings](#website-settings))

### Opquests

- Check if you are logged in (automatically jump to the login page if not logged in)
- Do task
  - Steam
    - Join group & Leave group
    - Follow & Unfollow curator/开发商/发行商
    - Add to & Remove from wishlist
    - Follow & Unfollow game

### Prys(To be tested)

- Check if you are logged in
- Remaining Key detection, if the donation of Key ends, a pop-up will remind you
- Steam
  - Join group & Leave group
  - Follow & Unfollow curator

### SweepWidget

- Login detection (automatically click on Twitter to login if not logged in)
- Do task
  - Automatically fill in the form (you need to set the corresponding content in [Website Settings](#website-settings))
  - Verify task

## Website Settings

1. Click the `Tampermonkey` icon;
2. Find the `auto-task-v4` script;
3. Click `websiteOptions` in the drop-down menu (only some websites are supported).

## Whitelist

> The content in the whitelist will not be revoked when undoing tasks.

### Usage

- (Suggestion) Pull to the bottom of the [Settings page](https://auto-task-v4.hclonely.com/setting.html) to see the whitelist, click the `Edit` button to edit, one per line.
- Use the method of opening [Website Settings](#website-settings) to open the whitelist setting.

## Task History

-There is a task history button in the upper right corner of the [Settings page](https://auto-task-v4.hclonely.com/setting.html).
-You can also open the task history by using the method of opening [Website Settings](#website-settings).

## Data Synchronization

> The data synchronization function uses Github Gist to store data!
> This function does not support automatic synchronization, you need to manually click on each synchronization!

1. To generate a [Github Token](https://github.com/settings/tokens), check `gist`;
2. [Create a gist](https://gist.github.com/), The file name is `XXX.json`, `XXX` can be replaced with any English letter, the content of the file is `{}`;

  ![Gist](/gist.png)

3. Click `Create secret gist`;
4. Remember this string of `Gist ID`;

  ![Gist ID](/gistid.png)

5. Fill in the corresponding content in the `Gist Settings` of `Data synchronization`, and click `Save configuration and test`;
6. Prompt `Test success!` is fine.
