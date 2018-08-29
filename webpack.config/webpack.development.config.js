const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const resolve = require('path').resolve
const rootResolve = pathname => resolve(__dirname, pathname)

const baseConfig = require('./webpack.base.config.js')

const plugins = [
  new ExtractTextPlugin({
    disable: true
  })
]

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins,
  serve: {
    content: rootResolve('dist'),
    hot: true,
    host: '0.0.0.0'
  }
})
