const express = require("express")
const morgan = require("morgan")
const gatsby = require("../../")

const app = express()

app.use(morgan("tiny"))

gatsby.prepare({ app, pathPrefix: "/gatsby" }, () => {
  app.get("/hello", (req, res) => {
    res.send(`Hey, ${req.query.name || "Vsauce - Michael here"}`)
  })
})

const port = process.env.PORT || 1337

app.listen(port, () => console.log(`listening on port ${port}`))
