/* eslint-disable import/no-commonjs */
const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: process.env.NODE_ENV,
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new NodemonPlugin(), new Dotenv({ silent: true })],

  target: "node",
  watch: true,
  externals: [nodeExternals()],

  // Do not replace node globals with polyfills
  // https://webpack.js.org/configuration/node/
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
};
