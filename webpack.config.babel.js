const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
import { resolve } from 'path'
const rootResolve = pathname => resolve(__dirname, pathname)

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
    filename: 'assets/js/[name].js'
  },
  externals: {
    //
  },
  resolve: {
    extensions: ['.js', '.scss', '.sass'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${rootResolve('src/html/index.pug')}`,
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/style.[hash].css',
      disable: process.env.NODE_ENV !== 'production',
      allChunks: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: 'css-loader', options: { importLoaders: 2 } },
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  devServer: {
    contentBase: rootResolve('docs'),
    publicPath: '/',
    hot: true,
    host: '0.0.0.0'
  }
}