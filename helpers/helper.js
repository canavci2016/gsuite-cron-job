const config = require('../config');

module.exports = {

  env: (key, defaultValue = null) => {
    let val = config[key] ? config[key] : defaultValue;
    val = val === 'true' ? true : val;
    val = val === 'false' ? false : val;
    return val;
  },

  firstOrDefault: (arr, callback, def = null) => {
    let obj = arr.find(callback);
    return obj ? obj : def;
  },

  currentDate: () => {
    const d = new Date();
    const pad = (val) => ("0" + val).slice(-2);
    const str = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${d.getSeconds()}`;
    return str;
  },

  asyncForEach: async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  },

};