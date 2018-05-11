const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const path = require("path");
const glob = require("glob");

const PATHS = {
  widgets: path.join(__dirname, "widgets")
};

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "styles.css"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { importLoaders: 1 } },
            "postcss-loader"
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.widgets}/**/*`, { nodir: true })
    })
  ]
};
