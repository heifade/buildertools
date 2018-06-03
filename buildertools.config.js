const path = require("path");

module.exports = function() {
  return {
    entry: {
      index: path.resolve(process.cwd(), "./src/index")
    }
  };
};
