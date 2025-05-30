/*
 * @Author       : HCLonely
 * @Date         : 2022-01-16 19:03:01
 * @LastEditTime : 2022-12-10 10:12:35
 * @LastEditors  : HCLonely
 * @FilePath     : /auto-task-new/release.js
 * @Description  : 自动发布Release
 */

(async () => {
  /* eslint-disable @typescript-eslint/no-var-requires, camelcase */
  const fs = require('fs-extra');
  const yaml = require('js-yaml');
  const chalk = await import('chalk');

  const settings = yaml.load(fs.readFileSync('./.github/workflows/Release.yml', 'utf8'));
  if (!settings) {
    return console.log(`'./.github/workflows/Release.yml' ${chalk.default.red.bold('not found')}!`);
  }

  const steps = settings.jobs?.release?.steps;
  const releaseStep = steps[steps.length - 1];
  if (releaseStep?.name !== 'Release') {
    return console.log(`Release action chenged ${chalk.default.red.bold('failed [no Release step]')}!`);
  }
  const options = {};

  const { version, change } = fs.readJSONSync('./package.json');
  if (version === releaseStep.with.name) {
    settings.on = 'workflow_dispatch';
    fs.writeFileSync('./.github/workflows/Release.yml', yaml.dump(settings));
    console.log(`Version ${chalk.default.yellow.bold('not be changed')}!`);
    // return console.log(`Release action changed ${chalk.green.bold('successfully')}!`);
  }
  settings.on = {
    push: {
      branches: ['main'],
      paths: ['src/**', '.github/workflows/Release.yml']
    }
  };
  options.prerelease = version.includes('-');
  options.tag_name = `v${version}`;
  options.name = version;
  options.body = `- ${change.join('\n- ')}`;
  options.files = `dist/auto-task-v4-for-giveawaysu.user.js
dist/auto-task-v4.compatibility.user.js
dist/auto-task-v4.user.js
dist/auto-task-v4-for-giveawaysu.all.user.js
dist/auto-task-v4.compatibility.all.user.js
dist/auto-task-v4.all.user.js`;
  options.token = '${{ github.TOKEN }}';
  releaseStep.with = options;
  fs.writeFileSync('./.github/workflows/Release.yml', yaml.dump(settings));
  console.log(`Release action changed ${chalk.default.green.bold('successfully')}!`);

})();
