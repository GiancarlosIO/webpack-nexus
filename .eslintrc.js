module.exports = {
  "extends": "./packages/eslint-config-webpack-nexus/lib/eslint-config-webpack-nexus.js",
  "overrides": [
    {
      "files": ["packages/*/*.ts", "packages/*/*.tsx"],
      "parserOptions": {
        "project": ["./tsconfig.eslint.json", "./packages/*/tsconfig.eslint.json"],
        tsconfigRootDir: __dirname,
      }
    }
  ]
}
