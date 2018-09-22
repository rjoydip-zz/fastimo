"use strict";

module.exports = (fastify, opts, next) => {
  fastify.get("/user", (req, res) => {
    res.send("User get");
  });
  next();
};
