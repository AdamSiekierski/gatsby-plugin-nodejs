const fs = require("fs");

exports.onPostBuild = function ({ store }) {
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
  };

  fs.writeFileSync("public/gatsby-plugin-node.json", JSON.stringify(config, null, 2));
};
