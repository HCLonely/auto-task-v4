/*
 * @Author       : HCLonely
 * @Date         : 2022-05-22 10:13:54
 * @LastEditTime : 2022-05-22 11:16:03
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/build-all-static.js
 * @Description  : 构建全资源版本
 */
/* eslint-disable @typescript-eslint/no-var-requires */

(async () => {
  const fs = require('fs-extra');
  const path = require('path');
  const chalk = require('chalk');

  const headerText = fs.readFileSync('./src/header.js').toString();
  const requireJsName = [...headerText.matchAll(/\/\/ @require[\s]+?(http.+)/g)]
    .map((text) => text[1].split('/').at(-1));
  const requireJsText = requireJsName.map((file) => fs.readFileSync(path.join('./src/static', file)).toString()).join('\n');
  const resourcesFileName = [...headerText.matchAll(/\/\/ @resource[\s]+?([\w]+?)[\s]+?(http.+)/g)]
    .map((text) => [text[1], text[2].split('/').at(-1)]);
  const resourcesFile = Object.fromEntries(resourcesFileName
    .map((file) => [file[0], fs.readFileSync(path.join('./src/static', file[1])).toString()]));
  fs.writeFileSync('./dist/auto-task-v4-for-giveawaysu.all.user.js', fs.readFileSync('./dist/auto-task-v4-for-giveawaysu.user.js').toString()
    .replace(/\/\/ @require.+\n/g, '')
    .replace(/\/\/ @resource.+\n/g, '')
    .replace('// ==/UserScript==', () => `// ==/UserScript==\n\n${requireJsText}`)
    .replace(new RegExp(`GM_getResourceText\\(("|')(${Object.keys(resourcesFile).join('|')})("|')\\)`, 'g'),
      (match, p1, name) => `\`${resourcesFile[name]}\``));

  fs.writeFileSync('./dist/auto-task-v4.compatibility.all.user.js', fs.readFileSync('./dist/auto-task-v4.compatibility.user.js').toString()
    .replace(/\/\/ @require.+\n/g, '')
    .replace(/\/\/ @resource.+\n/g, '')
    .replace('// ==/UserScript==', () => `// ==/UserScript==\n\n${requireJsText}`)
    .replace(new RegExp(`GM_getResourceText\\(("|')(${Object.keys(resourcesFile).join('|')})("|')\\)`, 'g'),
      (match, p1, name) => `\`${resourcesFile[name]}\``));

  fs.writeFileSync('./dist/auto-task-v4.all.user.js', fs.readFileSync('./dist/auto-task-v4.user.js').toString()
    .replace(/\/\/ @require.+\n/g, '')
    .replace(/\/\/ @resource.+\n/g, '')
    .replace('// ==/UserScript==', () => `// ==/UserScript==\n\n${requireJsText}`)
    .replace(new RegExp(`GM_getResourceText\\(("|')(${Object.keys(resourcesFile).join('|')})("|')\\)`, 'g'),
      (match, p1, name) => `\`${resourcesFile[name]}\``));

  console.log(`All static version files generated ${chalk.green.bold('successfully')}!`);
})();
