<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/AdamSiekierski/gatsby-plugin-nodejs/master/logo.png">
</p>
<p align="center">
  <h2 align="center">gatsby-plugin-nodejs</h2>
</p>
<p align="center"><i>Gatsby plugin for easy integration with Node.js servers</i></p>
<p align="center">
  <img src="https://img.shields.io/github/license/adamsiekierski/gatsby-plugin-nodejs?style=flat-square">
  <img src="https://img.shields.io/david/adamsiekierski/gatsby-plugin-nodejs?style=flat-square">
  <img src="https://img.shields.io/github/package-json/v/adamsiekierski/gatsby-plugin-nodejs?style=flat-square">
</p>

### About

`gatsby-plugin-nodejs` gives you a way to integrate your Gatsby site with a custom Node.js server. Use your favorite backend framework and set up your Gatsby.js site normally - the plugin will take care of everything:

- Serving built site
- 404 page middleware
- Gatsby redirects
- Client-side paths
- Running the server during the build, so that you can fetch the data from your API during build
- Serving the site with pathPrefix - set it up inside `gatsby-config.js`, the plugin will take care of it

### Installation

Install the plugin using npm or yarn

```
npm install gatsby-plugin-nodejs
```

and add it to your `gatsby-config.js`

```js
module.exports = {
  /* Site config */
  plugins: [
    /* Rest of the plugins */
    `gatsby-plugin-nodejs`,
  ],
};
```

### Usage

1. Create an `index.js` file inside `server` directory in your Gatsby page project
2. Create the base of web server using your favourite framework
3. Initialize Gatsby in your server

```js
const express = require("express");
const gatsby = require("gatsby-plugin-nodejs");

const app = express();

gatsby.prepare({ app }, () => {
  // Here you can define your routes
});

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`listening on port ${port}`));
```

As you can see, you'll need to use `prepare` function. It creates a middleware, that serves static files, defines routes that handle Gatsby redirects and client paths, and sets up the 404 page.

Under the hood, your routes are added to server at the end, just before the 404 page route.

The `prepare` function accepts the config object as the first argument:

| Property    | Value    | Description                                                                                    |
| ----------- | -------- | ---------------------------------------------------------------------------------------------- |
| `app`       | `object` | App instance of your framework (currently we support only Express)                             |
| `framework` | `string` | If you use framework other than Express, pass a string with its name (currently not supported) |

And a callback function as a second. It is executed just before 404 page route is defined, and should contain all your routes like API, etc.

When the server is set up, add an npm script:

```json
{
  "_comment": "...rest of your package.json",
  "scripts": {
    "_comment": "...rest of your npm scripts",
    "start": "node server/index.js"
  }
}
```

Next build the page using `gatsby build`, and your server is ready to launch (`npm start`)

### Examples

- Basic example using all the features with Express https://github.com/AdamSiekierski/gatsby-plugin-nodejs/tree/master/example

### Todo

- [x] Integration with Express.js
- [x] Support for creating pathPrefix
- [x] Run server on build, so that Gatsby could be able to fetch data from it
- [ ] Run server along with development server
- [ ] Integration with other Node.js frameworks like Koa or Fastify
- [ ] If the site isn't built when server is launched, build it automatically
- [ ] Custom server filename and location

### License

MIT &copy; Adam Siekierski
