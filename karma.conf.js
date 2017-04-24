module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],

    singleRun: true,

    autoWatch: false,

    frameworks: ['mocha'],

    files: [
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      './scripts/tests.bundle.js'
    ],

    preprocessors: {
      './scripts/tests.bundle.js': ['webpack', 'sourcemap']
    },

    reporters: ['progress'],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.s?css$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
          exclude: /node_modules/
        }]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      noInfo: true,
    }
  });
};
