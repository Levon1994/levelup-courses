const urls = require('./src/urlData');

const getReplaceData = (data, key) => {

  data = data.replace(/\$OG_DESCRIPTION/g, urls[key].desc);
  data = data.replace(/\$OG_TITLE/g, urls[key].title);
  data = data.replace(/\OG_URL/g, urls[key].url);
  result = data.replace(/\$OG_IMAGE/g, urls[key].img);

  return result;
};

module.exports = getReplaceData;
