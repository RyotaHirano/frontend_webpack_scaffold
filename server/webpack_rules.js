const jsRule = {
  babel: {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  },
  eslint: {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'eslint-loader',
  }
}

const styleRule = {
  fallback: "style-loader",
  use: [
    { loader: 'css-loader', options: { importLoaders: 2 } },
    'postcss-loader',
    'sass-loader'
  ]
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

const urlLoaderRule = {
  loader: 'url-loader',
  options: {
    limit: 9000
  }
}

export default {
  jsRule,
  styleRule,
  fileLoaderRule,
  imageWebpackLoaderRule,
  urlLoaderRule
}