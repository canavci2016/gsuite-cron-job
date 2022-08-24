const {debug} = require("../constants/common");
const {debugLogger} = require("../helpers/logger");

const debugFunc = debugMode => {
  return (message, ...splat) => {
    if (debugMode == debug) {
      debugLogger.debug(message, splat);
    }
  };

};

module.exports = debugFunc('developer');