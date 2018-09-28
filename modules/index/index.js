"use strict";

module.exports = async (fastify, options, next) => {
  fastify.get("/", async (req, res) => {
    res.send("Welcome to fastimo");
  });
  next();
};
