"use strict";

module.exports = async (fastify, options, next) => {
  fastify.get("/", async (req, reply) => reply.view("/templates/index", { text: "Hello Fastlib" }));
  next();
};
