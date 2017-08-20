const cultureBot = require('../index');
const config = require('../config');

cultureBot.korean(config).then(function (datas) {
  console.log(datas);
});


Promise.all([cultureBot.korean(config), cultureBot.foreign(config), cultureBot.festival(config)])
  .then(cultureList => {
    console.log(cultureList);
  })
