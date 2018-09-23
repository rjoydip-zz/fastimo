"use strict";

const fastify = require("fastify")({
  logger: process.env.NODE_ENV === "dev",
});

const { exit } = process;
const start = async () => {
  try {
    await fastify.register(module.require("@fastlib/register"));
    await fastify.ready();
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    exit(1);
  }
};

start();
