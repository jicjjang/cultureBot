const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  korean: function (config) {
    return this._common(config, 1);
  },
  foreign: function (config) {
    return this._common(config, 2);
  },
  festival: function (config) {
    return this._common(config, 3);
  },
  _common: function (config, count) {
    return axios.get(config.url.split('[spot]').join(Number(count+1))).then(function (res) {
      const $ = cheerio.load(res.data);
      const datas = $('div.ilist tbody tr');

      let showDatas = [];

      datas.each(function () {
        let dataTemp = {};

        const imageSrc = $(this).find('img').attr('src');
        if (imageSrc.split(config.image_src).length > 1) {
          const title = $(this).find('.lcont01 a');
          const etcs = $(this).find('td.tit');
          dataTemp['image'] = imageSrc;
          dataTemp['title'] = $(this).find('.lcont01 a').text();
          dataTemp['date'] = etcs.next().text();
          dataTemp['place'] = etcs.next().next().text();
        }
        showDatas.push(dataTemp);
      });
      return showDatas;
    }).catch(function (e) {
      console.error('error: ' + e);
    });
  }
}
