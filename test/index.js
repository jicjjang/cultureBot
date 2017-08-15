const cultureBot = require('../index');
const config = require('../config');

cultureBot.korean(config).then(function (datas) {
  console.log(datas);
});
