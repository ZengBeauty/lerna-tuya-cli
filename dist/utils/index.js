'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = exports.downloadLocal = undefined;

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取模板
const downloadLocal = exports.downloadLocal = async projectName => {
  return new Promise((resolve, reject) => {
    (0, _downloadGitRepo2.default)(`${_constants.registry}/${_constants.templateName}`, projectName, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

// 主的流程控制
const apply = exports.apply = (action, ...args) => {
  // babel-env
  require(`../${action}`)(...args);
};