const fs = require("fs");
const { exec } = require("child_process");

let proc = null;

exports.onPreInit = function () {
  return new Promise((resolve, reject) => {
    if (fs.existsSync("server/index.js")) {
      console.log("Starting the custom Node.js server for the build...");
      proc = exec("node server/index.js");

      proc.stdout.on("data", (data) => {
        console.log(`Message from custom server: ${data}`);
        resolve();
      });

      proc.on("error", (err) => {
        console.log(`Custom server error: ${err}`);
        reject();
      });
    }
  });
};

exports.onPostBuild = function ({ store, pathPrefix }) {
  const { pages, redirects } = store.getState();

  const p = [];
  for (const page of pages.values()) {
    p.push({
      matchPath: page.matchPath,
      path: page.path,
    });
  }

  const config = {
    paths: p,
    redirects,
    pathPrefix,
  };

  fs.writeFileSync("public/gatsby-plugin-node.json", JSON.stringify(config, null, 2));

  proc && proc.kill();
  console.log("Killed custom Node.js server");
};
