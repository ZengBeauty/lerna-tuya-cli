'use strict';

var _index = require('./utils/index');

var _constants = require('./utils/constants');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // init command


var init = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(projectName) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!_fs2.default.existsSync(projectName)) {
              _inquirer2.default.prompt([{
                name: 'description',
                message: 'Please enter the project description: '
              }, {
                name: 'author',
                message: 'Please enter the author name: '
              }]).then(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(answer) {
                  var loading;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          loading = (0, _ora2.default)('downloading template ...');

                          loading.start();
                          (0, _index.downloadLocal)(projectName).then(function () {
                            loading.succeed();
                            var pkgName = projectName + '/package.json';
                            var jestName = projectName + '/jest.config.js';
                            var rmdName = projectName + '/README.md';
                            // 修改 package.json
                            if (_fs2.default.existsSync(pkgName)) {
                              var data = _fs2.default.readFileSync(pkgName).toString();
                              var json = JSON.parse(data);
                              json.name = projectName;
                              json.author = answer.author;
                              json.description = answer.description;
                              // 修改项目文件夹中 package.json 文件
                              _fs2.default.writeFileSync(pkgName, JSON.stringify(json, null, '\t'), 'utf-8');
                            }
                            // 修改 jest.config.js

                            if (_fs2.default.existsSync(jestName)) {
                              var _data = _fs2.default.readFileSync(jestName).toString();
                              var res = _data.replace(new RegExp(_constants.templateName, 'g'), projectName);
                              _fs2.default.writeFileSync(jestName, res, 'utf-8');
                            }

                            // 修改 README.md
                            if (_fs2.default.existsSync(rmdName)) {
                              var _data2 = _fs2.default.readFileSync(rmdName).toString();
                              var _res = _data2.replace(new RegExp(_constants.templateName, 'g'), projectName);
                              _fs2.default.writeFileSync(rmdName, _res, 'utf-8');
                            }
                            console.log(_logSymbols2.default.success, _chalk2.default.green('project initialization finished!'));
                          }, function () {
                            loading.fail();
                          });

                        case 3:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
            } else {
              // 项目已经存在
              console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
            }

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = init;