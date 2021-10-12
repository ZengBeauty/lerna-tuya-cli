// 获取模板
import downloadGit from 'download-git-repo';
import { templateName, registry } from './constants';

export const downloadLocal = async projectName => {
  return new Promise((resolve, reject) => {
    downloadGit(`${registry}/${templateName}`, projectName, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

// 主的流程控制
export const apply = (action, ...args) => {
  // babel-env
  require(`../${action}`)(...args);
};
