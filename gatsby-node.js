const fs = require("fs");
const { exec } = require("child_process");

let proc = null;

function generateConfig({ pathPrefix, store }) {
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

  !fs.existsSync("public/") && fs.mkdirSync("public/");

  fs.writeFileSync("public/gatsby-plugin-node.json", JSON.stringify(config, null, 2));
}

exports.onPreInit = function ({ pathPrefix, store }) {
  generateConfig({ pathPrefix, store });

  return new Promise((resolve, reject) => {
    if (fs.existsSync("server/index.js")) {
      console.log("Starting the custom Node.js server...");
      proc = exec("node server/index.js");

      proc.stdout.on("data", (data) => {
        console.log(`Message from custom server: ${data}`);
        resolve();
      });

      proc.stderr.on("data", (data) => {
        console.log(`Error message from custom server: ${data}`);
        reject();
      });

      proc.on("error", (err) => {
        console.log(`Custom server error: ${err}`);
        reject();
      });
    } else {
      resolve();
    }
  });
};

exports.onPostBuild = function ({ store, pathPrefix }) {
  generateConfig({ pathPrefix, store });
};

process.on("exit", () => {
  proc && proc.kill();
});
