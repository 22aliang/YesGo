const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry:  path.resolve(__dirname,'./src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/main.[hash].bundle.js',
    assetModuleFilename: 'images/[hash].[ext]',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    port: 9000,
    compress: true,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash].[ext]',
        },
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
        generator: {
          filename: 'assets/icon/[hash].[ext]',
        },
      },
      {
        test: /\.json/,
        type: 'asset/source',
        generator: {
          filename: 'assets/json/[hash].[ext]',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'./src/index.html'),
      filename: 'index.[hash].html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: "./css/main.[hash].css"
    }),
    new CleanWebpackPlugin(),
  ],
}

