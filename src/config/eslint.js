module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      classes: true,
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  plugins: ['import', 'prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 80,
        jsxBracketSameLine: false,
        trailingComma: 'all',
        arrowParens: 'avoid',
      },
    ],
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-nested-ternary': 'warn',
    'newline-after-var': ['error', 'always'],
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'max-len': 0,
    'react/no-unused-prop-types': 1,
    'import/prefer-default-export': 0,
    import: 0,
    'func-names': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'import/extensions': 0,
    'consistent-return': 0,
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prop-types': [
      1,
      {
        ignore: ['context', 'tracking'],
      },
    ],
    'react/no-did-mount-set-state': 0,
    'react/no-array-index-key': 1,
    'react/sort-comp': [
      2,
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'render'],
      },
    ],
    'react/display-name': 1,
    // hooks!
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    // ======= a11y section ====== //
    'jsx-a11y/accessible-emoji': 'error',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/interactive-supports-focus': 'warn',
    'jsx-a11y/label-has-for': 'error',
    'jsx-a11y/lang': 'error',
    'jsx-a11y/media-has-caption': 'warn',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-autofocus': 'off', // I know what I'm doing... I think...
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'warn',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
  },
  // "settings": {
  //   "react": {
  //     version: '16.8',
  //   },
  //   "import/resolver": {
  //     "webpack": {
  //       "config": "crehana/frontdev/webpack/environments/development.js",
  //       "resolve": {
  //         "extensions": [
  //           ".js",
  //           ".jsx",
  //           ".es",
  //           ".es6",
  //           ".mjs",
  //           ".graphql",
  //           ".gql"
  //         ]
  //       }
  //     }
  //   }
  // }
}
