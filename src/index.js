// 入口文件

import program from 'commander';
import { apply } from './utils';
import chalk from 'chalk';
import { version } from '../package.json';

let actionMap = {
  init: {
    description: 'generate a new project from a template',
    usages: ['lerna-tuya init projectName'],
  },
  // 其他命令
};

// 添加 init 命令

Object.keys(actionMap).forEach(action => {
  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      switch (action) {
        case 'init':
          apply(action, ...process.argv.slice(3));
          break;
        // 可扩展其他命令
        default:
          break;
      }
    });
});

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach(action => {
    actionMap[action].usages.forEach(usage => {
      console.log(' - ' + usage);
    });
  });
  console.log('\r');
}

program.usage('<command> [options]');

// lerna-tuya -h

program.on('-h', help);
program.on('--help', help);

program.version(version, '-V --version').parse(process.argv);

// lerna-tuya 不带参数时

if (!process.argv.slice(2).length) {
  program.outputHelp(makeGreen);
}

function makeGreen(txt) {
  return chalk.green(txt);
}
