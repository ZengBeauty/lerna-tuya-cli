// init command
import { downloadLocal } from './utils/index';
import { templateName } from './utils/constants';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';

let init = async projectName => {
  if (!fs.existsSync(projectName)) {
    inquirer
      .prompt([
        {
          name: 'description',
          message: 'Please enter the project description: ',
        },
        {
          name: 'author',
          message: 'Please enter the author name: ',
        },
      ])
      .then(async answer => {
        let loading = ora('downloading template ...');
        loading.start();
        downloadLocal(projectName).then(
          () => {
            loading.succeed();
            const pkgName = `${projectName}/package.json`;
            const jestName = `${projectName}/jest.config.js`;
            const rmdName = `${projectName}/README.md`;
            // 修改 package.json
            if (fs.existsSync(pkgName)) {
              const data = fs.readFileSync(pkgName).toString();
              let json = JSON.parse(data);
              json.name = projectName;
              json.author = answer.author;
              json.description = answer.description;
              // 修改项目文件夹中 package.json 文件
              fs.writeFileSync(pkgName, JSON.stringify(json, null, '\t'), 'utf-8');
            }
            // 修改 jest.config.js

            if (fs.existsSync(jestName)) {
              const data = fs.readFileSync(jestName).toString();
              const res = data.replace(new RegExp(templateName, 'g'), projectName);
              fs.writeFileSync(jestName, res, 'utf-8');
            }

            // 修改 README.md
            if (fs.existsSync(rmdName)) {
              const data = fs.readFileSync(rmdName).toString();
              const res = data.replace(new RegExp(templateName, 'g'), projectName);
              fs.writeFileSync(rmdName, res, 'utf-8');
            }
            console.log(symbol.success, chalk.green('project initialization finished!'));
          },
          () => {
            loading.fail();
          }
        );
      });
  } else {
    // 项目已经存在
    console.log(symbol.error, chalk.red('The project already exists'));
  }
};

module.exports = init;
