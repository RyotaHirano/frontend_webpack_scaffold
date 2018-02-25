const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./webpack.base.config.babel.js')

const plugins = [
  new ExtractTextPlugin({
    filename: 'assets/css/style.[hash].css',
    allChunks: true
  }),
  new UglifyJSPlugin({
    uglifyOptions: {
      output: {
        comments: false,
        beautify: false
      },
      ie8: false
    }
  })
]

module.exports = merge(baseConfig, {
  plugins
})
