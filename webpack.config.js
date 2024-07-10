const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HotModuleReplacementPluginConfig = new webpack.HotModuleReplacementPlugin();

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const CleanWebpackPluginConfig = new CleanWebpackPlugin();

let httpsConfig = false;
if (process.env.HTTPS === 'true') {
  httpsConfig = {
    cert: fs.readFileSync(process.env.SSL_CRT_FILE),
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
  };
}

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    https: httpsConfig,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
      test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  plugins: [CleanWebpackPluginConfig, 
            HtmlWebpackPluginConfig, 
            new MiniCssExtractPlugin({
              filename: 'styles.css',
            }),
            new webpack.DefinePlugin({
              'process.env.HTTPS': JSON.stringify(process.env.HTTPS),
              'process.env.SSL_CRT_FILE': JSON.stringify(process.env.SSL_CRT_FILE),
              'process.env.SSL_KEY_FILE': JSON.stringify(process.env.SSL_KEY_FILE),
            }),
            HotModuleReplacementPluginConfig],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/'
  }
};