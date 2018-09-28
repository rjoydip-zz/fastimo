"use strict";

const fs = require("fs");
const { join, dirname } = require("path");
const yml = require("js-yaml");
const fp = require("fastify-plugin");
const findUp = require("find-up");
const fg = require("fast-glob");

const slash = input => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(input);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(input); // eslint-disable-line no-control-regex
  if (isExtendedLengthPath || hasNonAscii) {
    return input;
  }
  return input.replace(/\\/g, "/");
};
const pkgUp = n => findUp.sync(n);
const coreDir = pkgUp("core");
const pkg = pkgUp("package.json");
const modulesDir = pkgUp("modules");
const rootDir = dirname(pkgUp("package.json"));
const isYml = file => file.match(".yml") !== null;
const isJSON = file => file.match(".json") !== null;
const isJS = file => file.match(".js") !== null;
const hasKey = (obj, key = "") => Object.prototype.hasOwnProperty.call(obj, key);
const getContent = file => fs.readFileSync(file, "utf-8");
const getDirname = p =>
  slash(dirname(p))
    .split("/")
    .pop();
const configParse = (_dir, _name) => {
  let content = {};

  if (isYml(_name)) {
    content = yml.safeLoad(getContent(join(_dir, _name)));
  }

  if (isJSON(_name)) {
    content = JSON.parse(getContent(join(_dir, _name)));
  }

  if (isJS(_name)) {
    content = module.require(join(_dir, _name));
  }
  return content;
};
const ignore = ["!**/node_modules/**", "!**/.git/**"];
const generteConfigFile = n => ["js", "yml", "json"].map(i => `**/${n}.${i}`);

const registerEntries = fg.sync(["**/index.js", "!**/views/**", ...ignore], {
  cwd: modulesDir,
});
const configEntries = fg.sync([...generteConfigFile(pkg.name || "global"), ...ignore], {
  cwd: rootDir,
});
const coreEntries = fg.sync([...generteConfigFile(pkg.name || "global"), ...ignore], {
  cwd: coreDir,
});
const modulesEntries = fg.sync([...generteConfigFile(pkg.config ? pkg.config.name : "config"), ...ignore], {
  cwd: modulesDir,
});
const utils = {
  pkg,
  isJS,
  isYml,
  hasKey,
  isJSON,
  slash,
  getDirname,
  getContent,
  configParse,
  coreDir,
  rootDir,
  modulesDir,
  coreEntries,
  registerEntries,
  modulesEntries,
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
