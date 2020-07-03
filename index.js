const path = require("path");
const fs = require("fs");

function forFramework(framework, handlers) {
  handlers[framework]();
}

/**
 * Prepares app for Gatsby enviroment
 * @param {object} config - server client configuration of gatsby-plugin-nodejs
 * @param {function} cb - callback with rest of app logic inside
 */
function prepare({ app, framework = "express", pathPrefix = "/" }, cb) {
  // Serve static Gatsby files
  forFramework(framework, {
    express: () => {
      const express = require("express");
      app.use(pathPrefix, express.static("public"));
    },
  });

  const config = JSON.parse(fs.readFileSync(path.resolve("./public", "gatsby-plugin-node.json")));

  // User-defined routes
  cb();

  // Gatsby 404 page
  forFramework(framework, {
    express: () => {
      app.use((req, res) => {
        res.sendFile(path.resolve("./public", "404.html"));
      });
    },
  });
}

module.exports = {
  prepare,
};
