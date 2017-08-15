const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config');

module.exports = {
  korean: function () {
    return _common(1);
  },
  foreign: function () {
    return _common(2);
  },
  festival: function () {
    return _common(3);
  },
  _common: function (count) {
    return axios.get(config.split('[spot]').join(Number(count+1))).then(function (res) {
      const $ = cheerio.load(res.data);
      const datas = $('div.ilist tbody tr');

      let showDatas = [];

      datas.each(function () {
        let dataTemp = {};

        const imageSrc = $(this).find('img').attr('src');
        if (imageSrc.split('http://tkfile.yes24.com/upload2/PerfBlog').length > 1) {
          const title = $(this).find('.lcont01 a');
          const etcs = $(this).find('td.tit');
          dataTemp['image'] = imageSrc;
          dataTemp['title'] = $(this).find('.lcont01 a').text();
          dataTemp['date'] = etcs.next().text();
          dataTemp['place'] = etcs.next().next().text();
        }
        showDatas.push(dataTemp);
      });
      console.log(showDatas);
      return showDatas;
    }).catch(function (e) {
      console.error('error: ' + e);
    });
  }
}
