"use strict";

const { exit, env } = process;
const fastify = require("fastify")({
  logger: env.NODE_ENV !== "production",
});

const start = async () => {
  try {
    await fastify.register(module.require("@fastimo/register"));
    await fastify.ready();
    await fastify.listen(fastify.config.core.PORT || 3000);
  } catch (err) {
    fastify.log.error(err);
    exit(1);
  }
};

start();
