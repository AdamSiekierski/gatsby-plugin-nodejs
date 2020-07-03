const express = require("express")
const gatsby = require("../../")

const app = express()

gatsby.prepare({ app, framework: "express" }, () => {})

const port = process.env.PORT || 1337

app.listen(port, () => console.log(`listening on port ${port}`))
