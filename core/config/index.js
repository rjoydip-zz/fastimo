"use strict";

const path = require("path");
const yml = require("js-yaml");
const fg = require("fast-glob");
const fp = require("fastify-plugin");

const $cwd = path.join(__dirname, "../../", "modules");

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

    const entries = fg.sync(["**/fastlib.yml", "**/fastlib.json", "!**/node_modules/**", "!**/.git/**"], {
      cwd: $cwd,
    });
    entries.forEach(filename => {
      const dirName = utils.getDirname(path.join($cwd, filename));
      let content = {};

      if (utils.isYml(filename)) {
        content = yml.safeLoad(utils.getContent(path.join($cwd, filename)));
      }

      if (utils.isJSON(filename)) {
        content = JSON.parse(utils.getContent(path.join($cwd, filename)));
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
    fatify: ">=0.39.0",
    name: module.require("./package").name,
  }
);
