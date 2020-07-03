const path = require("path");
const fs = require("fs");

function forFramework(framework, handlers) {
  return handlers[framework];
}

/**
 * Prepares app for Gatsby enviroment
 * @param {object} config - server client configuration of gatsby-plugin-nodejs
 * @param {function} cb - callback with rest of app logic inside
 */
function prepare({ app, framework = "express" }, cb) {
  // Serve static Gatsby files
  forFramework(framework, {
    express: () => {
      const express = require("express");
      app.use(pathPrefix, express.static("public"));
    },
  })();

  const config = JSON.parse(fs.readFileSync(path.resolve("./public", "gatsby-plugin-node.json")));

  // Gatsby redirects
  for (const r of config.redirects) {
    forFramework(framework, {
      express: () => {
        app.get(r.fromPath, (req, res) =>
          res.status(r.statusCode || r.isPermanent ? 301 : 302).redirect(r.toPath),
        );
      },
    })();
  }

  // Client paths
  for (const p of config.paths.filter((p) => p.matchPath)) {
    forFramework(framework, {
      express: () => {
        app.get(p.matchPath, (req, res) =>
          res.sendFile(path.resolve("./public", p.path, "index.html")),
        );
      },
    });
  }

  // User-defined routes
  cb();

  // Gatsby 404 page
  forFramework(framework, {
    express: () => {
      app.use((req, res) => {
        res.sendFile(path.resolve("./public", "404.html"));
      });
    },
  })();
}

module.exports = {
  prepare,
};
