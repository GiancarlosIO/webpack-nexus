const restrictedGlobals = require('confusing-browser-globals');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Here we are using the typescript parser for all files (js and ts)
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'react-hooks',
    'prettier',
    'import',
  ],
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  globals: {
    APP_RELEASE: true,
    Cypress: true,
    cy: true,
    context: true,
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      classes: true,
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': extensions,
    },
    'import/extensions': extensions,
  },
  rules: {
    // prettier
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        bracketSameLine: false,
      },
    ],
    // js rules
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-unused-vars': 0,
    'no-nested-ternary': 'warn',
    'newline-after-var': ['error', 'always'],
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'max-len': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
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
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    // react rules
    'react/jsx-fragments': 0,
    'react/prop-types': [
      1,
      {
        ignore: ['context', 'tracking'],
      },
    ],
    'react/display-name': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,
    'react/no-unused-prop-types': 1,
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/no-did-mount-set-state': 0,
    'react/no-array-index-key': 1,
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/accessible-emoji': 'warn',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['noHref', 'invalidHref'],
      },
    ],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: true }],
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/heading-has-content': 'warn',
    'jsx-a11y/iframe-has-title': 'warn',
    'jsx-a11y/img-redundant-alt': 'warn',
    'jsx-a11y/no-access-key': 'warn',
    'jsx-a11y/no-distracting-elements': 'warn',
    'jsx-a11y/no-redundant-roles': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
    'jsx-a11y/scope': 'warn',
    'react/sort-comp': [
      2,
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'render'],
      },
    ],
    'react/destructuring-assignment': 0,

    // typescript/react rules
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false,
        variables: false,
        typedefs: false,
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Disable eslint incompatible rules with typescript
        'react/prop-types': 'off',
        // TypeScript's `noFallthroughCasesInSwitch` option is more robust
        'default-case': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
        'no-dupe-class-members': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
        'no-undef': 'off',
        'no-use-before-define': 'off',
      },
    },
  ],
};
