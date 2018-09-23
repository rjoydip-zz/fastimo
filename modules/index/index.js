"use strict";

module.exports = async (fastify, options, next) => {
  fastify.get("/", async (req, res) => {
    fastify.render(res, "index", { text: 1 }, {});
  });
  next();
};
