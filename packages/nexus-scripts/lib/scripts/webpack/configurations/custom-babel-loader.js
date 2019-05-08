const path = require('path');

module.exports = require('babel-loader').custom(() => ({
  config(cfg) {
    return {
      ...cfg.options,
      presets: [
        ...(cfg.options.presets || []),
        path.resolve(
          __dirname,
          '../../../../../babel-preset-webpack-nexus/lib/babel-preset-webpack-nexus.js',
        ),
      ],
    };
  },
}));
