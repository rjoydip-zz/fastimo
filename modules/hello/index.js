"use strict";

module.exports = async (fastify, options, next) => {
  fastify.get("/hello", async (req, res) => {
    // res.send(req.query);
    fastify.render(res, "hello", req.query, {});
  });
  next();
};
