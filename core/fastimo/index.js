"use strict";

const { exit, env } = process;

const fastify = require("fastify")({
  logger: env.NODE_ENV !== "production",
});

const start = async () => {
  try {
    await fastify.register(module.require("@fastimo/register"));
    await fastify.ready();
    const PORT = fastify.config.port || 3000;
    const HOST = fastify.config.host || "localhost";
    await fastify.listen(PORT, HOST);
    fastify.log.info(`${fastify.config.name} server is running on ${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    exit(1);
  }
};

start();
