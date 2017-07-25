const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
import { resolve } from 'path'
const rootResolve = pathname => resolve(__dirname, pathname)

import webpackRules from './server/webpack_rules'

const isProd = process.env.NODE_ENV === 'production'

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new ExtractTextPlugin({
    filename: 'assets/css/style.[hash].css',
    disable: !isProd,
    allChunks: true
  }),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: `src/html/index.pug`,
  })
]

// production
if(isProd) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    })
  )
}

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
  plugins,
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
      webpackRules.jsRule.babel,
      webpackRules.jsRule.eslint,
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
      },
      {
        test: /\.(jpe?g|png|svg|gif|ico)$/,
        use:
          isProd ?
            [
              webpackRules.fileLoaderRule,
              webpackRules.imageWebpackLoaderRule
            ]
          : [
              webpackRules.urlLoaderRule
            ]
      }
    ]
  },
  devServer: {
    contentBase: rootResolve('public'),
    publicPath: '/',
    inline: true,
    hot: true,
    host: '0.0.0.0'
  }
}