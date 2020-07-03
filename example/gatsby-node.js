exports.createPages = function ({ actions }) {
  const { createRedirect } = actions

  // createRedirect({ fromPath: "/hello", toPath: "/" })
  createRedirect({ fromPath: "/adam", toPath: "https://siekierski.ml" })
}
