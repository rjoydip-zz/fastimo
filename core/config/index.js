"use strict";

const fp = require("fastify-plugin");

module.exports = fp(
  (fastify, opts, done) => {
    const { utils } = fastify;

    const data = {
      core: {},
      modules: {},
    };

    utils.configEntries.forEach(filename => {
      const content = utils.configParse(utils.rootDir, filename);
      data.core = content;
    });

    utils.modulesEntries.forEach(filename => {
      const content = utils.configParse(utils.modulesDir, filename);
      data.modules[content.name] = content;
    });

    fastify.decorate("config", data);

    done();
  },
  {
    name: module.require("./package").name,
  }
);
