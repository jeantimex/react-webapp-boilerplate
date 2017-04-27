import path from 'path';
import webpack from 'webpack';

export default (config) => {
  config.set({
    // level of logging
    // possible values:
    // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    client: {
      captureConsole: true
    },

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-intl-shim',
      'karma-mocha',
      'karma-sinon',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-coverage-istanbul-reporter'
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'intl-shim', 'sinon'],

    files: [
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      './tests/index.js'
    ],

    preprocessors: {
      './tests/index.js': ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage-istanbul'],

    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text'],
      // base output directory.
      dir: path.join(__dirname, 'coverage'),
      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,
      // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
      skipFilesWithNoCoverage: true,
      'report-config': {
        html: {
          subdir: 'html'
        }
      },
      thresholds: {
        global: {
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80
        }
      }
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.s?css$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
          exclude: /node_modules/
        }, {
          test: /\.js$/,
          exclude: /(tests|scripts|node_modules)/,
          loader: 'istanbul-instrumenter-loader',
          enforce: 'post',
        }]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      resolve: {
        alias: {
          actions: path.join(__dirname, 'client', 'actions'),
          pages: path.join(__dirname, 'client', 'pages'),
          reducers: path.join(__dirname, 'client', 'reducers'),
          store: path.join(__dirname, 'client', 'store'),
          'enzyme-intl$': path.resolve('scripts/enzyme-intl.js'),
          'locale-data': 'react-intl/locale-data/en',
          'locale-messages': './locales/en-US.json',
        }
      },
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'test',
        })
      ]
    },

    webpackServer: {
      noInfo: true,
    }
  });
};
