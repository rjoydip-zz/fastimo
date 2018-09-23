"use strict";

const path = require("path");
const fg = require("fast-glob");
const findUp = require("find-up");
const fp = require("fastify-plugin");

module.exports = fp(
  (fastify, opts, done) => {
    const $modulesDir = findUp.sync("modules");
    fastify
      .register(module.require("@fastimo/utils"))
      .register(module.require("@fastimo/config"))
      .register(module.require("@fastimo/render"));
    const entries = fg.sync(["**/index.js", "!**/node_modules/**", "!**/.git/**", "!**/views/**"], {
      cwd: $modulesDir,
    });
    entries.forEach(file => {
      fastify.register(module.require(path.join($modulesDir, file)));
    });
    done();
  },
  {
    name: module.require("./package").name,
  }
);
