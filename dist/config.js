'use strict';

var _rc = require('./utils/rc');

let config = async (action, key, value) => {
  switch (action) {
    case 'get':
      if (key) {
        let result = await (0, _rc.get)(key);
        console.log(result);
      } else {
        let obj = await (0, _rc.getAll)();
        Object.keys(obj).forEach(item => {
          console.log(`${item}=${obj[item]}`);
        });
      }
      break;
    case 'set':
      (0, _rc.set)(key, value);
      break;
    case 'remove':
      (0, _rc.remove)(key);
      break;
    default:
      break;
  }
};

module.exports = config;