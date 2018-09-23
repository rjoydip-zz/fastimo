"use strict";

const fs = require("fs");
const path = require("path");
const yml = require("js-yaml");
const fp = require("fastify-plugin");

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
const configParse = file => {
  let content = {};
  if (isYml(file)) {
    content = yml.safeLoad(getContent(file));
  }

  if (isJSON(file)) {
    content = JSON.parse(getContent(file));
  }
  return content;
};

const utils = {
  isJS,
  isYml,
  hasKey,
  isJSON,
  slash,
  getDirname,
  getContent,
  configParse,
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
