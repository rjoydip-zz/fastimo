"use strict";

const path = require("path");
const yml = require("js-yaml");
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

    fastify.utils.configEntries.forEach(filename => {
      const dirName = utils.getDirname(path.join(fastify.utils.modulesDir, filename));
      let content = {};

      if (utils.isYml(filename)) {
        content = yml.safeLoad(utils.getContent(path.join(fastify.utils.modulesDir, filename)));
      }

      if (utils.isJSON(filename)) {
        content = JSON.parse(utils.getContent(path.join(fastify.utils.modulesDir, filename)));
      }

      if (utils.isJS(filename)) {
        content = module.require(path.join(fastify.utils.modulesDir, filename));
      }

      if (content && !utils.hasKey(content, "name")) {
        content.name = dirName;
      }

      data.modules[content.name] = content;
    });

    fastify.decorate(confKey, data);

    done();
  },
  {
    name: module.require("./package").name,
  }
);
