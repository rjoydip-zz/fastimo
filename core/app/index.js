"use strict";

const path = require("path");
const fg = require("fast-glob");
const fastify = require("fastify")({
  logger: process.env.NODE_ENV === "dev",
});

const { exit } = process.exit;
const $cwd = path.join(__dirname, "../../", "modules");

fastify.get("/", (req, res) => {
  res.send({
    msg: "Fastlib",
  });
});

const registerModules = async () => {
  await fastify.register(module.require("@fastlib/utils"));
  await fastify.register(module.require("@fastlib/config"));
  const entries = fg.sync(["**/index.js", "!**/node_modules/**", "!**/.git/**"], {
    cwd: $cwd,
  });
  entries.forEach(file => {
    fastify.register(module.require(path.join($cwd, file)));
  });
};

const start = async () => {
  try {
    await registerModules();
    await fastify.ready();
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    exit(1);
  }
};

start();
