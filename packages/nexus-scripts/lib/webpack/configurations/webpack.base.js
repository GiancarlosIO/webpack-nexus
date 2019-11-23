/* eslint-disable global-require */
const path = require('path');
const merge = require('webpack-merge');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const createBaseConfig = (config, extraConfig) => {
  const base = merge(
    {
      target: 'web',
      output: {
        path: path.resolve(extraConfig.rootAppDirectoryPath, 'dist'),
        publicPath: '/',
        // https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15#0e6c
        pathinfo: false,
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.BABEL_ENV': JSON.stringify(process.env.BABEL_ENV),
        }),
      ],
      // the `entry` option is in the config object
      module: {
        rules: [
          // some apollo packages needs it
          // {
          //   test: /.mjs$/,
          //   include: /node_modules/,
          //   type: 'javascript/auto',
          // },
          {
            test: /\.m?(js|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: path.join(__dirname, 'custom-babel-loader.js'),
              options: {
                cacheDirectory: true,
              },
            },
          },
        ],
      },
      resolve: {
        extensions: [
          '.wasm',
          '.mjs',
          '.json',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.d.ts',
        ],
        modules: [
          extraConfig.srcAppDirectoryPath,
          path.resolve(extraConfig.rootAppDirectoryPath, 'node_modules'),
        ],
        alias: {
          src: path.resolve(extraConfig.srcAppDirectoryPath),
          // configure react profiler
          // it will work in production too
          ...(extraConfig.reactProfiler
            ? {
                'react-dom$': path.resolve(
                  extraConfig.rootAppDirectoryPath,
                  'node_modules/react-dom/profiling',
                ),
                'scheduler/tracing': path.resolve(
                  extraConfig.rootAppDirectoryPath,
                  'node_modules/scheduler/tracing-profiling',
                ),
              }
            : {
                // use the correct package for productin
                'react-dom':
                  process.env.NODE_ENV === 'production'
                    ? path.resolve(
                        extraConfig.rootAppDirectoryPath,
                        'node_modules/react-dom',
                      )
                    : path.resolve(
                        extraConfig.rootAppDirectoryPath,
                        'node_modules/@hot-loader/react-dom',
                      ),
              }),
          react: path.resolve(
            extraConfig.rootAppDirectoryPath,
            'node_modules/react',
          ),
        },
      },
    },
    config,
  );

  if (extraConfig.withGraphql) {
    base.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
  }

  if (extraConfig.isAnalyzerEnabled) {
    const analyzer = new BundleAnalyzerPlugin();

    base.plugins.push(analyzer);
  }

  return base;
};

module.exports = createBaseConfig;
