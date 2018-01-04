/* eslint-disable import/no-commonjs */

const path = require("path");
const webpack = require("webpack");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["@babel/polyfill", "./src/server.js"],
  output: {
    path: path.resolve("./build"),
    filename: "server.js"
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
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new NodemonPlugin(),
    new Dotenv({ silent: true })
  ],

  target: "node",
  watch: true,
  externals: [nodeExternals()],

  devtool: "cheap-module-inline-source-map", // For prod use 'source-map',

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
