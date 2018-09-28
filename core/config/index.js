"use strict";

const fp = require("fastify-plugin");

module.exports = fp(
  (fastify, opts, done) => {
    const { utils } = fastify;
    const confKey = opts.confKey || "config";

    const data = {
      core: {
        PORT: 3000,
        env: process.env.NODE_ENV || "dev",
      },
      modules: {},
    };

    utils.configEntries.forEach(filename => {
      const content = utils.configParse(filename);
      data.modules[content.name] = content;
    });

    fastify.decorate(confKey, data);

    done();
  },
  {
    name: module.require("./package").name,
  }
);
