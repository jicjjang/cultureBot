const cultureBot = require('../index');
const config = require('../config');

(function () {
  new Promise(function (resolve, reject) {
    resolve(cultureBot.korean(config));
  }).then(function (datas) {
    console.log(datas);
  })
})();
