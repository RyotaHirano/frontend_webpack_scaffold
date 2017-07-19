const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
import { resolve } from 'path'
const rootResolve = pathname => resolve(__dirname, pathname)

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

if(isProd) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false, screw_ie8: true } })
  )
}

const fileLoaderRule = {
  loader: 'file-loader',
  options: {
    name: 'assets/[path][name].[ext]'
  }
}

const imageWebpackLoaderRule = {
  loader: 'image-webpack-loader',
  query: {
    mozjpeg: {
      progressive: true,
    },
    gifsicle: {
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    pngquant: {
      quality: '65-90',
      speed: 4,
    },
  }
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
      },
      {
        test: /\.(jpe?g|png|svg|gif|ico)$/,
        use:
          isProd ?
            [
              fileLoaderRule,
              imageWebpackLoaderRule
            ]
          : [
              {
                loader: 'url-loader',
                options: {
                  limit: 9000
                }
              }
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