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

let init = async projectName => {
  if (!_fs2.default.existsSync(projectName)) {
    _inquirer2.default.prompt([{
      name: 'description',
      message: 'Please enter the project description: '
    }, {
      name: 'author',
      message: 'Please enter the author name: '
    }]).then(async answer => {
      let loading = (0, _ora2.default)('downloading template ...');
      loading.start();
      (0, _index.downloadLocal)(projectName).then(() => {
        loading.succeed();
        const pkgName = `${projectName}/package.json`;
        const jestName = `${projectName}/jest.config.js`;
        const rmdName = `${projectName}/README.md`;
        // 修改 package.json
        if (_fs2.default.existsSync(pkgName)) {
          const data = _fs2.default.readFileSync(pkgName).toString();
          let json = JSON.parse(data);
          json.name = projectName;
          json.author = answer.author;
          json.description = answer.description;
          // 修改项目文件夹中 package.json 文件
          _fs2.default.writeFileSync(pkgName, JSON.stringify(json, null, '\t'), 'utf-8');
        }
        // 修改 jest.config.js

        if (_fs2.default.existsSync(jestName)) {
          const data = _fs2.default.readFileSync(jestName).toString();
          const res = data.replace(new RegExp(_constants.templateName, 'g'), projectName);
          _fs2.default.writeFileSync(jestName, res, 'utf-8');
        }

        // 修改 README.md
        if (_fs2.default.existsSync(rmdName)) {
          const data = _fs2.default.readFileSync(rmdName).toString();
          const res = data.replace(new RegExp(_constants.templateName, 'g'), projectName);
          _fs2.default.writeFileSync(rmdName, res, 'utf-8');
        }
        console.log(_logSymbols2.default.success, _chalk2.default.green('project initialization finished!'));
      }, () => {
        loading.fail();
      });
    });
  } else {
    // 项目已经存在
    console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
  }
}; // init command


module.exports = init;