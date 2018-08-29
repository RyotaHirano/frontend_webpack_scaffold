const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const resolve = require('path').resolve
const rootResolve = pathname => resolve(__dirname, pathname)

const baseConfig = require('./webpack.base.config.babel.js')

const plugins = [
  new ExtractTextPlugin({
    disable: true
  })
]

module.exports = merge(baseConfig, {
  plugins,
  devServer: {
    contentBase: rootResolve('dist'),
    publicPath: '/',
    inline: true,
    hot: true,
    host: '0.0.0.0'
  }
})
