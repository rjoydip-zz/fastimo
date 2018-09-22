"use strict";

module.exports = (fastify, opts, next) => {
  fastify.get("/foo", (req, res) => {
    res.send("Foo get");
  });
  next();
};
