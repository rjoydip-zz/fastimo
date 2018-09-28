"use strict";

const fp = require("fastify-plugin");

module.exports = fp(
  (fastify, opts, done) => {
    const { utils } = fastify;

    const data = {};

    utils.configEntries.forEach(filename => {
      const content = utils.configParse(utils.rootDir, filename);
      Object.assign(data, content);
    });

    utils.coreEntries.forEach(filename => {
      const content = utils.configParse(utils.coreDir, filename);
      Object.assign(data, { core: { [content.name]: content } });
    });

    utils.modulesEntries.forEach(filename => {
      const content = utils.configParse(utils.modulesDir, filename);
      Object.assign(data, { modules: { [content.name]: content } });
    });

    fastify.decorate("config", data);

    done();
  },
  {
    name: module.require("./package").name,
  }
);
