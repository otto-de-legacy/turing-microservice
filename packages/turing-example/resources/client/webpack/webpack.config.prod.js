// eslint-disable-line max-lines

'use strict';

const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd()); // eslint-disable-line no-sync

const webpack = require('webpack');

const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const cssFilename = 'css/[name].[contenthash:8].css';

module.exports = {
  bail: true,
  devtool: 'source-map',
  target: 'web',
  entry: {
    main: [
      'whatwg-fetch',
      path.resolve(appDirectory, 'src/client/index.tsx'),
      path.resolve(appDirectory, 'src/client/offlinePlugin.ts')
    ],
    vendor: [
      'whatwg-fetch',
      'react',
      'react-dom',
      'react-tap-event-plugin',
      'react-hot-loader',
      'material-ui/styles/MuiThemeProvider',
      'offline-plugin/runtime'
    ]
  },
  output: {
    path: path.resolve(appDirectory, 'resources/server/public'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    publicPath: './',
    devtoolModuleFilenameTemplate: (info) => {
      return path.relative(path.resolve(appDirectory, 'src/client'), info.absoluteResourcePath);
    }
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.json',
      '.jsx'
    ],
    plugins: [
      new TsConfigPathsPlugin(),
      new ModuleScopePlugin(path.resolve(appDirectory, 'src/client'))
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {parser: {requireEnsure: false}},
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
        include: path.resolve(appDirectory, 'src/client')
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.(ts|tsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/
        ],
        loader: 'file-loader',
        options: {
          name: 'media/[name].[hash:8].[ext]'
        }
      },
      {
        test: [
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/
        ],
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'media/[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              mozjpeg: {
                quality: 75
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              svgo: {
                plugins: [
                  {
                    removeUnknownsAndDefaults: false
                  },
                  {
                    cleanupIDs: false
                  }
                ]
              },
              optipng: {
                optimizationLevel: 7
              },
              gifsicle: {
                optimizationLevel: 3
              }
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(appDirectory, 'src/client'),
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(Object.assign({
          fallback: 'style-loader',
          use: [
            // isomorphic-style-loader
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                importLoaders: 1,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [
                    require('postcss-import')(), // eslint-disable-line global-require
                    require('stylelint')(), // eslint-disable-line global-require
                    require('postcss-flexbugs-fixes'), // eslint-disable-line global-require
                    require('postcss-cssnext')({ // eslint-disable-line global-require
                      browsers: [
                        'last 2 versions',
                        'ie 9'
                      ],
                      flexbox: 'no-2009'
                    })
                  ];
                }
              }
            }
          ]
        }, {publicPath: Array(cssFilename.split('/').length).join('../')}))
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      DEBUG: false,
      __DEVTOOLS__: false
    }),
    new CheckerPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
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
        drop_console: true,
        drop_debugger: true,
        global_defs: {
          __REACT_HOT_LOADER__: undefined // eslint-disable-line no-undefined
        },
        reduce_vars: true
      },
      minimize: true,
      debug: false,
      output: {
        comments: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: cssFilename
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[chunkhash:8].js'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, 'src/client/resources/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new CompressionPlugin({
      asset: '[path].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new OfflinePlugin({
      ServiceWorker: {
        events: true,
        minify: true,
        navigateFallback: '/index.html'
      }
    }),
    new FaviconsWebpackPlugin({
      title: 'Reactive Products',
      logo: path.resolve(appDirectory, 'src/client/resources/logo.png'),
      prefix: 'icons/',
      emitStats: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  performance: {
    hints: 'warning'
  }
};
