"use strict";

const { join } = require("path");

const moduleName = "hello";

module.exports = {
  name: moduleName,
  view: join(__dirname, "views"),
};
