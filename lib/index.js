/**
 * Prepares app for Gatsby enviroment
 * @param {object} {app} - server client configuration of gatsby-plugin-nodejs
 * @param {function} cb - callback with rest of app logic inside
 */
function prepare({ app, framework = "express", path = "/" }, cb) {
  switch (framework) {
    case "express":
      const express = require("express");
      app.use(path, express.static("public"));
      break;
    default:
      throw new Error(`Unsupported framework: ${framework}`);
  }

  cb();

  switch (framework) {
    case "express":
      app.use((req, res) => {
        res.status(404).send("public/404.html");
      });
  }
}

module.exports = {
  prepare,
};
