'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _utils = require('./utils');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _package = require('../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 入口文件

let actionMap = {
  init: {
    description: 'generate a new project from a template',
    usages: ['lerna-tuya init projectName']
  }
  // 其他命令
};

// 添加 init 命令

Object.keys(actionMap).forEach(action => {
  _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
    switch (action) {
      case 'init':
        (0, _utils.apply)(action, ...process.argv.slice(3));
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

_commander2.default.usage('<command> [options]');

// lerna-tuya -h

_commander2.default.on('-h', help);
_commander2.default.on('--help', help);

_commander2.default.version(_package.version, '-V --version').parse(process.argv);

// lerna-tuya 不带参数时

if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp(makeGreen);
}

function makeGreen(txt) {
  return _chalk2.default.green(txt);
}