"use strict";

const path = require("path");
const fp = require("fastify-plugin");

module.exports = fp(
  (fastify, opts, done) => {
    fastify
      .register(module.require("@fastimo/utils"))
      .register(module.require("@fastimo/config"))
      .register(module.require("@fastimo/render"))
      .after(() => {
        fastify.utils.registerEntries.forEach(file => {
          fastify.register(module.require(path.join(fastify.utils.modulesDir, file)));
        });
      });
    done();
  },
  {
    name: module.require("./package").name,
  }
);
