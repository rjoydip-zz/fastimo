"use strict";

module.exports = async (fastify, options, next) => {
  fastify.get("/hello", async (req, res) => {
    fastify.render(res, "hello", { name: req.query.name }, {});
  });
  next();
};
