"use strict";

module.exports = async (fastify, options, next) => {
  fastify.get("/users", async (req, res) => {
    fastify.render(res, "users", { text: 1 }, {});
  });
  next();
};
