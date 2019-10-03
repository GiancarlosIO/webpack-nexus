module.exports = require('babel-loader').custom(() => ({
  config(cfg) {
    return {
      ...cfg.options,
      presets: [
        ...(cfg.options.presets || []),
        // eslint-disable-next-line global-require
        require('babel-preset-webpack-nexus'),
      ],
    };
  },
}));
