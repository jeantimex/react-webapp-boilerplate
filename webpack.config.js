const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const locale = process.env.LOCALE || 'en-US';
const sourcePath = path.join(__dirname, 'app');
const outputPath = path.join(__dirname, 'dist', locale);

module.exports = env => {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';
  const languageCode = locale.toLowerCase().split(/[_-]+/)[0];

  const extractSass = new ExtractTextPlugin({
    filename: '[name].bundle.css',
    disable: false,
    allChunks: true,
  });

  const plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      LOCALE: JSON.stringify(languageCode),
    }),
    extractSass,
  ];

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
        sourceMap: true,
      })
    );
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    devtool: isProd ? 'source-map' : 'inline-source-map',
    context: sourcePath,
    entry: {
      app: './index.js',
      vendor: ['react'],
    },
    output: {
      path: outputPath,
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]',
            },
          },
        },
        {
          test: /\.s?css$/,
          include: [sourcePath, path.resolve('node_modules/todomvc-app-css')],
          use: extractSass.extract({
            use: [
              {
                loader: 'css-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    resolve: {
      extensions: [
        '.webpack-loader.js',
        '.web-loader.js',
        '.loader.js',
        '.js',
        '.jsx',
      ],
      modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
      alias: {
        actions: path.join(__dirname, 'app', 'actions'),
        pages: path.join(__dirname, 'app', 'pages'),
        reducers: path.join(__dirname, 'app', 'reducers'),
        store: path.join(__dirname, 'app', 'store'),
        'locale-data': `react-intl/locale-data/${languageCode}`,
        'locale-messages': `./locales/${locale}.json`,
      },
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 100,
      maxEntrypointSize: 300,
      hints: 'warning',
    },

    devServer: {
      contentBase: './app',
      disableHostCheck: true,
      historyApiFallback: true,
      host: 'localhost',
      port: 3000,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
      },
    },
  };
};
