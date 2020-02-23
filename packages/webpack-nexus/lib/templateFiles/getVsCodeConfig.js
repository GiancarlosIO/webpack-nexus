function getVsCodeConfig() {
  return `{
"html.format.enable": false,

  // disabled  to not run double format
  "[javascript]":  {
  "editor.formatOnSave":  false,
},
"[javascriptreact]":  {
  "editor.formatOnSave":  false,
},
"[typescript]":  {
  "editor.formatOnSave":  false,
},
"[typescriptreact]":  {
  "editor.formatOnSave":  false,
},

"editor.codeActionsOnSave": {
  "source.fixAll.tslint": true,
  "source.fixAll.eslint": true
},

  // An array of language ids which should be validated by ESLint
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "Babel Javascript",
  "typescript",
  "typescriptreact"
],
"eslint.alwaysShowStatus": true,
// typescript auto-format settings
"typescript.tsdk": "node_modules/typescript/lib",
"javascript.preferences.importModuleSpecifier": "auto",
"typescript.preferences.importModuleSpecifier": "auto",
"javascript.preferences.quoteStyle": "single",
"typescript.preferences.quoteStyle": "single"
}
  `;
}

module.exports = getVsCodeConfig;
