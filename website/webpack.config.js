// webpack.config.js
// Add experiments.topLevelAwait = true to export modules with async/await syntax (Reference: https://tinyurl.com/yc25pwar)

const { ProvidePlugin } = require("webpack");

module.exports = {
  entry: {
    App: "./output/App.js",
  },
  output: {
    // default output to ./dist folder
    filename: "[name].js", // Retain original file name
  },
  mode: "development",
  watch: true,
  plugins: [
    new ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom/client",
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};
