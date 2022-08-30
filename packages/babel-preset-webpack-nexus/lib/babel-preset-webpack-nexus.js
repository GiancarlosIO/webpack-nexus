/* eslint-disable global-require */
module.exports = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const styledPlugin = [
    require('babel-plugin-styled-components'),
    {
      displayName: !isProduction,
      preprocess: false,
      ssr: true,
      minify: false,
      pure: isProduction,
    },
  ];

  return {
    presets: [
      [
        require('@babel/preset-env'),
        {
          // dont convert modules to commonjs, we need to keep it with es6 imports to apply treeshaking
          modules: false,
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: 'entry', // maybe here we can try 'usage' 🤔
          corejs: '3.0',
          targets: isProduction
            ? ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
            : [
                'last 2 chrome versions',
                'last 2 firefox versions',
                'last 2 edge versions',
              ],
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        require('@babel/preset-react'),
        {
          runtime: 'automatic',
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: !isProduction,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,
        },
      ],
      require('@babel/preset-typescript'),
    ],
    env: {
      test: {
        presets: [require('@babel/preset-env')],
        plugins: [
          styledPlugin,
          require('@babel/plugin-transform-modules-commonjs'),
          require('babel-plugin-dynamic-import-node'),
        ],
      },
      production: {
        plugins: [
          styledPlugin,
          require('@babel/plugin-transform-react-constant-elements'),
          require('babel-plugin-transform-react-remove-prop-types'),
          // we need a polyfill to use this plugin!!!
          require('@babel/plugin-transform-react-inline-elements'),
          [
            require('babel-plugin-transform-remove-console'),
            { exclude: ['error', 'warn'] },
          ],
          require('babel-plugin-transform-remove-debugger'),
          require('babel-plugin-lodash'),
          require('babel-plugin-transform-inline-environment-variables'),
          require('@babel/plugin-proposal-object-rest-spread'),
        ],
      },
    },
    plugins: [
      styledPlugin,
      // TODO: make work the hot reload with react!
      [
        require('@babel/plugin-transform-destructuring'),
        {
          // Use loose mode for performance:
          // https://github.com/facebook/create-react-app/issues/5602
          loose: false,
          selectiveLoose: [
            'useState',
            'useEffect',
            'useContext',
            'useReducer',
            'useCallback',
            'useMemo',
            'useRef',
            'useImperativeHandle',
            'useLayoutEffect',
            'useDebugValue',
          ],
        },
      ],
      require('@babel/plugin-proposal-export-default-from'),
      [
        require('@babel/plugin-proposal-decorators'),
        {
          legacy: true,
        },
      ],
      [
        require('@babel/plugin-proposal-class-properties'),
        {
          loose: true,
        },
      ],
      require('@babel/plugin-syntax-dynamic-import'),
      require('@babel/plugin-proposal-optional-chaining'),
      /**
       * Hey!
       * transform-runtime plugin only works for build libraries!
       * Don't use this for built a web app!
       */
      // '@babel/plugin-transform-runtime',
    ],
  };
};
