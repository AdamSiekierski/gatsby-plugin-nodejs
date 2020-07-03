const fs = require("fs");

exports.onPostBuild = function ({ store }) {
  const { pages } = store.getState();

  const p = [];
  for (let page of pages) {
    p.push(page);
  }

  fs.writeFileSync("public/gatsby-node-pages.json", p);
};
