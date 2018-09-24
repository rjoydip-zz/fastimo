"use strict";

const { join } = require("path");
const { readFile } = require("fs");
const fp = require("fastify-plugin");
const ejs = require("ejs");
const { minify } = require("html-minifier");

function render(fastify, opts, done) {
  let { charset } = opts;
  charset = charset || "utf-8";

  function $render(res, mod, data, opt = {}, callback) {
    readFile(join(fastify.config.modules[mod].view, `index.ejs`), charset, (err, html) => {
      if (err) {
        return res.send(err);
      }

      const template = ejs.compile(html, opt);
      const compiled = minify(template(data), {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeTagWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      });

      if (callback) {
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
