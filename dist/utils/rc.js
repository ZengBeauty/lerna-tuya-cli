'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.set = exports.getAll = exports.get = undefined;

var _ini = require('ini');

var _util = require('util');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 用户的根目录
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
// 配置文件目录
const RC = `${HOME}/.lernaya`;

const exits = (0, _util.promisify)(_fs2.default.exists);
const readFile = (0, _util.promisify)(_fs2.default.readFile);
const writeFile = (0, _util.promisify)(_fs2.default.writeFile);

const get = exports.get = async key => {
  const exit = await exits(RC);
  let opts;
  if (exit) {
    opts = await readFile(RC, 'utf8');
    opts = (0, _ini.decode)(opts);
    return opts[key];
  }
  return '';
};

const getAll = exports.getAll = async () => {
  const exit = await exits(RC);
  let opts;
  if (exit) {
    opts = await readFile(RC, 'utf8');
    opts = (0, _ini.decode)(opts);
    return opts;
  }
  return {};
};

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/YvetteLau/repos
// https://api.github.com/${type}/${registry}/repos
// 模板下载地址可配置
const set = exports.set = async (key, value) => {
  const exit = await exits(RC);
  let opts;
  if (exit) {
    opts = await readFile(RC, 'utf8');
    opts = (0, _ini.decode)(opts);
    if (!key) {
      console.log(_chalk2.default.red(_chalk2.default.bold('Error:')), _chalk2.default.red('key is required'));
      return;
    }
    if (!value) {
      console.log(_chalk2.default.red(_chalk2.default.bold('Error:')), _chalk2.default.red('value is required'));
      return;
    }
    Object.assign(opts, { [key]: value });
  } else {
    opts = Object.assign({
      registry: 'tuya-panel-kit-template',
      type: 'ZengBeauty'
    }, { [key]: value });
  }
  await writeFile(RC, (0, _ini.encode)(opts), 'utf8');
};

const remove = exports.remove = async key => {
  const exit = await exits(RC);
  let opts;
  if (exit) {
    opts = await readFile(RC, 'utf8');
    opts = (0, _ini.decode)(opts);
    delete opts[key];
    await writeFile(RC, (0, _ini.encode)(opts), 'utf8');
  }
};