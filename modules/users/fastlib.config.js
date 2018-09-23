"use strict";

const { join } = require("path");

const moduleName = "users";

module.exports = {
  name: moduleName,
  view: join(__dirname, "views"),
};
