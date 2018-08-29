const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const plugins = [
  new HtmlWebpackPlugin({
    template: `src/html/index.pug`,
  })
]

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './../build'),
    publicPath: './',
    filename: 'assets/js/[name].js'
  },
  externals: {
    //
  },
  resolve: {
    extensions: ['.js', '.scss', '.sass'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
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
            {loader: 'css-loader', options: {importLoaders: 2}},
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpe?g|png|svg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath : path => {
                return `assets${path.replace('src', '')}`
              }
            }
          },
          {
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
        ]
      }
    ]
  }
}
