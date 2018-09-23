"use strict";

const { join } = require("path");

const moduleName = "index";

module.exports = {
  name: moduleName,
  view: join(__dirname, "views"),
};
