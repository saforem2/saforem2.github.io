var HtmlWebpackPlugin = require("html-webpack-plugin");

var webpackConfig = {
  entry: "./src/assets/js/app.js",
  output: {
    path: "./dist/assets/js",
    filename: "app.js"
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js$/, 
        exclude: /node_modules/
      },
      {
        loaders: ["style", "css", "sass"],
        test: /\.scss$/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ]
};

module.exports = webpackConfig;
