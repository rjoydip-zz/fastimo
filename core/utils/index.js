"use strict";

const fs = require("fs");
const path = require("path");
const yml = require("js-yaml");
const fp = require("fastify-plugin");
const findUp = require("find-up");
const fg = require("fast-glob");

const modulesDir = findUp.sync("modules");
const slash = input => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(input);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(input); // eslint-disable-line no-control-regex
  if (isExtendedLengthPath || hasNonAscii) {
    return input;
  }
  return input.replace(/\\/g, "/");
};

const isYml = file => file.match(".yml") !== null;
const isJSON = file => file.match(".json") !== null;
const isJS = file => file.match(".js") !== null;
const hasKey = (obj, key = "") => Object.prototype.hasOwnProperty.call(obj, key);
const getContent = file => fs.readFileSync(file, "utf-8");
const getDirname = p =>
  slash(path.dirname(p))
    .split("/")
    .pop();
const configParse = filename => {
  let content = {};

  if (isYml(filename)) {
    content = yml.safeLoad(getContent(path.join(modulesDir, filename)));
  }

  if (isJSON(filename)) {
    content = JSON.parse(getContent(path.join(modulesDir, filename)));
  }

  if (isJS(filename)) {
    content = module.require(path.join(modulesDir, filename));
  }
  return content;
};

const ignore = ["!**/node_modules/**", "!**/.git/**"];

const registerEntries = fg.sync(["**/index.js", "!**/views/**", ...ignore], {
  cwd: modulesDir,
});
const configEntries = fg.sync(["**/config.js", "**/config.yml", "**/config.json", ...ignore], {
  cwd: modulesDir,
});
const utils = {
  isJS,
  isYml,
  hasKey,
  isJSON,
  slash,
  getDirname,
  getContent,
  configParse,
  modulesDir,
  registerEntries,
  configEntries,
};

module.exports = fp(
  (fastify, opts, next) => {
    fastify.decorate("utils", utils);
    next();
  },
  {
    name: module.require("./package").name,
  }
);
