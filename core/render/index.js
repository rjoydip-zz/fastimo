"use strict";

const { join } = require("path");
const { readFile } = require("fs");
const fp = require("fastify-plugin");
const ejs = require("ejs");

function render(fastify, opts, done) {
  let { charset } = opts;
  charset = charset || "utf-8";

  function $render(res, mod, data, opt = {}, callback) {
    let $callback = callback;

    if (typeof opt === "function") {
      $callback = opt;
    }

    readFile(join(fastify.config.modules[mod].view, `index.ejs`), charset, (err, html) => {
      if (err) {
        return res.send(err);
      }

      const template = ejs.compile(html, opt);
      const compiled = template(data);

      if ($callback) {
        return callback(compiled);
      }

      return res.header("Content-Type", "text/html").send(compiled);
    });
  }

  fastify.decorate("render", $render);
  done();
}

module.exports = fp(render, {
  name: module.require("./package").name,
});
